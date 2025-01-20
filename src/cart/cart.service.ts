import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import cartSchema from "./cart.schema";
import ApiError from "../utils/apiErrors";
import productSchema from "../products/product.schema";
import { CartItems, Carts } from "./cart.interface";
import couponSchema from "../coupon/coupon.schema";


class CartService {


  getCart = expressAsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const cart = await cartSchema.findOne({user: req.user._id})
    if(!cart) return next(new ApiError('your cart is empty', 404)); // 404 not found

    res.status(200).json({message: 'cart fetched successfully', cart});
  });

  
  clearCart = expressAsyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const cart = await cartSchema.findOneAndDelete({user: req.user._id});
    if(!cart) return next(new ApiError('your cart is empty', 404)); // 404 not found

    res.status(204).json({message: 'cart cleared successfully', cart}); // 204 no content
  });


  // add to cart
  // remove from cart
  // update product quantity
  // apply coupon 

  addToCart = expressAsyncHandler(async(req: Request, res: Response, next: NextFunction) => {


    const product = await productSchema.findById(req.body.product);
    if(!product) return next(new ApiError('product not found', 404)); 

    const cart : any = await cartSchema.findOne({user: req.user._id});

    if(!cart) {

      let newCart =  await cartSchema.create({
        user: req.user._id,
        items :  [{
          product : product._id,
          price : product.priceAfterDiscount ? product.priceAfterDiscount : product.price,
          quantity : 1
        } ]
      })
    }
    else {
      const productIndex =  cart.items.findIndex((item: CartItems) => item.product._id!.toString() === product._id!.toString() )

      if(productIndex > -1 ){

        cart.items[productIndex].quantity  += 1;

      }else{

        cart.items.push({
          product : product._id,
          price : product.price
        })
      }
      } 
      this.calcTotalPrice(cart);
      await cart.save();
      res.status(200).json({message: 'product added to cart successfully',length: cart.items.length, cart});
});


removeFromCart = expressAsyncHandler(async(req: Request, res: Response , next: NextFunction)=> {

  const cart = await cartSchema.findOneAndUpdate({user: req.user._id}
    ,{$pull: {items: {_id: req.params.itemsId}}},
     {new: true});

     if(!cart) return next(new ApiError('cart not found', 404));

    //  let totalPrice : number = 0;
    //   cart.items.forEach((item: CartItems) => {
        
    //     totalPrice += item.price * item.quantity;
    //   })
    //   cart.totalPrice = totalPrice;
    //   cart.taxPrice = totalPrice * 0.05;

    this.calcTotalPrice(cart);
      await cart.save();
      res.status(200).json({message: 'product removed from cart successfully',length: cart.items.length, cart});

});


updateProductQuantity = expressAsyncHandler(async(req: Request, res: Response , next: NextFunction)=> {

  let cart = await cartSchema.findOne({user: req.user._id});
  if(!cart) return next(new ApiError('cart not found', 404));

  const productIndex = cart.items.findIndex((item: CartItems) => item.product._id!.toString() === req.params.itemsId.toString() )

  if(productIndex > -1 ){
    cart.items[productIndex].quantity = req.body.quantity;
  }else {
    return next(new ApiError('product not found in cart', 404));
  }

  this.calcTotalPrice(cart);
  await cart.save();
  res.status(200).json({message: 'product quantity updated successfully', cart});
})


applyCoupon = expressAsyncHandler(async(req: Request, res: Response , next: NextFunction)=> {

  const coupon = await couponSchema.findOne({code: req.body.code , expireDate: {$gt: new Date()}});
  if(!coupon) return next(new ApiError('coupon not found', 404));

  let cart = await cartSchema.findOne({user: req.user._id});
  if(!cart) return next(new ApiError('cart not found', 404));

  const totalPriceAfterDiscount : any =( cart.totalPrice - (cart.totalPrice *( coupon.discount / 100))).toFixed(2);
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  cart.taxPrice = totalPriceAfterDiscount * 0.05;
  await cart.save();
  res.status(200).json({message: 'coupon applied successfully', cart});

});



calcTotalPrice  (cart: Carts) {
  
  let totalPrice : number = 0;
      cart.items.forEach((item: CartItems) => {
        
        totalPrice += item.price * item.quantity;
      });
      cart.totalPrice = totalPrice;
      cart.taxPrice = totalPrice * 0.05;
      cart.totalPriceAfterDiscount = undefined ;
}

}

const cartService = new CartService();

export default  cartService;
import expressAsyncHandler from "express-async-handler";
import refactorService from "../refactor.service";
import { Order } from "./order.interface";
import orderSchema from "./order.schema";
import { NextFunction, Request, Response } from "express";
import cartSchema from "../cart/cart.schema";
import ApiError from "../utils/apiErrors";
import productSchema from "../products/product.schema";



class OrderService {


  filterOrders (req : Request , res : Response , next : NextFunction)  {

    const filterData : any = {};
    if(req.user.role === 'user')  req.filterData.user = {user: req.user._id};
    req.filterData = filterData ;
    next();
    
  }


  getAllOrders =  refactorService.getAll<Order>(orderSchema);
  getOrderById = refactorService.getOneById<Order>(orderSchema);

  createCashOrder =  expressAsyncHandler  (async (req : Request, res : Response , next : NextFunction) => {

    const cart = await cartSchema.findOne({user: req.user._id});
    if(!cart) return next(new ApiError('your cart is empty', 404)); // 404 not found

    const itemsPrice: number = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
    const order = await orderSchema.create({
      user: req.user._id,
      items: cart.items,
      totalPrice: cart.taxPrice + cart.totalPrice,
      taxPrice: cart.taxPrice,
      itemsPrice: itemsPrice,
      address: req.body.address,
    });

    const bulkOptions = cart.items.map((item : any) => ({

      updateOne : {
        filter : {_id : item.product},
        update : {$inc : {quantity : -item.quantity ,sold: item.quantity} }
      }
    }));

    await productSchema.bulkWrite(bulkOptions);
    await cartSchema.deleteOne({user: req.user._id});
    res.status(201).json({message: 'order created successfully', order});
  });

  payOrder = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {


    const order = await orderSchema.findByIdAndUpdate(req.params.id, {isPaid: true, paidAt: Date.now()}, {new: true});
    if(!order) return next(new ApiError('order not found', 404)); // 404 not found
    res.status(200).json({message: 'order paid successfully', order});
  });

  deliverOrder = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const order = await orderSchema.findByIdAndUpdate(req.params.id, {isDelivered: true, deliveredAt: Date.now()}, {new: true});
    if(!order) return next(new ApiError('order not found', 404)); // 404 not found
    res.status(200).json({message: 'order delivered successfully', order});
  });




}

const orderService = new OrderService();

export default orderService;
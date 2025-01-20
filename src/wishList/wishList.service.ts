import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiErrors";
import usersSchema from "../users/users.schema";
import { Users } from "../users/users.interface";



class WishListService {


    getWishList = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const user: Users | null = await usersSchema.findById(req.user._id).populate('wishlist');

        if (!user) return next (new ApiError(`${req.__('not_found')}`, 404));
        res.status(200).json({message : "User wishList fetched successfully",length: user.wishList.length , data: user.wishList});
        
    });
    
    addToWishList = expressAsyncHandler(async(req: Request, res: Response, next: NextFunction) => {
        
        const user : Users | null = await usersSchema.findByIdAndUpdate(req.user._id, {$addToSet: {wishList: req.body.productId}}, {new: true});

        if (!user) return next (new ApiError(`${req.__('not_found')}`, 404));
        await user.populate('wishList');
        res.status(200).json({message : "Product added to wishList successfully",length: user.wishList.length , data: user.wishList});
    });

    removeFromWishList = expressAsyncHandler(async(req: Request, res: Response, next: NextFunction) => {
        
        const user : Users | null = await usersSchema.findByIdAndUpdate(req.user._id , {$pull: {wishList: req.params.productId}}, {new: true});
        
        if (!user) return next (new ApiError(`${req.__('not_found')}`, 404));   
        await user.populate('wishList');
        res.status(200).json({message : "Product removed from wishList successfully",length: user.wishList.length , data: user.wishList});
    })
}

const wishListService = new WishListService();
export default wishListService;

import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiErrors";
import usersSchema from "../users/users.schema";
import { Users } from "../users/users.interface";



class AddressService {


    getAddress = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const user: Users | null = await usersSchema.findById(req.user._id)

        if (!user) return next (new ApiError(`${req.__('not_found')}`, 404));
        res.status(200).json({message : "User address fetched successfully",length: user.address.length , data: user.address});
        
    });
    
    addAddress = expressAsyncHandler(async(req: Request, res: Response, next: NextFunction) => {
        
        const user : Users | null = await usersSchema.findByIdAndUpdate(req.user._id, {$addToSet: {address: req.body.address}}, {new: true});

        if (!user) return next (new ApiError(`${req.__('not_found')}`, 404));
        res.status(200).json({message : "Address added successfully",length: user.address.length , data: user.address});
    });

    removeAddress = expressAsyncHandler(async(req: Request, res: Response, next: NextFunction) => {
        
        const user : Users | null = await usersSchema.findByIdAndUpdate(req.user._id , {$pull: {address: {_id: req.params.addressId}}}, {new: true});
        
        if (!user) return next (new ApiError(`${req.__('not_found')}`, 404));   
        res.status(200).json({message : "Address removed successfully",length: user.address.length , data: user.address});
    })
}

const addressService = new AddressService();
export default addressService ;

import expressAsyncHandler from "express-async-handler";
import refactorService from "../refactor.service";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiErrors";
import { uploadSingleFile } from "../middleware/uploadFiles.middleware";
import sharp from "sharp";
import usersSchema from "../users/users.schema";
import { Users } from "../users/users.interface";
import createTokens from "../utils/token";
import bcrypt from "bcryptjs";
import sanitization from "../utils/sanitization";



class ProfileService {


    setUserId = (req: Request, res: Response, next: NextFunction) => {

        req.params.id = req.user?._id ;
        next() ;

    }

    getUserById = refactorService.getOneById<Users>(usersSchema);
    updateUser = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const user : Users | null = await usersSchema.findByIdAndUpdate(req.user._id,
            {name: req.body.name , image: req.body.image}, { new: true });

        if (!user) return next (new ApiError(`${req.__('not_found')}`, 404));
        res.status(200).json({data: sanitization.User(user)});
        
    });

    createPassword = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findOneAndUpdate({
            _id: req.user._id,
            hasPassword: false
        }, {password: await bcrypt.hash(req.body.password, 13), hasPassword: true}, {new: true});
        if (!user) return next(new ApiError(`${req.__('not_found')}`, 404));
        res.status(200).json({data: sanitization.User(user)});
    });

    changePassword = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const user : Users | null = await usersSchema.findByIdAndUpdate(req.user._id,
            {
            password: req.body.password,
            passwordChangedAt: Date.now() 
        },
        { new: true });
        const token = createTokens.accessToken(user?._id, user?.role!);

        if(!user) return next (new ApiError(`${req.__('not_found')}`, 404));
        res.status(200).json({message:"Password updated successfully",token , user});

    });

    uploadImage = uploadSingleFile(['image'], 'image'); // type , fieldName
    saveImage = async(req:Request,res: Response, next: NextFunction) => {
        
        if(req.file) {
            const fileName = `users.${Date.now()}-image.webp`;
            await sharp(req.file.buffer)
                .resize(1200, 1200)
                .webp({quality: 95})
                .toFile(`uploads/images/users/${fileName}`);
                req.body.image = fileName;
        }
        next()
    }



    deleteUser = refactorService.deleteOne<Users>(usersSchema);
}  

const profileService = new ProfileService();
export default profileService;

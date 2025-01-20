import express, { Application } from "express";
import subcategoryRouter from "./subcategories/subcategory.router";
import categoriesRouter from "./categories/categories.route";
import globalErrorHandler from "./middleware/errors.middleware";
import ApiError from "./utils/apiErrors";
import productRouter from "./products/product.router";
import userRouter from "./users/users.route";
import profileRoute from "./profile/profile.route";
import wishlistRouter from "./wishList/wishList.route";
import googleRoute from "./google/google.route";
import addressRouter from "./address/address.route";
import reviewRouter from "./review/review.route";
import couponRouter from "./coupon/coupon.router";
import cartRouter from "./cart/cart.router";
import authRouter from "./auth/auth.router";
import orderRouter from "./order/order.router";


declare module "express" {


    interface Request {

        filterData ? : any ;
        files ? : any ;
        user ? : any ;

    }
}

    
const Routes : (app : Application) => void = (app: express.Application) : void => {

    // app.use('/auth/google', googleRoute)
    app.use('/api/v1/categories', categoriesRouter);
    app.use('/api/v1/subcategories', subcategoryRouter);
    app.use('/api/v1/products',productRouter);
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/profile',profileRoute)
    app.use('/api/v1/wishlist',wishlistRouter)
    app.use('/api/v1/address',addressRouter)
    app.use('/api/v1/reviews',reviewRouter)
    app.use('/api/v1/coupon',couponRouter)
    app.use('/api/v1/cart',cartRouter)
    app.use('/api/v1/order',orderRouter)
    
    app.all('*', (req:express.Request, res:express.Response, next:express.NextFunction) => {
        
        next(new ApiError(`Route ${req.originalUrl} not found`, 404));
    })
    app.use(globalErrorHandler);

}

export default Routes


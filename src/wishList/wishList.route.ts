import  { Router } from "express";
import wishListService from "./wishList.service";
import authService from "../auth/auth.service";

const wishlistRouter : Router =  Router();



// wishlistRouter.use(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'))

 wishlistRouter.post('/',wishListService.addToWishList);
 wishlistRouter.get('/',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),wishListService.getWishList);
 wishlistRouter.delete('/:productId',wishListService.removeFromWishList);



export default wishlistRouter;



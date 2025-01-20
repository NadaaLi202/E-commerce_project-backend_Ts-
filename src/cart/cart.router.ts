import { Router } from "express";
import authService from "../auth/auth.service";
import cartValidation from "./cart.validation";
import cartService from "./cart.service";



const cartRouter : Router = Router({mergeParams : true}) ;

// cartRouter.use(authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'))

cartRouter.get('/',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),cartService.getCart) // done
cartRouter.post('/',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),cartService.addToCart) // done
cartRouter.delete('/',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),cartService.clearCart)  
cartRouter.delete('/:itemId',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),cartService.removeFromCart)
cartRouter.put('/:itemId',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),cartValidation.updateProductQuantity,cartService.updateProductQuantity)
cartRouter.put('/applyCoupon',cartService.applyCoupon)




export default cartRouter;
import { Router } from "express";
import subcategoriesService from "./coupon.service";
import authService from "../auth/auth.service";
import couponsService from "./coupon.service";
import couponValidation from "./coupon.validation";



const couponRouter : Router = Router({mergeParams : true}) ;

couponRouter.post('/',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),couponValidation.createOne,couponsService.addCoupon)
couponRouter.get('/',couponsService.getAllCoupons)
couponRouter.get('/:id',couponValidation.getOne,couponsService.getCouponById)
couponRouter.put('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),couponValidation.updateOne,couponsService.updateCoupon)
couponRouter.delete('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),couponValidation.deleteOne,couponsService.deleteCoupon)


export default couponRouter;
import { Router } from "express";
import reviewValidation from "./review.validation";
import reviewsService from "./review.service";
import authService from "../auth/auth.service";



const reviewRouter : Router = Router({mergeParams : true}) ;

// /api/v1/products/:productId/reviews

reviewRouter.post('/',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'), reviewsService.setIds ,reviewValidation.createOne,reviewsService.addReview)
reviewRouter.get('/',reviewsService.filterReviews,reviewsService.getAllReviews) // public // api/v1/reviews
reviewRouter.get('/my',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'),reviewsService.filterReviews,reviewsService.getAllReviews) // private
reviewRouter.get('/:id',reviewValidation.getOne,reviewsService.getReviewById)
reviewRouter.put('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user'), reviewValidation.updateOne,reviewsService.updateReview)
reviewRouter.delete('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('user','admin','employee'), reviewValidation.deleteOne,reviewsService.deleteReview)


export default reviewRouter;
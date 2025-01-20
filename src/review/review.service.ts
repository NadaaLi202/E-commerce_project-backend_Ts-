import { NextFunction, Request, Response } from "express";
import refactorService from "../refactor.service";
import { Reviews } from "./review.interface";
import reviewsSchema from "./review.schema";



class ReviewsService {


    setIds (req : Request , res : Response , next : NextFunction) : void {

        req.body.user = req.user._id ;
        req.body.product = req.params.productId ; // علشان اخد ال user,product من ال url
        next();
    };

    filterReviews = (req : Request , res : Response , next : NextFunction) => {

        const filterData : any = {};
        if(req.params.productId)  filterData.product = req.params.productId ;
        if(!req.params.productId && req.user && req.user.role === 'user')  filterData.user = req.user._id
        req.filterData = filterData ;
        next();
    }







  getAllReviews =  refactorService.getAll<Reviews>(reviewsSchema);
  addReview = refactorService.createOne<Reviews>(reviewsSchema);
  getReviewById = refactorService.getOneById<Reviews>(reviewsSchema);
  updateReview = refactorService.updateOne<Reviews>(reviewsSchema);
  deleteReview = refactorService.deleteOne<Reviews>(reviewsSchema);
}

const reviewsService = new ReviewsService();
 
export default reviewsService ;
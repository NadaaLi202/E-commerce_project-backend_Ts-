import { Router } from "express";
import subcategoriesService from "./subcategory.service";
import subcategoriesValidation from "./subcategories.validation";
import authService from "../auth/auth.service";



const subcategoryRouter : Router = Router({mergeParams : true}) ;

subcategoryRouter.post('/',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesService.setCategoryId,subcategoriesValidation.createOne,subcategoriesService.createSubcategory)
subcategoryRouter.get('/',subcategoriesService.filterSubcategories,subcategoriesService.getAllSubcategories)
subcategoryRouter.get('/:id',subcategoriesValidation.getOne,subcategoriesService.getSubcategoryById)
subcategoryRouter.put('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.updateOne,subcategoriesService.updateSubcategory)
subcategoryRouter.delete('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),subcategoriesValidation.deleteOne,subcategoriesService.deleteSubcategory)


export default subcategoryRouter;
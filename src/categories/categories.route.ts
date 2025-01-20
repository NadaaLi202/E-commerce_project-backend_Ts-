import  { Router } from "express";
import categoriesService from "./categories.service";
import subcategoryRouter from "../subcategories/subcategory.router";
import categoriesValidation from "./category.validation";
import authService from "../auth/auth.service";

const categoriesRouter : Router =  Router();

// categoriesRouter.get('/',categoriesService.getAllCategories);
// categoriesRouter.post('/',categoriesService.createCategory);

// /api/v1/categories/:categoryId/subcategories
categoriesRouter.use('/:categoryId/subcategories',subcategoryRouter); // view all subcategories
categoriesRouter.route('/')
.get(categoriesService.getAllCategories)
.post(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.createOne,categoriesService.createCategory)
 categoriesRouter.get('/:id',categoriesValidation.getOne,categoriesService.getCategoryById);
 categoriesRouter.put('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.updateOne,categoriesService.updateCategory);
 categoriesRouter.delete('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),categoriesValidation.deleteOne,categoriesService.deleteCategory);


export default categoriesRouter;



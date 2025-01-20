import { Router } from "express";
import productsService from "./product.service";
import productsValidation from "./product.validation";
import reviewRouter from "../review/review.route";
import authService from "../auth/auth.service";


const productRouter : Router = Router();

productRouter.use('/:productId/reviews', reviewRouter);

productRouter.post('/',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productsService.uploadImages,productsService.saveImage,productsValidation.createOne,productsService.createProduct)
productRouter.get('/',productsService.getAllProducts)
productRouter.get('/:id',productsValidation.getOne,productsService.getProductById)
productRouter.put('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productsService.uploadImages,productsService.saveImage,productsValidation.updateOne,productsService.updateProduct)
productRouter.delete('/:id',authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin','employee'),productsValidation.deleteOne,productsService.deleteProduct)

export default productRouter;
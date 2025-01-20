import { Router } from "express";
import orderService from "./order.service";
import authService from "../auth/auth.service";



const orderRouter : Router = Router() ;

orderRouter.use(authService.protectedRoutes,authService.checkActive)

orderRouter.get('/',orderService.filterOrders,orderService.getAllOrders)
orderRouter.get('/:id',orderService.getOrderById)
orderRouter.post('/',authService.allowedTo('user'),orderService.createCashOrder)
orderRouter.put('/:id/pay',authService.allowedTo('admin','employee'),orderService.payOrder)
orderRouter.put('/:id/deliver',authService.allowedTo('admin','employee'),orderService.deliverOrder)



export default orderRouter;
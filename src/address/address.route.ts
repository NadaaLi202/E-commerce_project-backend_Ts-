import  { Router } from "express";
import addressService from "./address.service";

const addressRouter : Router =  Router();



 addressRouter.post('/',addressService.addAddress);
 addressRouter.get('/',addressService.getAddress);
 addressRouter.delete('/:addressId',addressService.removeAddress);



export default addressRouter;



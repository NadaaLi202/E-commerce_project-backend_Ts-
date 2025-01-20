import  { Router } from "express";
import profileValidation from "./profile.validation";
import profileService from "./profile.service";
import authService from "../auth/auth.service";

const profileRoute : Router =  Router();

 profileRoute.get('/',profileService.setUserId,profileService.getUserById);
 profileRoute.put('/:id',profileService.uploadImage,profileService.saveImage,profileValidation.updateOne,profileService.updateUser);
 profileRoute.put('/:id/changePassword',profileValidation.changePassword,profileService.changePassword);
 profileRoute.put('/:id/createPassword',profileValidation.changePassword,profileService.createPassword);

 profileRoute.delete('/:id',authService.allowedTo('user'),profileValidation.deleteOne,profileService.deleteUser);


export default profileRoute;



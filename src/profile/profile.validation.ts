import { body, param } from "express-validator";
import validatorMiddleware from "../middleware/validator.middleware";
import bcrypt from "bcryptjs";

class ProfileValidation {

  
    updateOne =  [

        body('name').optional()
        .isLength({min : 2, max : 50}).withMessage((val,{req}) => req.__('validation_length_short')),

      validatorMiddleware ]


      createPassword =  [

        body('password')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isLength({min : 6, max : 20}).withMessage((val,{req}) => req.__('validation_length_password')),

    body('confirmPassword')
    .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
    .isLength({min : 6, max : 20}).withMessage((val,{req}) => req.__('validation_length_password'))
    .custom(async( val: string, {req}) => {
        
        if(val !==  req.body.password) throw new Error(`${req.__('validation_password_match')}`);
        return true;
    }),
      validatorMiddleware ]


      changePassword =  [

        body('currentPassword')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isLength({min : 6, max : 20}).withMessage((val,{req}) => req.__('validation_length_password'))
        .custom(async( val: string, {req}) => {
            const isValidPassword = await bcrypt.compare(val, req.user.password);

            if(!isValidPassword) throw new Error(`${req.__('validation_value')}`);
            return true;
        }),

        body('password')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isLength({min : 6, max : 20}).withMessage((val,{req}) => req.__('validation_length_password')),


    body('confirmPassword')
    .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
    .isLength({min : 6, max : 20}).withMessage((val,{req}) => req.__('validation_length_password'))
    .custom(async( val: string, {req}) => {
        
        if(val !==  req.body.password) throw new Error(`${req.__('validation_password_match')}`);
        return true;
    }),
      validatorMiddleware ]

    getOne = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware]

    deleteOne =  [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
   validatorMiddleware ]
}

const profileValidation = new ProfileValidation();

export default  profileValidation;
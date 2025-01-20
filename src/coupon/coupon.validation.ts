import { body, param } from "express-validator";
import validatorMiddleware from "../middleware/validator.middleware";


class CouponValidation {

    createOne = [
        body('code')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isLength({min : 2, max : 50}).withMessage((val,{req}) => req.__('validation_length_short')),

        body('discount')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isFloat({min: 1, max: 100}).withMessage('Coupon code is required'),

        body('expireDate')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isDate().withMessage((val, {req}) => req.__('validation_value'))

        ,validatorMiddleware ]

        updateOne = [
            param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
            body('code')
            .optional()
            .isLength({min : 2, max : 50}).withMessage((val,{req}) => req.__('validation_length_short')),
    
            body('discount')
            .optional()
            .isFloat({min: 1, max: 100}).withMessage('Coupon code is required'),
    
            body('expireDate')
            .optional()
            .isDate().withMessage((val, {req}) => req.__('validation_value'))
    
            ,validatorMiddleware]    

    getOne = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware]

    deleteOne =  [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
   validatorMiddleware ]
}

const couponValidation = new CouponValidation();

export default couponValidation;
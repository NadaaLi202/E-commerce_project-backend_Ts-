import { body, param } from "express-validator";
import validatorMiddleware from "../middleware/validator.middleware";


class CartValidation {

    addToCart = [
       

        body('product')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isMongoId().withMessage((val,{req}) => req.__('invalid_value'))
        ,validatorMiddleware ]

        removeFromCart = [
            param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
            ,validatorMiddleware]    

        updateProductQuantity = [
            param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
            validatorMiddleware
        ]
}

const cartValidation = new CartValidation();

export default cartValidation;
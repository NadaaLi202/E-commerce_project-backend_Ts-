
import { Document, Schema } from "mongoose";
import { Users } from "../users/users.interface";
import { Products } from "../products/product.interface";
export interface Carts  extends Document {


     items :  CartItems[] ;
     totalPrice: number ;
     totalPriceAfterDiscount: number | undefined ;
     user : Users ;
     taxPrice : number ;
    
    
}
export interface CartItems {
    _id : Schema.Types.ObjectId;
    product : Products ;
    quantity: number;
    price : number ;

}
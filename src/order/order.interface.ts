
import { Document } from "mongoose";
import { CartItems } from "../cart/cart.interface";
import { Address, Users } from "../users/users.interface";
export interface Order  extends Document {


    items: CartItems;
    taxPrice: number;
    itemsPrice: number;
    totalPrice: number;
    isPaid : boolean;
    paidAt : Date;
    isDelivered : boolean;
    deliveredAt : Date;
    address : Address ;
    payment : 'cash' | 'card';
    user: Users

}
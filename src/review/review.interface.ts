
import { Document } from "mongoose";
import { Users } from "../users/users.interface";
import { Products } from "../products/product.interface";
export interface Reviews   extends Document {

    readonly comment : String ;
    readonly rating : number ;
    readonly user : Users ;
    readonly product : Products;

}
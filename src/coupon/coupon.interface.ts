
import { Document } from "mongoose";
export interface Coupons  extends Document {


    readonly discount : number ;
    readonly code : string;
    readonly expireDate : Date;
    
}
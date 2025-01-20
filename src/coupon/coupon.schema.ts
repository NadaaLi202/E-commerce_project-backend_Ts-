import mongoose from "mongoose";
import { Coupons } from "./coupon.interface";



const couponSchema = new mongoose.Schema<Coupons> ({

code : { type : String, required : true, trim : true },

discount : {type: Number},

expireDate : { type : Date }


}, {timestamps : true})





export default mongoose.model<Coupons>('Coupons',couponSchema);
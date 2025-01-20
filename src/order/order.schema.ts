import mongoose from "mongoose";
import { Order } from "./order.interface";



const orderSchema = new mongoose.Schema<Order> ({

items : [{

    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
    quantity: {type: Number, default: 1},
    price: {type: Number}
}],
taxPrice : {type: Number},
itemsPrice : {type: Number},
totalPrice : {type: Number},
isPaid : {type : Boolean , default : false},
paidAt : {type : Date},
isDelivered : {type : Boolean , default : false},
deliveredAt : {type : Date},
user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required : true},
payment : {type : String , trim : true, enum : ['cash', 'card'], default : 'cash'},
address : [{

    street : String,
    city : String,
    state : String,
    country : String,
    zipCode : String
}]

}, {timestamps : true})



orderSchema.pre<Order>(/^find/, function(next) : void {

    this.populate({path : 'product', select : 'name cover'});
    this.populate({path : 'user', select : 'name image'});
    next();
})




export default mongoose.model<Order>('Orders',orderSchema);
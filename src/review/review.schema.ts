import mongoose from "mongoose";
import { Reviews } from "./review.interface";
import productSchema from "../products/product.schema";



const reviewsSchema = new mongoose.Schema<Reviews> ({

comment : { type: String, required : true},
rating : { type : Number , required : true},
user : { type : mongoose.Schema.Types.ObjectId , ref : 'Users', required : true},
product : { type : mongoose.Schema.Types.ObjectId , ref : 'Products', required : true}


}, {timestamps : true}) 

reviewsSchema.statics.calcRating = async function (productId : any)  {

    const results = await this.aggregate([
        {$match : {product : productId}},
        {$group : {_id : '$product', averageRating : {$avg : '$rating'}, ratingQuantity : {$sum : 1}}}

    ])
    console.log (results);

    if(results.length > 0) {
        await productSchema.findByIdAndUpdate( productId , {

            rateAvg : results[0].averageRating,
            rating : results[0].ratingQuantity

        })
    } else {

        await productSchema.findByIdAndUpdate( productId , {rateAvg : 0, rating : 0} )
    }
}
reviewsSchema.post<Reviews>('save', async function()  {

    await (this.constructor as any).calcRating(this.product);

})

reviewsSchema.post<Reviews>('findOneAndDelete', async function(doc: Reviews)  {

    await (this.constructor as any).calcRating(doc.product);
})

reviewsSchema.post<Reviews>('findOneAndUpdate', async function(doc: Reviews)  {

    await (this.constructor as any).calcRating(doc.product);
})



reviewsSchema.pre<Reviews>(/^find/, function(next)  {
    
    this.populate({path : 'user', select : 'name image'});
    next();
})

reviewsSchema.pre<Reviews>(/^find/, function(next) {
     this.populate({path : 'product', select : 'name cover'})
     next();
})



export default mongoose.model<Reviews>('Reviews',reviewsSchema);
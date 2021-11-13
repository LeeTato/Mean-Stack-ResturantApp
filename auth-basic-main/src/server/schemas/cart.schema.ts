import mongoose from 'mongoose';
import type { Cart } from '../../shared/models/cart.model.js';
import { Food } from '../../shared/models/food.model.js';
const {Schema, model} = mongoose

const cartSchema = new Schema<Cart>({
    user:{type: mongoose.Types.ObjectId, ref:'User'},
    items:[{type: mongoose.Types.ObjectId, ref:'Food'}],

    // createdAt?: {type: Date, default: Date.now}
   
});

cartSchema.virtual('total').get(function(this:Cart){
    return this.items.reduce((amount:number, item:Food)=>{
        return item.foodPrice + amount
    }, 0)
})
 cartSchema.set(`toObject`, {virtuals:true});
 cartSchema.set(`toJSON`, {virtuals:true});


export const CartModel = model<Cart>('Cart',cartSchema)


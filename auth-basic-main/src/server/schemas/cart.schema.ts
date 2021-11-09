import mongoose from 'mongoose';
import type { Cart } from '../../shared/models/cart.model';
import type { User } from '../../shared/models/user.model';
const {Schema, model} = mongoose

const cartSchema = new Schema<Cart>({
    user:{type: mongoose.Types.ObjectId, ref:'User'},
    items:[{type: mongoose.Types.ObjectId, ref:'Food'}],
    total:{type:Number,default:0},
    // createdAt?: {type: Date, default: Date.now}
   
});

export const CartModel = model<Cart>('Cart',cartSchema)
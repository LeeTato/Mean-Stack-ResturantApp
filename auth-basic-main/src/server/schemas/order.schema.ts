import mongoose, { Number } from 'mongoose';;
import { Order } from '../../shared/models/order.model.js';
const {Schema, model} = mongoose

const orderSchema = new Schema<Order>({
    user:{type: mongoose.Types.ObjectId, ref:'User'},
   
    items:[{ 
       food:{type: mongoose.Types.ObjectId,ref: 'Food'},
       quantity:Number }],
    })

export const OrderModel = model<Order>('Order',orderSchema)
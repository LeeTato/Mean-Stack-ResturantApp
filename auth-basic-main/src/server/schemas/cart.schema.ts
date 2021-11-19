import mongoose, { Number } from 'mongoose';
import type { Cart } from '../../shared/models/cart.model.js';
import { Food } from '../../shared/models/food.model.js';
const {Schema, model} = mongoose

const cartSchema = new Schema<Cart>({
    user:{type: mongoose.Types.ObjectId, ref:'User'},
   
     items:[{ 
        food:{type: mongoose.Types.ObjectId,ref: 'Food'},
        quantity:Number }],
  
    
 
   
}, {timestamps:true});

cartSchema.virtual("count").get(function (this: Cart) {
    return this.items.reduce((acc, item) =>acc + item.quantity,0 )
  });
  

cartSchema.virtual('totalPrice').get(function(this:Cart){
    return this.items.reduce((amount:number, item:{food: Food, quantity:number})=>{
        return (item.food.foodPrice*item.quantity) + amount
    }, 0)
})
 cartSchema.set(`toObject`, {virtuals:true});
 cartSchema.set(`toJSON`, {virtuals:true});
 
 

export const CartModel = model<Cart>('Cart',cartSchema)


import * as mongoose from 'mongoose';
import { Cart } from './cart.model';
import { Food } from './food.model';
import { User } from './user.model';
export interface Order {
    _id?:{type: mongoose.Types.ObjectId}
    user?:User,
    count?:number, 
    totalPrice?:number,
    items:{food:Food, quantity:number}[]
}
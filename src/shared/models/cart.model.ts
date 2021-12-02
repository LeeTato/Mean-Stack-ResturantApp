import * as mongoose from 'mongoose';
import { Food } from './food.model';
import { User } from './user.model';
export interface Cart {
    _id?:{type: mongoose.Types.ObjectId}
    user?:User,
    count?:number, 
    totalPrice?:number,
    items:{food:Food, quantity:number}[]
    
}
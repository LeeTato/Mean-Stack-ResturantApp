import mongoose from 'mongoose';
import type { Food } from '../../shared/models/food.model.js';
const {Schema, model} = mongoose

const foodSchema = new Schema<Food>({
    foodName: {type: String, required: true},
    img:{type: String, required: true},
    foodPrice:{type: Number, required: true},
    // foodQty:{type: Number, required: true},
});



export const FoodModel = model<Food>('Food',foodSchema)
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const foodSchema = new Schema({
    foodName: { type: String, required: true },
    img: { type: String, required: true },
    foodPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
});
export const FoodModel = model('Food', foodSchema);
//# sourceMappingURL=food.schema.js.map
import mongoose from 'mongoose';
import '../../shared/models/food.model.js';
const { Schema, model } = mongoose;
const cartSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    items: [{
            food: { type: mongoose.Types.ObjectId, ref: 'Food' },
            quantity: Number
        }],
}, { timestamps: true });
cartSchema.virtual("count").get(function () {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
});
cartSchema.virtual('totalPrice').get(function () {
    return this.items.reduce((amount, item) => {
        return (item.food.foodPrice * item.quantity) + amount;
    }, 0);
});
cartSchema.set(`toObject`, { virtuals: true });
cartSchema.set(`toJSON`, { virtuals: true });
export const CartModel = model('Cart', cartSchema);
//# sourceMappingURL=cart.schema.js.map
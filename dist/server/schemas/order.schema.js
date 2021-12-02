import mongoose from 'mongoose';
;
import '../../shared/models/order.model.js';
const { Schema, model } = mongoose;
const orderSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    items: [{
            food: { type: mongoose.Types.ObjectId, ref: 'Food' },
            quantity: Number
        }],
});
export const OrderModel = model('Order', orderSchema);
//# sourceMappingURL=order.schema.js.map
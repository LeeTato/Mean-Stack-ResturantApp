import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
export const UserModel = model('User', userSchema);
//# sourceMappingURL=user.schema.js.map
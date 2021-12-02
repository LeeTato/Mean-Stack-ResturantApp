import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId }
});
export const PostModel = mongoose.model('post', postSchema);
//# sourceMappingURL=post.schema.js.map
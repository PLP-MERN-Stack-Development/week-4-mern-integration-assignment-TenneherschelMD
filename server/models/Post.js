import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    featuredImage: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;

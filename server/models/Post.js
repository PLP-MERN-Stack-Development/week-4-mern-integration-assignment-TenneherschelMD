// models/Post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
    },
    body: {
      type: String,
      required: [true, 'Post body is required'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    featuredImage: {
      type: String,
      default: '', // Will be set if an image is uploaded
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', postSchema);

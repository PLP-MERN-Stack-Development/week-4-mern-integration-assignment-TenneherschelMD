// controllers/postController.js
import Post from '../models/Post.js';

// @desc Get all posts with pagination
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('category')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('❌ Error getting posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create a new post (with optional image)
export const createPost = async (req, res) => {
  try {
    const { title, body, category } = req.body;

    if (!title || !body || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const featuredImage = req.file ? `/uploads/${req.file.filename}` : '';

    const post = new Post({
      title,
      body,
      category,
      featuredImage,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('❌ Error creating post:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc Update post by ID
export const updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete post by ID
export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

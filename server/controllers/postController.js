import Post from '../models/Post.js';

// @desc    Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('category');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a post with image
export const createPost = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : '';

    const post = new Post({
      title,
      body,
      category,
      featuredImage,
    });

    const saved = await post.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a post
export const updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

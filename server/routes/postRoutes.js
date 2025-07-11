// routes/postRoutes.js
import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { upload } from '../middleware/upload.js'; // 🔁 Ensure this file exists

const router = express.Router();

router.get('/', getPosts); // GET all posts (with optional pagination)
router.get('/:id', getPostById); // GET single post by ID
router.post('/', upload.single('image'), createPost); // POST new post with optional image
router.put('/:id', updatePost); // PUT update post by ID
router.delete('/:id', deletePost); // DELETE post by ID

export default router;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/posts', postRoutes);

export default app;

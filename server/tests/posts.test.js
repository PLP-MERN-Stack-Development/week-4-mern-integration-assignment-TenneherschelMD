import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import Category from '../models/Category.js'; // ✅ Ensure path is correct

let categoryId; // will hold valid category ID

beforeAll(async () => {
  // 🟢 Connect to test DB if not already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // 🔁 Clean and seed a test category
  await Category.deleteMany({});
  const category = await Category.create({ name: 'Test Category' });
  categoryId = category._id.toString();
});

afterAll(async () => {
  // 🔁 Clean up after tests
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/posts', () => {
  it('should create a new post', async () => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post',
      category: categoryId,
    };

    const res = await request(app)
      .post('/api/posts')
      .send(newPost)
      .set('Content-Type', 'application/json');

    console.log('POST /api/posts res.body →', res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(newPost.title);
  }, 10000); // ⏱ 10s timeout
});

describe('DELETE /api/posts/:id', () => {
  let postId;

  beforeAll(async () => {
    const res = await request(app).post('/api/posts').send({
      title: 'Post to Delete',
      body: 'This post will be deleted',
      category: categoryId,
    });

    postId = res.body._id;
  });

  it('should delete the post', async () => {
    const res = await request(app).delete(`/api/posts/${postId}`);
    console.log('DELETE /api/posts/:id res.body →', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Post deleted');
  });
});

describe('GET /api/posts', () => {
  it('should return an array of posts', async () => {
    const res = await request(app).get('/api/posts');
    console.log('GET /api/posts res.body →', res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.posts || res.body)).toBe(true);
  });
});


describe('GET /api/posts/:id', () => {
  let postId;

  beforeAll(async () => {
    const res = await request(app).post('/api/posts').send({
      title: 'Post to View',
      body: 'This is a post to view',
      category: categoryId,
    });
    postId = res.body._id;
  });

  it('should return a post by ID', async () => {
    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', postId);
  });
});


describe('PUT /api/posts/:id', () => {
  let postId;

  beforeAll(async () => {
    const res = await request(app).post('/api/posts').send({
      title: 'Old Title',
      body: 'Post before update',
      category: categoryId,
    });
    postId = res.body._id;
  });

  it('should update the post', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });
});


describe('POST /api/posts with missing fields', () => {
  it('should return 400 for missing title', async () => {
    const res = await request(app).post('/api/posts').send({
      body: 'Missing title',
      category: categoryId,
    });
    expect(res.statusCode).toBe(400);
  });
});


describe('GET /api/posts/:id with invalid ID', () => {
  it('should return 500 or 404 for invalid ID', async () => {
    const res = await request(app).get('/api/posts/invalidid123');
    expect([400, 404, 500]).toContain(res.statusCode);
  });
});

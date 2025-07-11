# 📝 MERN Blog Application

> A full-stack blog app built during **PLP Week 4 MERN Assignment**.

This app uses the **MERN Stack**: MongoDB, Express.js, React.js, and Node.js to create, edit, delete, and list blog posts with image uploads and categories.

---

## 🚀 Project Overview

- Users can create posts with titles, body text, featured images, and categories.
- Admins (or editors) can edit or delete posts.
- Categories help group posts.
- Posts are displayed in a user-friendly, responsive interface.

---

## 🛠️ Technologies Used

- **MongoDB + Mongoose**: For storing posts and categories.
- **Express.js**: For backend API.
- **React.js + Vite**: For the frontend UI.
- **Node.js**: Backend runtime.
- **Tailwind CSS**: UI styling.
- **Multer**: File upload middleware for handling images.

---

## ⚙️ Setup Instructions

> ✅ Prerequisites: Node.js v18+, MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd week4-mern-blog

## Backend Set up

cd server
cp .env.example .env
npm install
npm run dev


## Front End Set up
cd ../client
cp .env.example .env
npm install
npm run dev


## Project Structure
week4-mern-blog/
├── client/               # React frontend
│   ├── components/       # CreatePost, PostList, etc.
│   ├── api/              # API service functions
│   ├── App.jsx
│   └── ...
├── server/               # Express backend
│   ├── controllers/      # postController.js, categoryController.js
│   ├── routes/           # postRoutes.js, categoryRoutes.js
│   ├── models/           # Post.js, Category.js
│   ├── middleware/       # upload.js (Multer)
│   └── ...
├── .env.example          # Template environment files
├── README.md             # This file
└── ...

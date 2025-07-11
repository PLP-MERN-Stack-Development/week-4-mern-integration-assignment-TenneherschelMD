import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import Chat from './components/Chat'; // ✅ Import Chat

const App = () => {
  const [editPost, setEditPost] = useState(null);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">My Blog</h1>

        {/* ✅ Navigation */}
        <nav className="mb-6 flex justify-center space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/create" className="text-blue-600 hover:underline">Create Post</Link>
          <Link to="/chat" className="text-blue-600 hover:underline">Chat</Link>
        </nav>

        {/* ✅ Routes */}
        <Routes>
          <Route path="/" element={<PostList setEditPost={setEditPost} />} />
          <Route
            path="/create"
            element={<CreatePost editPost={editPost} setEditPost={setEditPost} />}
          />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

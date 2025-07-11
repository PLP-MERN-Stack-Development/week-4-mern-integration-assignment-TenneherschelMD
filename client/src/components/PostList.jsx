import { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../api/posts';

const PostList = ({ setEditPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      loadPosts();
    }
  };

  const handleEdit = (post) => {
    setEditPost(post);
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 rounded shadow">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt="Featured"
              className="w-full h-48 object-cover rounded mb-2"
            />
          )}
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="text-gray-700">{post.body}</p>
          <p className="text-sm text-gray-500 mt-1">
            Category: {post.category?.name || 'Uncategorized'}
          </p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleEdit(post)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;

import { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = ({ setEditPost }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/posts?page=${page}`);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${id}`);
        fetchPosts(); // Refresh after deletion
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleEdit = (post) => {
    setEditPost(post);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : (
        <>
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded shadow mb-4">
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt="Featured"
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700">{post.body.substring(0, 100)}...</p>
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

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="self-center">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;

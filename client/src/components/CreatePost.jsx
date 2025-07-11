import { useState, useEffect } from 'react';
import { createPost, updatePost } from '../api/posts';
import { fetchCategories } from '../api/categories';

const CreatePost = ({ editPost, setEditPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setBody(editPost.body);
      setCategory(editPost.category?._id || '');
      setPreview(null);
      setImage(null);
    }
  }, [editPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editPost) {
      const data = { title, body, category };
      await updatePost(editPost._id, data);
      setEditPost(null);
    } else {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('category', category);
      if (image) formData.append('image', image);

      await createPost(formData);
    }

    setTitle('');
    setBody('');
    setCategory('');
    setImage(null);
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">
        {editPost ? 'Edit Post' : 'Create Post'}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full mb-2 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Body"
        className="w-full mb-2 p-2 border rounded"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {!editPost && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              if (file) {
                setPreview(URL.createObjectURL(file));
              } else {
                setPreview(null);
              }
            }}
            className="w-full mb-2"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mb-2 h-40 object-cover rounded"
            />
          )}
        </>
      )}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editPost ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default CreatePost;

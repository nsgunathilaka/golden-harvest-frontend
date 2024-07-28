import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/vegetable/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading blog details...</p>
      </div>
    );
  }

  if (!blog) {
    return <p>Blog post not found.</p>;
  }

  return (
    <div className="blog-details">
      <img src={blog.image_url} alt={blog.title} className="blog-image" />
      <h2>{blog.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.description }} />
      <p><strong>Soil:</strong> {blog.soil}</p>
      <p><strong>Water:</strong> {blog.water}</p>
      <p><strong>Weather:</strong> {blog.weather}</p>
    </div>
  );
};

export default BlogDetails;

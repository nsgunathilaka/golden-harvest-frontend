import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = ({ selectedDistrict }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch('http://127.0.0.1:8000/api/api/vegetablecrops/');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };

    fetchBlogs();
  }, [selectedDistrict]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-item" key={blog.id}>
          <img src={blog.image_url} alt={blog.title} className="blog-image" />
          <h3>{blog.title}</h3>
          <div
            className="blog-description"
            dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 100) + '...' }}
          />
          <Link to={`/blog/${blog.id}`} className="show-more-button">
            Show More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

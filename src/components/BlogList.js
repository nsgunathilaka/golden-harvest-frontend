import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = ({ selectedDistrict }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null); // Reset the error state
      try {
        var url;
        if(selectedDistrict) {
            url = 'http://127.0.0.1:8000/api/api/district-data/' + selectedDistrict + '/'
        }  else {
            url = 'http://127.0.0.1:8000/api/api/vegetablecrops/'
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
        setError(error.message); // Update the error state
      } finally {
        setLoading(false);
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

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there is an error
  }

  return (
    <div className="blog-list">
      {blogs.length === 0 ? (
        <div className="no-blogs-banner">
          <h2>No Blogs Found</h2>
          <p>Sorry, there are no blogs available for the selected district.</p>
        </div>
      ) : (
        blogs.map((blog) => (
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
        ))
      )}
    </div>
  );
};

export default BlogList;

import React from 'react';
import './BlogDetails.css';

const BlogDetails = ({ blog }) => {
  if (!blog) {
    return <p>No blog data available.</p>;
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

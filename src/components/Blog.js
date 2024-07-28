import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <img src={blog.image_url} alt={blog.title} />
      <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
      <div dangerouslySetInnerHTML={{ __html: blog.soil }}></div>
      <div dangerouslySetInnerHTML={{ __html: blog.weather }}></div>
      <div dangerouslySetInnerHTML={{ __html: blog.water }}></div>
      <p><strong>Status:</strong> {blog.status === 1 ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

export default Blog;

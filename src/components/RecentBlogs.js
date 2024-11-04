import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecentBlogs.css';

const RecentBlogs = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = 'http://34.225.2.83:8000/api/api/recent-blogs/';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecentBlogs(data.recent_blogs || []);
      } catch (error) {
        console.error('Error fetching recent blogs:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

  if (loading) {
    return <div>Loading recent blogs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recent-blogs">
      <h3 className="recent-blogs-title">Recent Blogs</h3>
      <ul className="recent-blogs-list">
        {recentBlogs.map((blog) => (
          <li key={blog.id} className="recent-blog-item">
            <Link to={`/blog/${blog.id}`} className="recent-blog-link">
              <img src={blog.thumbnail_url} alt={blog.title} className="recent-blog-image" />
              <div className="recent-blog-info">
                <h4>{blog.title}</h4>
                <p>{blog.created_at}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentBlogs;

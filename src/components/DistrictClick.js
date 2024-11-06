import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BlogDetails from './BlogDetails';

const BlogPage = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [blogData, setBlogData] = useState(null);

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    const url = 'http://34.225.2.83:8000/api/api/district-data/' +districtId + '/'
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API response:', data);
        setBlogData(data); // Update the blog data here
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="blog-page">
      <Sidebar selectedDistrict={selectedDistrict} setSelectedDistrict={handleDistrictChange} />
      {selectedDistrict && blogData && (
        <BlogDetails blog={blogData} />
      )}
    </div>
  );
};

export default BlogPage;

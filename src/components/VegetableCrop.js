import React, { useEffect, useState } from 'react';
import './BlogList.css';
import { Link } from 'react-router-dom';

const VegetableCrop = () => {
  const [vegetableCrops, setVegetableCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVegetableCrops = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = 'http://34.225.2.83:8000/api/api/get-all-crop/';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVegetableCrops(data.vegetable_crops || []);
      } catch (error) {
        console.error('Error fetching vegetable crops:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVegetableCrops();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading vegetable crops...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="vegetable-crop-page">
      <h2 className="section-title text-center">Vegetable Crop Information</h2>
      {vegetableCrops.length === 0 ? (
        <div className="no-crops-banner">
          <h2>No Vegetable Crops Found</h2>
          <p>Sorry, there are no vegetable crops available at the moment.</p>
        </div>
      ) : (
        <div className="grid-container">
          {vegetableCrops.map((crop) => (
            <div className="grid-item" key={crop.id}>
              <img src={crop.image_url} alt={crop.title} className="blog-image" />
              <h3>{crop.title}</h3>
              <p className="created-date-str">Posted on {crop.created_at}</p>
              {/* Render centers */}
              <div className="flex gap-2">
                {(crop.centers && Object.values(crop.centers) || []).map((center, index) => (
                  <div className="relative grid select-none items-center whitespace-nowrap rounded-full bg-gray-400 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white" key={index}>
                    <span>{center.center}</span>
                  </div>
                ))}
              </div>


              <Link to={`/blog/${crop.id}/vegetable`}
                className="read-more-btn text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VegetableCrop;

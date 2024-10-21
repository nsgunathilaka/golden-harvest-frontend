import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = ({ selectedDistrict, selectedCenter, setSelectedBlog }) => {
  const [vegetableCrops, setVegetableCrops] = useState([]);
  const [fruitCrops, setFruitCrops] = useState([]);
  const [paddyCrops, setPaddyCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCropDetails, setSelectedCropDetails] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      setLoading(true);
      setError(null);
      try {
        let url;
        if (selectedCenter) {
          url = `http://127.0.0.1:8000/api/api/get-centers-crop/${selectedCenter}/`;
        } else if (selectedDistrict) {
          url = `http://127.0.0.1:8000/api/api/district-data/${selectedDistrict}/`;
        } else {
          url = 'http://127.0.0.1:8000/api/api/get-all-crop/';
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVegetableCrops(data.vegetable_crops || []);
        setFruitCrops(data.fruit_crops || []);
        setPaddyCrops(data.paddy_crops || []);
      } catch (error) {
        console.error('Error fetching crops:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [selectedDistrict, selectedCenter]);

  const handleShowMore = async (cropId, environment) => {
    try {
      var url = 'http://18.234.244.113:8000/api/api/crop-details/'+cropId+'/'+environment+'/'
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cropDetails = await response.json();
      setSelectedCropDetails(cropDetails[0]);
    } catch (error) {
      console.error('Error fetching crop details:', error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading crops...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="blog-list">
      {vegetableCrops.length === 0 && fruitCrops.length === 0 && paddyCrops.length === 0 && (
        <div className="no-blogs-banner">
          <h2>No Crops Found</h2>
          <p>Sorry, there are no crops available for the selected filters.</p>
        </div>
      )}

      <div className="section">
        <h2 className="section-title text-center">Vegetable Crops Information</h2>
        <div className="grid-container">
          {vegetableCrops.map(crop => (
            <div className="grid-item" key={crop.id}>
              <img src={crop.image_url} alt={crop.title} className="blog-image" />
              <h3>{crop.title}</h3>
              <p className="created-date-str">Posted on {crop.created_at}</p>
              <div class="flex gap-2">
                {(Object.values(crop.centers) || []).map((center, index) => (
                  <div class="relative grid select-none items-center whitespace-nowrap rounded-full bg-gray-400 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
                    <span class="">{center.center}</span>
                  </div>
                ))}
              </div>
              <div className="blog-description" dangerouslySetInnerHTML={{ __html: crop.description.slice(0, 100) + '...' }} />
              <Link to={`/blog/${crop.id}/vegetable`} className="read-more-btn text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title text-center">Fruit Crops Information</h2>
        <div className="grid-container">
          {fruitCrops.map(crop => (
            <div className="grid-item" key={crop.id}>
              <img src={crop.image_url} alt={crop.title} className="blog-image" />
              <h3>{crop.title}</h3>
              <p className="created-date-str">Posted on {crop.created_at}</p>
              <div className="flex gap-2">
                {(crop.centers && Object.values(crop.centers) || []).map((center, index) => (
                  <div className="relative grid select-none items-center whitespace-nowrap rounded-full bg-gray-400 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white" key={index}>
                    <span>{center.center}</span>
                  </div>
                ))}
              </div>
              <div
                className="blog-description"
                dangerouslySetInnerHTML={{
                  __html: (crop.description || '').slice(0, 100) + '...'
                }}
              />
              <Link
                to={`/blog/${crop.id}/fruit`}
                className="read-more-btn text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title text-center">Paddy Crops Information</h2>
        <div className="grid-container">
          {paddyCrops.map(crop => (
            <div className="grid-item" key={crop.id}>
              <img src={crop.image_url} alt={crop.title} className="blog-image" />
              <h3>{crop.title}</h3>
              <p className="created-date-str">Posted on {crop.created_at}</p>
              <div className="flex gap-2">
                {(crop.centers && Object.values(crop.centers) || []).map((center, index) => (
                  <div className="relative grid select-none items-center whitespace-nowrap rounded-full bg-gray-400 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white" key={index}>
                    <span>{center.center}</span>
                  </div>
                ))}
              </div>
              <div
                className="blog-description"
                dangerouslySetInnerHTML={{
                  __html: (crop.description || '').slice(0, 100) + '...'
                }}
              />
              <Link
                to={`/blog/${crop.id}/paddy`}
                className="read-more-btn text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;

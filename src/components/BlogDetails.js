import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id, type } = useParams(); // Extract id and type from URL parameters
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCropDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        var url = 'http://18.234.244.113:8000/api/api/crop-details/'+id+'/'+type+'/'
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCropDetails(data[0]); // Assuming the API returns an array with one element
      } catch (error) {
        console.error('Error fetching crop details:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [id, type]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading details...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="crop-details">
      {cropDetails ? (
        <>
          <h1>{cropDetails.title}</h1>
          <div className="banner-image-div">
            <img src={cropDetails.image_url} alt={cropDetails.title} />
          </div>
          <div className="crop-description mb-10" dangerouslySetInnerHTML={{ __html: cropDetails.description }} />

          <h2 className="section-title">Soil Information</h2>
          {cropDetails.soil ? (
            <>
              <div className="soil-info mb-5 mt-5" dangerouslySetInnerHTML={{ __html: cropDetails.soil }} />
            </>
          ) : (
            <div className="no-crop-data">
                <p>Soil information is not added for this crop.</p>
            </div>
          )}

          <h2 className="section-title">Water Information</h2>
          {cropDetails.water ? (
            <>

              <div className="soil-info mb-5 mt-5" dangerouslySetInnerHTML={{ __html: cropDetails.water }} />
            </>
          ) : (
            <div className="no-crop-data">
                <p>Water information is not added for this crop.</p>
            </div>
          )}

          <h2 className="section-title">Weather Information</h2>
          {cropDetails.weather ? (
            <>

              <div className="soil-info mb-5 mt-5" dangerouslySetInnerHTML={{ __html: cropDetails.weather }} />
            </>
          ) : (
            <div className="no-crop-data">
                <p>Weather information is not added for this crop.</p>
            </div>
          )}
        </>
      ) : (
        <div>No details found.</div>
      )}
    </div>
  );
};

export default BlogDetails;

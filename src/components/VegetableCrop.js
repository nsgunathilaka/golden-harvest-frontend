import React, { useEffect, useState } from 'react';
import './BlogList.css';
import { Link } from 'react-router-dom';

const VegetableCrop = () => {
  const [vegetableCrops, setVegetableCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [districtData, setDistrictData] = useState(null);

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

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch('http://34.225.2.83:8000/api/api/districtlist/');
        const data = await response.json();
        console.log('Districts:', data);
        setDistricts(data || []);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();
  }, []);

  useEffect(() => {
    // When a district is selected, fetch district-specific data
    if (selectedDistrict) {
      const fetchDistrictData = async () => {
        try {
          let  url = `http://34.225.2.83:8000/api/api/district-data/${selectedDistrict}/vege-crop/`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setDistrictData(data); // Store the district-specific data
        } catch (error) {
          console.error('Error fetching district data:', error.message);
        }
      };

      fetchDistrictData();
    } else {
      setDistrictData(null); // Reset if no district is selected
    }
  }, [selectedDistrict]);

  useEffect(() => {
    // When a district is selected, update the service centers
    const district = districts.find(d => d.id === selectedDistrict);
    if (district) {
      setServiceCenters(district.center_list || []);
      setSelectedCenter(''); // Reset selected center when district changes
    } else {
      setServiceCenters([]); // Reset if district not found
    }
  }, [selectedDistrict, districts]);

  useEffect(() => {
    // When a service center is selected, fetch related crop data
    if (selectedCenter) {
      const fetchCenterCropData = async () => {
        try {
          let  url = `http://34.225.2.83:8000/api/get-centers-crop/${selectedCenter}/vege-crop/`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Center Crop Data:', data); // Process this data as needed
        } catch (error) {
          console.error('Error fetching center crop data:', error.message);
        }
      };

      fetchCenterCropData();
    }
  }, [selectedCenter]);

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
      <div className="dropdown-container">
        <select
          id="district-select"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">-- Select District --</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>{district.district}</option>
          ))}
        </select>
        <select
          id="center-select"
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
          disabled={!selectedDistrict} // Disable if no district is selected
        >
          <option value="">-- Select Service Center --</option>
          {serviceCenters.length > 0 ? (
            serviceCenters.map((center, index) => (
              <option key={index} value={center.name}>{center.name}</option>
            ))
          ) : (
            <option disabled>No service centers available</option>
          )}
        </select>
      </div>

      <h2 className="section-title text-center">Vegetable Crop Information</h2>
      {vegetableCrops.length === 0 ? (
        <div className="no-crops-banner">
          <h2>No Vegetable Crops Found</h2>
          <p>Sorry, there are no vegetable crops available at the moment.</p>
        </div>
      ) : (
        <div className="grid-container">
          {vegetableCrops.map((crop) => (
            <Link to={`/blog/${crop.id}/vegetable`} key={crop.id}>
              <div className="grid-item">
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VegetableCrop;

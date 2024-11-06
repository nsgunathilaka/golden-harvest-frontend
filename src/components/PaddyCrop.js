import React, { useEffect, useState } from 'react';
import './BlogList.css';
import { Link } from 'react-router-dom';

const PaddyCrop = () => {
  const [paddyCrops, setPaddyCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [crops, setCrops] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [districtData, setDistrictData] = useState(null);

  // Fetch all paddy crops initially
  useEffect(() => {
    const fetchPaddyCrops = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = 'http://34.225.2.83:8000/api/api/get-all-crop/';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPaddyCrops(data.paddy_crops || []);
      } catch (error) {
        console.error('Error fetching paddy crops:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaddyCrops();
  }, []);

  // Fetch districts on load
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch('http://34.225.2.83:8000/api/api/districtlist/');
        const data = await response.json();
        setDistricts(data || []);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();
  }, []);

  // Fetch district-specific data when a district is selected
  useEffect(() => {
    if (selectedDistrict) {
      const fetchDistrictData = async () => {
        setLoading(true);
        try {
          const url = `http://34.225.2.83:8000/api/api/district-data/${selectedDistrict}/paddy-crop/`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.crop_datas_list && data.crop_datas_list.length === 0) {
            // Reset the grid if no crops are found
            setPaddyCrops([]);  // Clear crops when no data is returned
          } else {
            setPaddyCrops(data.crop_datas_list || []); // Set crops data
          }
          setDistrictData(data); // Store the district-specific data
        } catch (error) {
          console.error('Error fetching district data:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchDistrictData();
    } else {
      setDistrictData(null); // Reset if no district is selected
      setPaddyCrops([]); // Clear the crops if no district is selected
    }
  }, [selectedDistrict]);

  // Update service centers based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(d => d.id === selectedDistrict);
      if (district) {
        setServiceCenters(district.center_list || []);
        setSelectedCenter(''); // Reset selected center when district changes
      }
    }
  }, [selectedDistrict, districts]);

  // Fetch crop data based on selected service center
  useEffect(() => {
    if (selectedCenter) {
      const fetchCenterCropData = async () => {
        setLoading(true);
        try {
          const url = `http://34.225.2.83:8000/api/api/get-centers-crop/${selectedCenter}/paddy-crop`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setPaddyCrops(data.crop_datas_list || []); // Update crops with service center data
        } catch (error) {
          console.error('Error fetching center crop data:', error.message);
          setPaddyCrops([]); // Clear crops on error
        } finally {
          setLoading(false);
        }
      };

      fetchCenterCropData();
    }
  }, [selectedCenter]);

  // Loading state
  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading paddy crops...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="vegetable-crop-page">
      <div className="dropdown-container">
        {/* District Select */}
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

        {/* Service Center Select */}
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

      <h2 className="section-title text-center">Paddy Crop Information</h2>
      {paddyCrops.length === 0 ? (
        <div className="no-crops-banner">
          <h2>No Paddy Crops Found</h2>
          <p>Sorry, there are no paddy crops available at the moment.</p>
        </div>
      ) : (
        <div className="grid-container">
          {paddyCrops.map((crop) => (
            <Link to={`/blog/${crop.id}/paddy`} key={crop.id}>
              <div className="grid-item">
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaddyCrop;

import React, { useEffect, useState, useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ selectedDistrict, setSelectedDistrict, selectedCenter, setSelectedCenter }) => {
  const [districts, setDistricts] = useState([]);
  const [centerData, setCenterData] = useState([]); // State for center data
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading
  const contentRef = useRef(null);

  // Fetching districts on component mount
  useEffect(() => {
    const fetchDistricts = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset the error state
      try {
        const response = await fetch('http://34.225.2.83:8000/api/api/districtlist/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error('Error fetching districts:', error);
        setError(error.toString());
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDistricts();
  }, []);

  // Fetching center data when a district is selected
  useEffect(() => {
    const fetchCenterData = async () => {
      if (selectedDistrict) {
        setLoading(true);
        setError(null);
        try {
          let  url = `http://34.225.2.83:8000/api/api/district-data/${selectedDistrict}/`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCenterData(data.center_list); // Assuming the API returns center_list
        } catch (error) {
          console.error('Error fetching center data:', error);
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCenterData();
  }, [selectedDistrict]); // Dependency array

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedCenter(null);
  };

  const handleCenterChange = async (centerName) => {
    setSelectedCenter(centerName);
    // Fetching data related to the selected center
    try {
      let  url = `http://34.225.2.83:8000/api/api/district-data/${centerName}/`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Do something with the center data
    } catch (error) {
      console.error('Error fetching center data:', error);
    }
  };

  if (loading) {
    return <div className="loader">Loading districts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  <div className="sidebar">
    <h2 onClick={toggleExpand} className="expandable-header">
      Districts {isExpanded ? '▲' : '▼'}
    </h2>
    <div
      className="expandable-content"
      ref={contentRef}
      style={{
        maxHeight: isExpanded ? (contentRef.current ? `${contentRef.current.scrollHeight}px` : 'auto') : '0px',
        overflow: 'hidden',
      }}
    >
      <form>
        {Array.isArray(districts) && districts.length > 0 ? (
          districts.map(district => (
            <div key={district.id}>
              <input
                type="radio"
                id={district.id}
                name="district"
                value={district.id}
                checked={selectedDistrict === district.id}
                onChange={() => handleDistrictChange(district.id)}
              />
              <label htmlFor={district.id}>{district.district}</label>

              {selectedDistrict === district.id && Array.isArray(centerData) && centerData.length > 0 && (
                <div className="center-list">
                  {centerData.map(center => (
                    <div key={center.name}>
                      <input
                        type="radio"
                        id={center.name}
                        name="center"
                        value={center.name}
                        checked={center.name === selectedCenter}
                        onChange={() => handleCenterChange(center.name)}
                      />
                      <label htmlFor={center.name}>{center.name}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No districts available.</div>
        )}
      </form>
    </div>
  </div>
);


};

export default Sidebar;

import React, { useEffect, useState, useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ selectedDistrict, setSelectedDistrict, selectedCenter, setSelectedCenter }) => {
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset the error state
      try {
        const response = await fetch('http://127.0.0.1:8000/api/api/districtlist/');
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedCenter(null); // Reset center selection when changing district
  };

  const handleCenterChange = (centerName) => {
    setSelectedCenter(centerName);
  };

  if (loading) {
    return <div className="loader">Loading districts...</div>; // Loader while fetching districts
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getCentersForDistrict = (districtId) => {
    const district = districts.find(d => d.id === districtId);
    return district ? district.center_list : [];
  };

  return (
    <div className="sidebar">
      <h2 onClick={toggleExpand} className="expandable-header">
        Districts {isExpanded ? '▲' : '▼'}
      </h2>
      <div
        className="expandable-content"
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? `${contentRef.current.scrollHeight}px` : '0px',
        }}
      >
        <form>
          {districts.map(district => (
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

              {selectedDistrict === district.id && district.center_list.length > 0 && (
                <div className="center-list">
                  {district.center_list.map(center => (
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
          ))}
        </form>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState, useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ selectedDistrict, setSelectedDistrict }) => {
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/api/districtlist/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setDistricts(data))
      .catch(error => {
        console.error('Error fetching districts:', error);
        setError(error.toString());
      });
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    fetch(`http://127.0.0.1:8000/api/api/district-data/${districtId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API response:', data);
        // Handle the data from the API response here
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

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
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default Sidebar;

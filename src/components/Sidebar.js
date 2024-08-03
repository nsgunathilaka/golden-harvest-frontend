import React, { useEffect, useState, useRef } from 'react';
import './Sidebar.css';

const Sidebar = ({ selectedDistrict, setSelectedDistrict }) => {
  const [districts, setDistricts] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null); // New state for selected center
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [blogs, setBlogs] = useState([]);

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
    setSelectedCenter(null);
  };

  const handleCenterChange = (centerName) => {
    setSelectedCenter(centerName);
    var url = 'http://127.0.0.1:8000/api/api/get-centers-crop/'+centerName+'/'
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Center data:', data);
        setBlogs(data);
      })
      .catch(error => {
        console.error('Error fetching center data:', error);
        setError(error.toString());
      });
  };

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
                        checked={selectedCenter === center.name}
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

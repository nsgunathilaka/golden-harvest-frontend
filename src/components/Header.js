import React, { useState, useEffect } from 'react';
import './Header.css';
import { fetchNotifications } from '../services/notificationService';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Function to update notification count
    const updateNotificationCount = async () => {
      const data = await fetchNotifications();
      setNotificationCount(data.count);
      setNotifications(data.messages || []);
    };

    // Fetch notifications initially
    updateNotificationCount();

    // Set up interval to fetch notifications every minute (60000 milliseconds)
    const intervalId = setInterval(updateNotificationCount, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleEnvelopeClick = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="App-header">
      <h1>Golden Harvest</h1>
      <div className="message-box" onClick={handleEnvelopeClick}>
        <i className="fa-solid fa-envelope"></i>
        <div className="count">
          <span>{notificationCount}</span>
        </div>
        {showModal && (
          <div className="modal">
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            {notifications.length > 0 ? (
              <ul className="message-list">
                {notifications.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            ) : (
              <p>No new messages.</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

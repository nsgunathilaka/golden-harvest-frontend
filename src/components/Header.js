import React, { useState, useEffect } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { fetchNotifications } from '../services/notificationService';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const updateNotificationCount = async () => {
      const data = await fetchNotifications();
      setNotificationCount(data.count || 0);
      setNotifications(data.notifications || []);
    };

    updateNotificationCount();
    const intervalId = setInterval(updateNotificationCount, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleEnvelopeClick = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleClosePopup = () => {
    setSelectedNotification(null);
  };

  return (
    <header className="App-header">
      {/* Logo added to the left side */}
      <div className="logo-container">
        <img
          src="https://golden-harvest-s3.s3.amazonaws.com/logo/golden_harvest_logo.webp"
          alt="Golden Harvest Logo"
          className="logo"
        />
      </div>

      <h1>Golden Harvest</h1>



      <nav className="nav-menu">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vegetable-crop"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Vegetable Crop Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/paddy-crop"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Paddy Crop Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fruit-crop"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Fruit Crop Info
              </NavLink>
            </li>
          </ul>
        </nav>

      <div className="message-box" onClick={handleEnvelopeClick}>
        <i className="fa-solid fa-envelope"></i>
        <div className="count">
          <span>{notificationCount}</span>
        </div>
        {showModal && (
          <div className="modal">
            <button className="close-button" onClick={handleCloseModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            {notifications.length > 0 ? (
              <ul className="message-list">
                {notifications.map((notification, index) => (
                  <li key={index} onClick={() => handleNotificationClick(notification)}>
                    <strong>{notification.title}</strong>
                    <p>{notification.description}</p>
                    <small>{notification.created_at}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new messages.</p>
            )}
          </div>
        )}
      </div>

      {/* Popup for displaying the selected notification */}
      {selectedNotification && (
        <div className="notification-popup">
          <div className="popup-content">
            <button className="close-popup" onClick={handleClosePopup}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2>{selectedNotification.title}</h2>
            <div className="flex gap-2">
              <div
                className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-blue-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
              >
                <span>{selectedNotification.district}</span>
              </div>
              {selectedNotification.service_centers && (
                <div className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-green-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
                  <span>{selectedNotification.service_centers}</span>
                </div>
              )}
            </div>
            <p>{selectedNotification.description}</p>
            <small>Posted on: {selectedNotification.created_at}</small>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

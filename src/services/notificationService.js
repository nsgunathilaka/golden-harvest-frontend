// src/services/notificationService.js
const API_URL = 'http://34.225.2.83:8000/api/api/get_notification_data/'; // Replace with your API URL

export const fetchNotifications = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    return { count: 0 };
  }
};

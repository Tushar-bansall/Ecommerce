import React from 'react'
import { useDriverAuthStore } from '../store/driverauthStore';


const DriverHomePage = () => {
  
  const {updateLocation} = useDriverAuthStore()
  
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateLocation({latitude:latitude, longitude:longitude});
      },
      (error) => {
        console.error('Error getting location: ', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

const trackLocation = () => {
  setInterval(() => {
    getLocation();
  }, 5000); // Checks location every 5 seconds (adjust as needed)
};

// Start tracking location
trackLocation();
  return (
    <div>DriverHomePage</div>
  )
}

export default DriverHomePage
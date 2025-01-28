import React from 'react'
import { useDriverAuthStore } from '../store/driverauthStore';


const DriverHomePage = () => {
  
  const {updateLocation} = useDriverAuthStore()
  
const GetCurrentLocation = () => {
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

    useEffect(() => {
      GetCurrentLocation(); // Get initial location
      const locationInterval = setInterval(GetCurrentLocation, 5000); // Update location every 5 seconds
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(locationInterval);
    }, []);
  
  return (
    <div>DriverHomePage</div>
  )
}

export default DriverHomePage
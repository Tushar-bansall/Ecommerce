import React, { useState } from 'react'
import { useDriverAuthStore } from '../store/driverauthStore';
import DriverMap from '../Components/drivermap';


const DriverHomePage = () => {
  
  const {updateLocation} = useDriverAuthStore()
  const [location,setLocation] =useState(null)
  const [pickuptime,setpickuptime] =useState(0)
  const [droptime,setdroptime] =useState(0)
  const [rideStart,setRideStart] =useState(null)
  const [rideConfirm,setRideConfirm] =useState(null)
  const [route,setRoute] =useState(null)
  
const GetCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(position.coords)
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
      (rideConfirm && location && pickupcoordinates) && getPickupRoute()
      (rideStart && location && destinationcoordinatescoordinates)  && getDropRoute()
      const locationInterval = setInterval(GetCurrentLocation, 5000); // Update location every 5 seconds
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(locationInterval);
    }, []);

    
      const getPickupRoute = async () => {
        const resp = await axiosInstance.put("/api/ride/route",{
          pickupcoordinates: location,
          destinationcoordinates: pickupcoordinates
        })
        if(resp.data.properties.time<60) {
          setRideConfirm(false)
          setRideStart(true)
        }
    
        setpickuptime(resp.data.properties.time)
        setRoute(resp.data.geometry.coordinates[0])
      }
    
      const getDropRoute = async () => {
        const resp = await axiosInstance.put("/api/ride/route",{
          pickupcoordinates: location,
          destinationcoordinates: destinationcoordinates
        })
        if(resp.data.properties.time<60) 
        {
          setRideStart(false)
        }
    
        setdroptime(resp.data.properties.time)
        setRoute(resp.data.geometry.coordinates[0])
      }
    
  
  return (
    <div>
      <DriverMap location={location}  route={route} pickupcoordinates={pickupcoordinates} destinationcoordinates={destinationcoordinates}/>
      {(rideConfirm||rideStart) && <RideTrack pickup={pickup} rideStart={rideStart} destination={destination} driverId={driver} droptime={droptime} pickuptime={pickuptime}/>}

    </div>
  )
}

export default DriverHomePage
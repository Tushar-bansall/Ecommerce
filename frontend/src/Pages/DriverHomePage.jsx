import React, { useState, useEffect } from 'react'
import { useDriverAuthStore } from '../store/driverauthStore';
const LazyComponent = React.lazy(() => import('../Components/drivermap'));
import NewRide from '../Components/newRide';
import DriverRideTrack from '../Components/DriverRideTrack';


const DriverHomePage = () => {
  
  const {authDriver,updateLocation,subscribeToRides,unsubscribeFromRides,currentRide,setCurrentRide,newRides} = useDriverAuthStore()
  const [location,setLocation] =useState(null)
  const pickupcoordinates= currentRide?.pickupcoordinates
  const destinationcoordinates= currentRide?.destinationcoordinates
  const [pickuptime,setpickuptime] =useState(0)
  const [droptime,setdroptime] =useState(0)
  const [rideStart,setRideStart] =useState(null)
  const [rideConfirm,setRideConfirm] =useState(null)
  const [route,setRoute] =useState(null)
  
  useEffect(()=>{
    subscribeToRides()
    return () => {unsubscribeFromRides()}
  },[subscribeToRides,unsubscribeFromRides])

  
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
      (rideStart && location && destinationcoordinates)  && getDropRoute()
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
          setCurrentRide(null)
        }
    
        setdroptime(resp.data.properties.time)
        setRoute(resp.data.geometry.coordinates[0])
      }
    
  
  return (
    <div className='flex flex-col md:flex-row '>
      <div className='relative scroll-smooth h-[calc(72vh)] md:h-[calc(86vh)] w-screen'>
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyComponent location={location} type={authDriver.vehicleType} route={route} pickupcoordinates={pickupcoordinates} destinationcoordinates={destinationcoordinates}  rideConfirm={rideConfirm} rideStart={rideStart}/>
        </React.Suspense>
      </div>
      {(!currentRide && Array.isArray(newRides) && newRides.length > 0) && 
      <div className="rounded-box bg-base-200/40 w-[calc(90vw)] mx-auto md:w-[calc(40vw)] p-2 mb-14 md:mb-0 relative top-2/3 md:static">
        {newRides.map((ride,index)=>(<NewRide key={index} ride={ride} index={index} />))}
      </div>}
      {(currentRide) && <DriverRideTrack pickup={pickup} rideStart={rideStart} destination={destination} userId={currentRide.user} droptime={droptime} pickuptime={pickuptime}/>}

    </div>
  )
}

export default DriverHomePage
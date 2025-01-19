import React, { useEffect, useState,useRef } from 'react';
import { useRideStore } from '../store/rideauthStore';
import Map from '../Components/map';
import RateList from '../Components/RateList';
import { axiosInstance } from "../lib/axios";


const HomePage = () => {

  const { location,setLocation, getDrivers, addMarkers,bookRide, selectDriver } = useRideStore();
  const [pickup, setPickup] = useState();
  const [destination, setDestination] = useState();
  const [destinationcoordinates, setdestinationcoordinates] = useState(null);
  const [pickupcoordinates, setpickupcoordinates] = useState(location);
  const [pickupDropdown, setpickupDropdown] = useState(null);
  const [destinationDropdown, setdestinationDropdown] = useState(null);
  const [route, setRoute] = useState(null);
  const [distTime,setdistTime] = useState(null)
  const [selectedVehicle,setSelectedVehicle] = useState(null)
  const mapRef = useRef();

  useEffect(()=>
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    }),[])

  const handlePickup = async (e) => {
    setPickup(e.target.value);
    
    const res = await axiosInstance.put("/api/ride/pickup",{
      pickup : e.target.value
    })
        setpickupDropdown(res.data);
      
  };

  const handleDestination = async (e) => {
    setDestination(e.target.value);
    const res = await axiosInstance.put("/api/ride/destination",{
      Destination : e.target.value
    })
        setdestinationDropdown(res.data);
  };

  const handleRoute = async () => {
    if (pickupcoordinates && destinationcoordinates) {
      const res = await axiosInstance.put("/api/ride/route",{
        pickupcoordinates: pickupcoordinates,
        destinationcoordinates: destinationcoordinates
      })
        setdistTime({
          distance:res.data.properties.distance,
          time:res.data.properties.time
        })
        setRoute(res.data.geometry.coordinates[0])
      
    }
  };


  const handleBooking = (e) => {
    e.preventDefault()
    const driver = selectDriver(selectedVehicle.vehicle)
    let imageUrl
    html2canvas(mapRef.current).then((canvas) =>{
      imageUrl = canvas.toDataURL('image/png')});
    if(driver)
      {bookRide({
        pickup: pickup,
        destination: destination,
        vehicle : selectedVehicle.vehicle,
        fare : selectedVehicle.fare,
        driverId: driver._id,
        image: imageUrl
      })
    }
    else {
      console.log("Not available");
      setSelectedVehicle(null)
    }
  }

  
  useEffect(() => {
    getDrivers();
  }, [getDrivers,location]);

  // Trigger route calculation only when destinationcoordinates or pickupcoordinates change
  useEffect(() => {
    if (pickupcoordinates && destinationcoordinates) {
      handleRoute();
    }
  }, [pickupcoordinates, destinationcoordinates]);

  return (
    <div className='flex flex-col md:flex-row'>
    <div className='relative h-[calc(86vh)]  w-screen'>
      <Map mapRef={mapRef} route={route} pickupcoordinates={pickupcoordinates} destinationcoordinates={destinationcoordinates}/>
      {!selectedVehicle && <form className='relative z-10 text-white text-lg font-bold flex flex-col text-center items-center justify-center gap-[calc(70vh)]'>
        <div className='dropdown dropdown-bottom'>
          <label className='flex items-center gap-4 h-12 md:h-18 bg-gray-900 p-1.5 md:p-3 w-fit'>
            <span className='label-text font-bold text-base md:text-lg text-emerald-400'>Pickup</span>
            <input
              type='text'
              className='h-full text-sm md:text-lg cursor-text'
              tabIndex={0}
              role='button'
              value={pickup}
              onChange={handlePickup}
            />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu text-base md:text-lg bg-gray-400 rounded-box z-20 p-2 md:p-3 shadow gap-1.5 cursor-pointer'
          >
            {pickupDropdown &&
              pickupDropdown.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setPickup(item.address_line1 + "," + item.address_line2);
                    setLocation({ latitude: item.lat, longitude: item.lon });
                    addMarkers([item.lat, item.lon]);
                    setpickupcoordinates({ latitude: item.lat, longitude: item.lon });
                  }}
                >
                  {item.address_line1},
                  {item.address_line2}
                </li>
              ))}
          </ul>
        </div>
        <div className='dropdown dropdown-top'>
          <label className='flex items-center gap-4 h-12 md:h-18 bg-gray-900 p-1.5 md:p-3 w-fit'>
            <span className='label-text font-bold text-base md:text-lg text-red-400'>Destination</span>
            <input
              type='text'
              className='h-full text-sm md:text-lg cursor-text'
              tabIndex={1}
              role='button'
              value={destination}
              onChange={handleDestination}
            />
          </label>
          <ul
            tabIndex={1}
            className='dropdown-content menu text-base md:text-lg bg-gray-400 rounded-box z-20 p-2 md:p-3 shadow gap-1.5 cursor-pointer'
          >
            {destinationDropdown &&
              destinationDropdown.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setDestination(item.address_line1 + "," + item.address_line2);
                    addMarkers([item.lat, item.lon]);
                    setdestinationcoordinates({ latitude: item.lat, longitude: item.lon });
                  }}
                >
                  {item.address_line1},{item.address_line2}
                </li>
              ))}
          </ul>
        </div>
      </form>}
    </div>
    {route && (selectedVehicle 
      ? 
        <form onSubmit={handleBooking} className='rounded-box bg-zinc-900 w-full md:w-[calc(40vw)] p-6 flex flex-col gap-7'>
          <label className="input input-bor
          dered flex items-center gap-3 text-emerald-400">
            Pickup
            <input type="text" className="disabled:" value={pickup} />
          </label>
          <label className="input input-bordered flex items-center gap-3 text-red-400">
            Destination
            <input type="text" className="disabled:" value={destination} />
          </label>
          <label className="input input-bordered flex items-center gap-3">
            Vehicle
            <input type="text" className="disabled:" value={selectedVehicle.vehicle} />
          </label>
          <label className="input input-bordered flex items-center gap-3">
            Fare
            <input type="text" className="disabled:" value={`₹ ${selectedVehicle.fare}`} />
          </label>
          <label className="input input-bordered flex items-center gap-3">
            Coupon
            <input type="text" className="grow" placeholder="Enter a valid coupon code" />
          </label>
            <button type='submit' className='btn btn-md btn-info btn-outline w-44'>Book Ride</button>
          
        </form>
      : 
        <RateList {...distTime} function={setSelectedVehicle} />)}
    </div>
  );
};

export default HomePage;

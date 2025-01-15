import React, { useEffect, useState } from 'react';
import { useRideStore } from '../store/rideauthStore';
import Map from '../Components/map';

const HomePage = () => {

  const { setLocation, getDrivers, addMarkers } = useRideStore();

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  });

  useEffect(() => {
    getDrivers();
  }, [getDrivers]);

  const [pickup, setPickup] = useState();
  const [destination, setDestination] = useState();
  const [destinationcoordinates, setdestinationcoordinates] = useState(null);
  const [pickupcoordinates, setpickupcoordinates] = useState(null);
  const [pickupDropdown, setpickupDropdown] = useState(null);
  const [destinationDropdown, setdestinationDropdown] = useState(null);
  const [route, setRoute] = useState(null);

  const handlePickup = (e) => {
    setPickup(e.target.value);
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&filter=countrycode:auto&format=json&apiKey=e7577bb5d1164c42ba9b89490328ebc2`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setpickupDropdown(result.results);
      })
      .catch((error) => console.log('error', error));
  };

  const handleDestination = async (e) => {
    setDestination(e.target.value);
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${e.target.value}&filter=countrycode:auto&format=json&apiKey=e7577bb5d1164c42ba9b89490328ebc2`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setdestinationDropdown(result.results);
      })
      .catch((error) => console.log('error', error));
  };

  const handleRoute = () => {
    if (pickupcoordinates && destinationcoordinates) {
      fetch(
        `https://api.geoapify.com/v1/routing?waypoints=${pickupcoordinates.latitude}%2C${pickupcoordinates.longitude}%7C${destinationcoordinates.latitude}%2C${destinationcoordinates.longitude}&mode=drive&apiKey=00ffce3bd27844caae8c8117f548412c`,
        { method: 'GET' }
      )
        .then((response) => response.json())
        .then((result) => setRoute(result.features[0].geometry.coordinates[0]))
        .catch((error) => console.log('error', error));
    }
  };

  // Trigger route calculation only when destinationcoordinates or pickupcoordinates change
  useEffect(() => {
    if (pickupcoordinates && destinationcoordinates) {
      handleRoute();
    }
  }, [pickupcoordinates, destinationcoordinates]);

  return (
    <div className='relative h-[calc(86vh)]  w-screen'>
      <Map route={route} />
      <form className='relative z-10 text-white text-lg font-bold flex flex-col text-center items-center justify-center gap-[calc(70vh)]'>
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
                    setPickup(item.address_line1 + item.address_line2);
                    setLocation({ latitude: item.lat, longitude: item.lon });
                    addMarkers([item.lat, item.lon]);
                    setpickupcoordinates({ latitude: item.lat, longitude: item.lon });
                  }}
                >
                  {item.address_line1}
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
                    setDestination(item.address_line1 + item.address_line2);
                    addMarkers([item.lat, item.lon]);
                    setdestinationcoordinates({ latitude: item.lat, longitude: item.lon });
                  }}
                >
                  {item.address_line1},{item.address_line2}
                </li>
              ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default HomePage;

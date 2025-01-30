import React, { useRef, useEffect} from 'react'
import {MapContainer,TileLayer,Marker, useMap,Polyline} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { LatLngBounds } from 'leaflet';




delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

const pickupIcon = L.icon({
    iconUrl: 'pick.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
})
const destinationIcon= L.icon({
    iconUrl: 'des.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
})

const locationIcon= L.icon({
    iconUrl: 'location.png',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
    
})


const DriverMap = (props) => {

    
    const UpdateMapCenter = () => {
        const map = useMap()
    
        useEffect(() => {
          if (props.location.latitude && props.location.longitude) {
            map.setView([props.location.latitude, props.location.longitude])
          }

        }, [map])
    
        return null}
      
      let bounds
const FitBounds = () => {
        if(props.rideConfirm && props.pickupcoordinates && props.location)
        {
          bounds = new LatLngBounds([[props.pickupcoordinates.latitude,props.pickupcoordinates.longitude], [props.location.latitude,props.location.longitude]]);
        }else if(props.rideStart && props.destinationcoordinates && props.location)
          {
            bounds = new LatLngBounds([[props.destinationcoordinates.latitude,props.destinationcoordinates.longitude], [props.location.latitude,props.location.longitude]]);
          }
        const map = useMap();
        useEffect(() => {
          if(bounds)
          {
            map.fitBounds(bounds,{
              padding:[30,30]
            });
          }

        }, [map, bounds]);
    
        return null;
      };

      const markersRef = useRef([]);

      useEffect(() => {
        // After markers are rendered, add the blinking class to all marker icons
        markersRef.current.forEach((marker) => {
          const iconElement = marker.getElement();
          if (iconElement) {
            iconElement.classList.add('blinking-icon'); // Add blinking class
          }
        });
      }, [props.location]);

  return (
    <MapContainer className='absolute inset-0 z-0 w-full' center ={[location.latitude,location.longitude]} zoom={14} scrollWheelZoom={false}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">openstreetmap</a> contributors' />
        
        <UpdateMapCenter />
        { props.route && 
          <Polyline 
            positions={props.route.map(([lng,lat])=>[lat,lng])}
            color='blue'
            weight={5}
            opacity={0.8}
          />
        }
        
            {props.pickupcoordinates && <Marker key={"-2"} position={[props.pickupcoordinates.latitude,props.pickupcoordinates.longitude]} icon={pickupIcon}>
                    
                </Marker>}
            {props.destinationcoordinates && <Marker key={"-1"} position={[props.destinationcoordinates.latitude,props.destinationcoordinates.longitude]} icon={destinationIcon}>
                    
                </Marker>}
            {props.location && <Marker key={"-3"} position={[location.latitude,location.longitude]} icon={locationIcon}
                          ref={(el) => markersRef.current[0] = el} // Save the marker in the ref
                          >
                    
                    </Marker>
                    }
        <FitBounds />
    </MapContainer>
  )
}

export default DriverMap
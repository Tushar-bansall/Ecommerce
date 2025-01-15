import React, { useEffect, useState } from 'react'
import {MapContainer,TileLayer,Marker,Popup, useMap,Polyline} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRideStore} from '../store/rideauthStore'



delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

const defaultIcon = L.icon({
    iconUrl: 'vite.svg',
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
    
})

const Map = (props) => {
    const {markers,location} = useRideStore()
    
    const UpdateMapCenter = () => {
        const map = useMap()
    
        useEffect(() => {
          if (location.latitude && location.longitude) {
            map.setView([location.latitude, location.longitude], map.getZoom())
          }
        }, [location, map])
    
        return null
      }
        console.log(props.route);
  return (
    <MapContainer className='absolute inset-0 z-0' center ={[location.latitude,location.longitude]} zoom={14} >
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
        {
            markers.map((marker,index)=> (
                <Marker key={index} position={marker} icon={defaultIcon}>
                    
                </Marker>
            ))
        }
    </MapContainer>
  )
}

export default Map
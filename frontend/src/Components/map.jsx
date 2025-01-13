import React from 'react'
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

const Map = () => {

    const locations = [{
        id:1 , name:'Location 1', lat: 37.7749,lng: -122.4194},
    {id:2 , name:'Location 2', lat: 34.0522,lng: -118.2437},
    {id:3 , name:'Location 3', lat: 40.7128,lng: -74.0060},
    ]

  return (
    <MapContainer center ={[37.7749,-122.4194]} zoom={5} style={{height: '500px', width: '100%'}}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">openstreetmap</a> contributors' />
        {
            locations.map((location)=> (
                <Marker key={location.id} position={[location.lat,location.lng]} icon={defaultIcon}>
                    <Popup>{location.name}</Popup>
                </Marker>
            ))
        }
    </MapContainer>
  )
}

export default Map
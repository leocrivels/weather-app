import React, { FC, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, MapConsumer } from 'react-leaflet';
import './App.css';
import { LatLngTuple, map } from 'leaflet';
import { key } from '../services/WeatherService';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom:number = 8;
const OWMTemperatureUrl: string = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${key}`;

interface LeafletMapProps {
  defaultLatLng: LatLngTuple;
}

function SetCenter(defaultLatLng: LatLngTuple) {
  const map = useMap()
  map.setView(defaultLatLng, 13)
  return null
}


export const LeafletMap: FC<LeafletMapProps> = ({defaultLatLng}) => {
    //const map = useMap()
    
   return (
    <MapContainer key="1231232" center={defaultLatLng} zoom={13}>
      
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MapConsumer>{
        (map) => {
          map.setView(defaultLatLng, 13)
          return null
        }
        }</MapConsumer>
    <TileLayer
    url={OWMTemperatureUrl}/>
    <MapConsumer>{
        (map) => {
          map.setView(defaultLatLng, 13)
          return null
        }
        }</MapConsumer>
    {/*<Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      </Marker>*/}
  </MapContainer>
   )
}
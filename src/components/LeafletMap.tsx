import React, { FC } from "react";
import { TileLayer, MapConsumer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { key } from "../services/WeatherService";
import { MapContainerResized } from "../styles/mapComponents";

const OWMTemperatureUrl: string = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${key}`;

interface LeafletMapProps {
  defaultLatLng: LatLngTuple;
}

export const LeafletMap: FC<LeafletMapProps> = ({ defaultLatLng }) => {
  return (
    <MapContainerResized center={defaultLatLng} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapConsumer>
        {(map) => {
          map.setView(defaultLatLng, 13);
          return null;
        }}
      </MapConsumer>
      <TileLayer url={OWMTemperatureUrl} />
      <MapConsumer>
        {(map) => {
          map.setView(defaultLatLng, 13);
          return null;
        }}
      </MapConsumer>
    </MapContainerResized>
  );
};

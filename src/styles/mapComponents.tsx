import { MapContainer } from "react-leaflet";
import styled from "styled-components";

export const MapContainerResized = styled(MapContainer)`
width: 100%;
@media (max-width: 769px) {
  height: 30vh !important;
};
@media (min-width: 769px) {
  height: 60vh;
};`;
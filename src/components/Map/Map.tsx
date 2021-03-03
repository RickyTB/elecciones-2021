import { MapContainer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as cantonesData from "../../data/ecuador_cantones.json";
import * as provinciasData from "../../data/ecuador_provincias.json";
import { useState } from "react";
import "./Map.css";

export interface MapProps {}

interface MapEventsProps {
  onZoomChange: (zoom: number) => void;
}

const MapEvents: React.FC<MapEventsProps> = ({ onZoomChange }) => {
  const map = useMapEvents({
    zoom(event) {
      onZoomChange(map.getZoom());
    },
  });
  return null;
};

const Map: React.FC<MapProps> = () => {
  const [zoom, setZoom] = useState(6);
  return (
    <MapContainer
      center={[-2.778, -83.54]}
      zoom={zoom}
      style={{ height: "100vh" }}
      zoomControl={false}
    >
      {zoom > 8 ? (
        <GeoJSON data={cantonesData.features as any} key="cantones" />
      ) : (
        <GeoJSON data={provinciasData.features as any} key="provincias" />
      )}
      <MapEvents onZoomChange={setZoom} />
    </MapContainer>
  );
};

export default Map;

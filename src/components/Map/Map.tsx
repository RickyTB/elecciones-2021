import { MapContainer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as cantonesData from "../../data/ecuador_cantones.json";
import * as provinciasData from "../../data/ecuador_provincias.json";
import { useState } from "react";
import "./Map.css";
import { HeatMap } from "../../heatmaps";

export interface MapProps {
  heatMap: HeatMap;
}

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

const defaultStyle = {
  fillOpacity: 1,
  fillColor: "#fff",
  color: "black",
  weight: 2,
  opacity: 0.6
};

//(layer as any).options.fillOpacity = 1;

const Map: React.FC<MapProps> = ({ heatMap }) => {
  const [zoom, setZoom] = useState(6);
  return (
    <MapContainer
      center={[-2.778, -83.54]}
      zoom={zoom}
      style={{ height: "100vh" }}
      zoomControl={false}
    >
      {zoom > 8 ? (
        <GeoJSON
          data={cantonesData.features as any}
          key="cantones"
          onEachFeature={heatMap.processCantones}
          style={defaultStyle}
        />
      ) : (
        <GeoJSON
          data={provinciasData.features as any}
          key="provincias"
          onEachFeature={heatMap.processProvincias}
          style={defaultStyle}
        />
      )}
      <MapEvents onZoomChange={setZoom} />
    </MapContainer>
  );
};

export default Map;

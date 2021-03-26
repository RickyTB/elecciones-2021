import { MapContainer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as cantonesData from "../../data/ecuador_cantones.json";
import * as provinciasData from "../../data/ecuador_provincias.json";
import { useState } from "react";
import "./Map.css";
import { HeatMap } from "../../heatmaps";
import { HeatMapType } from "../../enums";
import { HeatMapInfo } from "../../models";
import { useEffect } from "react";

export interface MapProps {
  heatMapList: HeatMapInfo[];
  heatMapMap: Record<HeatMapType, HeatMap>;
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
  opacity: 0.6,
};

const Map: React.FC<MapProps> = ({ heatMapList, heatMapMap }) => {
  const [zoom, setZoom] = useState(6);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag((flag) => !flag);
  }, [heatMapList]);
  return (
    <MapContainer
      center={[-2.778, -83.54]}
      zoom={zoom}
      style={{ height: "100%", flex: 1 }}
    >
      {heatMapList
        .slice(0)
        .reverse()
        .map((heatMapInfo, index) =>
          heatMapInfo.active ? (
            zoom > 8 ? (
              <GeoJSON
                data={cantonesData.features as any}
                key={`${heatMapInfo.type}-cantones-${flag}`}
                onEachFeature={heatMapMap[heatMapInfo.type].handleCantonFeature}
                style={defaultStyle}
              />
            ) : (
              <GeoJSON
                data={provinciasData.features as any}
                key={`${heatMapInfo.type}-provincias-${flag}`}
                onEachFeature={
                  heatMapMap[heatMapInfo.type].handleProvinciaFeature
                }
                style={defaultStyle}
              />
            )
          ) : null
        )}
      <MapEvents onZoomChange={setZoom} />
    </MapContainer>
  );
};

export default Map;

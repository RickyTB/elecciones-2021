import { Box } from "@chakra-ui/react";
import React, { useState, useMemo } from "react";
import { ColorGuide, Map } from "../../components";
import { HeatMapType } from "../../enums";
import {
  HeatMap,
  PovertyHeatMap,
  PresidentialResultsHeatMap,
  PopulationHeatMap,
} from "../../heatmaps";

export interface MapPageProps {}

const MapPage: React.FC<MapPageProps> = () => {
  const [heatMap, setHeatMap] = useState(HeatMapType.PresidentialResults);
  const heatMapMap = useMemo<Record<HeatMapType, HeatMap>>(
    () => ({
      [HeatMapType.Poverty]: new PovertyHeatMap(),
      [HeatMapType.PresidentialResults]: new PresidentialResultsHeatMap(),
      [HeatMapType.Population]: new PopulationHeatMap(),
    }),
    []
  );

  return (
    <>
      <Box flex={1} d="flex">
        <Map heatMap={heatMapMap[heatMap]} heatMapType={heatMap} />
      </Box>
      <ColorGuide heatMap={heatMapMap[heatMap]} />
    </>
  );
};

export default MapPage;

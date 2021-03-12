import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { initDb } from "../../bin";
import { ColorGuide, Map, StatsSidebar, Toolbar } from "../../components";
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
  const [heatMapMap, setHeatMapMap] = useState<Record<HeatMapType, HeatMap>>();

  useEffect(() => {
    initDb().then(() => {
      const heatMapMap: Record<HeatMapType, HeatMap> = {
        [HeatMapType.Poverty]: new PovertyHeatMap(),
        [HeatMapType.PresidentialResults]: new PresidentialResultsHeatMap(),
        [HeatMapType.Population]: new PopulationHeatMap(),
      };
      setHeatMapMap(heatMapMap);
    });
  }, []);

  return heatMapMap ? (
    <>
      <Toolbar heatMapType={heatMap} onHeatMapChange={setHeatMap} />
      <Box flex={1} d="flex">
        <Map heatMap={heatMapMap[heatMap]} heatMapType={heatMap} />
        <StatsSidebar />
      </Box>
      <ColorGuide heatMap={heatMapMap[heatMap]} />
    </>
  ) : (
    <Text>Cargando...</Text>
  );
};

export default MapPage;

import React, { useEffect } from "react";
import { HeatMapType } from "../../enums";
import { ColorGuide } from "../ColorGuide";
import { Map } from "../Map";
import { Toolbar } from "../Toolbar";
import {
  HeatMap,
  PovertyHeatMap,
  PresidentialResultsHeatMap,
} from "../../heatmaps";
import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { initDb } from "../../bin";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [heatMap, setHeatMap] = useState(HeatMapType.Poverty);
  const [heatMapMap, setHeatMapMap] = useState<Record<HeatMapType, HeatMap>>();

  useEffect(() => {
    initDb().then(() => {
      const heatMapMap: Record<HeatMapType, HeatMap> = {
        [HeatMapType.Poverty]: new PovertyHeatMap(),
        [HeatMapType.PresidentialResults]: new PresidentialResultsHeatMap(),
      };
      setHeatMapMap(heatMapMap);
    });
  }, []);

  return heatMapMap ? (
    <Box d="flex" flexDirection="column" height="100vh">
      <Toolbar heatMapType={heatMap} onHeatMapChange={setHeatMap} />
      <Box flex={1}>
        <Map heatMap={heatMapMap[heatMap]} heatMapType={heatMap} />
      </Box>
      <ColorGuide heatMap={heatMapMap[heatMap]} />
    </Box>
  ) : (
    <Text>Cargando...</Text>
  );
};

export default Layout;

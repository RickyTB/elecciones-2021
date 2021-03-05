import React, { useEffect } from "react";
import { HeatMapType } from "../../enums";
import { ColorGuide } from "../ColorGuide";
import { Map } from "../Map";
import { Toolbar } from "../Toolbar";
import { HeatMap, PovertyHeatMap } from "../../heatmaps";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { initDb } from "../../bin";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [heatMap, setHeatMap] = useState(HeatMapType.Poverty);
  const [heatMapMap, setHeatMapMap] = useState<Record<HeatMapType, HeatMap>>();

  useEffect(() => {
    initDb().then(() => {
      const heatMapMap: Record<HeatMapType, HeatMap> = {
        [HeatMapType.Poverty]: new PovertyHeatMap(),
      };
      setHeatMapMap(heatMapMap);
    });
  }, []);

  return heatMapMap ? (
    <>
      <Toolbar heatMapType={heatMap} onHeatMapChange={setHeatMap} />
      <Map heatMap={heatMapMap[heatMap]} />
      <ColorGuide heatMap={heatMapMap[heatMap]} />
    </>
  ) : (
    <Text>Cargando...</Text>
  );
};

export default Layout;

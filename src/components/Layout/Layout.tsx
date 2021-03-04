import React, { useEffect } from "react";
import { HeatMapType, Table } from "../../enums";
import { ColorGuide } from "../ColorGuide";
import { Map } from "../Map";
import { Toolbar } from "../Toolbar";
import { HeatMap, PovertyHeatMap } from "../../heatmaps";
import { useState } from "react";
import { DBProvider } from "../../context";
import { Text } from "@chakra-ui/react";
import { initDb } from "../../bin";
import alasql from 'alasql';

export interface LayoutProps {}

const HeatMapMap: Record<HeatMapType, HeatMap> = {
  [HeatMapType.Poverty]: new PovertyHeatMap(),
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [heatMap, setHeatMap] = useState(HeatMapType.Poverty);
  const [db, setDb] = useState<Record<Table, any[]>>();

  useEffect(() => {
    initDb().then(setDb);
  }, []);

  return db ? (
    <DBProvider value={db}>
      <Toolbar heatMapType={heatMap} />
      <Map />
      <ColorGuide heatMap={HeatMapMap[heatMap]} />
    </DBProvider>
  ) : (
    <Text>Cargando...</Text>
  );
};

export default Layout;

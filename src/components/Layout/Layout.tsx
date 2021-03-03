import React from "react";
import { HeatMapType } from "../../enums";
import { ColorGuide } from "../ColorGuide";
import { Toolbar } from "../Toolbar";
import { HeatMap, PovertyHeatMap } from "../../heatmaps";
import { useState } from "react";

export interface LayoutProps {}

const HeatMapMap: Record<HeatMapType, HeatMap> = {
  [HeatMapType.Poverty]: new PovertyHeatMap(),
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [heatMap, setHeatMap] = useState(HeatMapType.Poverty);
  return (
    <>
      <Toolbar heatMapType={heatMap} />
      {children}
      <ColorGuide heatMap={HeatMapMap[heatMap]} />
    </>
  );
};

export default Layout;

import { Box } from "@chakra-ui/react";
import React, { useReducer, useMemo } from "react";
import { ColorGuide, HeatMapSideBar, Map } from "../../components";
import { HeatMapType } from "../../enums";
import { HeatMapInfo } from "../../models";
import {
  HeatMap,
  PovertyHeatMap,
  PresidentialResultsHeatMap,
  PopulationHeatMap,
} from "../../heatmaps";
import { reducer } from "./heatmap-reducer";
import { HeatMapActionType } from "./action-types";

export interface MapPageProps {}

const initialState: HeatMapInfo[] = [
  {
    type: HeatMapType.PresidentialResults,
    title: "Resultados presidenciales",
    active: true,
    opacity: 1,
  },
  {
    type: HeatMapType.Population,
    title: "# de sufragantes",
    active: false,
    opacity: 1,
  },
  {
    type: HeatMapType.Poverty,
    title: "Pobreza",
    active: false,
    opacity: 1,
  },
];

const MapPage: React.FC<MapPageProps> = () => {
  const [heatMapList, dispatch] = useReducer(reducer, initialState);
  const heatMapMap = useMemo<Record<HeatMapType, HeatMap>>(
    () => ({
      [HeatMapType.Poverty]: new PovertyHeatMap(),
      [HeatMapType.PresidentialResults]: new PresidentialResultsHeatMap(),
      [HeatMapType.Population]: new PopulationHeatMap(),
    }),
    []
  );
  const firstHeatMap = useMemo(() => heatMapList.filter((hm) => hm.active)[0], [
    heatMapList,
  ]);

  const handleReorder = (index: number, newValue: number) =>
    dispatch({ type: HeatMapActionType.Reorder, index, newValue });
  const handleActiveChange = (index: number, newValue: boolean) =>
    dispatch({ type: HeatMapActionType.ChangeActive, index, newValue });
  const handleOpacityChange = (index: number, newValue: number) =>
    dispatch({ type: HeatMapActionType.ChangeOpacity, index, newValue });

  heatMapList.forEach(({ type, opacity }) => {
    const hm = heatMapMap[type];
    hm.setOpacity(opacity);
  });

  return (
    <>
      <Box flex={1} d="flex">
        <HeatMapSideBar
          heatMapList={heatMapList}
          onReorder={handleReorder}
          onActiveChange={handleActiveChange}
          onOpacityChange={handleOpacityChange}
        />
        <Map heatMapList={heatMapList} heatMapMap={heatMapMap} />
      </Box>
      {firstHeatMap && <ColorGuide heatMap={heatMapMap[firstHeatMap.type]} />}
    </>
  );
};

export default MapPage;

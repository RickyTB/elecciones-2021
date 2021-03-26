import { HeatMapInfo } from "../../models";
import { HeatMapActionType } from "./action-types";

type Action = { type: HeatMapActionType; index: number; newValue: any };

const reorder = (state: HeatMapInfo[], action: Action) => {
  const newState = [...state];
  const [removed] = newState.splice(action.index, 1);
  newState.splice(action.newValue, 0, removed);
  return newState;
};

const changeActive = (state: HeatMapInfo[], action: Action) => {
  const newState = [...state];
  newState[action.index].active = action.newValue;
  return newState;
};

const changeOpacity = (state: HeatMapInfo[], action: Action) => {
  const newState = [...state];
  newState[action.index].opacity = action.newValue;
  return newState;
};

const reducerMap: Record<HeatMapActionType, Function> = {
  [HeatMapActionType.Reorder]: reorder,
  [HeatMapActionType.ChangeActive]: changeActive,
  [HeatMapActionType.ChangeOpacity]: changeOpacity,
};

export const reducer = (
  state: HeatMapInfo[],
  action: Action
): HeatMapInfo[] => {
  return reducerMap[action.type]?.(state, action) || state;
};

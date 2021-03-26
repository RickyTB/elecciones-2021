import { HeatMapType } from "../enums";

export interface HeatMapInfo {
  type: HeatMapType;
  title: string;
  active: boolean;
  opacity: number;
}

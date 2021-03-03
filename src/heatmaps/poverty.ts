import { FeatureGroupProps } from "react-leaflet";
import { HeatMap } from "./heatmap";

export class PovertyHeatMap implements HeatMap {
  props = [
    { title: "Caja 1", bg: "#aa2b1d", color: "white", subtitle: "xd" },
    { title: "Caja 2", bg: "#cc561e", color: "white", subtitle: "xd" },
    { title: "Caja 3", bg: "#ef8d32", color: "black", subtitle: "xd" },
    { title: "Caja 4", bg: "#beca5c", color: "black", subtitle: "xd" },
  ];

  processFeature(feature: FeatureGroupProps): void {
    console.log(feature);
  }
}

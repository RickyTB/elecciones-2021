import { FeatureGroupProps } from "react-leaflet";
import { ColorBoxProps } from "../components/ColorBox/ColorBox";

export interface HeatMap {
  props: ColorBoxProps[];

  processFeature(feature: FeatureGroupProps): void;
}

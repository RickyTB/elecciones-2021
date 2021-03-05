import * as geojson from "geojson";
import { Layer } from "leaflet";
import { ColorBoxProps } from "../components/ColorBox/ColorBox";

export abstract class HeatMap {
  abstract readonly props: ColorBoxProps[];

  abstract processProvincias: (
    feature: geojson.Feature<geojson.GeometryObject>,
    layer: Layer
  ) => void;

  abstract processCantones: (
    feature: geojson.Feature<geojson.GeometryObject>,
    layer: Layer
  ) => void;
}

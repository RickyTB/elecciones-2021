import * as geojson from "geojson";
import { Layer } from "leaflet";
import { ColorBoxProps } from "../components/ColorBox/ColorBox";

export abstract class HeatMap<T = any> {
  abstract readonly props: ColorBoxProps[];

  private provResultsCache: Record<number, T> = {};
  private cantonResultsCache: Record<number, T> = {};

  protected opacity: number = 1;

  handleProvinciaFeature = (
    feature: geojson.Feature<geojson.GeometryObject>,
    layer: Layer
  ) => {
    const id = feature.properties?.id_prov;
    if (id === 25) return;

    const name = feature.properties?.dpa_despro;

    const result = this.provResultsCache[id] || this.processProvincias(id);
    this.provResultsCache[id] = result;

    this.paintFeature(layer, name, result);
  };

  handleCantonFeature = (
    feature: geojson.Feature<geojson.GeometryObject>,
    layer: Layer
  ) => {
    const id = feature.properties?.ID;
    const name = feature.properties?.DPA_DESCAN;

    const result = this.cantonResultsCache[id] || this.processCantones(id);
    this.cantonResultsCache[id] = result;

    this.paintFeature(layer, name, result);
  };

  protected abstract paintFeature: (
    layer: Layer,
    name: string,
    result: T
  ) => void;

  protected abstract processProvincias: (id: number) => T;

  protected abstract processCantones: (id: number) => T;

  setOpacity = (opacity: number) => {
    this.opacity = opacity;
  };
}

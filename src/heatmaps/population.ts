import alasql from "alasql";
import { Layer } from "leaflet";
import { ColorBoxProps } from "../components/ColorBox/ColorBox";
import { HeatMap } from "./heatmap";

const TestMap: ((value: number) => boolean)[] = [
  (value: number) => value < 25000,
  (value: number) => value > 25000 && value < 50000,
  (value: number) => value > 50000 && value < 100000,
  (value: number) => value > 100000 && value < 250000,
  (value: number) => value > 250000 && value < 500000,
  (value: number) => value > 500000 && value < 1000000,
  (value: number) => value > 1000000 && value < 2000000,
  (value: number) => value > 2000000,
];

export class PopulationHeatMap extends HeatMap<number> {
  readonly props: ColorBoxProps[];

  constructor() {
    super();

    this.props = [
      {
        title: "0 - 25.000",
        bg: "#DEEEF7",
        color: "black",
        subtitle: `# de sufragantes`,
      },
      {
        title: "25.000 - 50.000",
        bg: "#BDDDEF",
        color: "black",
        subtitle: `# de sufragantes`,
      },
      {
        title: "50.000 - 100.000",
        bg: "#8CC3E3",
        color: "black",
        subtitle: `# de sufragantes`,
      },
      {
        title: "100.000 - 250.000",
        bg: "#6BB2DB",
        color: "black",
        subtitle: `# de sufragantes`,
      },
      {
        title: "250.000 - 500.000",
        bg: "#2E8AC0",
        color: "black",
        subtitle: `# de sufragantes`,
      },
      {
        title: "500.000 - 1'000.000",
        bg: "#246B94",
        color: "white",
        subtitle: `# de sufragantes`,
      },
      {
        title: "1'000.000 - 2'000.000",
        bg: "#184763",
        color: "white",
        subtitle: `# de sufragantes`,
      },
      {
        title: "2'000.000+",
        bg: "#081821",
        color: "white",
        subtitle: `# de sufragantes`,
      },
    ];
  }

  protected paintFeature = (layer: Layer, name: string, value: number) => {
    layer.bindTooltip(`
          <h4><strong>${name}</strong></h4>
          <p># de sufragantes: ${value}</p>
        `);

    const index = TestMap.findIndex((test) => test(value));
    //@ts-ignore
    (layer as any).options.fillColor = this.props[index].bg;
    (layer as any).options.fillOpacity = this.opacity;
  };

  processProvincias = (id: number) => {
    const [results] = alasql(
      `
            SELECT SUM(cand_1 + cand_2 + cand_3 + cand_4 + cand_5 + cand_6 + cand_7 + cand_8 + cand_9 + cand_10 + cand_11 + cand_12 + cand_13 + cand_14 + cand_15 + cand_16 + blanco + nulo) total
            FROM provincia 
              JOIN canton ON canton.provinciaId = provincia.id
              JOIN parroquia ON parroquia.cantonId = canton.id
              JOIN zona ON zona.parroquiaId = parroquia.id
              JOIN junta ON junta.zonaId = zona.id
              JOIN res_presidente ON res_presidente.juntaId = junta.id
            WHERE provincia.id = ${id}
            GROUP BY provinciaId;
          `
    );

    return results.total;
  };

  processCantones = (id: number) => {
    const [results] = alasql(
      `
              SELECT SUM(cand_1 + cand_2 + cand_3 + cand_4 + cand_5 + cand_6 + cand_7 + cand_8 + cand_9 + cand_10 + cand_11 + cand_12 + cand_13 + cand_14 + cand_15 + cand_16 + blanco + nulo) total
              FROM canton
                JOIN parroquia ON parroquia.cantonId = canton.id
                JOIN zona ON zona.parroquiaId = parroquia.id
                JOIN junta ON junta.zonaId = zona.id
                JOIN res_presidente ON res_presidente.juntaId = junta.id
              WHERE canton.id = ${id}
              GROUP BY cantonId;
            `
    );

    return results.total;
  };
}

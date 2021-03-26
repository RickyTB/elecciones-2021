import alasql from "alasql";
import { Layer } from "leaflet";
import { ColorBoxProps } from "../components/ColorBox/ColorBox";
import { PresidentMap } from "../utils/constants";
import { HeatMap } from "./heatmap";

const presPropMap = {
  cand_1: 0,
  cand_6: 3,
  cand_9: 2,
  cand_12: 1,
};

type PresResult = {
  cand_1: number;
  cand_6: number;
  cand_9: number;
  cand_12: number;
  total: number;
};

export class PresidentialResultsHeatMap extends HeatMap<PresResult> {
  readonly props: ColorBoxProps[];

  constructor() {
    super();
    const results = this.loadResults();

    this.props = [
      {
        title: "Andrés Arauz",
        bg: "#f58634",
        color: "black",
        subtitle: `${((results.cand_1 / results.total) * 100).toFixed(2)}%`,
      },
      {
        title: "Guillermo Lasso",
        bg: "#1a508b",
        color: "white",
        subtitle: `${((results.cand_12 / results.total) * 100).toFixed(2)}%`,
      },
      {
        title: "Yaku Perez",
        bg: "#00af91",
        color: "black",
        subtitle: `${((results.cand_9 / results.total) * 100).toFixed(2)}%`,
      },
      {
        title: "Xavier Hervas",
        bg: "#ffcc29",
        color: "black",
        subtitle: `${((results.cand_6 / results.total) * 100).toFixed(2)}%`,
      },
    ];
  }

  loadResults(): PresResult {
    const [results] = alasql(
      `
              SELECT SUM(cand_1) cand_1, SUM(cand_6) cand_6, SUM(cand_9) cand_9, SUM(cand_12) cand_12, 
              SUM(cand_1 + cand_2 + cand_3 + cand_4 + cand_5 + cand_6 + cand_7 + cand_8 + cand_9 + cand_10 + cand_11 + cand_12 + cand_13 + cand_14 + cand_15 + cand_16) total
              FROM provincia 
                JOIN canton ON canton.provinciaId = provincia.id
                JOIN parroquia ON parroquia.cantonId = canton.id
                JOIN zona ON zona.parroquiaId = parroquia.id
                JOIN junta ON junta.zonaId = zona.id
                JOIN res_presidente ON res_presidente.juntaId = junta.id;
            `
    );

    return results;
  }

  protected paintFeature = (
    layer: Layer,
    name: string,
    { total, ...results }: PresResult
  ) => {
    const order = Object.entries(results).sort((a, b) => b[1] - a[1]);

    layer.bindTooltip(`
          <h4><strong>${name}</strong></h4>
          ${order
            .map(
              (entry, index) =>
                `<p>${index + 1}°: ${PresidentMap[entry[0]]}, ${(
                  (entry[1] / total) *
                  100
                ).toFixed(2)}% de votos.</p>`
            )
            .join("")}
        `);

    //@ts-ignore
    (layer as any).options.fillColor = this.props[presPropMap[order[0][0]]].bg;
    (layer as any).options.fillOpacity = this.opacity;
  };

  processProvincias = (id: number) => {
    const [results] = alasql(
      `
            SELECT SUM(cand_1) cand_1, SUM(cand_6) cand_6, SUM(cand_9) cand_9, SUM(cand_12) cand_12, 
            SUM(cand_1 + cand_2 + cand_3 + cand_4 + cand_5 + cand_6 + cand_7 + cand_8 + cand_9 + cand_10 + cand_11 + cand_12 + cand_13 + cand_14 + cand_15 + cand_16) total
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

    return results;
  };

  processCantones = (id: number) => {
    const [results] = alasql(
      `
              SELECT SUM(cand_1) cand_1, SUM(cand_6) cand_6, SUM(cand_9) cand_9, SUM(cand_12) cand_12, 
              SUM(cand_1 + cand_2 + cand_3 + cand_4 + cand_5 + cand_6 + cand_7 + cand_8 + cand_9 + cand_10 + cand_11 + cand_12 + cand_13 + cand_14 + cand_15 + cand_16) total
              FROM canton
                JOIN parroquia ON parroquia.cantonId = canton.id
                JOIN zona ON zona.parroquiaId = parroquia.id
                JOIN junta ON junta.zonaId = zona.id
                JOIN res_presidente ON res_presidente.juntaId = junta.id
              WHERE canton.id = ${id}
              GROUP BY cantonId;
            `
    );

    return results;
  };
}

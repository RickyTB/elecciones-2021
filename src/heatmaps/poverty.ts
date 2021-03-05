import alasql from "alasql";
import { Layer } from "leaflet";
import { ColorBoxProps } from "../components/ColorBox/ColorBox";
import { HeatMap } from "./heatmap";

const printSubtitle = (value: number) =>
  `${value} provincia${value === 1 ? "" : "s"}`;

export class PovertyHeatMap extends HeatMap<number> {
  readonly props: ColorBoxProps[];

  constructor() {
    super();
    const poverty = this.findPoverty();
    this.props = [
      {
        title: "0% - 10%",
        bg: "#ffe2f1",
        color: "black",
        subtitle: printSubtitle(poverty[0]),
      },
      {
        title: "10% - 20%",
        bg: "#ffb3cf",
        color: "black",
        subtitle: printSubtitle(poverty[1]),
      },
      {
        title: "20% - 30%",
        bg: "#fc83ab",
        color: "black",
        subtitle: printSubtitle(poverty[2]),
      },
      {
        title: "30% - 40%",
        bg: "#f95283",
        color: "black",
        subtitle: printSubtitle(poverty[3]),
      },
      {
        title: "40% - 50%",
        bg: "#f62259",
        color: "white",
        subtitle: printSubtitle(poverty[4]),
      },
      {
        title: "50% - 60%",
        bg: "#dd0939",
        color: "white",
        subtitle: printSubtitle(poverty[5]),
      },
      {
        title: "60% - 70%",
        bg: "#ad0337",
        color: "white",
        subtitle: printSubtitle(poverty[6]),
      },
      {
        title: "70% - 80%",
        bg: "#7c002f",
        color: "white",
        subtitle: printSubtitle(poverty[7]),
      },
      {
        title: "80% - 90%",
        bg: "#4d0021",
        color: "white",
        subtitle: printSubtitle(poverty[8]),
      },
      {
        title: "90% - 100%",
        bg: "#20000d",
        color: "white",
        subtitle: printSubtitle(poverty[9]),
      },
    ];
  }

  findPoverty() {
    const pobParroquias = alasql(
      `
      SELECT SUM(pobres) pobres, SUM(total) total, provinciaId
      FROM provincia 
        JOIN canton ON canton.provinciaId = provincia.id
        JOIN parroquia ON parroquia.cantonId = canton.id
        JOIN pob_parroquias ON pob_parroquias.parroquiaId = parroquia.id
      GROUP BY provinciaId;
    `
    );

    const pobCantones = alasql(
      `
      SELECT SUM(pobres) pobres, SUM(total) total, provinciaId
      FROM provincia 
        JOIN canton ON canton.provinciaId = provincia.id
        JOIN pob_cantones ON pob_cantones.cantonId = canton.id
      GROUP BY provinciaId;
    `
    );

    const pobrezaList = alasql(
      `
      SELECT SUM(pobres) pobres, SUM(total) total, provinciaId
      FROM ?
      GROUP BY provinciaId;
    `,
      [[...pobParroquias, ...pobCantones]]
    );

    const resultado = alasql(
      `
      SELECT (pobres / total) pobreza FROM (
        SELECT SUM(pobres) pobres, SUM(total) total
        FROM ?
        GROUP BY provinciaId
      );
    `,
      [pobrezaList]
    ) as any[];

    return resultado.reduce(
      (obj, { pobreza }) => {
        obj[Math.floor(pobreza * 10)] += 1;
        return obj;
      },
      {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
      }
    );
  }

  protected paintFeature = (layer: Layer, name: string, poverty: number) => {
    layer.bindTooltip(`
      <h4><strong>${name}</strong></h4>
      <span>${(poverty * 100).toFixed(2)}%</span>
    `);

    (layer as any).options.fillColor = this.props[Math.floor(poverty * 10)].bg;
  };

  protected processProvincias = (id: number) => {
    const pobParroquias = alasql(
      `
      SELECT SUM(pobres) pobres, SUM(total) total, provinciaId
      FROM provincia 
        JOIN canton ON canton.provinciaId = provincia.id
        JOIN parroquia ON parroquia.cantonId = canton.id
        JOIN pob_parroquias ON pob_parroquias.parroquiaId = parroquia.id
      WHERE provincia.id = ${id}
      GROUP BY provinciaId;
    `
    );

    const pobCantones = alasql(
      `
      SELECT SUM(pobres) pobres, SUM(total) total, provinciaId
      FROM provincia 
        JOIN canton ON canton.provinciaId = provincia.id
        JOIN pob_cantones ON pob_cantones.cantonId = canton.id
      WHERE provincia.id = ${id}
      GROUP BY provinciaId;
    `
    );

    const pobrezaList = [...pobParroquias, ...pobCantones];
    const [{ pobreza }] = alasql(
      `
      SELECT (pobres / total) pobreza FROM (
        SELECT SUM(pobres) pobres, SUM(total) total
        FROM ?
      );
    `,
      [pobrezaList]
    );

    return pobreza;
  };

  processCantones = (id: number) => {
    const pobParroquias = alasql(
      `
      SELECT SUM(pobres) pobres, SUM(total) total, cantonId
      FROM canton 
        JOIN parroquia ON parroquia.cantonId = canton.id
        JOIN pob_parroquias ON pob_parroquias.parroquiaId = parroquia.id
      WHERE canton.id = ${id}
      GROUP BY cantonId;
    `
    );

    const pobCantones = alasql(
      `
      SELECT SUM(pobres) pobres, SUM(total) total, cantonId
      FROM canton
        JOIN pob_cantones ON pob_cantones.cantonId = canton.id
      WHERE canton.id = ${id}
      GROUP BY cantonId;
    `
    );

    const pobrezaList = [...pobParroquias, ...pobCantones];
    const [{ pobreza }] = alasql(
      `
      SELECT (pobres / total) pobreza FROM (
        SELECT SUM(pobres) pobres, SUM(total) total
        FROM ?
      );
    `,
      [pobrezaList]
    );

    return pobreza;
  };
}

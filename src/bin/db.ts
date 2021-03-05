import * as Papa from "papaparse";
import provinciaCsv from "../data/elecciones_provincia.csv";
import circunscripcionCsv from "../data/elecciones_circunscripcion.csv";
import cantonCsv from "../data/elecciones_canton.csv";
import parroquiaCsv from "../data/elecciones_parroquia.csv";
import zonaCsv from "../data/elecciones_zona.csv";
import juntaCsv from "../data/elecciones_junta.csv";
import resultadosCsv from "../data/elecciones_res_presidente.csv";
import pobCantonesCsv from "../data/pobreza_cantones.csv";
import pobParroquiasCsv from "../data/pobreza_parroquias.csv";
import { Table } from "../enums";
import alasql from "alasql";
import tablesSQL from "../data/tables.sql";

interface TableData {
  table: Table;
  path: string;
}

const data: TableData[] = [
  {
    table: Table.Provincia,
    path: provinciaCsv,
  },
  {
    table: Table.Circunscripcion,
    path: circunscripcionCsv,
  },
  {
    table: Table.Canton,
    path: cantonCsv,
  },
  {
    table: Table.Parroquia,
    path: parroquiaCsv,
  },
  {
    table: Table.Zona,
    path: zonaCsv,
  },
  {
    table: Table.Junta,
    path: juntaCsv,
  },
  {
    table: Table.ResPresidente,
    path: resultadosCsv,
  },
  {
    table: Table.PobCantones,
    path: pobCantonesCsv,
  },
  {
    table: Table.PobParroquias,
    path: pobParroquiasCsv,
  },
];

async function parseData(data: TableData): Promise<any[]> {
  return new Promise((res, error) => {
    Papa.parse(data.path, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        res(results.data);
      },
      error,
    });
  });
}

export async function initDb() {
  alasql(tablesSQL);

  for (const table of data) {
    (alasql as any).tables[table.table].data = await parseData(table);
    alasql(`CREATE INDEX ${table.table}_id ON ${table.table} (id)`);
    alasql(`REINDEX ${table.table}_id`);

    const obj = (alasql as any).tables[table.table].data[0];
    const foreignKeys = Object.keys(obj).filter((key) => key.endsWith("Id"));
    for (const foreignKey of foreignKeys) {
      alasql(
        `CREATE INDEX ${table.table}_${foreignKey} ON ${table.table} (${foreignKey})`
      );
      alasql(`REINDEX ${table.table}_${foreignKey}`);
    }
  }
}

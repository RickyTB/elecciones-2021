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
  console.log(data.table);
  return new Promise((res, error) => {
    Papa.parse(data.path, {
      download: true,
      header: true,
      complete: function (results) {
        res(results.data);
      },
      error,
    });
  });
}

export async function initDb(): Promise<Record<Table, any[]>> {
  const db: Record<Table, any[]> = {} as any;

  for (const table of data) {
    db[table.table] = await parseData(table);
  }

  return db;
}

import * as Comlink from "comlink";
import * as Papa from "papaparse";
import tables from "../data/tables.sql";
import provinciaCsv from "../data/elecciones_provincia.csv";
import circunscripcionCsv from "../data/elecciones_circunscripcion.csv";
import cantonCsv from "../data/elecciones_canton.csv";
import parroquiaCsv from "../data/elecciones_parroquia.csv";
import zonaCsv from "../data/elecciones_zona.csv";
import juntaCsv from "../data/elecciones_junta.csv";
import resultadosCsv from "../data/elecciones_res_presidente.csv";
import pobCantonesCsv from "../data/pobreza_cantones.csv";
import pobParroquiasCsv from "../data/pobreza_parroquias.csv";

Comlink.transferHandlers.set("WORKERSQLPROXIES", {
  canHandle: (obj: any) => false,
  serialize(obj: any) {
    const { port1, port2 } = new MessageChannel();
    Comlink.expose(obj, port1);
    return [port2, [port2]];
  },
  deserialize: (port: any) => {
    port.start();
    return Comlink.wrap(port);
  },
} as any);

interface TableData {
  table: string;
  path: string;
  sql: (row: any) => string;
}

const fullQuery = (tableName: string, values: string[]) =>
  `INSERT INTO ${tableName} VALUES ${values.join(", ")};`;

const data: TableData[] = [
  {
    table: "provincia",
    path: provinciaCsv,
    sql: (row) => `(${row.id}, '${row.nombre}', ${row.circunscripcion})`,
  },
  {
    table: "circunscripcion",
    path: circunscripcionCsv,
    sql: (row) =>
      `(${row.id}, ${row.codigo}, '${row.nombre}', ${row.provinciaId})`,
  },
  {
    table: "canton",
    path: cantonCsv,
    sql: (row) =>
      `(${row.id}, ${row.codigo}, '${row.nombre}', ${row.provinciaId}, ${
        row.cirId || "NULL"
      })`,
  },
  {
    table: "parroquia",
    path: parroquiaCsv,
    sql: (row) =>
      `(${row.id}, ${row.codigo}, '${row.nombre}', ${row.cantonId})`,
  },
  {
    table: "zona",
    path: zonaCsv,
    sql: (row) =>
      `(${row.id}, ${row.codigo}, '${row.nombre}', ${row.parroquiaId})`,
  },
  {
    table: "junta",
    path: juntaCsv,
    sql: (row) => `(${row.id}, ${row.codigo}, '${row.nombre}', ${row.zonaId})`,
  },
  {
    table: "res_presidente",
    path: resultadosCsv,
    sql: (row) =>
      `(${row.id}, ${row.cand_1}, ${row.cand_2}, ${row.cand_3}, ${row.cand_4}, ${row.cand_5}, ${row.cand_6}, ${row.cand_7}, ${row.cand_8}, ${row.cand_9}, ${row.cand_10}, ${row.cand_11}, ${row.cand_12}, ${row.cand_13}, ${row.cand_14}, ${row.cand_15}, ${row.cand_16}, ${row.total_suf}, ${row.blanco}, ${row.nulo}, ${row.juntaId})`,
  },
  {
    table: "pob_cantones",
    path: pobCantonesCsv,
    sql: (row) =>
      `(${row.codigo}, '${row.nombre}', ${row.no_pobres}, ${row.pobres}, ${row.total}, ${row.cantonId})`,
  },
  {
    table: "pob_parroquias",
    path: pobParroquiasCsv,
    sql: (row) =>
      `(${row.codigo}, '${row.nombre}', ${row.no_pobres}, ${row.pobres}, ${row.total}, ${row.parroquiaId})`,
  },
];

async function insertData(
  data: TableData,
  db: Comlink.Remote<SqlJs.Database>
): Promise<string> {
  console.log(data.table);
  return new Promise((res, error) => {
    let headers: string[];
    const inserts: string[] = [];
    Papa.parse(data.path, {
      download: true,
      step: function (row) {
        if (!headers) {
          headers = row.data as string[];
          return;
        }
        const json = headers.reduce(
          (obj, key, i) => ({ ...obj, [key]: row.data[i] }),
          {}
        );
        inserts.push(data.sql(json));
      },
      complete: () => res(fullQuery(data.table, inserts)),
      error,
    });
  });
}

export async function initDb(): Promise<Comlink.Remote<SqlJs.Database>> {
  const worker = new Worker("/res/worker.js");
  const sql = Comlink.wrap<{
    new: () => Comlink.Remote<SqlJs.Database>;
  }>(worker);

  // Create a database
  const db = await sql.new();
  await db.exec(tables);

  for (const table of data) {
    const inserts = await insertData(table, db);
    await db.run(inserts);
  }

  return db;
}

create table provincia (
  id integer not null primary key,
  nombre TEXT not null,
  circunscripcion boolean not null
) WITHOUT ROWID;

create table circunscripcion (
  id integer not null primary key,
  codigo integer not null,
  nombre TEXT not null,
  "provinciaId" integer not null,
  FOREIGN KEY ("provinciaId") REFERENCES provincia (id)
) WITHOUT ROWID;

create table canton (
  id integer not null primary key,
  codigo integer not null,
  nombre TEXT not null,
  "provinciaId" integer not null,
  "cirId" integer,
  FOREIGN KEY ("provinciaId") REFERENCES provincia (id),
  FOREIGN KEY ("cirId") REFERENCES circunscripcion (id)
) WITHOUT ROWID;

create table parroquia (
  id integer not null primary key,
  codigo integer not null,
  nombre TEXT not null,
  "cantonId" integer not null,
  FOREIGN KEY ("cantonId") REFERENCES canton (id)
) WITHOUT ROWID;

create table zona (
  id integer not null primary key,
  codigo integer not null,
  nombre TEXT not null,
  "parroquiaId" integer not null,
  FOREIGN KEY ("parroquiaId") REFERENCES parroquia (id)
) WITHOUT ROWID;

create table junta (
  id integer not null primary key,
  codigo integer not null,
  nombre TEXT not null,
  "zonaId" integer not null,
  FOREIGN KEY ("zonaId") REFERENCES zona (id)
) WITHOUT ROWID;

create table res_presidente (
  id integer not null primary key,
  cand_1 integer not null,
  cand_2 integer not null,
  cand_3 integer not null,
  cand_4 integer not null,
  cand_5 integer not null,
  cand_6 integer not null,
  cand_7 integer not null,
  cand_8 integer not null,
  cand_9 integer not null,
  cand_10 integer not null,
  cand_11 integer not null,
  cand_12 integer not null,
  cand_13 integer not null,
  cand_14 integer not null,
  cand_15 integer not null,
  cand_16 integer not null,
  total_suf integer not null,
  blanco integer not null,
  nulo integer not null,
  "juntaId" integer not null,
  FOREIGN KEY ("juntaId") REFERENCES junta (id)
) WITHOUT ROWID;

create table pob_cantones (
  codigo integer not null primary key,
  nombre TEXT not null,
  no_pobres integer not null,
  pobres integer not null,
  total integer not null,
  "cantonId" integer not null,
  FOREIGN KEY ("cantonId") REFERENCES canton (id)
) WITHOUT ROWID;

create table pob_parroquias (
  codigo integer not null primary key,
  nombre TEXT not null,
  no_pobres integer not null,
  pobres integer not null,
  total integer not null,
  "parroquiaId" integer not null,
  FOREIGN KEY ("parroquiaId") REFERENCES parroquia (id)
) WITHOUT ROWID;
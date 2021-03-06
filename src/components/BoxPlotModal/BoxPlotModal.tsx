import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Plot from "react-plotly.js";
import { useMemo } from "react";
import alasql from "alasql";
import { mapObject, allIndexes } from "../../utils/helpers";
import { PresidentMap } from "../../utils/constants";

export interface BoxPlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  ids: string[];
}

interface JuntaResult {
  cand_1: number;
  cand_2: number;
  cand_3: number;
  cand_4: number;
  cand_5: number;
  cand_6: number;
  cand_7: number;
  cand_8: number;
  cand_9: number;
  cand_10: number;
  cand_11: number;
  cand_12: number;
  cand_13: number;
  cand_14: number;
  cand_15: number;
  cand_16: number;
  blanco: number;
  nulo: number;
  total_suf: number;
  codigo: number;
  junta: string;
  zona: string;
  zona_id: string;
  parroquia: string;
  canton: string;
  circunscripcion: string;
  provincia: string;
}

interface CandResult {
  results: number[];
  info: string[];
}
type ParsedResult = {
  cand_1: CandResult;
  cand_2: CandResult;
  cand_3: CandResult;
  cand_4: CandResult;
  cand_5: CandResult;
  cand_6: CandResult;
  cand_7: CandResult;
  cand_8: CandResult;
  cand_9: CandResult;
  cand_10: CandResult;
  cand_11: CandResult;
  cand_12: CandResult;
  cand_13: CandResult;
  cand_14: CandResult;
  cand_15: CandResult;
  cand_16: CandResult;
};

const TableAbbrMap = {
  0: "pr",
  1: "cr",
  2: "c",
  3: "p",
  4: "z",
  5: "j",
};

const TableMap: Record<number, string> = {
  0: "provincia",
  1: "circunscripcion",
  2: "canton",
  3: "parroquia",
  4: "zona",
  5: "junta",
};

const BoxPlotModal: React.FC<BoxPlotModalProps> = ({
  isOpen,
  onClose,
  ids,
}) => {
  const [provId, cirId, cantonId, parrId, zonaId, juntaId] = ids;

  const results = useMemo(() => {
    const id = ids.reduceRight((prev, current) => prev || current);
    const indexes = allIndexes(ids, id);
    //@ts-ignore
    const table = TableAbbrMap[indexes[indexes.length - 1]];
    return alasql(`
    SELECT cand_1,
    cand_2,
    cand_3,
    cand_4,
    cand_5,
    cand_6,
    cand_7,
    cand_8,
    cand_9,
    cand_10,
    cand_11,
    cand_12,
    cand_13,
    cand_14,
    cand_15,
    cand_16,
    blanco,
    nulo,
    total_suf,
    j.codigo       codigo,
    j.nombre       junta,
    TRIM(z.nombre) zona,
    z.id           zona_id,
    p.nombre       parroquia,
    c.nombre       canton,
    cr.nombre      circunscripcion,
    pr.nombre      provincia
FROM res_presidente
      JOIN junta j ON res_presidente.juntaId = j.id
      JOIN zona z ON j.zonaId = z.id
      JOIN parroquia p ON z.parroquiaId = p.id
      JOIN canton c ON p.cantonId = c.id
      LEFT JOIN circunscripcion cr ON c.cirId = cr.id
      JOIN provincia pr ON c.provinciaId = pr.id
WHERE ${table}.id = ${id}
ORDER BY res_presidente.juntaId
`) as JuntaResult[];
  }, [provId, cirId, cantonId, parrId, zonaId, juntaId]);

  const data = useMemo(() => {
    const parsed = results.reduce<ParsedResult>(
      (obj, result) => {
        for (let i = 1; i <= 16; i++) {
          //@ts-ignore
          obj[`cand_${i}`].results.push(result[`cand_${i}`]);
          //@ts-ignore
          obj[`cand_${i}`].info.push([
            "Provincia: " + result.provincia,
            "Circunscripción: " + (result.circunscripcion || "N/A"),
            "Cantón: " + result.canton,
            "Zona: " + result.zona,
            "Junta: " + result.junta,
            "Código: " + result.codigo,
          ]);
        }
        return obj;
      },
      {
        cand_1: { results: [], info: [] },
        cand_2: { results: [], info: [] },
        cand_3: { results: [], info: [] },
        cand_4: { results: [], info: [] },
        cand_5: { results: [], info: [] },
        cand_6: { results: [], info: [] },
        cand_7: { results: [], info: [] },
        cand_8: { results: [], info: [] },
        cand_9: { results: [], info: [] },
        cand_10: { results: [], info: [] },
        cand_11: { results: [], info: [] },
        cand_12: { results: [], info: [] },
        cand_13: { results: [], info: [] },
        cand_14: { results: [], info: [] },
        cand_15: { results: [], info: [] },
        cand_16: { results: [], info: [] },
      }
    );
    return mapObject(parsed, (cand, key) => ({
      type: "box",
      y: cand.results,
      marker: {
        color: "rgb(8,81,156)",
        outliercolor: "rgba(219, 64, 82, 0.6)",
        line: {
          outliercolor: "rgba(219, 64, 82, 1.0)",
          outlierwidth: 2,
        },
      },
      name: PresidentMap[key],
      text: cand.info,
      boxpoints: "suspectedoutliers",
    })) as any;
  }, [results]);

  const names = useMemo(() => {
    return ids.reduce<string[]>(
      (arr, id, index) => [
        ...arr,
        id
          ? alasql(`SELECT nombre FROM ${TableMap[index]} WHERE id = ${id}`)[0]
              .nombre
          : null,
      ],
      []
    );
  }, [provId, cirId, cantonId, parrId, zonaId, juntaId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Diagrama de Caja: Resultados Presidenciales Ecuador 2021
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody d="flex">
          <Plot
            data={data}
            layout={{
              title: names.reduce(
                (str, name) => `${str} -> ${name ? name : "N/A"}`,
                "JUNTA "
              ),
            }}
            style={{ flex: 1 }}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BoxPlotModal;

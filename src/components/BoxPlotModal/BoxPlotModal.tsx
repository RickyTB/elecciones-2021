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
    //@ts-ignore
    const table = TableAbbrMap[ids.indexOf(id)];
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
    return results.map((result) => ({
      type: "box",
      y: [
        result.cand_1,
        result.cand_2,
        result.cand_3,
        result.cand_4,
        result.cand_5,
        result.cand_6,
        result.cand_7,
        result.cand_8,
        result.cand_9,
        result.cand_10,
        result.cand_11,
        result.cand_12,
        result.cand_13,
        result.cand_14,
        result.cand_15,
        result.cand_16,
      ],
      marker: {
        color: "rgb(8,81,156)",
        outliercolor: "rgba(219, 64, 82, 0.6)",
        line: {
          outliercolor: "rgba(219, 64, 82, 1.0)",
          outlierwidth: 2,
        },
      },
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

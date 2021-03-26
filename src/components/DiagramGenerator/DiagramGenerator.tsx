import { Box, Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";
import React, { useReducer } from "react";
import { DBSelect } from "../DBSelect";
import { BoxPlotBody } from "../BoxPlotBody";
import { ChevronRightIcon } from "@chakra-ui/icons";

export interface DiagramGeneratorProps {}

const WithCir = ["9", "13", "17"];

const initialState = ["", "", "", "", "", ""];

enum IndexPosition {
  Provincia = 0,
  Circunscripcion = 1,
  Canton = 2,
  Parroquia = 3,
  Zona = 4,
  Junta = 5,
}
interface Action {
  position: IndexPosition;
  value: string;
}

const reducer = (state: typeof initialState, action: Action) =>
  state.map((current, index) =>
    index === action.position
      ? action.value
      : index > action.position
      ? ""
      : current
  );

const DiagramGenerator: React.FC<DiagramGeneratorProps> = () => {
  const [ids, dispatch] = useReducer(reducer, initialState);

  const handleChange = (position: IndexPosition) => (evt: any) =>
    dispatch({ position, value: evt.target.value });

  return (
    <>
      <Breadcrumb
        mt={4}
        mb={2}
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <DBSelect
            tableName="provincia"
            value={ids[IndexPosition.Provincia]}
            onChange={handleChange(IndexPosition.Provincia)}
            placeholder="Seleccione una provincia"
            label="Provincia"
          />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <DBSelect
            tableName="circunscripcion"
            value={ids[IndexPosition.Circunscripcion]}
            onChange={handleChange(IndexPosition.Circunscripcion)}
            placeholder="Seleccione una circunscripción"
            label="Circunscripción"
            fkTable="provincia"
            fk={ids[IndexPosition.Provincia]}
            isDisabled={!WithCir.includes(ids[IndexPosition.Provincia])}
          />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <DBSelect
            tableName="canton"
            value={ids[IndexPosition.Canton]}
            onChange={handleChange(IndexPosition.Canton)}
            placeholder="Todos"
            label="Cantón"
            fkTable="provincia"
            fk={ids[IndexPosition.Provincia]}
            isDisabled={!ids[IndexPosition.Provincia]}
            cirId={ids[IndexPosition.Circunscripcion]}
          />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <DBSelect
            tableName="parroquia"
            value={ids[IndexPosition.Parroquia]}
            onChange={handleChange(IndexPosition.Parroquia)}
            label="Parroquia"
            fkTable="canton"
            fk={ids[IndexPosition.Canton]}
            isDisabled={!ids[IndexPosition.Canton]}
          />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <DBSelect
            tableName="zona"
            value={ids[IndexPosition.Zona]}
            onChange={handleChange(IndexPosition.Zona)}
            label="Zona"
            fkTable="parroquia"
            fk={ids[IndexPosition.Parroquia]}
            isDisabled={!ids[IndexPosition.Parroquia]}
          />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <DBSelect
            tableName="junta"
            value={ids[IndexPosition.Junta]}
            onChange={handleChange(IndexPosition.Junta)}
            label="Junta"
            fkTable="zona"
            fk={ids[IndexPosition.Zona]}
            isDisabled={!ids[IndexPosition.Zona]}
          />
        </BreadcrumbItem>
      </Breadcrumb>
      {ids[IndexPosition.Provincia] ? (
        <BoxPlotBody ids={ids} />
      ) : (
        <Box d="flex" justifyContent="center" alignItems="center" flex={1}>
          <Text color="blackAlpha.700">
            Seleccione una provincia para comenzar
          </Text>
        </Box>
      )}
    </>
  );
};

export default DiagramGenerator;

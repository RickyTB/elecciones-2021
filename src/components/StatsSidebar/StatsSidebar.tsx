import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useInput } from "../../hooks/use-input";
import { DBSelect } from "../DBSelect";

export interface StatsSidebarProps {}

const WithCir = ["9", "13", "17"];

const StatsSidebar: React.FC<StatsSidebarProps> = () => {
  const [provId, onProvIdChange, setProvId] = useInput();
  const [cirId, onCirIdChange] = useInput();
  const [cantonId, onCantonIdChange, setCantonId] = useInput();
  const [parrId, onParrIdChange, setParrId] = useInput();
  const [zonaId, onZonaIdChange, setZonaId] = useInput();
  const [juntaId, onJuntaIdChange, setJuntaId] = useInput();

  return (
    <Box bg="white" w="md" boxShadow="base" p={4}>
      <Heading size="lg" mb={4}>
        Detalles
      </Heading>

      <DBSelect
        tableName="provincia"
        value={provId}
        onChange={onProvIdChange}
        placeholder="Seleccione una provincia"
        label="Provincia"
      />

      {WithCir.includes(provId) && (
        <DBSelect
          tableName="circunscripcion"
          value={cirId}
          onChange={onCirIdChange}
          placeholder="Seleccione una circunscripción"
          label="Circunscripción"
          fkTable="provincia"
          fk={provId}
        />
      )}

      <DBSelect
        tableName="canton"
        value={cantonId}
        onChange={onCantonIdChange}
        placeholder="Seleccione un cantón"
        label="Cantón"
        fkTable="provincia"
        fk={provId}
        isDisabled={!provId}
      />

      <DBSelect
        tableName="parroquia"
        value={parrId}
        onChange={onParrIdChange}
        label="Parroquia"
        fkTable="canton"
        fk={cantonId}
        isDisabled={!cantonId}
      />

      <DBSelect
        tableName="zona"
        value={zonaId}
        onChange={onZonaIdChange}
        label="Zona"
        fkTable="parroquia"
        fk={parrId}
        isDisabled={!parrId}
      />

      <DBSelect
        tableName="junta"
        value={juntaId}
        onChange={onJuntaIdChange}
        label="Junta"
        fkTable="zona"
        fk={zonaId}
        isDisabled={!zonaId}
      />
    </Box>
  );
};

export default StatsSidebar;

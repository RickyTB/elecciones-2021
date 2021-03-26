import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useMemo } from "react";
import alasql from "alasql";

export interface DBSelectProps {
  tableName: string;
  fk?: number | string;
  fkTable?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
  label: string;
  isDisabled?: boolean;
  cirId?: number | string;
}

const DBSelect: React.FC<DBSelectProps> = ({
  tableName,
  fkTable,
  fk,
  value,
  onChange,
  placeholder = "Todas",
  label,
  isDisabled = false,
  cirId,
}) => {
  const options = useMemo(() => {
    if (isDisabled) return [];
    const query = `SELECT ${tableName}.id, ${tableName}.nombre FROM ${tableName} 
    ${
      fk
        ? `JOIN ${fkTable} ON ${tableName}.${fkTable}Id = ${fkTable}.id WHERE ${fkTable}.id = ${fk}`
        : ""
    } ${cirId ? `AND ${tableName}.cirId = ${cirId}` : ""}`;
    return alasql(query);
  }, [isDisabled, fk, cirId]);

  return (
    <FormControl id={`form-${tableName}`} mb={4} isDisabled={isDisabled}>
      <FormLabel fontWeight="bold" mb={0}>{label}</FormLabel>
      <Select placeholder={placeholder} onChange={onChange} value={value} bg="white">
        {options.map((option: any) => (
          <option value={option.id} key={option.id}>
            {option.nombre}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default DBSelect;

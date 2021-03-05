import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { HeatMapType } from "../../enums";

export interface ToolbarProps {
  className?: string;
  heatMapType: HeatMapType;
  onHeatMapChange: (type: HeatMapType) => void;
}

const titles: Record<HeatMapType, string> = {
  [HeatMapType.Poverty]: "Pobreza",
  [HeatMapType.PresidentialResults]: "Resultados presidenciales",
};

const Toolbar: React.FC<ToolbarProps> = ({ heatMapType, onHeatMapChange }) => {
  const bg = useColorModeValue("brand.600", "brand.300");
  const color = useColorModeValue("white", "gray.800");
  return (
    <Flex
      as="nav"
      p={2}
      justify="space-between"
      bg={bg}
      position="fixed"
      top="0"
      left="0"
      right="0"
      boxShadow="sm"
      zIndex="sticky"
    >
      <Box p="2">
        <Heading size="md" color={color}>
          Elecciones 2021
        </Heading>
      </Box>
      <Box>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {titles[heatMapType]}
          </MenuButton>
          <MenuList>
            {(Object.keys(titles) as HeatMapType[]).map((key) => (
              <MenuItem key={key} onClick={() => onHeatMapChange(key)}>
                {titles[key]}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Toolbar;

import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BsCalendarFill, BsListTask } from "react-icons/bs";

export interface ToolbarProps {
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = () => {
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
          Mapa de Elecciones
        </Heading>
      </Box>
      <Box>
        <ButtonGroup isAttached variant="solid" colorScheme="gray">
          <IconButton
            aria-label="Show calendar"
            icon={<Icon as={BsCalendarFill} />}
          />
          <IconButton aria-label="Show list" icon={<Icon as={BsListTask} />} />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default Toolbar;

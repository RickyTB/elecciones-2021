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
import { Page } from "../../enums";
import { BiMapAlt } from "react-icons/bi";
import { AiOutlineBoxPlot } from "react-icons/ai";

export interface ToolbarProps {
  className?: string;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ currentPage, onPageChange }) => {
  const bg = useColorModeValue("brand.600", "brand.300");
  const color = useColorModeValue("white", "gray.800");
  return (
    <Flex
      as="nav"
      p={2}
      justify="space-between"
      bg={bg}
      width="full"
      boxShadow="sm"
      zIndex="sticky"
    >
      <Box p="2">
        <Heading size="md" color={color}>
          Elecciones 2021
        </Heading>
      </Box>
      <Box>
        <ButtonGroup isAttached variant="solid" colorScheme="teal">
          <IconButton
            title="Mostrar mapa"
            isActive={currentPage === Page.MapPage}
            aria-label="Show map"
            icon={<Icon as={BiMapAlt} />}
            onClick={() => onPageChange(Page.MapPage)}
          />
          <IconButton
            title="Mostrar diagrama"
            isActive={currentPage === Page.DiagramPage}
            aria-label="Show diagram"
            icon={<Icon as={AiOutlineBoxPlot} />}
            onClick={() => onPageChange(Page.DiagramPage)}
          />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default Toolbar;

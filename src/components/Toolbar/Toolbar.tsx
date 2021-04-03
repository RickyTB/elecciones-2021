import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Page } from "../../enums";
import { BiMapAlt } from "react-icons/bi";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiOutlineBoxPlot,
} from "react-icons/ai";

export interface ToolbarProps {
  className?: string;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ currentPage, onPageChange }) => {
  const bg = useColorModeValue("brand.600", "brand.300");
  const color = useColorModeValue("white", "gray.800");
  return (
    <Flex as="nav" p={2} bg={bg} width="full" boxShadow="sm" zIndex="sticky">
      <Box p="2">
        <Heading size="md" color={color}>
          Elecciones 2021
        </Heading>
      </Box>
      <Box flex={1}>
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
      <Box d="flex" alignItems="center">
        <Link
          href="https://github.com/RickyTB/elecciones-2021"
          title="GitHub"
          aria-label="GitHub repository"
          isExternal
          mr="1"
        >
          <Icon
            as={AiFillGithub}
            boxSize="1.8em"
            fill="gray.800"
            fillOpacity={0.8}
            _hover={{ fillOpacity: 1 }}
          />
        </Link>
        <Link
          href="https://twitter.com/RocordoB"
          title="Twitter"
          aria-label="Twitter page"
          isExternal
        >
          <Icon
            as={AiFillTwitterCircle}
            boxSize="1.8em"
            fill="gray.800"
            fillOpacity={0.8}
            _hover={{ fillOpacity: 1 }}
          />
        </Link>
      </Box>
    </Flex>
  );
};

export default Toolbar;

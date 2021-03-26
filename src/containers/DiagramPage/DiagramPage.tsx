import { DiagramGenerator } from "../../components";
import { Heading, Box } from "@chakra-ui/react";

export interface DiagramPageProps {}

const DiagramPage: React.FC<DiagramPageProps> = () => {
  return (
    <Box p={4} d="flex" flexDir="column" h="100vh">
      <Heading size="lg">Generador de Diagrama de Caja</Heading>
      <DiagramGenerator />
    </Box>
  );
};

export default DiagramPage;

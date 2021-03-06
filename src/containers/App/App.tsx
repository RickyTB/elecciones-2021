import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Layout } from "../../components";
import { colors, fonts, styles } from "../../theme";
import { MapPage } from "../MapPage";

const theme = extendTheme({ colors, fonts, styles });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <MapPage />
      </Layout>
    </ChakraProvider>
  );
}

export default App;

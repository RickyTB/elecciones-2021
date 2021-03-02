import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { Layout, Map } from "../../components";
import { colors, fonts, styles } from "../../theme";

const theme = extendTheme({ colors, fonts, styles });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Box bg="white" borderRadius="lg" p={4}>
          <Map />
        </Box>
      </Layout>
    </ChakraProvider>
  );
}

export default App;

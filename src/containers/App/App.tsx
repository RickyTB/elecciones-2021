import { ChakraProvider, extendTheme, Text } from "@chakra-ui/react";
import { Layout } from "../../components";
import { colors, fonts, styles } from "../../theme";
import { DiagramPage } from "../DiagramPage";
import { MapPage } from "../MapPage";
import { useEffect, useState } from "react";
import { Page } from "../../enums";
import { initDb } from "../../bin";

const theme = extendTheme({ colors, fonts, styles });

const pages = {
  [Page.MapPage]: <MapPage />,
  [Page.DiagramPage]: <DiagramPage />,
};

function App() {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(Page.MapPage);
  useEffect(() => {
    initDb().then(() => setReady(true));
  }, []);
  return (
    <ChakraProvider theme={theme}>
      {ready ? (
        <Layout currentPage={page} onPageChange={setPage}>
          {pages[page]}
        </Layout>
      ) : (
        <Text>Cargando...</Text>
      )}
    </ChakraProvider>
  );
}

export default App;

import React from "react";
import { Toolbar } from "../Toolbar";
import { Box } from "@chakra-ui/react";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box d="flex" flexDirection="column" height="100vh">
      {/*<Toolbar heatMapType={heatMap} onHeatMapChange={setHeatMap} />*/}
      {children}
    </Box>
  );
};

export default Layout;

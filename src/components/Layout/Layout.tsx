import { Container } from "@chakra-ui/react";
import React from "react";
import { Toolbar } from "../Toolbar";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Toolbar />
      <Container maxW="container.xl">{children}</Container>
    </>
  );
};

export default Layout;

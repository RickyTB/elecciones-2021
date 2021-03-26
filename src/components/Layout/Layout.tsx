import React from "react";
import { Toolbar } from "../Toolbar";
import { Box } from "@chakra-ui/react";
import { Page } from "../../enums";

export interface LayoutProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentPage,
  onPageChange,
}) => {
  return (
    <Box d="flex" flexDirection="column" height="100vh">
      <Toolbar currentPage={currentPage} onPageChange={onPageChange} />
      {children}
    </Box>
  );
};

export default Layout;

import React from "react";
import { Toolbar } from "../Toolbar";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
};

export default Layout;

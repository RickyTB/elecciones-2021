import { Toolbar } from "../Toolbar";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="p-8 bg-primary-100">{children}</div>
      <div className="h-full">2</div>
    </div>
  );
};

export default Layout;

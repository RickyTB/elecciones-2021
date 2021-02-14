import { Toolbar } from "../Toolbar";

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="p-8 bg-map-bg flex-1">{children}</div>
      <div className="h-32 shadow-2xl">Filtros</div>
    </div>
  );
};

export default Layout;

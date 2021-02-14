import clsx from "clsx";

export interface ToolbarProps {
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ className }) => {
  return (
    <nav className={clsx("bg-map-bg text-neutral-50 p-3 shadow-md", className)}>
      <h1 className="text-2xl font-bold">MAPA DE ELECCIONES</h1>
    </nav>
  );
};

export default Toolbar;

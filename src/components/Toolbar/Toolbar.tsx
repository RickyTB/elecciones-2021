import clsx from "clsx";

export interface ToolbarProps {
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ className }) => {
  return (
    <nav className={clsx("bg-primary-600 text-neutral-50 p-3", className)}>
      <h4 className="text-center text-xl font-semibold">MAPA DE ELECCIONES</h4>
    </nav>
  );
};

export default Toolbar;

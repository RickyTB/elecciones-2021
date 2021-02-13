export interface ProvinceProps {
  path: string;
}

const Province: React.FC<ProvinceProps> = ({ path }) => {
  return <path d={path} />;
};

export default Province;

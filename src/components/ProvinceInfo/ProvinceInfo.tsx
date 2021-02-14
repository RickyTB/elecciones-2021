export interface ProvinceInfoProps {
  code: string;
}

const ProvinceInfo: React.FC<ProvinceInfoProps> = ({ code }) => {
  return (
    <div className="bg-plain rounded p-3">
      <h4>{code}</h4>
      <p>Descripción y gráficos...</p>
    </div>
  );
};

export default ProvinceInfo;

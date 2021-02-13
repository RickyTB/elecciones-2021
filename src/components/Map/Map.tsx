import { mapObject } from "../../utils/helpers";
import { PROVINCES } from "../../utils/provinces";
import { Province } from "../Province";

export interface MapProps {}

const Map: React.FC<MapProps> = () => {
  return (
    <svg viewBox="0 0 792.75824 307.7699">
      {mapObject(PROVINCES, (province, code) => (
        <Province path={province.path} key={code} />
      ))}
    </svg>
  );
};

export default Map;

import { mapObject } from "../../utils/helpers";
import { PROVINCES } from "../../utils/provinces";
import { Province } from "../Province";
import ReactTooltip from "react-tooltip";
import { useCallback } from "react";

export interface MapProps {}

const Map: React.FC<MapProps> = () => {
  const handleTooltip = useCallback((evt) => {
    setTimeout(() => {
      ReactTooltip.hide(evt.target);
    }, 2000);
  }, []);

  return (
    <>
      <svg viewBox="0 0 792.75824 307.7699">
        {mapObject(PROVINCES, (province, code) => (
          <Province
            path={province.path}
            key={code}
            title={province.title}
            code={code as string}
          />
        ))}
      </svg>
      <ReactTooltip effect="solid" afterShow={handleTooltip} />
    </>
  );
};

export default Map;

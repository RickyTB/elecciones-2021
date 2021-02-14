import { useState } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { ProvinceInfo } from "../ProvinceInfo";
import clsx from "clsx";

export interface ProvinceProps {
  path: string;
  title: string;
  code: string;
}

const Province: React.FC<ProvinceProps> = ({ path, title, code }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover
      isOpen={isPopoverOpen}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={"white"}
          arrowSize={10}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <ProvinceInfo code={code} />
        </ArrowContainer>
      )}
    >
      <path
        data-tip={title}
        d={path}
        className={clsx("cursor-pointer", {
          "stroke-default fill-default hover:stroke-secondary hover:fill-secondary": !isPopoverOpen,
          "stroke-secondary fill-secondary": isPopoverOpen,
        })}
        onClick={() => setIsPopoverOpen((v) => !v)}
      />
    </Popover>
  );
};

export default Province;

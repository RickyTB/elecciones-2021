import { Flex } from "@chakra-ui/react";
import { ColorBox } from "../ColorBox";
import { HeatMap } from "../../heatmaps";

export interface ColorGuideProps {
  heatMap: HeatMap;
}

const ColorGuide: React.FC<ColorGuideProps> = ({ heatMap }) => {
  return (
    <Flex
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex="banner"
      flexDir="row"
      justifyContent="space-evenly"
      alignItems="stretch"
    >
      {heatMap.props.map((props, index) => (
        <ColorBox {...props} key={index} />
      ))}
    </Flex>
  );
};

export default ColorGuide;

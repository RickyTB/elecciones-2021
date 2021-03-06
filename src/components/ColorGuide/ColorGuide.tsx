import { Box, Flex } from "@chakra-ui/react";
import { ColorBox } from "../ColorBox";
import { HeatMap } from "../../heatmaps";
import React from "react";

export interface ColorGuideProps {
  heatMap: HeatMap;
}

const ColorGuide: React.FC<ColorGuideProps> = ({ heatMap }) => (
  <Box width="full" zIndex="banner" boxShadow="base" overflow="auto">
    <Flex
      flexDir="row"
      justifyContent="space-evenly"
      alignItems="stretch"
      minW="1080px"
      width="100%"
    >
      {heatMap.props.map((props, index) => (
        <ColorBox {...props} key={index} />
      ))}
    </Flex>
  </Box>
);

export default ColorGuide;

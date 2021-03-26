import {
  Box,
  Checkbox,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export interface HeatMapControlProps {
  active: boolean;
  opacity: number;
  title: string;
  onActiveChange(value: boolean): void;
  onOpacityChange(value: number): void;
}

const HeatMapControl = React.forwardRef<HTMLDivElement, HeatMapControlProps>(
  (
    { active, opacity, title, onActiveChange, onOpacityChange, ...props },
    ref
  ) => {
    const handleActiveChange = (evt: any) => onActiveChange(evt.target.checked);

    return (
      <Box
        mb={4}
        borderWidth="1px"
        borderRadius="lg"
        py={2}
        px={4}
        bg="white"
        _hover={{ shadow: "sm" }}
        ref={ref}
        {...props}
      >
        <Checkbox
          size="lg"
          colorScheme="brand"
          checked={active}
          defaultChecked={active}
          mb={2}
          onChange={handleActiveChange}
        >
          {title}
        </Checkbox>
        <Text as="label" fontSize="sm" d="block" color="blackAlpha.800">
          Opacidad
        </Text>
        <Slider
          contentEditable
          aria-label="slider-ex-2"
          colorScheme="teal"
          value={opacity}
          min={0}
          max={1}
          step={0.1}
          onChange={onOpacityChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    );
  }
);

export default HeatMapControl;

import { Box, Heading, Text } from "@chakra-ui/react";

export interface ColorBoxProps {
  title: string;
  subtitle: string;
  bg: string;
  color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ title, subtitle, bg, color }) => {
  return (
    <Box bg={bg} color={color} flex="1" px={3} py={2}>
      <Heading as="h3" size="sm">
        {title}
      </Heading>
      <Text fontSize="sm">{subtitle}</Text>
    </Box>
  );
};

export default ColorBox;

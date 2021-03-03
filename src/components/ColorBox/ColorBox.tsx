import { Box, Heading, Text } from "@chakra-ui/react";

export interface ColorBoxProps {
  title: string;
  subtitle: string;
  bg: string;
  color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ title, subtitle, bg, color }) => {
  return (
    <Box bg={bg} color={color} flex="1" p={3}>
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <Text>{subtitle}</Text>
    </Box>
  );
};

export default ColorBox;

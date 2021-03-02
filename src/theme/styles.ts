import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props: any) => ({
    body: {
      bg: mode("gray.100", "gray.800")(props),
    },
  }),
};

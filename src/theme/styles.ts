import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props: any) => ({
    body: {
      bg: mode("#f9f9fa", "gray.800")(props),
    },
  }),
};

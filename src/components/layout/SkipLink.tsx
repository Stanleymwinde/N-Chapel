import { ChA } from "@/components/primitives";


export function SkipLink() {
  return (
    <ChA
      href="#main"
      position="absolute"
      left="4"
      top="-100px"
      zIndex="skipLink"
      px="5"
      py="3"
      bg="brand.solid"
      color="white"
      fontWeight="600"
      borderRadius="md"
      _focus={{ position: "fixed", top: "4", zIndex: "9999" }}
    >
      Skip to main content
    </ChA>
  );
}

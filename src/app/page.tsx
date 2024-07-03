import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <VStack minH="100vh" spacing={0}>
      <Header />
      <Flex flex={1} justify="center" align="center" w="100%">
        <Box w="90%" maxW="1200px">
          <Image src="/nomi-spot_top.png" alt="nomi-spotイメージ画像" />
        </Box>
      </Flex>
      <Footer />
    </VStack>
  );
}

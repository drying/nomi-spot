import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Store() {
  return (
    <>
      <Header />
      <Flex justifyContent="center" w="100vw" h="100vh">
        <Flex w="80%" h="50%" p={8} bg="gray.100" rounded="lg" boxShadow="lg">
          <Flex>
            {/* 写真の比率を保ったまま表示させる */}
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              w="50%"
              h="100%"
              mr={4}
            />
            <Stack>
              <Text fontSize="md">お店の名前: 〇〇飯店</Text>
              <Text fontSize="md">住所: 大阪府大阪市中央区〇〇２−２−２</Text>
              <Text fontSize="md">instagram: </Text>
              <Text fontSize="md">食べログ: </Text>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

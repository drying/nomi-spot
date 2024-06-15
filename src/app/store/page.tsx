import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Store() {
  return (
    <>
      <Header />
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="100vw"
        minH="100vh"
      >
        <Flex
          w="80%"
          h="50%"
          p={8}
          bg="gray.100"
          rounded="lg"
          boxShadow="lg"
          mb={8}
        >
          <Flex>
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              objectFit="cover"
              w="50%"
              h="100%"
              mr={4}
            />
            <Stack>
              <Heading mb={2}>〇〇飯店</Heading>
              <Text fontSize="md">住所: 大阪府大阪市中央区〇〇２−２−２</Text>
              <Text fontSize="md">instagram: </Text>
              <Text fontSize="md">食べログ: </Text>
            </Stack>
          </Flex>
        </Flex>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Heading mb={8}>instagram APIで画像取得</Heading>
          <Flex justifyContent="center" flexWrap="wrap">
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              objectFit="cover"
              w="18%"
              h="auto"
              mr={4}
              mb={6}
            />
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              objectFit="cover"
              w="18%"
              h="auto"
              mr={4}
              mb={6}
            />
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              objectFit="cover"
              w="18%"
              h="auto"
              mr={4}
              mb={6}
            />
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              objectFit="cover"
              w="18%"
              h="auto"
              mr={4}
              mb={6}
            />
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              objectFit="cover"
              w="18%"
              h="auto"
              mr={4}
              mb={6}
            />
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              objectFit="cover"
              w="18%"
              h="auto"
              mr={4}
              mb={6}
            />
            <Image
              src="/profile.jpg"
              alt="お店の画像"
              objectFit="cover"
              w="18%"
              h="auto"
              mr={4}
              mb={6}
            />
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

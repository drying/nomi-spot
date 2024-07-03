import { Flex, Heading, Image, Stack, Text, Link } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getStoreById } from "@/app/utils/getStoreUtils";

interface StorePageProps {
  params: {
    id: string;
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const storeData = await getStoreById(params.id);

  if (!storeData) {
    return <div>お店が見つかりません</div>;
  }

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
              <Heading mb={2}>{storeData.name}</Heading>
              <Text fontSize="md">住所: {storeData.address}</Text>
              <Text fontSize="md">電話番号: {storeData.phone}</Text>
              <Flex fontSize="md">
                <Text>場所: </Text>
                <Link href={storeData.place} isExternal color="blue.500" ml={1}>
                  {storeData.place}
                </Link>
              </Flex>
              <Flex fontSize="md">
                <Text>instagram: </Text>
                <Link
                  href={storeData.instagram}
                  isExternal
                  color="blue.500"
                  ml={1}
                >
                  {storeData.instagram}
                </Link>
              </Flex>
              <Flex fontSize="md">
                <Text>食べログ: </Text>
                <Link
                  href={storeData.tabelog}
                  isExternal
                  color="blue.500"
                  ml={1}
                >
                  {storeData.tabelog}
                </Link>
              </Flex>
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

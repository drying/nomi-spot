"use client";
import { useRouter } from "next/navigation";
import { StoreData } from "../types/types";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import StoreCard from "./StoreCard";
import Header from "./Header";
import Footer from "./Footer";

interface StoresListProps {
  stores: StoreData[];
}

export default function StoreList({ stores }: StoresListProps) {
  const router = useRouter();

  console.log("StoreList received stores:", stores); //デバック用

  return (
    <>
      <Header />
      <Container flex="1" maxW="container.xl" py={4}>
        <Heading as="h2" mb={8}>
          お店一覧
        </Heading>
        <Flex
          direction="column"
          flex="1"
          maxH="800px"
          p={2}
          mb={6}
          overflow="auto"
          rounded="md"
          bgColor="gray.50"
          boxShadow="md"
        >
          <SimpleGrid minChildWidth="390px" spacing="20px">
            {stores.map((store) => {
              console.log("Rendering store:", store); //デバック用
              return (
                <Box key={store.id} mb={2}>
                  <StoreCard
                    storeData={store}
                    isCompact={true}
                    onActionClick={() => router.push(`store/${store.id}`)}
                  />
                </Box>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}

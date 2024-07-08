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
        <Heading as="h2" mb={2}>
          お店一覧
        </Heading>
        <Box p={2} mb={6} overflow="auto">
          <SimpleGrid minChildWidth="390px" spacing="40px">
            {stores.map((store) => {
              console.log("Rendering store:", store); //デバック用
              return (
                <Box key={store.id} mb={4} h="140px">
                  <StoreCard
                    storeData={store}
                    isCompact={false}
                    onActionClick={() => router.push(`store/${store.id}`)}
                  />
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

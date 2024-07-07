"use client";
import { useRouter } from "next/navigation";
import { StoreData } from "../types/types";
import {
  Box,
  Center,
  Container,
  Heading,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import StoreCard from "./StoreCard";
import Header from "./Header";

interface StoresListProps {
  stores: StoreData[];
}

export default function StoreList({ stores }: StoresListProps) {
  const router = useRouter();

  console.log("StoreList received stores:", stores); //デバック用

  return (
    <>
      <Header />
      <Container>
        <Heading mb={2}>お店一覧</Heading>
        <Wrap spacing="30px">
          <WrapItem>
            <Center>
              {stores.map((store) => {
                console.log("Rendering store:", store); //デバック用
                return (
                  <Box key={store.id} mb={4}>
                    <StoreCard
                      storeData={store}
                      isCompact={false}
                      onActionClick={() => router.push(`store/${store.id}`)}
                    />
                  </Box>
                );
              })}
            </Center>
          </WrapItem>
        </Wrap>
      </Container>
    </>
  );
}

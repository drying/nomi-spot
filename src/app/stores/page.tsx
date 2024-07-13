"use client";
import StoreList from "./_components/StoreList";
import { useEffect, useState } from "react";
import { StoreData } from "../../types/types";
import { getAllStores } from "../../utils/getStoreUtils";
import { Box, Spinner, Text } from "@chakra-ui/react";

export default function StoresPage() {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storeData = await getAllStores();
        setStores(storeData);
      } catch (error) {
        console.error("お店情報取得エラー:", error);
        setError("お店の情報を取得できませんでした");
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  return <StoreList stores={stores} />;
}

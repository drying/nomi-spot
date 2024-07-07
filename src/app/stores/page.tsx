"use client";
import StoreList from "../components/StoreList";
import { useEffect, useState } from "react";
import { StoreData } from "../types/types";
import { getAllStores } from "../utils/getStoreUtils";

export default function StoresPage() {
  const [stores, setStores] = useState<StoreData[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storeData = await getAllStores();
        console.log("Fetched all stores:", storeData); //デバック用
        setStores(storeData);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  console.log("Rendering stores:", stores); //デバック用

  return <StoreList stores={stores} />;
}

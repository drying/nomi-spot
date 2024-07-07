import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { StoreData } from "../types/types";
import { db } from "./firebaseConfig";

export const getStoreData = async (): Promise<StoreData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "stores"));
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          name: doc.data().name,
          place: doc.data().place,
          instagram: doc.data().instagram,
        } as StoreData)
    );
  } catch (error) {
    console.error("お店情報を取得できませんでした", error);
    throw error;
  }
};

export const getStoreById = async (id: string): Promise<StoreData | null> => {
  try {
    const docRef = doc(db, "stores", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as StoreData;
    } else {
      console.log("お店データが見つかりませんでした");
      return null;
    }
  } catch (error) {
    console.error("お店情報を取得できませんでした", error);
    throw error;
  }
};

export const getAllStores = async (): Promise<StoreData[]> => {
  const storesCollection = collection(db, "stores");
  const storesSnapshot = await getDocs(storesCollection);
  return storesSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as StoreData)
  );
};

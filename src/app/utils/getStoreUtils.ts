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
          address: doc.data().address,
          phone: doc.data().phone,
          place: doc.data().place,
          instagram: doc.data().instagram,
          tabelog: doc.data().tabelog,
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
        name: docSnap.data().name,
        address: docSnap.data().address,
        phone: docSnap.data().phone,
        place: docSnap.data().place,
        instagram: docSnap.data().instagram,
        tabelog: docSnap.data().tabelog,
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

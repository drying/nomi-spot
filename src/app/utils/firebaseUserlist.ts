import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import {
  AddRemoveToListPrams,
  GetStoreByListPrams,
  MoveToListPrams,
  StoreData,
} from "../types/types";

// お店をリストに追加する関数
export async function addStoreToList({
  userId,
  storeId,
  listType,
}: AddRemoveToListPrams): Promise<void> {
  const listRef = doc(db, "users", userId, "lists", listType, storeId);
  await setDoc(listRef, { storeId, addedAt: new Date() });
}

// お店をリストから削除する関数
export async function removeStoreFromList({
  userId,
  storeId,
  listType,
}: AddRemoveToListPrams): Promise<void> {
  const listRef = doc(db, "users", userId, "lists", listType, storeId);
  await deleteDoc(listRef);
}

// お店をリスト間で移動する関数
export async function moveStoreToList({
  userId,
  storeId,
  fromListType,
  toListType,
}: MoveToListPrams): Promise<void> {
  await removeStoreFromList({ userId, storeId, listType: fromListType });
  await addStoreToList({ userId, storeId, listType: toListType });
}

// タブ毎のお店データ取得
export async function getStoreByList({
  userId,
  listType,
}: GetStoreByListPrams): Promise<StoreData[]> {
  try {
    const listRef = doc(db, "users", userId, "lists", listType);
    const listDocSnap = await getDoc(listRef);

    if (!listDocSnap.exists()) {
      console.log(`No ${listType} list found for user ${userId}`);
      return [];
    }

    let storeIds = listDocSnap.data().storeId;
    console.log(`Raw storeIDs for ${listType}:`, storeIds);

    if (!Array.isArray(storeIds)) {
      storeIds = storeIds ? [storeIds] : [];
    }

    console.log(`Processed storeIds for ${listType}:`, storeIds);

    if (storeIds.length === 0) {
      return [];
    }

    const storesQuery = query(
      collection(db, "stores"),
      where("__name__", "in", storeIds)
    );
    const storesSnapshot = await getDocs(storesQuery);

    const stores = storesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as StoreData)
    );

    console.log(`Fetched ${stores.length} stores for ${listType}`);
    return stores;
  } catch (error) {
    console.log("Error in getStoreByList", error);
    throw error;
  }
}

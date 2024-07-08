import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
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
  Status,
  StoreData,
} from "../types/types";

// お店をリストに追加する関数
export async function addStoreToList({
  userId,
  storeId,
  listType,
}: {
  userId: string;
  storeId: string;
  listType: Status;
}): Promise<{ success: boolean; message: string }> {
  try {
    const existingListType = await checkStoreExistsInAnyList(userId, storeId);

    if (existingListType) {
      if (existingListType === listType) {
        return {
          success: false,
          message: `このお店は既に${listType}リストに登録されています。`,
        };
      } else {
        return {
          success: false,
          message: `このお店は既に${existingListType}リストに登録されています。`,
        };
      }
    }

    const listRef = doc(
      db,
      "users",
      userId,
      "lists",
      listType,
      "storeId",
      storeId
    );
    await setDoc(listRef, {});
    return {
      success: true,
      message: `お店が${listType}リストに追加されました。`,
    };
  } catch (error) {
    console.error("Error adding store to list:", error);
    return {
      success: false,
      message: "エラーが発生しました。もう一度お試しください。",
    };
  }
}

// お店がすでに存在するかチェック
const LIST_TYPES: Status[] = ["wishlist", "visited", "favorite"];

async function checkStoreExistsInAnyList(
  userId: string,
  storeId: string
): Promise<Status | null> {
  for (const listType of LIST_TYPES) {
    const listRef = doc(
      db,
      "users",
      userId,
      "lists",
      listType,
      "storeId",
      storeId
    );
    const docSnap = await getDoc(listRef);
    if (docSnap.exists()) {
      return listType;
    }
  }
  return null;
}

// お店をリストから削除する関数
export async function removeStoreFromList({
  userId,
  storeId,
  listType,
}: AddRemoveToListPrams): Promise<void> {
  const listRef = doc(
    db,
    "users",
    userId,
    "lists",
    listType,
    "storeId",
    storeId
  );
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
    console.log(`Fetching list for user ${userId}, listType: ${listType}`);
    const storeIdsRef = collection(
      db,
      "users",
      userId,
      "lists",
      listType,
      "storeId"
    );
    const storeIdsSnapShot = await getDocs(storeIdsRef);

    if (storeIdsSnapShot.empty) {
      console.log(`No ${listType} list found for user ${userId}`);
      return [];
    }

    const storeIds = storeIdsSnapShot.docs.map((doc) => doc.id);
    console.log(`Processed storeIDs for ${listType}:`, storeIds);

    if (storeIds.length === 0) {
      return [];
    }

    // Firestoreの制限（IN句で10個まで）に対応
    const chunkSize = 10;
    let stores: StoreData[] = [];
    for (let i = 0; i < storeIds.length; i += chunkSize) {
      const chunk = storeIds.slice(i, i + chunkSize);
      const storesQuery = query(
        collection(db, "stores"), // ここでグローバルな"stores"コレクションを参照
        where(documentId(), "in", chunk)
      );
      console.log("Querying stores with IDs:", chunk);
      const chunkSnapshot = await getDocs(storesQuery);
      console.log(`Found ${chunkSnapshot.size} stores in this chunk`);
      stores = stores.concat(
        chunkSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as StoreData)
        )
      );
    }

    console.log(`Fetched ${stores.length} stores for ${listType}`);
    return stores;
  } catch (error) {
    console.error("Error in getStoreByList", error);
    throw error;
  }
}

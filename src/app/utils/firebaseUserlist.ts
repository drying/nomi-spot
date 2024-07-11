import {
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
    console.error("お店をリストへ追加する際のエラー:", error);
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
      return [];
    }

    const storeIds = storeIdsSnapShot.docs.map((doc) => doc.id);
    const stores: StoreData[] = [];

    // Firestoreの制限（10個まで）に対応
    for (let i = 0; i < storeIds.length; i += 10) {
      const chunk = storeIds.slice(i, i + 10);
      const storesQuery = query(
        collection(db, "stores"),
        where(documentId(), "in", chunk)
      );
      const chunkSnapshot = await getDocs(storesQuery);
      stores.push(
        ...chunkSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as StoreData)
        )
      );
    }

    return stores;
  } catch (error) {
    console.error("getStoreByList関数のエラー", error);
    throw error;
  }
}

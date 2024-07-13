import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const updateUsername = async (userId: string, newUsername: string) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        username: newUsername,
      },
      { merge: true }
    );
    console.log("ユーザーネーム登録完了！");
  } catch (error) {
    console.error("ユーザーネーム登録失敗", error);
    throw error;
  }
};

export const getUsername = async (userId: string): Promise<string | null> => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().username;
    } else {
      console.log("データが見当たりません");
      return null;
    }
  } catch (error) {
    console.error("データを取得できませんでした: ", error);
    return null;
  }
};

export const uploadIMageToStorage = async (
  imageUrl: string,
  storeId: string
): Promise<string> => {
  try {
    // 画像のフェッチ
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Storageを参照
    const storageRef = ref(storage, `store-icons/${storeId}.jpg`);

    // 画像をアップロード
    await uploadBytes(storageRef, blob);

    // ダウンロードURLを取得
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
  } catch (error) {
    console.error("ストレージへの画像アップロードのエラー:", error);
    throw error;
  }
};

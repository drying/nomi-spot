import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const updateUsername = async (userId: string, newUsername: string) => {
  try {
    await setDoc(
      doc(db, "users", userId),
      {
        username: newUsername,
      },
      { merge: true }
    );
    console.log("ユーザーネーム登録完了！");
  } catch (error) {
    console.error("ユーザーネーム登録失敗", error);
  }
};

export const getUsername = async (userId: string) => {
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

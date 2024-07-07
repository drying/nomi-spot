import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import axios from "axios";
import { uploadIMageToStorage } from "./firebaseData";

export const updateIconIfNeeded = async (
  storeId: string,
  instagramUsername: string
) => {
  const storeDoc = await getDoc(doc(db, "stores", storeId));
  if (storeDoc.exists()) {
    const lastUpdated = storeDoc.data().lastIconUpdate?.toDate() || new Date(0);
    if (new Date().getTime() - lastUpdated.getTime() > 24 * 60 * 60 * 1000) {
      const response = await axios.get(
        `/api/instagram-posts?instaAccountName=${instagramUsername}`
      );
      if (response.data.length > 0 && response.data[0].media_url) {
        const newIconUrl = response.data[0].media_url;

        // Storegeに画像をアップロード
        const storageUrl = await uploadIMageToStorage(newIconUrl, storeId);

        // Firestoreを更新
        await updateDoc(doc(db, "stores", storeId), {
          iconUrl: newIconUrl,
          iconStorageUrl: storageUrl,
          lastIconUpdate: new Date(),
        });
      }
    }
  }
};

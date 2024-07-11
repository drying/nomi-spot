import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import crypto from "crypto";
import axios from "axios";

const db = getFirestore(getApp());
const CACHE_DURATION = 7 * 24 * 60 * 60; // 1週間（秒）
const COLLECTION_NAME = "instagramCache";

export async function getInstagramPosts(instaAccountName: string) {
  const hashedAccountName = crypto
    .createHash("sha256")
    .update(instaAccountName)
    .digest("hex");
  const cacheRef = doc(db, COLLECTION_NAME, hashedAccountName);

  try {
    const docSnap = await getDoc(cacheRef);

    if (docSnap.exists()) {
      const cachedData = docSnap.data();
      const now = Timestamp.now();

      if (now.seconds - cachedData.timestamp.seconds < CACHE_DURATION) {
        console.log("キャッシュされたinstagramのデータを使用");
        return cachedData.posts;
      }
    }

    console.log("新しいインスタグラムのデータを取得");
    const response = await axios.get(
      `/api/instagram-posts?instaAccountName=${instaAccountName}`
    );
    const posts = response.data;

    await setDoc(cacheRef, {
      posts: posts,
      timestamp: Timestamp.now(),
      accountName: hashedAccountName,
    });

    return posts;
  } catch (error) {
    console.error("Instagramキャッシュへのアクセスエラー:", error);
    throw error;
  }
}

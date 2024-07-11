import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export type AuthData = {
  email: string;
  password: string;
};

export const handleSignup = async ({ email, password }: AuthData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("エラーメッセージ", error.message);
    } else {
      console.error("不明なエラー", error);
    }
  }
};

export const handleLogin = async ({ email, password }: AuthData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("エラーメッセージ", error.message);
    } else {
      console.error("不明なエラー", error);
    }
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("ログアウト完了");
  } catch (error) {
    if (error instanceof Error) {
      console.error("ログアウトエラー", error.message);
    } else {
      console.log("不明なエラー", error);
    }
  }
};

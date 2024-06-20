import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export type AuthDate = {
  email: string;
  password: string;
};

export const handleSignup = async ({ email, password }: AuthDate) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message", error.message);
    } else {
      console.error("Unknow error", error);
    }
  }
};

export const handleLogin = async ({ email, password }: AuthDate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message", error.message);
    } else {
      console.error("Unknow error", error);
    }
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("ログアウト完了");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Logout error", error.message);
    } else {
      console.log("Unkown error", error);
    }
  }
};

// export const handleLoginStatus = async () => {
//   const user = auth.currentUser;
//   if (user?.uid) {
//     console.log("ログイン中のユーザー", user.email);
//     return true;
//   } else {
//     console.log("ログインしているユーザーなし");
//     return false;
//   }
// };

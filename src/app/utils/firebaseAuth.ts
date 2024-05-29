import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const handleSingup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    alert("ユーザー登録完了！");
    console.log(user);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

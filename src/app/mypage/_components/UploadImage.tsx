import React, { useRef } from "react";
import { Avatar, Button, Flex, Input, VStack } from "@chakra-ui/react";
import { db, storage } from "../../../utils/firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";

type currentImage = {
  setUploadImage: (image: string | null) => void;
  uploadImage: string | null;
};

export default function UploadImage({
  setUploadImage,
  uploadImage,
}: currentImage) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();

  // 画像プレビュー機能
  const handleClickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      // ローカルでプレビュー
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        await uploadToFirebase(file);
        console.log("プロフィール画像が更新されました");
      } catch (error) {
        console.error("画像のアップロードに失敗しました", error);
        setUploadImage(null);
      }
    }
  };

  const uploadToFirebase = async (file: File) => {
    if (!user) throw new Error("認証されたユーザーが見つかりませんでした");

    const fileRef = ref(storage, `userIcons/${user.uid}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      profileImageUrl: downloadURL,
    });

    console.log("Firestoreでプロフィール画像URLが更新されました");
    return downloadURL;
  };

  const handleDeleteImage = async () => {
    if (!user) {
      console.error("ユーザーが認証されていません");
      return;
    }

    try {
      const fileRef = ref(storage, `userIcons/${user.uid}`);
      await deleteObject(fileRef);

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        profileImageUrl: null,
      });

      setUploadImage(null);
      console.log("プロフィール画像が削除されました");
    } catch (error) {
      console.error("画像の削除に失敗しました", error);
    }
  };

  // ButtonをクリックしたらInputのイベントが発火
  const handleClickButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClickCancel = () => {
    // 画像のプレビューを消す
    setUploadImage(null);

    // 同じファイルの再選択・入力フィールドのクリアのため、ファイルを空文字にリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <VStack>
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleClickUpload}
        hidden
      />
      {uploadImage ? (
        <>
          <Flex alignItems="center">
            <Avatar src={uploadImage} size="xl" mr={4} />
            {user ? (
              <Button m={2} onClick={handleDeleteImage} colorScheme="red">
                削除
              </Button>
            ) : (
              <Button m={2} onClick={handleClickCancel}>
                キャンセル
              </Button>
            )}
          </Flex>
        </>
      ) : (
        <Flex alignItems="center">
          <Avatar size="xl" mr={4} />
          <Button onClick={handleClickButton} colorScheme="blue" w="100%">
            Upload Image
          </Button>
        </Flex>
      )}
    </VStack>
  );
}

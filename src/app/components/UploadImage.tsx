import React, { useRef, useState } from "react";
import { Avatar, Button, Flex, Input, VStack } from "@chakra-ui/react";

type currentImage = {
  setUploadImage: (image: string | null) => void;
  uploadImage: string | null;
};

export default function UploadImage({
  setUploadImage,
  uploadImage,
}: currentImage) {
  // const [uploadImage, setUploadImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 画像プレビュー機能
  const handleClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // 画像が存在しているか
    if (files) {
      // リストの最初のファイルを取得
      const file = files[0];
      // ファイル入力で選択したファイルの内容を読み取る
      // FileReaderは非同期で読み取りするためのJavaScriptオブジェクト
      const reader = new FileReader();
      // ファイル読み込み完了時に呼び出される関数
      reader.onload = (e) => {
        // 画像ファイルの内容を表すデータURLとして更新（データURLは、画像などのバイナリデータをテキスト形式で表現したもの）
        setUploadImage(e.target?.result as string);
      };
      // プレビュー表示のためデータURLを読み込む
      // readAsDataURLはFileReaderのメソッド
      reader.readAsDataURL(file);
    } else {
      setUploadImage(null);
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
            <Button m={2} onClick={handleClickCancel}>
              キャンセル
            </Button>
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

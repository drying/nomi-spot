"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import UploadImage from "../components/UploadImage";

export default function Register() {
  const [userName, setUserName] = useState<string>("");
  const handleClickRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("mypageに移動します");
    // await handleSingup(email, password);
  };
  return (
    <>
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Flex
          justifyContent="center"
          alignItems="center"
          h="500px"
          w="600px"
          bg="gray.50"
          p="10"
          rounded="lg"
          boxShadow="lg"
        >
          <form onSubmit={handleClickRegister}>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>プロフィール画像</FormLabel>
                <UploadImage />
                <FormLabel>ユーザーネーム</FormLabel>
                <Input
                  placeholder="ユーザーネーム"
                  name="username"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  mb={4}
                />
                <FormLabel>プロフィール文章</FormLabel>
                <Textarea placeholder="プロフィール文" size="lg" />
              </FormControl>
              <Link href="mypage">
                <Button colorScheme="blue" as="a" type="submit" minW="244px">
                  登録
                </Button>
              </Link>
            </VStack>
          </form>
        </Flex>
      </Flex>
    </>
  );
}

"use client";

import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Register() {
  const [userName, setUserName] = useState<string>("");
  const handleClickRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("mypageに移動します");
    // await handleSingup(email, password);
  };
  return (
    <>
      <Box
        position="relative"
        h="100px"
        w="200px"
        bg="gray.50"
        p="10"
        rounded="lg"
      >
        <AbsoluteCenter axis="both">
          <form onSubmit={handleClickRegister}>
            <VStack spacing={4}>
              <Input
                placeholder="ユーザーネーム"
                name="username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Link href="mypage">
                <Button colorScheme="blue" mr={3} as="a" type="submit">
                  登録
                </Button>
              </Link>
            </VStack>
          </form>
        </AbsoluteCenter>
      </Box>
    </>
  );
}

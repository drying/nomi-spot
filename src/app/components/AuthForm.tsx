"use client";
// ToDO:ログイン機能追加する
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Button,
  Box,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { handleSingup } from "../utils/firebaseAuth";

export default function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSingup(email, password);
  };

  return (
    <>
      <Box
        px={12}
        py={8}
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Tabs isFitted variant="unstyled" width="100%" maxWidth="400px">
          <TabList>
            <Tab
              _selected={{ color: "white", bg: "black", borderTopRadius: "4" }}
            >
              新規登録
            </Tab>
            <Tab _selected={{ color: "white", bg: "black" }}>ログイン</Tab>
          </TabList>

          <TabPanels>
            <TabPanel minHeight="250px">
              <form onSubmit={onSubmit}>
                <Stack spacing={3}>
                  <Input
                    placeholder="メールアドレス"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="パスワード"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button colorScheme="blue" type="submit">
                    新規登録
                  </Button>
                </Stack>
              </form>
            </TabPanel>
            <TabPanel minHeight="250px">
              <form>
                <Stack spacing={3}>
                  <Input
                    placeholder="メールアドレス"
                    name="email"
                    type="email"
                  />
                  <Input
                    placeholder="パスワード"
                    name="password"
                    type="password"
                  />
                  <Button colorScheme="blue" type="submit">
                    ログイン
                  </Button>
                </Stack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

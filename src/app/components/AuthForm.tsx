"use client";
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
// ToDo: ログインユーザーのデータとテーブルを紐づける作業
export default function AuthForm() {
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
              <form>
                <Stack spacing={3}>
                  <Input
                    placeholder="ユーザーネーム"
                    name="username"
                    type="username"
                  />
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

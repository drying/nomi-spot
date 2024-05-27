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
              <Stack spacing={3}>
                <Input placeholder="ユーザーネーム" />
                <Input placeholder="メールアドレス" />
                <Input placeholder="パスワード" />
                <Button colorScheme="blue">新規登録</Button>
              </Stack>
            </TabPanel>
            <TabPanel minHeight="250px">
              <Stack spacing={3}>
                <Input placeholder="ユーザーネーム" />
                <Input placeholder="メールアドレス" />
                <Button colorScheme="blue">ログイン</Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

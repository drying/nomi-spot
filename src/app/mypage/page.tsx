"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import CustomAlert from "../components/CustomAlert";
import { getUsername } from "../utils/firebaseData";
import {
  AddRemoveToListPrams,
  GetStoreByListPrams,
  MoveToListPrams,
  Status,
  StoreData,
} from "../types/types";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FaCog } from "react-icons/fa";
import StoreCard from "../components/StoreCard";
import {
  getStoreByList,
  moveStoreToList,
  removeStoreFromList,
} from "../utils/firebaseUserlist";
import { useIconUrl } from "../contexts/IconUrlContext";

export default function Mypage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { iconUrl } = useIconUrl();
  const [currentUsername, setCurrentUsername] = useState("username");
  const [showAlert, setShowAlert] = useState(false);
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Status>("wishlist");
  const [isVisible, setIsVisible] = useState(false);
  const [uploadImage, setUploadImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (authLoading) return; // 認証状態のロードが完了するまで待つ

      if (!user) {
        router.push("/");
        return;
      }

      setLoading(true);
      try {
        // ユーザー名の取得
        const fetchedUsername = await getUsername(user.uid);
        if (fetchedUsername) {
          setCurrentUsername(fetchedUsername);
          if (fetchedUsername === "username") {
            setShowAlert(true);
          }
        } else {
          console.error("ユーザーネームが見つかりません");
          setShowAlert(true);
        }

        // お店データ取得
        console.log("Fetcing stores for:", activeTab);

        const params: GetStoreByListPrams = {
          userId: user.uid,
          listType: activeTab,
        };

        const storesData = await getStoreByList(params);
        console.log("Fetched stores:", storesData);
        setStores(storesData);
      } catch (error) {
        console.error("Error fetcing data", error);
        setStores([]); //エラー時は空の配列をセット
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading, activeTab]);

  // タブ切り替え
  const handleTabChange = (newTab: Status) => {
    setActiveTab(newTab);
  };

  // お店を他のリストへ移動
  const handleMoveStore = async (storeId: string, toListType: Status) => {
    if (!user) return;
    try {
      const params: MoveToListPrams = {
        userId: user.uid,
        storeId,
        fromListType: activeTab,
        toListType,
      };
      await moveStoreToList(params);
      setStores(stores.filter((store) => store.id !== storeId));
    } catch (error) {
      console.log("Error moving store to another list:", error);
    }
  };

  // リストからお店削除
  const handleRemoveStore = async (storeId: string) => {
    if (!user) return;
    try {
      const params: AddRemoveToListPrams = {
        userId: user.uid,
        storeId,
        listType: activeTab,
      };
      await removeStoreFromList(params);
      setStores(stores.filter((store) => store.id !== storeId));
    } catch (error) {
      console.log("Error removing store from list:", error);
    }
  };

  // 操作ボタンコード
  const renderStoreActions = (store: StoreData) => {
    return (
      <Menu>
        <MenuButton as={Button} colorScheme="blue" size="sm">
          操作
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleRemoveStore(store.id)}>
            リストから削除
          </MenuItem>
          <MenuItem onClick={() => handleMoveStore(store.id, "wishlist")}>
            行きたいリストへ移動
          </MenuItem>
          <MenuItem onClick={() => handleMoveStore(store.id, "visited")}>
            行ったリストへ移動
          </MenuItem>
          <MenuItem onClick={() => handleMoveStore(store.id, "favorite")}>
            お気に入りリストへ移動
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  if (authLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Text>ログインしてください</Text>;
  }

  const handleOpen = () => {
    setIsVisible(!isVisible);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleUpdateUsername = (newUsername: string) => {
    setCurrentUsername(newUsername);
    setIsVisible(false);
  };

  return (
    <>
      <Header />
      <Container>
        <Box className="flex justify-center items-center m-6 space-x-4">
          <Avatar name={currentUsername} src={uploadImage || ""} size="lg" />
          <Text className="text-3xl font-bold">{currentUsername}</Text>
          <IconButton
            aria-label="Register"
            icon={<FaCog className="h-6 w-6" />}
            variant="ghost"
            onClick={handleOpen}
          />
          {showAlert && (
            <CustomAlert isOpen={showAlert} onClose={handleCloseAlert} />
          )}
          {isVisible && (
            <RegisterForm
              isOpen={isVisible}
              onClose={handleClose}
              currentUsername={currentUsername}
              onUpdateUsername={handleUpdateUsername}
              setUploadImage={setUploadImage}
              uploadImage={uploadImage}
            />
          )}
        </Box>
        <Box>
          <Tabs
            onChange={(index) =>
              handleTabChange(
                ["wishlist", "visited", "favorite"][index] as Status
              )
            }
            align="center"
          >
            <TabList>
              <Tab>行きたい</Tab>
              <Tab>行った</Tab>
              <Tab>お気に入り</Tab>
            </TabList>

            <TabPanels>
              {(["wishlist", "visited", "favorite"] as const).map((status) => (
                <TabPanel key={status}>
                  {loading ? (
                    <Spinner />
                  ) : stores.length > 0 ? (
                    stores.map((store) => (
                      <Box key={store.id} mb={4}>
                        <StoreCard
                          storeData={store}
                          iconUrl={iconUrl ?? undefined}
                          isCompact={true}
                          onActionClick={() => router.push(`store/${store.id}`)}
                          actions={renderStoreActions(store)}
                        />
                      </Box>
                    ))
                  ) : (
                    <Text>データがありません</Text>
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

"use client";
import {
  Heading,
  Image,
  Box,
  SimpleGrid,
  Spinner,
  Text,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getStoreById } from "@/app/utils/getStoreUtils";
import { useEffect, useState } from "react";
import { InstagramPost, Status, StoreData } from "@/app/types/types";
import axios from "axios";
import StoreCard from "@/app/components/StoreCard";
import { useIconUrl } from "@/app/contexts/IconUrlContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { addStoreToList } from "@/app/utils/firebaseUserlist";

export const extractInstagramUsername = (url: string): string | null => {
  if (!url) return null;

  const regex =
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9_.]*)\/?.*/i;
  const match = url.match(regex);

  return match ? match[1] : null;
};

interface StorePageProps {
  params: {
    id: string;
  };
}

export default function StorePage({ params }: StorePageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { iconUrl, setIconUrl } = useIconUrl();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStoreById(params.id);
        setStoreData(data);
        if (data && data.instagram) {
          const instagramUsername = extractInstagramUsername(data.instagram);
          console.log("ユーザー名", instagramUsername);
          if (instagramUsername) {
            const response = await axios.get(
              `/api/instagram-posts?instaAccountName=${instagramUsername}`
            );
            console.log("Instagram API response:", response.data);
            setInstagramPosts(response.data);

            // 最初の投稿の画像URLをアイコンとして設定
            if (response.data.length > 0 && response.data[0].media_url) {
              setIconUrl(response.data[0].media_url);
            }
          } else {
            console.error("Invaild Instagram URL:", data.instagram);
            setError("Instagram URLが無効です");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (axios.isAxiosError(error)) {
          setError(
            `データの取得中にエラーが発生しました: ${
              error.response?.data?.error || error.message
            }`
          );
        } else {
          setError("データの取得中に予期せぬエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const handleAddToList = async (listType: Status) => {
    if (!user) {
      router.push("/");
      return;
    }
    try {
      await addStoreToList({ userId: user.uid, storeId: params.id, listType });
      console.log(`${listType}に追加されました`);
    } catch (error) {
      console.error(`${listType}に追加中にエラーが発生しました`, error);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  if (!storeData) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl">お店データが見つかりません</Text>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <HStack>
        <StoreCard
          storeData={storeData}
          iconUrl={iconUrl ?? undefined}
          isCompact={false}
        />

        <Box mt={6}>
          {user && (
            <Menu>
              <MenuButton as={Button} colorScheme="blue">
                リストに追加
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleAddToList("wishlist")}>
                  行きたい
                </MenuItem>
                <MenuItem onClick={() => handleAddToList("visited")}>
                  行った
                </MenuItem>
                <MenuItem onClick={() => handleAddToList("favorite")}>
                  お気に入り
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
      </HStack>

      <Box mt={6}>
        <Heading as="h2" size="lg" mb={4}>
          instagram Posts
        </Heading>
        <SimpleGrid columns={[2, 3, 4]} spacing={4}>
          {instagramPosts.map((post: any) => (
            <Box key={post.id}>
              <Image
                src={post.media_url}
                alt={post.caption}
                borderRadius="md"
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Footer />
    </>
  );
}

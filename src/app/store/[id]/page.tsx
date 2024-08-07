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
  Container,
  Flex,
} from "@chakra-ui/react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getStoreById } from "../../../utils/getStoreUtils";
import { useEffect, useState } from "react";
import { InstagramPost, Status, StoreData } from "../../../types/types";
import StoreCard from "../../../components/StoreCard";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { addStoreToList } from "../../../utils/firebaseUserlist";
import { updateIconIfNeeded } from "../../../utils/storeUtils";
import { getInstagramPosts } from "../../../utils/instagramCache";

const extractInstagramUsername = (url: string): string | null => {
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
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStoreById(params.id);
        if (data && data.instagram) {
          const instagramUsername = extractInstagramUsername(data.instagram);
          if (instagramUsername) {
            await updateIconIfNeeded(params.id, instagramUsername);
            const updatedData = await getStoreById(params.id);
            setStoreData(updatedData);

            // キャッシュを使用してInstagramの投稿を取得
            const posts = await getInstagramPosts(instagramUsername);
            setInstagramPosts(posts);
          }
        } else {
          setStoreData(data);
        }
      } catch (error) {
        console.error("データ取得エラー:", error);
        setError("データの取得中にエラーが発生しました");
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
      const result = await addStoreToList({
        userId: user.uid,
        storeId: params.id,
        listType,
      });
      if (result.success) {
        router.push("/mypage");
      }
      alert(result.message);
    } catch (error) {
      console.error(`${listType}に追加中にエラーが発生しました`, error);
      alert("エラーが発生しました。もう一度お試しください");
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
    <Flex direction="column" minH="100vh">
      <Header />

      <Container flex="1" maxW="container.xl" py={4}>
        <Flex justify="space-between" flexWrap="wrap" gap={4}>
          <Box flex="1 1 300px">
            <StoreCard storeData={storeData} isCompact={false} />
          </Box>

          <Box>
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
        </Flex>

        <Box mt={6}>
          <Heading as="h2" size="lg" mb={4}>
            instagram Posts
          </Heading>
          <SimpleGrid columns={[2, 3, 4]} spacing={4}>
            {instagramPosts.map((post: any) => (
              <Box key={post.id} position="relative" pb="100%">
                <Image
                  src={post.media_url}
                  alt={post.caption}
                  borderRadius="md"
                  position="absolute"
                  top="0"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>

      <Footer />
    </Flex>
  );
}

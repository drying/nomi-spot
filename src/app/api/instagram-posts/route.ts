import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const instaAccountName = searchParams.get("instaAccountName");
  const instaBusinessId = process.env.INSTAGRAM_BUSINESS_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!instaAccountName || !instaBusinessId || !accessToken) {
    console.error("Missing required parameters");
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const url = `https://graph.facebook.com/v20.0/${instaBusinessId}?fields=business_discovery.username(${instaAccountName}){media.limit(20){caption,media_url,permalink,timestamp,media_type,children{media_type,media_url}}}&access_token=${accessToken}`;

  try {
    const response = await axios.get(url);

    // 最新の投稿20件からひとまず動画のポストをのぞく画像のみ8件取得
    const allPosts = response.data.business_discovery.media.data;
    const imagePosts = allPosts
      .filter((post: any) => {
        if (post.media_type === "IMAGE") {
          return true;
        }
        if (post.media_type === "CAROUSEL_ALBUM" && post.children) {
          // カルーセル投稿内に少なくとも1つの画像があるか確認
          return post.children.data.some(
            (child: any) => child.media_type === "IMAGE"
          );
        }
        return false;
      })
      .slice(0, 8)
      .map((post: any) => {
        if (post.media_type === "IMAGE") {
          return {
            id: post.id,
            caption: post.caption,
            media_url: post.media_url,
            permalink: post.permalink,
            timestamp: post.timestamp,
            is_carousel: false,
          };
        } else {
          // カルーセル投稿の場合、最初の画像を使用
          const firstImage = post.children.data.find(
            (child: any) => child.media_type === "IMAGE"
          );
          return {
            id: post.id,
            caption: post.caption,
            media_url: firstImage ? firstImage.media_url : post.media_url,
            permalink: post.permalink,
            timestamp: post.timestamp,
            is_carousel: true,
          };
        }
      });

    return NextResponse.json(imagePosts);
  } catch (error: any) {
    console.error(
      "Instagram API request failed:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error: "Failed to fetch Instagram data",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

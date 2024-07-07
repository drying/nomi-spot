import { NextResponse } from "next/server";
import axios from "axios";
import { InstagramPost } from "@/app/types/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const instaAccountName = searchParams.get("instaAccountName");
  const instaBusinessId = process.env.INSTAGRAM_BUSINESS_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  console.log(
    "Received request for Instagram posts. Username:",
    instaAccountName
  );

  if (!instaAccountName || !instaBusinessId || !accessToken) {
    console.error("Missing required parameters", {
      instaAccountName,
      instaBusinessId: !!instaBusinessId,
      accessToken: !!accessToken,
    });
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const url = `https://graph.facebook.com/v20.0/${instaBusinessId}?fields=business_discovery.username(${instaAccountName}){media.limit(8){caption,media_url,permalink,timestamp}}&access_token=${accessToken}`;

  try {
    console.log("Sending request to Instagram API"); // デバック用
    const response = await axios.get(url);
    console.log("Received response from Instagram API"); // デバッグ用

    const posts = response.data.business_discovery.media.data.map(
      (post: any) => ({
        id: post.id,
        caption: post.caption,
        media_url: post.media_url,
        permalink: post.permalink,
        timestamp: post.timestamp,
      })
    );

    return NextResponse.json(posts);
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

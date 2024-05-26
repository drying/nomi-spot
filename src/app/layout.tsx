import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NomiSpot",
  description: "気になっていたお店から今日飲みたいところが見つかるアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

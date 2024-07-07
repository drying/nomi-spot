import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "./contexts/AuthContext";
import { IconUrlProvider } from "./contexts/IconUrlContext";

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
      <body className={inter.className}>
        <AuthProvider>
          <IconUrlProvider>
            <Providers>{children}</Providers>
          </IconUrlProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

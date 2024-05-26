"use client";
import { Link } from "@chakra-ui/next-js";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 pt-2">
      <div className="flex items-center">
        {/* 後でサービスのロゴに変更 */}
        <img src="/next.svg" alt="NomiSpot" className="h-24 w-24" />
      </div>
      <nav className="flex-1 flex items-center justify-center gap-8">
        <Link href="/" className="hover:underline hover:underline-offset-4">
          Home
        </Link>
        <Link
          href="/about"
          className="hover:underline hover:underline-offset-4"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hover:underline hover:underline-offset-4"
        >
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <button className="inline-flex items-center rounded-md px-4 py-2 border text-sm">
          ログイン
        </button>
        <button className="inline-flex items-center rounded-md px-4 py-2 border text-sm text-white bg-black">
          新規登録
        </button>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-16 w-full items-center justify-center px-4 pt-2">
      <div className="flex items-center">
        {/* 後でサービスのロゴに変更 */}
        <p>© 2024 NomiSpot</p>
      </div>
      {/* あとで復活させるかも */}
      {/* <nav className="flex-1 flex items-center justify-center gap-8">
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
      </nav> */}
    </footer>
  );
}

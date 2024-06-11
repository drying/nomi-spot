import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  // ログイン状態をHeaderに渡してログインの文字とアイコンの表示切り替え
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* アプリのイメージは画像や動画を追加 */}
      {/* Footerは最下部へ移動 */}
      <Footer />
    </div>
  );
}

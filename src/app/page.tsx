import Header from "./components/Header";
import AuthForm from "./components/AuthForm";
import Footer from "./components/Footer";

export default function Home() {
  // ログイン状態をHeaderに渡してログインの文字とアイコンの表示切り替え
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <AuthForm />
      </div>
      <Footer />
    </div>
  );
}

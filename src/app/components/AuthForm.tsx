"use client";

import { useState } from "react";

// ToDo: 5/26 フォームUI作成とusername,email,passwordを登録するようにする。画像はデフォルトを設定し、後からアップロードさせる（モーダルで表示もありだと思う）
export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("signup");
  console.log(activeTab);
  return (
    <div className="flex flex-col">
      <div>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <li className="me-2">
            <button
              onClick={() => setActiveTab("signup")}
              className={`inline-block px-6 py-4 rounded-t-lg ${
                activeTab === "signup" && "text-white bg-black"
              }`}
            >
              新規登録
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab("login")}
              className={`inline-block px-6 py-4 rounded-t-lg ${
                activeTab === "login" && "text-white bg-black"
              }`}
            >
              ログイン
            </button>
          </li>
        </ul>
      </div>
      <div className="flex justify-center pt-6">
        {activeTab === "signup" ? <h2>新規登録</h2> : <p>ログインフォーム</p>}
      </div>
    </div>
  );
}

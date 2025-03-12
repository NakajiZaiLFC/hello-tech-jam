"use client";
import React, { useState } from "react";

// 質問項目を決め打ち（例として1つの質問を用意）
const questions = [
  {
    id: 1,
    text: "サポートが必要な内容を選んでください。",
    options: [
      "Slackアカウントの作成",
      "広告業務の依頼",
      "エクセルの使い方相談",
      "PCを新しく購入したい",
      "VPNアクセス",
      "パスワードを忘れた",
    ],
  },
];

export default function Home() {
	// チャットのメッセージを管理するstate
	const [messages, setMessages] = useState<
	{ sender: "bot" | "user"; text: string }[]
	>([
	{
		sender: "bot",
		text: "サポートが必要な内容を選んでください。",
	},
	]);

	// 選択肢クリック時のハンドラ
	const handleOptionClick = (option: string) => {
	setMessages((prev) => [...prev, { sender: "user", text: option }]);
	};
  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-50">
  <main className="min-h-screen bg-gray-100 p-4 mt-16">
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-4">
      <div className="text-black font-semibold mb-2">チャットボット（選択式）</div>

        {/* チャット履歴エリア：min-h-[2rem] により最初から1行分の高さを確保 */}
        <div className="border border-gray-200 p-2 min-h-[600px] mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={` text-black ${
                  msg.sender === "user"
					? "user-bubble" 
					: "bot-bubble"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 選択肢表示（質問文は表示しない） */}
        {questions.map((q) => (
          <div key={q.id} className="mb-4">
            <div className="flex flex-wrap gap-2">
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className="bg-orange-300 hover:bg-orange-400 text-black py-1 px-3 rounded"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* API送信用のボタン（必要に応じて使用） */}
        {/* <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
          APIに送信
        </button> */}
      </div>
    </main>
    </div>
  );
}

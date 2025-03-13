"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// 5つの質問を定義
const questions = [
	{
	  id: 1,
	  text: "会食のシーンはどれですか？",
	  options: [
		"仲間内",
		"部署内",
		"表彰祝い",
		"異動祝い",
		"社内接待",
		"社外接待",
		"忘年会",
		"新年会",
		"誕生日会"
	  ],
	},
	{
	  id: 2,
	  text: "ご希望のお料理は？",
	  options: [
		"焼肉",
		"中華",
		"鍋",
		"韓国料理",
		"イタリアン",
		"フレンチ",
		"その他"
	  ],
	},
	{
	  id: 3,
	  text: "ご予算は？",
	  options: [
		"3,000円未満",
		"3,000～5,000円",
		"5,000～8,000円",
		"8,000円以上"
	  ],
	},
	{
	  id: 4,
	  text: "開催時期は？",
	  options: [
		"今月中",
		"来月",
		"来季以降",
		"未定"
	  ],
	},
	{
	  id: 5,
	  text: "参加人数は？",
	  options: [
		"5名以下",
		"6～15名",
		"16名以上"
	  ],
	},
	{
	  id: 6,
	  text: "お席のご希望は？",
	  options: [
		"個室",
		"テーブル席",
		"カジュアル",
		"特になし"
	  ],
	},
	{
	  id: 7,
	  text: "その他ご要望は？",
	  options: [
		"なし",
		"その他"
	  ],
	},
  ];
  

export default function Home() {
  // チャットのメッセージ履歴
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string }[]
  >([{ sender: "bot", text: questions[0].text }]);
  // 現在の質問のインデックス
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 選択肢クリック時のハンドラ
  const handleOptionClick = (option: string) => {
    // ユーザーの回答をチャット履歴に追加
    setMessages((prev) => [...prev, { sender: "user", text: option }]);
    // 次の質問があれば、Botのメッセージとして追加
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: questions[nextIndex].text },
        ]);
        setCurrentQuestionIndex(nextIndex);
      }, 300);
    }
  };

  return (
    <div className="w-full justify-center items-center min-h-screen bg-stone-50">
      <main className="min-h-screen bg-gray-100 p-4 mt-10">
	  <div className="w-full sm:max-w-3xl mx-auto bg-white rounded shadow p-4">
		<div className="text-gray-950 font-semibold mb-2">ゴンゾウ</div>
          {/* チャット履歴エリア：初期から600px の高さを確保 */}
          <div className="border border-gray-100 p-2 min-h-[600px] mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start items-start gap-2"
                }`}
              >
                {msg.sender === "bot" && (
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/images/ganko_oyaji.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`shadow-[2px_3px_15px_4px_rgba(51,_65,_85,_0.12)]  text-white ${
                    msg.sender === "user"
                      ? "relative bg-orange-400 outline-orange-200 rounded p-2 after:content-[''] after:absolute after:border-[8px] after:border-transparent after:border-l-orange-400 after:left-full after:top-[10px]"
                      : "relative bg-sky-400 rounded p-2 break-words whitespace-pre-wrap before:content-[''] before:absolute before:border-[8px] before:border-transparent before:border-r-sky-400 before:right-full before:top-[10px]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* 現在の質問の選択肢表示 */}
          {currentQuestionIndex < questions.length && (
            <div className="w-full sm:max-w-3xl mx-auto bg-white rounded shadow p-4 flex justify-center items-center">
			<div className="mb-4">
			  <div className="flex flex-wrap gap-2 justify-center">
				{questions[currentQuestionIndex].options.map((option, idx) => (
				  <Button
				  key={idx}
				  onClick={() => handleOptionClick(option)}
				  variant="outline"
				  className="className=shadow-md bg-orange-400 hover:bg-orange-200 text-white py-1 px-3 rounded"
				>
				  {option}
				</Button>
				))}
			  </div>
			</div>
		  </div>
          )}
        </div>
      </main>
    </div>
  );
}

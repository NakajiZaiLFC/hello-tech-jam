"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { questions } from "@/constants/questions";
import { Input } from "@/components/ui/input";

function HomeContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const date = searchParams.get("date") || "";
  const area = searchParams.get("area") || "";

  const [messages, setMessages] = useState([
    { sender: "bot", text: questions[0].text },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [queryScene, setQueryScene] = useState("defaultScene");
  const [queryFood, setQueryFood] = useState("defaultFood");
  const [queryCost, setQueryCost] = useState("defaultCost");
  const [queryNum, setQueryNum] = useState("defaultNum");
  const [querySeat, setQuerySeat] = useState("defaultSeat");
  const [queryQuestion, setQueryQuestion] = useState("");
  const [otherInput, setOtherInput] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleOptionClick = (option: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: option }]);

    if (option === "その他") {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "具体的に入力してください。" },
      ]);
      setShowOtherInput(true);
      return;
    }

    // 「その他」以外の場合は入力欄を非表示にする
    setShowOtherInput(false);

    switch (currentQuestionIndex) {
      case 0:
        setQueryScene(option);
        break;
      case 1:
        setQueryFood(option);
        break;
      case 2:
        setQueryCost(option);
        break;
      case 3:
        setQueryNum(option);
        break;
      case 4:
        setQuerySeat(option);
        break;
      default:
        setQueryQuestion(option);
        break;
    }

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: questions[nextIndex].text },
        ]);
        setCurrentQuestionIndex(nextIndex);
      }, 300);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherInput(e.target.value);
  };

  const handleOtherInputSubmit = () => {
    setMessages((prev) => [...prev, { sender: "user", text: otherInput }]);
    setQueryQuestion(otherInput);
    setOtherInput("");
    setShowOtherInput(false);

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: questions[nextIndex].text },
        ]);
        setCurrentQuestionIndex(nextIndex);
      }, 300);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 全パラメータをオブジェクトにまとめ、値が「スキップ」のものは除外
  const allParams: { [key: string]: string } = {
    title: title,
    date: date,
    area: area,
    scene: queryScene,
    food: queryFood,
    cost: queryCost,
    num: queryNum,
    seat: querySeat,
    question: queryQuestion,
  };
  const filteredParams = Object.fromEntries(
    Object.entries(allParams).filter(([, value]) => value !== "スキップ")
  );

  return (
    <div className="w-full justify-center items-center min-h-screen bg-stone-50">
      <main className="min-h-screen bg-gray-100 p-4 mt-10">
        <div className="w-full sm:max-w-3xl mx-auto bg-white rounded shadow p-4">
          <div className="text-gray-950 font-semibold mb-2">ゴンゾウ</div>
          <div className="border border-gray-100 p-2 min-h-[400px] mb-4">
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
                    <AvatarFallback>GZ</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`shadow-[2px_3px_15px_4px_rgba(51,_65,_85,_0.12)] text-white ${
                    msg.sender === "user"
                      ? "relative bg-orange-400 outline-orange-200 rounded p-2 after:content-[''] after:absolute after:border-[8px] after:border-transparent after:border-l-orange-400 after:left-full after:top-[10px]"
                      : "relative bg-emerald-400 rounded p-2 break-words whitespace-pre-wrap before:content-[''] before:absolute before:border-[8px] before:border-transparent before:border-r-emerald-400 before:right-full before:top-[10px]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {currentQuestionIndex < questions.length ? (
            <div className="w-full sm:max-w-3xl mx-auto bg-white rounded shadow p-4 flex justify-center items-center">
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {questions[currentQuestionIndex].options.map((option, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      variant="outline"
                      className="shadow-md bg-orange-400 hover:bg-orange-200 text-white py-1 px-3 rounded"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showOtherInput && (
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="text"
                      className="text-gray-950 border mt-4 rounded w-full"
                      value={otherInput}
                      onChange={handleOtherInputChange}
                      placeholder="その他"
                    />
                    <Button
                      onClick={handleOtherInputSubmit}
                      type="submit"
                      className="mt-4 shadow-md bg-orange-400 hover:bg-orange-200 text-white py-1 px-3 rounded"
                    >
                      送信
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // 回答がすべて完了したら、クエリパラメータを改行区切りで表示し、「次のページへ」ボタンを表示
            <div className="flex flex-col items-center">
              <Link
                href={{
                  pathname: "/event/choice",
                  query: filteredParams,
                }}
              >
                <Button variant="outline" className="mr-4 shadow-md bg-orange-400 hover:bg-orange-200 text-white py-1 px-3">
                  次のページへ
                </Button>
				<Button variant="outline" className="mr-4 shadow-md bg-orange-400 hover:bg-orange-200 text-white py-1 px-3" onClick={() => window.location.reload()} >
				   やり直す
				</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
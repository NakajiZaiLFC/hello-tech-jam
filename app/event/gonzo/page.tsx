"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { questions } from "@/constants/questions";

// useSearchParams を使用する子コンポーネント
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const date = searchParams.get("date") || "";
  const area = searchParams.get("area") || "";

  const [messages, setMessages] = useState([{ sender: "bot", text: questions[0].text }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [queryScene, setQueryScene] = useState("defaultScene");
  const [queryFood, setQueryFood] = useState("defaultFood");
  const [queryCost, setQueryCost] = useState("defaultCost");
  const [queryNum, setQueryNum] = useState("defaultNum");
  const [querySeat, setQuerySeat] = useState("defaultSeat");
  const [queryQuestion, setQueryQuestion] = useState("");

  const handleOptionClick = (option: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: option }]);

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

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      const query = {
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

      const queryString = new URLSearchParams(query).toString();
      router.push(`/event/choice?${queryString}`);
    }
  }, [
    currentQuestionIndex,
    title,
    date,
    area,
    queryScene,
    queryFood,
    queryCost,
    queryNum,
    querySeat,
    queryQuestion,
    router,
  ]);

  return (
    <div className="w-full justify-center items-center min-h-screen bg-stone-50">
      <main className="min-h-screen bg-gray-100 p-4 mt-10">
        <div className="w-full sm:max-w-3xl mx-auto bg-white rounded shadow p-4">
          <div className="text-gray-950 font-semibold mb-2">ゴンゾウ</div>
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
                  className={`shadow-[2px_3px_15px_4px_rgba(51,_65,_85,_0.12)] text-white ${
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
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Link
                href={{
                  pathname: "/event/choice",
                  query: {
                    title: title,
                    date: date,
                    area: area,
                    scene: queryScene,
                    food: queryFood,
                    cost: queryCost,
                    num: queryNum,
                    seat: querySeat,
                    question: queryQuestion,
                  },
                }}
              >
                <Button variant="outline" className="mt-4">
                  次のページへ
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Suspense で HomeContent をラップするページコンポーネント
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
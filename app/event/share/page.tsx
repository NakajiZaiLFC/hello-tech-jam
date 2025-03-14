"use client";
import "./globals.css";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Send } from "@mynaui/icons-react";

// Star の型定義
type StarType = {
  left: string;
  drift: string;
  delay: string;
  duration: string;
};

function FallingStars() {
  const [stars, setStars] = useState<StarType[]>([]);

  useEffect(() => {
    const STAR_COUNT = 20;
    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const newStars = Array.from({ length: STAR_COUNT }).map(() => ({
      left: `${random(0, 100)}%`,
      drift: `${random(-100, 100)}px`,
      delay: `${random(0, 5)}s`,
      duration: `${random(5, 10)}s`,
    }));

    setStars(newStars);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden z-50">
      {stars.map((star, i) => (
        <Image
          key={i}
          src="/images/star.png"
          alt="star"
          // スタイルに型アサーションを付けてカスタムプロパティを扱う
          style={
            {
              left: star.left,
              "--drift": star.drift,
              animationDelay: star.delay,
              animationDuration: star.duration,
              width: "30px",
              height: "30px",
            } as React.CSSProperties
          }
          className="fall-animation"
          width={30}
          height={30}
        />
      ))}
    </div>
  );
}

function ShareContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "比嘉さん誕生日会";
  const name = searchParams.get("name") || "焼肉太郎　那覇店";
  const date = searchParams.get("date") || "202408011800";

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hour = date.slice(8, 10);
  const minute = date.slice(10, 12);

  const handleCopy = () => {
    const textToCopy = `${title}に招待されました！\n${year}年${month}月${day}日 ${hour}:${minute}〜`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("招待メッセージをコピーしました！");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center p-4 md:p-8">
      <h1 className="mt-10 text-white font-bold tracking-wide text-4xl md:text-6xl text-center">
        {title}!
      </h1>

      <div className="mt-7 mb-40 max-w-5xl w-full bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* 画像エリア */}
        <div className="md:w-1/2 w-full flex justify-center items-center p-4">
          <Image
            // src="https://yakiniku-watami.com/yokohama/wp-content/uploads/sites/27/2024/07/yakiniku_2407_2w1.jpg"
              src="/images/yakiniku.jpg"
            alt="焼肉の画像"
            width={600}
            height={400}
            className="rounded-2xl object-cover w-full h-auto max-h-[400px]"
          />
        </div>

        {/* 情報エリア */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-6">
          <a
            href="https://example.com"
            className="text-blue-600 text-3xl md:text-4xl font-bold mb-4"
          >
            {name}
          </a>

          <Card className="bg-blue-500  rounded-xl shadow-md w-full">
            <div className="flex flex-col items-center p-4">
              <CardTitle className="text-white text-2xl">
                {year}年 {month}月 {day}日
              </CardTitle>
              <CardTitle className="text-white text-2xl">
                {hour}:{minute}〜
              </CardTitle>
            </div>
          </Card>

          <p className="mt-4 text-gray-700 text-xl font-semibold">
            盛り上げていきましょう！
          </p>

          <button
  onClick={handleCopy}
  className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg text-xl font-bold flex items-center justify-center space-x-2"
>
  <span>招待メッセージをコピー</span>
  <Send />
</button>


<div className="relative mt-6 w-full max-w-[300px]">
  <Image
    src="/images/map.jpg"
    alt="地図"
    width={300}
    height={300}
    className="rounded-lg shadow-md w-full"
  />
  {/* オーバーレイコンテナ */}
  <div className="absolute bottom-0 right-0 mb-2 mr-2 ml-2 bg-white rounded-full px-3 py-1 shadow-md">
    <span className="text-blue-600 text-sm font-bold">那覇市おもろまち1-32-3</span>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FallingStars />
      <ShareContent />
    </Suspense>
  );
}

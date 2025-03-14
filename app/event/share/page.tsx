"use client";
import "./globals.css"
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LZString from "lz-string";
import { Card, CardTitle } from "@/components/ui/card";

function FallingStars() {
  // 星の配置情報
  const [stars, setStars] = useState<
    Array<{
      left: string;     // 画面幅に対するX位置(%)
      drift: string;    // 横方向のドリフト(px)
      delay: string;    // 落下開始の遅延(s)
      duration: string; // 落下にかかる時間(s)
    }>
  >([]);

  useEffect(() => {
    const STAR_COUNT = 20;
    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    // ランダムなパラメータを生成
    const newStars = Array.from({ length: STAR_COUNT }).map(() => {
      const left = `${random(0, 100)}%`;       // 画面横幅の0%〜100%のランダム
      const drift = `${random(-100, 100)}px`;   // 左右ドリフト(-100px〜100px)
      const delay = `${random(0, 5)}s`;          // 0〜5秒遅れて落下開始
      const duration = `${random(5, 10)}s`;      // 落下にかかる秒数(5〜10秒)
      return { left, drift, delay, duration };
    });

    setStars(newStars);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden z-50">
      {stars.map((star, i) => (
        <img
          key={i}
          src="/images/star.png"
          alt="star"
          className="fall-animation" // → globals.css で定義
          style={{
            left: star.left,
            ["--drift" as any]: star.drift,   // driftをCSS変数として渡す
            animationDelay: star.delay,
            animationDuration: star.duration,
            width: "30px",
            height: "30px",
          }}
        />
      ))}
    </div>
  );
}

function ShareContent() {
  const searchParams = useSearchParams();

  const urlParam = searchParams.get("url");
  let originalUrl = "";
  if (urlParam) {
    originalUrl = LZString.decompressFromEncodedURIComponent(urlParam);
  }

  const name = searchParams.get("name") || "焼肉太郎　那覇点";
  const tel = searchParams.get("tel") || "電話番号なし";
  const lat = searchParams.get("lat") || "緯度なし";
  const lng = searchParams.get("lng") || "経度なし";
  const title = searchParams.get("title") || "比嘉さん誕生日会";
  const date = searchParams.get("date") || "20240801"; 

  // date=20240801 の場合
  const year = date.slice(0, 4);
  const month = date.slice(4, 6); 
  const day = date.slice(6, 8);
  const hour = date.slice(8, 10);
  const minute = date.slice(10, 12); 

  // クリック時にコピーする処理
  const handleCopy = () => {
    const textToCopy = `${title}に招待されました！焼肉きんぐ那覇店\n${year}年 ${month}月 ${day}日\n${hour}:${minute}〜\n`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("コピーしました！");
      })
      .catch((err) => {
        console.error("コピーに失敗しました: ", err);
      });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-fixed flex flex-col items-center">
      <h1 className="mt-30 text-white px-4 py-2 font-bold tracking-wide text-[5vw]">
        {title} !
      </h1>

      <div className="mx-20 mb-50 flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full flex justify-center">
          {/* 画像を中央寄せにし、画面幅に合わせてリサイズ */}
          <img
            src="https://yakiniku-watami.com/yokohama/wp-content/uploads/sites/27/2024/07/yakiniku_2407_2w1.jpg"
            alt="画像の説明"
            className="h-auto mx-auto"
            style={{ maxWidth: "500px", width: "100%" }}
          />
        </div>

        {/* 右のテキスト部分 */}
        <div className="flex flex-row items-center">
          <div className="ml-5 mr-7">
            <p className="text-white text-5xl font-bold">焼肉太郎 那覇店</p>
            <p className="text-white text-5xl mt-4">
              <a
                href="https://example.com"
                className="underline hover:text-blue-300"
              >
                https://example.com
              </a>
            </p>

            <Card className="bg-white mt-4 rounded-3xl shadow-lg">
              <div className="flex flex-col md:flex-row">
                <CardTitle className="ml-7 mr-7 text-4xl font-bold text-blue-500 whitespace-nowrap">
                  {year}年 {month}月 {day}日
                </CardTitle>
                <CardTitle className="ml-7 mr-7 text-4xl font-bold text-blue-500 whitespace-nowrap">
                  {hour}:{minute}〜
                </CardTitle>
              </div>
            </Card>

            <p className="mt-4 mb-20 text-white text-3xl font-semibold">
              盛り上げていきましょう！
            </p>

            {/* コピー用ボタン */}
            <button
              onClick={handleCopy}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-2xl font-bold"
            >
              招待メッセージをコピー
            </button>
          </div>

          <div className="mr-20 flex flex-col items-center mb-10">
            <img
              src="/images/map.jpg"
              style={{ width: "200px" }}
              alt="地図"
            />
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

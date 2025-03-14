"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LZString from "lz-string";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function ShareContent() {
  const searchParams = useSearchParams();

  const urlParam = searchParams.get("url");
  let originalUrl = "";
  if (urlParam) {
    originalUrl = LZString.decompressFromEncodedURIComponent(urlParam);
  }

  const name = searchParams.get("name") || "名前なし";
  const tel = searchParams.get("tel") || "電話番号なし";
  const lat = searchParams.get("lat") || "緯度なし";
  const lng = searchParams.get("lng") || "経度なし";
  const title = searchParams.get("title") || "タイトルなし";
  const date = searchParams.get("date") || "日付なし"; 

  // date=202112310130 の場合
  const year = date.slice(0, 4);
  const month = date.slice(4, 6); 
  const day = date.slice(6, 8);
  const hour = date.slice(8, 10);
  const minute = date.slice(10, 12); 

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center">
    {/* タイトル */}
    <h1 className="mt-20 ml-10 w-full bg-transparent text-white bg-stone-50 px-4 py-2 font-bold italic tracking-wide text-[5vw]">
      {title} !
    </h1>

    {/* コンテンツ部分（横並び） */}
    <div className="flex flex-row justify-start items-center w-full mt-7">
      {/* 左の画像部分 */}
      <div className="ml-14">
        <img
          src="https://yakiniku-watami.com/yokohama/wp-content/uploads/sites/27/2024/07/yakiniku_2407_2w1.jpg"
          alt="画像の説明"
          className="max-w-full h-auto"
          style={{ width: "500px" }} // 幅を調整できます
        />
      </div>

      {/* 右のテキスト部分 */}
      <div className="ml-10 text-left">
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
          <div className="flex flex-row">
            <CardTitle className="text-4xl ml-4 font-bold text-blue-500">
              {year}年 {month}月 {day}日
            </CardTitle>
            <CardTitle className="text-4xl ml-4 mr-4 font-bold text-blue-500">
              {hour}:{minute}〜
            </CardTitle>
          </div>
        </Card>

        {/* 日程カードの真下に表示するテキスト */}
        <p className="mt-4 text-white text-3xl font-semibold">
          盛り上げていきましょう！
        </p>
      </div>

      <div className="flex flex-col">
        <div className="ml-7 text-left">
          <img
            src="/images/map.jpg"
            alt="説明文"
            className="h-auto"
            style={{ width: "200px" }} // 幅を調整できます
          />
        </div>
        <p className="ml-8 text-white">那覇市おもろまち1-23-1</p>
      </div>
    </div>
  </div>
  
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShareContent />
    </Suspense>
  );
}

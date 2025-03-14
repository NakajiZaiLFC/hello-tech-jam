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
    <div className="mt-10 min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-fixed flex flex-col items-center">
      {/* ここにコメントを入れる */}
      <h1 className=" text-white px-4 py-2 font-bold tracking-wide text-[5vw]">
        {title} !
      </h1>

      {/* <div className="ml-20 mr-20 flex flex-col md:flex-row justify-between items-center w-full mt-7 space-y-4 md:space-y-0 md:space-x-4"> */}
      <div className="mx-20 flex flex-col md:flex-row justify-between items-center w-full  space-y-4 md:space-y-0 md:space-x-4">

        <div>
          <img
            src="https://yakiniku-watami.com/yokohama/wp-content/uploads/sites/27/2024/07/yakiniku_2407_2w1.jpg"
            alt="画像の説明"
            className="ml-7 mr-7max-w-full h-auto"
            style={{ width: "400px" }}
          />
        </div>

        {/* 右のテキスト部分 */}
        <div className="flex flex-row items-center">
        <div className="ml-7 mr-7">
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

          <p className="mt-4 text-white text-3xl font-semibold">
            盛り上げていきましょう！
          </p>
        </div>

        <div className="mr-7 flex flex-col items-center mb-10">
          <img
            src="/images/map.jpg"
            // alt="説明文"
            // className="h-auto"
            style={{ width: "200px" }}
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
      <ShareContent />
    </Suspense>
  );
}

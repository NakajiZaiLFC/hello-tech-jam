"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LZString from "lz-string";
import { parse, format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import specialData from "@/public/special.json";
import genreData from "@/public/genre.json";
import budgetData from "@/public/budget.json";
import { Skeleton } from "@/components/ui/skeleton"


// 型定義
interface Shop {
  id: string;
  photo?: {
    pc?: {
      l?: string;
    };
  };
  name: string;
  address: string;
  open: string;
  catch: string;
  urls?: {
    pc?: string;
  };
}

interface HotPepperResponse {
  results: {
    shop: Shop[];
  };
}

function ChoiceDisplay() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // クエリパラメータ取得
  const title = searchParams.get("title") || "";
  const dateParam = searchParams.get("date") || "";
  const area = searchParams.get("area") || "";
  let scene = searchParams.get("scene") || "";
  let food = searchParams.get("food") || "";
  let cost = searchParams.get("cost") || "";
  let num = searchParams.get("num") || "";
  const seat = searchParams.get("seat") || "";
  let question = searchParams.get("question") || "";

  // 日付整形："yyyyMMddHHmm" → "yyyy-MM-dd-HH-mm"
  let formattedDate = dateParam;
  if (dateParam) {
    try {
      const parsedDate = parse(dateParam, "yyyyMMddHHmm", new Date());
      formattedDate = format(parsedDate, "yyyy-MM-dd-HH-mm");
    } catch (error) {
      formattedDate = dateParam;
    }
  }

  // special.json から scene のコード取得
  let sceneCode = scene;
  if (specialData?.results?.special) {
    const foundScene = specialData.results.special.find(
      (item: any) => item.name === scene
    );
    if (foundScene && foundScene.code) {
      sceneCode = foundScene.code;
    }
  }

  // genre.json から food のコード取得
  let foodCode = food;
  if (genreData?.results?.genre) {
    const foundFood = genreData.results.genre.find(
      (item: any) => item.name === food
    );
    if (foundFood && foundFood.code) {
      foodCode = foundFood.code;
    }
  }

  // budget.json から cost のコード取得
  let costParsed = cost;
  if (budgetData?.results?.budget) {
    const foundBudget = budgetData.results.budget.find(
      (item: any) => item.name === cost
    );
    if (foundBudget && foundBudget.code) {
      costParsed = foundBudget.code;
    }
  }

  // num の整形
  let numParsed = num;
  if (num.includes("~")) {
    const match = num.match(/~(\d+)名/);
    if (match) {
      numParsed = match[1];
    }
  } else {
    const match = num.match(/(\d+)/);
    if (match) {
      numParsed = match[1];
    }
  }

  if (question === "なし") {
    question = "";
  }

  const allParams = {
    title,
    date: formattedDate,
    area,
    scene: sceneCode,
    food: foodCode,
    cost: costParsed,
    num: numParsed,
    seat,
    question,
  };

  const queryParams = Object.fromEntries(
    Object.entries(allParams).filter(
      ([, value]) =>
        value !== "[特になし]" && value !== "[なし]" && value !== ""
    )
  );

  // APIルート (/api/hotpepper) へのURL生成
  const proxyUrl =
    `/api/hotpepper?address=${encodeURIComponent(queryParams.area || "")}` +
    (queryParams.scene ? `&special=${encodeURIComponent(queryParams.scene)}` : "") +
    (queryParams.food ? `&genre=${encodeURIComponent(queryParams.food)}` : "") +
    (queryParams.cost ? `&budget=${encodeURIComponent(queryParams.cost)}` : "") +
    (seat && seat !== "特になし"
      ? seat === "貸切"
        ? "&seatParam=charter=1"
        : seat === "お座敷"
        ? "&seatParam=tatami=1"
        : seat === "個室"
        ? "&seatParam=private_room=1"
        : ""
      : "") +
    (queryParams.question ? `&keyword=${encodeURIComponent(queryParams.question)}` : "");

  // APIデータ状態管理
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<HotPepperResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Proxy URL:", proxyUrl);
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setFetchedData(jsonData);
      } catch (err) {
        console.error("Fetch Error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      }
    }
    fetchData();
  }, [proxyUrl]);

  return (
    <div className="bg-white p-6 rounded shadow text-gray-950">
      {/* 3列グリッドで店舗カードを表示 */}
      <div className="grid grid-cols-3 gap-4">
        {error ? (
          <p className="text-red-500">エラー: {error}</p>
        ) : fetchedData ? (
          fetchedData.results.shop.map((shop: Shop) => {
            // 遷移先 URL 用に shop.urls.pc を圧縮
            const compressedUrl =
              shop.urls && shop.urls.pc
                ? LZString.compressToEncodedURIComponent(shop.urls.pc)
                : "";
            return (
              <div
                key={shop.id}
                className="p-4 border rounded cursor-default"
              >
                {/* 画像クリック時のみ確認ポップアップ */}
                {shop.photo && shop.photo.pc && shop.photo.pc.l && (
                  <img
                    src={shop.photo.pc.l}
                    alt={shop.name}
                    className="w-full h-auto mb-2 cursor-pointer"
                    onClick={() => {
                      if (window.confirm("このお店にするのか？")) {
						/*
						** こんな感じになる
						** 送るクエリパラメータ
						** title: 会食名
						** date: 日時
						** name: 店名
						** address: 住所
						** image: 画像URL
						** 例↓
						** http://localhost:3000/event/share?title=%E3%83%86%E3%82%B9%E3%83%88&date=2025-03-14-19-00&name=%E5%B1%85%E9%85%92%E5%B1%8B%20%E4%B8%83%E6%AE%B5%20%E5%A5%A5%E6%AD%A6%E5%B1%B1%E5%BA%97&address=%E6%B2%96%E7%B8%84%E7%9C%8C%E9%82%A3%E8%A6%87%E5%B8%82%E9%8F%A1%E5%8E%9F%E7%94%BA10-20&image=https://imgfp.hotp.jp/IMGH/69/43/P045676943/P045676943_238.jpg
						*/ 
						router.push(`/event/share?title=${title}&date=${formattedDate}&name=${shop.name}&address=${shop.address}&image=${shop.photo && shop.photo.pc && shop.photo.pc.l}`);
                      }
                    }}
                  />
                )}
                <h2 className="text-xl font-bold">{shop.name}</h2>
                <p>
                  <strong>住所:</strong> {shop.address}
                </p>
                <p>
                  <strong>営業時間:</strong> {shop.open}
                </p>
                <p>
                  <strong>キャッチ:</strong> {shop.catch}
                </p>
                {shop.urls && shop.urls.pc && (
                  <p>
                    <a
                      href={shop.urls.pc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      詳細ページを見る
                    </a>
                  </p>
                )}
              </div>
            );
          })
        ) : (
			<Skeleton className="w-[100px] h-[20px] rounded-full" />
        )}
      </div>
    </div>
  );
}

export default function ChoicePage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-gray-950 pt-20">
      <div className="flex items-center mb-4">
        <Avatar className="w-16 h-16 mr-4">
          <AvatarImage src="/images/ganko_oyaji.png" />
          <AvatarFallback>GZ</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">＜こんなお店が良いんじゃないか？</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ChoiceDisplay />
      </Suspense>
    </div>
  );
}

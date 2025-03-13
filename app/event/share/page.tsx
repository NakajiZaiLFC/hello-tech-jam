"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LZString from "lz-string";

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

  return (
    <div className="flex justify-center items-center h-screen bg-stone-50">
      <div className="text-center">
        <p className="text-black text-2xl">圧縮: {urlParam || "リンクがありません"}</p>
        <p className="text-black text-2xl">URL: {originalUrl || "リンクがありません"}</p>
        <p className="text-black text-2xl">Name: {name}</p>
        <p className="text-black text-2xl">Tel: {tel}</p>
        <p className="text-black text-2xl">Lat: {lat}</p>
        <p className="text-black text-2xl">Lng: {lng}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ShareContent />
    </Suspense>
  );
}

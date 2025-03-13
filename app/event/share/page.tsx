"use client";
import { useSearchParams } from "next/navigation";
import LZString from "lz-string";

export default function Home() {
  const searchParams = useSearchParams();

  const urlParam = searchParams.get("url");
  let originalUrl = "";
  if (urlParam) {
    originalUrl = LZString.decompressFromEncodedURIComponent(urlParam);
  }

  const name = searchParams.get("name") || "名前がありません";
  const tel = searchParams.get("tel") || "電話番号がありません";
  const lat = searchParams.get("lat") || "緯度がありません";
  const lng = searchParams.get("lng") || "経度がありません";

  return (
    <div className="flex justify-center items-center h-screen bg-stone-50">
      <div className="text-center">
        <p className="text-black text-2xl">
         圧縮;{urlParam || "リンクがありません"} 
        </p>
        <p className="text-black text-2xl">
         URL: {originalUrl || "リンクがありません"}
        </p>
        <p className="text-black text-2xl">Name: {name}</p>
        <p className="text-black text-2xl">Tel: {tel}</p>
        <p className="text-black text-2xl">Lat: {lat}</p>
        <p className="text-black text-2xl">Lng: {lng}</p>
      </div>
    </div>
  );
}

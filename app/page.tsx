"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");

  // 入力値が空文字の場合、trim()で空白除去した上でデフォルト値を設定する
  const queryTitle = title.trim() ? title : "aiueo";
  const queryDate = date.trim() ? date : "20030801";
  const queryArea = city.trim() ? city : "那覇市";

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-50">
      <div className="bg-white p-6 rounded shadow-lg text-center text-gray-950">
        <h1 className="text-2xl font-bold mb-6">イベント作成ページ</h1>

        {/* イベント名の入力欄 */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="title">
            イベント名
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="イベント名を入力"
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-950"
          />
        </div>

        {/* 開催日程（YYYYMMDD形式） */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="date">
            開催日程（YYYYMMDD）
          </label>
          <input
            id="date"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="20250312 など"
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-950"
          />
        </div>

        {/* 都道府県ドロップダウン */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="prefecture">
            都道府県
          </label>
          <select
            id="prefecture"
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-950"
          >
            <option value="">選択してください</option>
            <option value="東京都">東京都</option>
            <option value="大阪府">大阪府</option>
            <option value="沖縄県">沖縄県</option>
            <option value="北海道">北海道</option>
          </select>
        </div>

        {/* 市町村ドロップダウン */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold" htmlFor="city">
            市町村
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-950"
          >
            <option value="">選択してください</option>
            <option value="千代田区">千代田区</option>
            <option value="那覇市">那覇市</option>
            <option value="浪速区">浪速区</option>
            <option value="札幌市">札幌市</option>
          </select>
        </div>

        {/* クエリパラメータとしてデフォルト値を適用 */}
        <Link
          href={{
            pathname: "/event/gonzo",
            query: {
              title: queryTitle,
              date: queryDate,
              area: queryArea,
            },
          }}
        >
          <button className="px-4 py-2 text-lg font-semibold bg-blue-500 text-gray-950 rounded hover:bg-blue-600">
            次へ
          </button>
        </Link>
      </div>
    </div>
  );
}
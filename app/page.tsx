"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  const [title, setTitle] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");

  // Calendarで選択した日付を保持
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // イベント名: 空文字の場合はデフォルト "aiueo"
  const queryTitle = title.trim() ? title : "aiueo";

  // 開催日程: 未選択の場合はデフォルト "20030801"
  const queryDate = selectedDate ? format(selectedDate, "yyyyMMdd") : "20030801";

  // 市町村: 空文字の場合はデフォルト "那覇市"
  const queryArea = city.trim() ? city : "那覇市";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 text-stone-950 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* イベント名 */}
        <div>
          <label className="block text-sm font-semibold mb-1">イベント名</label>
          <Input
            placeholder="イベント名を入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 開催日程（Calendar） */}
        <div>
          <label className="block text-sm font-semibold mb-2">開催日程</label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>

        {/* 都道府県ドロップダウン */}
        <div>
          <label className="block text-sm font-semibold mb-1">都道府県</label>
          <Select value={prefecture} onValueChange={setPrefecture}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="東京都">東京都</SelectItem>
              <SelectItem value="大阪府">大阪府</SelectItem>
              <SelectItem value="沖縄県">沖縄県</SelectItem>
              <SelectItem value="北海道">北海道</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 市町村ドロップダウン */}
        <div>
          <label className="block text-sm font-semibold mb-1">市町村</label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="千代田区">千代田区</SelectItem>
              <SelectItem value="那覇市">那覇市</SelectItem>
              <SelectItem value="浪速区">浪速区</SelectItem>
              <SelectItem value="札幌市">札幌市</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 次へボタン */}
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
          <Button className="w-full">次へ</Button>
        </Link>
      </div>
    </div>
  );
}

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const isDisabled = !title.trim() || !selectedDate || !prefecture.trim() || !city.trim();

  const queryTitle = title.trim() ? title : "";
  const queryDate = selectedDate ? format(selectedDate, "yyyyMMdd") : "";
  const queryArea = city.trim() ? city : "";
// ひらがな、カタカナ、漢字、英語（大文字・小文字）、および空白を許可する正規表現
const allowedRegex = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFFa-zA-Z\s]+$/;
const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  if (value === "" || allowedRegex.test(value)) {
    setTitle(value);
  } else {
    alert("ひらがな、カタカナ、漢字、英語以外の文字は使用できません");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 text-stone-950 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="mt-20">
          <label className="block text-sm font-semibold mb-1">イベント名</label>
          <Input
  placeholder="お誕生日会"
  value={title}
  onChange={handleTitleChange}
/>
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-semibold mb-2">開催日程</label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>

          <div className="flex flex-col space-y-4">
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
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href={{
              pathname: "/event/gonzo",
              query: {
                title: queryTitle,
                date: queryDate,
                area: queryArea,
              },
            }}
            className={isDisabled ? "pointer-events-none" : ""}
          >
            <Button disabled={isDisabled}>次へ</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

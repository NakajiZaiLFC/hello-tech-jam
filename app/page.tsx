"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

// UIコンポーネント(例)
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

import prefCityData from "@/public/pref_city.json"; 

export default function Home() {
  const [title, setTitle] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // JSONは配列形式で、その先頭要素が都道府県をまとめたオブジェクトを持っている想定
  const prefCityObject = prefCityData[0];

  // Object.entriesで取り出した後、キー（id）の昇順でソートしてからマッピングする
  const prefectureList = Object.entries(prefCityObject)
    .sort(([codeA], [codeB]) => codeA.localeCompare(codeB))
    .map(([code, data]) => {
      // data の中身: { id: "01", name: "北海道", short: "北海道", city: [ { citycode: "...", city: "..." }, ... ] }
      const { name, city: cityArray } = data as {
        name: string;
        city: { citycode: string; city: string }[];
      };
      return {
        code,
        name,
        cityList: cityArray.map((c) => c.city),
      };
    });

  // 選択された都道府県コード(prefecture)に合致する市町村リストを取得
  const selectedPrefectureData = prefectureList.find(
    (item) => item.code === prefecture
  );
  const cityOptions = selectedPrefectureData?.cityList || [];

  const isDisabled =
    !title.trim() || !selectedDate || !prefecture.trim() || !city.trim();

  const queryTitle = title.trim() ? title : "";
  const queryDate = selectedDate ? format(selectedDate, "yyyyMMdd") : "";
  const queryArea = city.trim() ? city : "";

  // ひらがな、カタカナ、漢字、英語（大文字・小文字）、および空白を許可する正規表現
  const allowedRegex = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFFa-zA-Z\s]+$/;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 20) {
      alert("20文字以上の入力は許可されません");
      return;
    }
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
          <Input placeholder="お誕生日会" value={title} onChange={handleTitleChange} />
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
            {/* 都道府県のセレクト */}
            <div>
              <label className="block text-sm font-semibold mb-1">都道府県</label>
              <Select
                value={prefecture}
                onValueChange={(value) => {
                  setPrefecture(value);
                  // 都道府県が変わったら市町村選択をリセット
                  setCity("");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {prefectureList.map((pref) => (
                    <SelectItem key={pref.code} value={pref.code}>
                      {pref.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 市町村のセレクト */}
            <div>
              <label className="block text-sm font-semibold mb-1">市町村</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {cityOptions.map((cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName}
                    </SelectItem>
                  ))}
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

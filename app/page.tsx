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
  // デフォルトで沖縄が選択されるように "47" を初期値に設定（沖縄のコードと仮定）
  const [prefecture, setPrefecture] = useState("47");
  const [city, setCity] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState(""); // 新しく時間を管理

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

  // 全ての入力が揃っていないときはボタンをdisabledにする
  const isDisabled =
    !title.trim() || !selectedDate || !selectedTime || !prefecture.trim() || !city.trim();

  // クエリとして渡す値：日付と時間を結合（12桁: yyyyMMddHHmm）
  let queryDate = "";
  if (selectedDate && selectedTime) {
    const [hour, minute] = selectedTime.split(":").map(Number);
    const combinedDate = new Date(selectedDate);
    combinedDate.setHours(hour, minute);
    queryDate = format(combinedDate, "yyyyMMddHHmm");
  }
  
  const queryTitle = title.trim() ? title : "";
  const queryArea = city.trim() ? city : "";

  // ひらがな、カタカナ、漢字、英語（大文字・小文字）、および全角数字と空白を許可する正規表現
  const allowedRegex = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFFa-zA-Z0-9\uFF10-\uFF19\s]+$/;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 500) {
      alert("500文字以上の入力は許可されません");
      return;
    }
    if (value === "" || allowedRegex.test(value)) {
      setTitle(value);
    } else {
      alert("ひらがな、カタカナ、漢字、英語、全角数字以外の文字は使用できません");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 text-stone-950 px-4">
	<div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
		<h1 className="text-2xl font-bold mb-4 text-center">新規イベント作成</h1>
      <div className="w-full max-w-md space-y-4">
        {/* 余白を削減: mt-20 → mt-8 または不要なら削除 */}
        <div className="mt-8">
          <label className="block text-sm font-semibold mb-1">イベント名</label>
          <Input placeholder="お誕生日会" value={title} onChange={handleTitleChange} />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">開催日程</label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {/* 開催時間 */}
            <div>
              <label className="block text-sm font-semibold mb-2">開催時間</label>
              <Input 
                type="time" 
                value={selectedTime} 
                onChange={(e) => setSelectedTime(e.target.value)} 
              />
            </div>
            {/* 都道府県 */}
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

            {/* 市町村 */}
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
                date: queryDate, // 12桁のクエリに変更
                area: queryArea,
              },
            }}
            className={isDisabled ? "pointer-events-none w-full" : "w-full"}
          >
            <Button disabled={isDisabled} className="w-full">
              次へ
            </Button>
          </Link>
        </div>
      </div>
    </div>
	</div>
  );
}

// "use client";

// import { Suspense } from "react";
// import { useSearchParams } from "next/navigation";

// function QueryDisplay() {
//   const searchParams = useSearchParams();

//   const title = searchParams.get("title") || "";
//   const date = searchParams.get("date") || "";
//   const area = searchParams.get("area") || "";
//   const scene = searchParams.get("scene") || "";
//   const food = searchParams.get("food") || "";
//   const cost = searchParams.get("cost") || "";
//   const num = searchParams.get("num") || "";
//   const seat = searchParams.get("seat") || "";
//   const question = searchParams.get("question") || "";

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <p><strong>タイトル: </strong>{title}</p>
//       <p><strong>日付: </strong>{date}</p>
//       <p><strong>エリア: </strong>{area}</p>
//       <p><strong>シーン: </strong>{scene}</p>
//       <p><strong>料理: </strong>{food}</p>
//       <p><strong>費用: </strong>{cost}</p>
//       <p><strong>人数: </strong>{num}</p>
//       <p><strong>席種: </strong>{seat}</p>
//       <p><strong>質問: </strong>{question}</p>
//     </div>
//   );
// }

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-950">
//       <h1 className="text-3xl font-bold mb-4">クエリパラメータの内容</h1>
//       <Suspense fallback={<div>Loading...</div>}>
//         <QueryDisplay />
//       </Suspense>
//     </div>
//   );
// }

import Link from "next/link";
import LZString from "lz-string";


const DEFAULT_SHOP_NAME = "和風亭";
const DEFAULT_TITLE = "比嘉さん誕生日会";
const DEFAULT_DATE = "202112310130";// 2021/12/31 01:30
const DEFAULT_TEL = "08012345678";
const DEFAULT_LAT = 35.669220;
const DEFAULT_LNG = 139.761457;
const DEFAULT_URL = "https://columbia.jp/artist-info/nonochan/";

export default function Home() {
  // defaultParamsオブジェクトに全パラメーターをまとめる
  const defaultParams = {
    name: DEFAULT_SHOP_NAME,
    tel: DEFAULT_TEL,
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    url: DEFAULT_URL,
    date: DEFAULT_DATE,
    title: DEFAULT_TITLE,
  };

  const compressedUrl = LZString.compressToEncodedURIComponent(defaultParams.url);

  return (
    <div className="flex justify-center items-center h-screen bg-stone-50">
      <div className="text-center">
        <a href="#" className="text-gray-950 text-2xl no-underline">
          店舗取捨選択ページ
        </a>
        <div className="mt-5">
          <Link
            href={`/event/share?url=${compressedUrl}&date=${defaultParams.date}&name=${defaultParams.name}&tel=${defaultParams.tel}&lat=${defaultParams.lat}&lng=${defaultParams.lng}&title=${defaultParams.title}`}
          >
            <button className="px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded">
              シェアページへ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


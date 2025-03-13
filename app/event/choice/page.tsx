"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function QueryDisplay() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const date = searchParams.get("date") || "";
  const area = searchParams.get("area") || "";
  const scene = searchParams.get("scene") || "";
  const food = searchParams.get("food") || "";
  const cost = searchParams.get("cost") || "";
  const num = searchParams.get("num") || "";
  const seat = searchParams.get("seat") || "";
  const question = searchParams.get("question") || "";

  return (
    <div className="bg-white p-6 rounded shadow">
      <p><strong>タイトル: </strong>{title}</p>
      <p><strong>日付: </strong>{date}</p>
      <p><strong>エリア: </strong>{area}</p>
      <p><strong>シーン: </strong>{scene}</p>
      <p><strong>料理: </strong>{food}</p>
      <p><strong>費用: </strong>{cost}</p>
      <p><strong>人数: </strong>{num}</p>
      <p><strong>席種: </strong>{seat}</p>
      <p><strong>質問: </strong>{question}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-950">
      <h1 className="text-3xl font-bold mb-4">クエリパラメータの内容</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryDisplay />
      </Suspense>
    </div>
  );
}

// import Link from "next/link";
// import LZString from "lz-string";

// export default function Home() {
//   //apiからurl取得したら、一旦LZString.compressToEncodedURIComponentに入れたやつを
//   //クエリパラメーターとして渡してね
//   //以下は仮です。

//   const name = "和風亭";
//   const tel = "08012345678";
//   const lat =35.669220;
//   const lng = 139.761457;
//   const url = "https://columbia.jp/artist-info/nonochan/";
//   const compressedUrl = LZString.compressToEncodedURIComponent(url);

//   return (
//     <div className="flex justify-center items-center h-screen bg-stone-50">
//       <div className="text-center">
//         <a href="#" className="text-gray-950 text-2xl no-underline">
//           店舗取捨選択ページ
//         </a>
//         <div className="mt-5">
//         <Link href={`/event/share?url=${compressedUrl}&name=${name}&tel=${tel}&lat=${lat}&lng=${lng}`}>
//           <button className="px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded">
//             シェアページへ
//           </button>
//         </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
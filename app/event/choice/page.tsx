import Link from "next/link";
// npm install lz-string
import LZString from "lz-string";

export default function Home() {
  //apiからurl取得したら、一旦LZString.compressToEncodedURIComponentに入れたやつを
  //クエリパラメーターとして渡してね
  //以下は仮です。

  const name = "和風亭";
  const tel = "08012345678";
  const lat =35.669220;
  const lng = 139.761457;
  const url = "https://columbia.jp/artist-info/nonochan/";
  const compressedUrl = LZString.compressToEncodedURIComponent(url);

  return (
    <div className="flex justify-center items-center h-screen bg-stone-50">
      <div className="text-center">
        <a href="#" className="text-black text-2xl no-underline">
          店舗取捨選択ページ
        </a>
        <div className="mt-5">

          <Link href={`/event/share?url=${compressedUrl}name=${name}tel=${tel}lat=${lat}lng=${lng}`}>
            <button className="px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded">
              シェアページへ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


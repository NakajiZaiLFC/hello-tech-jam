import Link from "next/link";
import LZString from "lz-string";

const DEFAULT_SHOP_NAME = "和風亭";
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
    url: DEFAULT_URL
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
            href={`/event/share?url=${compressedUrl}&name=${defaultParams.name}&tel=${defaultParams.tel}&lat=${defaultParams.lat}&lng=${defaultParams.lng}`}
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


import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-stone-50">
      <div className="text-center">
        <a href="#" className="text-black text-2xl no-underline">
          店舗取捨選択ぺー時
        </a>
        <div className="mt-5">
          <Link href="/event/share">
            <button className="px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded">
              シェアページへ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

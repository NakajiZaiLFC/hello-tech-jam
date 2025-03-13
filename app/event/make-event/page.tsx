import Link from "next/link";


export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-stone-50">
      <div className="text-center">
        <a href="#" className="text-gray-950 text-2xl no-underline">
        イベント作成ページ
        </a>
        <div className="mt-5">
          <Link href="/event/gonzo">
            <button className="px-4 py-2 text-lg font-semibold bg-blue-500 text-white rounded">
             コンシェルずへ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export type Question = {
	id: number;
	text: string;
	options: string[];
	terminateIfYes?: boolean; // YESなら質問終了するかどうか
  };
  
  // 具体的な質問を最初にして、YESなら終了
  export const questions: Question[] = [
	{
	  id: 1,
	  text: "銀座にある高級寿司店「すし松」の個室で、10,000円以上の会食を予約したいですか？",
	  options: ["YES", "NO"],
	  terminateIfYes: true, // YESなら質問終了
	},
	{
	  id: 2,
	  text: "会食のシーンは？",
	  options: [
		"仲間内",
		"部署内",
		"表彰祝い",
		"異動祝い",
		"社内接待",
		"社外接待",
		"忘年会",
		"新年会",
		"誕生日会",
	  ],
	},
	{
	  id: 3,
	  text: "ご希望のお料理は？",
	  options: [
		"焼肉",
		"中華",
		"鍋",
		"韓国料理",
		"イタリアン",
		"フレンチ",
		"その他",
		"おまかせ",
	  ],
	},
	{
	  id: 4,
	  text: "ご予算は？",
	  options: [
		"3,000円未満",
		"3,000～5,000円",
		"5,000～8,000円",
		"8,000円以上",
	  ],
	},
	{
	  id: 5,
	  text: "開催時期は？",
	  options: [
		"今週中",
		"来週中",
		"今月中",
		"来月",
		"来季以降",
		"未定",
	  ],
	},
	{
	  id: 6,
	  text: "参加人数は？",
	  options: ["5名以下", "6～15名", "16名以上"],
	},
	{
	  id: 7,
	  text: "お席のご希望は？",
	  options: ["個室", "テーブル席", "カジュアル", "特になし"],
	},
	{
	  id: 8,
	  text: "その他ご要望は？",
	  options: ["なし", "その他"],
	},
  ];
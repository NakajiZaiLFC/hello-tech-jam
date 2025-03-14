export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const address = searchParams.get("address");
	const special = searchParams.get("special");
	const genre = searchParams.get("genre");
	const budget = searchParams.get("budget");
	const seatParam = searchParams.get("seatParam");
	const keyword = searchParams.get("keyword");
	
	const apiKey = process.env.NEXT_PUBLIC_HOTPEPPER_API || "YOUR_API_KEY";
	const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
	
	// 外部API用のURLを構築
	const apiUrl =
	  `${baseUrl}?key=${apiKey}` +
	  (address ? `&address=${address}` : "") +
	  (special ? `&special=${special}` : "") +
	  (genre ? `&genre=${genre}` : "") +
	  (budget ? `&budget=${budget}` : "") +
	  (seatParam ? `&${seatParam}` : "") +
	  (keyword ? `&keyword=${keyword}` : "") +
	  "&count=9&format=json";
	
	try {
	  const response = await fetch(apiUrl);
	  if (!response.ok) {
		return new Response(JSON.stringify({ error: `HTTP error! status: ${response.status}` }), { status: response.status });
	  }
	  const jsonData = await response.json();
	  return new Response(JSON.stringify(jsonData), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	  });
	} catch (error) {
	  return new Response(
		JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
		{ status: 500 }
	  );
	}
  }
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, _response: NextResponse) {
    const from = request.nextUrl.searchParams.get("from");
    const to = request.nextUrl.searchParams.get("to");
    const amount = parseInt(request.nextUrl.searchParams.get("amount")!);

    if(isNaN(amount)) {
        return new Response("Amount given is invalid.", {
            status: 400
        })
    };

    const req = await fetch(`https://api.currencybeacon.com/v1/convert?api_key=${process.env.CURRENCY_API_TOKEN}&from=${from}&to=${to}&amount=${amount}`);

    const currencyResponse = await req.json();

    return new Response(JSON.stringify({
        amount: Math.round(currencyResponse.response.value)
    }), {
        status: 200
    })
}
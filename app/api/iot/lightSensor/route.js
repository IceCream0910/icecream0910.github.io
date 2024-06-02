import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'accept-language': 'ko,en-US;q=0.9,en;q=0.8,ko-KR;q=0.7,zh-CN;q=0.6,zh-TW;q=0.5,zh;q=0.4',
                dnt: '1',
                'sec-ch-ua': '"Whale";v="3", "Not-A.Brand";v="8", "Chromium";v="124"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Whale/3.26.244.21 Safari/537.36',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SMARTTHINGS_API_TOKEN}`
            }
        };

        const response = await fetch('https://api.smartthings.com/v1/devices/8ea362ee-3081-4351-bea8-56922fd835fb/status?locationId=d3b171e0-66cc-4b68-b9ea-e38d88c44f29', options);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error });
    }
}

export const dynamic = "force-dynamic";
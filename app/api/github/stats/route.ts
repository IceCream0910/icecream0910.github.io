import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = await fetch('https://github-readme-stats.vercel.app/api?username=icecream0910', { cache: "no-store" });
        const data = await response.text();
        return new NextResponse(data, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' });
    }
}

export const dynamic = "force-dynamic";
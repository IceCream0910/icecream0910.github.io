import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = await fetch('https://gist.github.com/IceCream0910/07bf65d3a9488bcabb2e9de9e6a6264a.js', { cache: "no-store" });
        const data = await response.text();
        return new NextResponse(data, {
            headers: {
                'Content-Type': 'application/javascript',
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' });
    }
}

export const dynamic = "force-dynamic";
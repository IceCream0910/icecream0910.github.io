import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = await fetch('https://solved.ac/api/v3/user/show?handle=taein2370', { cache: "no-store" });
        const data = await response.json();
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' });
    }
}
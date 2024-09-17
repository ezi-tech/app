import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({
    status: "ok",
    env: process.env.VERCEL_ENV,
    host: process.env.VERCEL_URL,
  });
}

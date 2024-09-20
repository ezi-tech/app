import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  const { phone, hash } = await req.json();

  if (!phone || !hash) {
    return new Response("Missing phone or hash", { status: 400 });
  }

  await kv.set(`otp_hash:${phone}`, hash, { ex: 60 * 5 });
  return new Response("OK");
}

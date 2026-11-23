import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const token =
    process.env.OPENAI_APPS_CHALLENGE_TOKEN ||
    "HypD_3bqf9cm55xbJMpe0bgQjeImwhYVeYpuyUGois0";

  return new NextResponse(token.trim(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

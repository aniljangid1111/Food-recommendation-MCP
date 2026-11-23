import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.OPENAI_APPS_CHALLENGE_TOKEN || "";
  return new NextResponse(token, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

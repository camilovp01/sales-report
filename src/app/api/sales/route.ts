import { NextResponse } from "next/server";

import { API_URL } from "@/constants/constants";

export async function GET() {
  const response = await fetch(API_URL, {
    method: "GET",
  });
  const data = await response.json();
  return NextResponse.json(data);
}

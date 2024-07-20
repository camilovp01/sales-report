import { NextResponse } from "next/server";

import { apiUrl } from "@/constants/constants";

export async function GET() {
  const response = await fetch(apiUrl, {
    method: "GET",
  });
  const data = await response.json();
  return NextResponse.json(data);
}

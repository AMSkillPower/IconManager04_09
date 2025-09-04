import metadata from "@/data/metadata.json";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(metadata);
}

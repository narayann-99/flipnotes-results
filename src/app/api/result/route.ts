import { NextRequest, NextResponse } from "next/server";
import { MockProvider } from "@/lib/providers/mockProvider";

export async function POST(req: NextRequest) {
  try {
    const { rollNo } = await req.json();
    
    if (!rollNo || typeof rollNo !== "string") {
      return NextResponse.json({ error: "Roll number is required" }, { status: 400 });
    }

    const provider = new MockProvider();
    const result = await provider.getResult(rollNo.trim());

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

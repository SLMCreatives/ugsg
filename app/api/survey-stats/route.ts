import { NextResponse } from "next/server";
import { getSurveyStats } from "@/lib/googlesheets-survey";

export const dynamic = "force-dynamic";

// Aggregated, anonymous answer counts for the survey's live-results view.
export async function GET() {
  try {
    const stats = await getSurveyStats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error("Survey stats error:", error);
    return NextResponse.json({ error: "Live results unavailable." }, { status: 503 });
  }
}

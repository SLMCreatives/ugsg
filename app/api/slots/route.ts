import { NextResponse } from "next/server";
import { getSheetRows } from "@/lib/googlesheets";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await getSheetRows();

    // Sheet columns: [timestamp, name, phone, date, timeSlot]
    const counts: Record<string, number> = {};
    for (const row of rows) {
      const date = row[3];
      const time = row[4];
      if (!date || !time) continue;
      const key = `${date}__${time}`;
      counts[key] = (counts[key] || 0) + 1;
    }

    return NextResponse.json(counts);
  } catch (error) {
    console.error("Slots fetch error:", error);
    return NextResponse.json({});
  }
}

import { NextResponse } from "next/server";
import { appendToSheet, getSheetRows } from "@/lib/googlesheets";
import { SLOTS } from "@/lib/slots";

function isValidMalaysianPhone(phone: string) {
  const cleaned = phone.replace(/\s/g, "");
  return /^(\+?6?01)[0-9]{8,9}$/.test(cleaned);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "")
      .replace(/\s/g, "")
      .trim();
    const date = String(body.date || "").trim();
    const timeSlot = String(body.timeSlot || "").trim();

    // Account numbers are optional — students share them if they have them to
    // hand. Capped so a malformed client cannot write a huge cell.
    const bankIslamAccount = String(body.bankIslamAccount || "")
      .trim()
      .slice(0, 30);
    const sspnAccount = String(body.sspnAccount || "")
      .trim()
      .slice(0, 30);

    if (!name || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { error: "All booking fields are required." },
        { status: 400 }
      );
    }

    // The four prerequisites are the point of the checklist, so enforce them
    // here too — the UI gate alone is bypassable.
    const prerequisites = (body.prerequisites ?? {}) as Record<string, unknown>;
    const REQUIRED = [
      "bankIslam",
      "sspn",
      "myDigitalId",
      "offerLetter"
    ] as const;
    const missing = REQUIRED.filter((key) => prerequisites[key] !== true);

    if (missing.length > 0) {
      return NextResponse.json(
        {
          error:
            "Please confirm all four requirements before booking a slot.",
          missing
        },
        { status: 400 }
      );
    }

    if (!isValidMalaysianPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid Malaysian phone number." },
        { status: 400 }
      );
    }

    const slotDef = SLOTS.find((s) => s.date === date && s.time === timeSlot);
    if (!slotDef) {
      return NextResponse.json(
        { error: "Invalid slot selected." },
        { status: 400 }
      );
    }

    // Check current booking count for this slot
    const rows = await getSheetRows();
    const key = `${date}__${timeSlot}`;
    const currentCount = rows.filter(
      (row) => row[3] === date && row[4] === timeSlot
    ).length;

    if (currentCount >= slotDef.slots) {
      return NextResponse.json(
        { error: "This slot is now fully booked. Please choose another." },
        { status: 409 }
      );
    }

    // Columns A-E are unchanged; the checklist adds F-I, so the slot-count
    // lookup above (which reads columns D and E) keeps working.
    await appendToSheet([
      new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" }),
      name,
      phone,
      date,
      timeSlot,
      bankIslamAccount || "Confirmed (no number given)",
      sspnAccount || "Confirmed (no number given)",
      "Yes",
      "Yes"
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking submit error:", error);

    return NextResponse.json(
      { error: "Failed to save booking." },
      { status: 500 }
    );
  }
}

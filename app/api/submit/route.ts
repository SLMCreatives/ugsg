import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googlesheets";

const TIME_SLOT_LABELS: Record<string, string> = {
  morning: "Morning (10am - 12pm)",
  evening: "Evening (3pm - 5pm)"
};

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

    if (!name || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { error: "All booking fields are required." },
        { status: 400 }
      );
    }

    if (!isValidMalaysianPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid Malaysian phone number." },
        { status: 400 }
      );
    }

    const timeSlotLabel = TIME_SLOT_LABELS[timeSlot] || timeSlot;

    await appendToSheet([
      new Date().toISOString(),
      name,
      phone,
      date,
      timeSlotLabel
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

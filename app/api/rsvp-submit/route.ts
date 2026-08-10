import { NextResponse } from "next/server";
import { appendToSheet, getSheetRows } from "@/lib/googlesheets";
import { PROGRAMMES } from "@/lib/programmes";
import { titleCaseName } from "@/lib/name-case";

const RSVP_SHEET_NAME = process.env.GOOGLE_SHEETS_TNP_NAME || "TnP_Sept26";

// Sheet columns: [timestamp, name, email, phone, matric, programme]
const MATRIC_COLUMN = 4;

function isValidMalaysianPhone(phone: string) {
  const cleaned = phone.replace(/\s|-/g, "");
  return /^(\+?6?01)[0-9]{8,9}$/.test(cleaned);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMatric(matric: string) {
  return /^[A-Za-z0-9-]{5,20}$/.test(matric);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = titleCaseName(String(body.name || "").trim());
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const phone = String(body.phone || "")
      .replace(/\s|-/g, "")
      .trim();
    const matric = String(body.matric || "")
      .trim()
      .toUpperCase();
    const programme = String(body.programme || "").trim();

    if (!name || !email || !phone || !matric || !programme) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!isValidMalaysianPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid Malaysian phone number." },
        { status: 400 }
      );
    }

    if (!isValidMatric(matric)) {
      return NextResponse.json(
        { error: "Invalid matric number." },
        { status: 400 }
      );
    }

    if (!PROGRAMMES.includes(programme)) {
      return NextResponse.json(
        { error: "Please select a programme from the list." },
        { status: 400 }
      );
    }

    // A failed read must not block the RSVP, so it is handled on its own.
    try {
      const rows = await getSheetRows(RSVP_SHEET_NAME);
      const alreadyRsvped = rows.some(
        (row) => (row[MATRIC_COLUMN] || "").trim().toUpperCase() === matric
      );

      if (alreadyRsvped) {
        return NextResponse.json(
          { error: "This matric number has already RSVP'd for this event." },
          { status: 409 }
        );
      }
    } catch (error) {
      console.error("RSVP duplicate check skipped:", error);
    }

    await appendToSheet(
      [
        new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" }),
        name,
        email,
        phone,
        matric,
        programme
      ],
      RSVP_SHEET_NAME
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RSVP submit error:", error);
    return NextResponse.json(
      { error: "Failed to save your RSVP." },
      { status: 500 }
    );
  }
}

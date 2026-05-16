import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googlesheets";

const HELP_SHEET_NAME = "Sheet2";

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
    const matric = String(body.matric || "").trim();
    const issue = String(body.issue || "").trim();
    const sst = String(body.sst || "").trim();

    if (!name || !phone || !matric || !issue || !sst) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidMalaysianPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid Malaysian phone number." },
        { status: 400 }
      );
    }

    await appendToSheet(
      [
        new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" }),
        name,
        phone,
        matric,
        issue,
        sst
      ],
      HELP_SHEET_NAME
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Help submit error:", error);
    return NextResponse.json(
      { error: "Failed to save request." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googlesheets";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await appendToSheet([new Date().toISOString(), name, email, message]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to save form data." },
      { status: 500 }
    );
  }
}

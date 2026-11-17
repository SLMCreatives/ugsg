import { NextResponse } from "next/server";
import { appendBangkitRow } from "@/lib/googlesheets-bangkit";
import { validateBangkit, wantsToSpeak, type BangkitAnswers } from "@/lib/bangkit-survey";
import { titleCaseName } from "@/lib/name-case";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = typeof body?.id === "string" ? body.id.slice(0, 64) : "";
    const a = body?.answers as BangkitAnswers | undefined;

    if (!a || typeof a !== "object") {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const invalid = validateBangkit(a);
    if (invalid) {
      return NextResponse.json({ error: invalid }, { status: 400 });
    }

    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const list = (v: unknown) => (Array.isArray(v) ? v.join("; ") : "");

    // Column order must match BANGKIT_HEADER in lib/googlesheets-bangkit.ts.
    await appendBangkitRow([
      new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" }),
      id,
      titleCaseName(str(a.name)),
      str(a.matric).toUpperCase(),
      wantsToSpeak(a) ? str(a.email) : "",
      list(a.days),
      list(a.topics),
      str(a.participation),
      str(a.challenge),
      str(a.goal),
      str(a.speaker),
      str(a.permission),
      str(a.suggestions),
      "Yes"
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Bangkit submit error:", error);
    return NextResponse.json(
      { error: "We couldn’t save your response. Please try again." },
      { status: 500 }
    );
  }
}

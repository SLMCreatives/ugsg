import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/survey-token";

// Verifies a signed survey link token and returns the decoded student identity.
// The secret never leaves the server; the client only receives the verified fields.
export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({
      valid: true,
      student: {
        name: payload.name || "",
        matric: payload.matric || "",
        email: payload.email || "",
        programme: payload.programme || "",
        level: payload.level || ""
      }
    });
  } catch (error) {
    console.error("Survey verify error:", error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}

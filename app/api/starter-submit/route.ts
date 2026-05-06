import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googlesheets-kit";

/* const [formData, setFormData] = useState({
    name: "",
    matricNumber: "",
    phone: "",
    email: "",
    campus: "",
    tshirtSize: ""
  }); */

function isValidMalaysianPhone(phone: string) {
  const cleaned = phone.replace(/\s/g, "");
  return /^(\+?6?01)[0-9]{8,9}$/.test(cleaned);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const matricNumber = String(body.matricNumber || "").trim();
    const phone = String(body.phone || "")
      .replace(/\s/g, "")
      .trim();
    const email = String(body.email || "").trim();
    const campus = String(body.campus || "").trim();
    const tshirtSize = String(body.tshirtSize || "").trim();

    if (!name || !matricNumber || !phone || !email || !campus || !tshirtSize) {
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

    await appendToSheet([
      new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" }),
      name,
      matricNumber,
      phone,
      email,
      campus,
      tshirtSize
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

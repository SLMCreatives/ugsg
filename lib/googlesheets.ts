import { google } from "googleapis";

const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "RSVP List";

if (!clientEmail || !privateKey || !spreadsheetId) {
  throw new Error("Missing Google Sheets environment variables.");
}

function getAuth() {
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
}

export async function appendToSheet(row: (string | number)[]) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:D`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row]
    }
  });

  return response.data;
}

import { google } from "googleapis";

// Bangkit Series 2026 Recap survey → its own Google Sheet.
// Uses the shared service account (GOOGLE_SHEETS_CLIENT_EMAIL / PRIVATE_KEY);
// share the sheet with that email as an Editor.

export const BANGKIT_HEADER = [
  "Timestamp",
  "Response ID",
  "Full Name",
  "Matric No",
  "Email",
  "Available Slots",
  "Topics",
  "Participation",
  "2026 Experience",
  "2027 Goal",
  "Speaker Interest",
  "Share Story Anonymously",
  "Suggestions",
  "Consent"
];

function getAuth() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google Sheets credentials (CLIENT_EMAIL / PRIVATE_KEY).");
  }
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
}

function getConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_BANGKIT_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_BANGKIT_SHEET_NAME || "Sheet1";
  if (!spreadsheetId) {
    throw new Error(
      "Bangkit Google Sheet not configured. Set GOOGLE_SHEETS_BANGKIT_SPREADSHEET_ID in .env.local"
    );
  }
  return { spreadsheetId, sheetName };
}

let headerChecked = false;

/** Writes the header row into row 1 if the sheet is still empty. */
async function ensureHeader(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  sheetName: string
) {
  if (headerChecked) return;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:A1`
  });
  if (!res.data.values?.[0]?.[0]) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [BANGKIT_HEADER] }
    });
  }
  headerChecked = true;
}

export async function appendBangkitRow(row: string[]) {
  const { spreadsheetId, sheetName: rawName } = getConfig();
  const sheetName = `'${rawName.replace(/'/g, "''")}'`;
  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  await ensureHeader(sheets, spreadsheetId, sheetName);

  // Anchor on column A (always filled) so Sheets' table detection doesn't shift rows.
  // RAW so free-text answers starting with "=" are never evaluated as formulas.
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:A`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] }
  });
}

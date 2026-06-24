import { google } from "googleapis";

const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

function getAuth() {
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
  const spreadsheetId = process.env.GOOGLE_SHEETS_SURVEY_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SURVEY_SHEET_NAME || "Survey Responses";

  if (!spreadsheetId || spreadsheetId === "REPLACE_WITH_ACTUAL_ID") {
    throw new Error(
      "Survey Google Sheet not configured. Set GOOGLE_SHEETS_SURVEY_SPREADSHEET_ID in .env.local"
    );
  }

  return { spreadsheetId, sheetName };
}

export function normaliseMatric(value: string): string {
  return String(value || "").trim().toUpperCase();
}

export async function appendSurveyRow(row: (string | number)[]) {
  const { spreadsheetId, sheetName } = getConfig();
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] }
  });

  return response.data;
}

/**
 * Returns the set of matric numbers (normalised) that have already submitted.
 * Reads only the Matric column (D) to keep the payload small. The header row is skipped.
 */
export async function getSubmittedMatrics(): Promise<Set<string>> {
  const { spreadsheetId, sheetName } = getConfig();
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!D:D`
  });

  const values = (response.data.values as string[][]) || [];
  return new Set(
    values
      .slice(1) // skip header
      .map((r) => normaliseMatric(r[0]))
      .filter((m) => m.length > 0)
  );
}

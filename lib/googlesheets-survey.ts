import { google } from "googleapis";
import {
  MULTI_STATS,
  STAT_COLUMNS,
  type StatKey,
  type SurveyStats
} from "@/lib/survey-stats";

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

  // Anchor on column A only (every row has a timestamp there). With A:Z, Sheets'
  // table detection trips over the blank cells and starts rows further right.
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:A`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] }
  });

  // The new row should show up in the next live-results read.
  statsCache = null;

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

/* ------------------------------------------------------------------ */
/* Live results                                                        */
/* ------------------------------------------------------------------ */

// Every student on the survey polls this, so serve one sheet read per window
// rather than one per request (Sheets allows ~60 reads/min per account).
const STATS_TTL_MS = 30_000;
let statsCache: { at: number; data: SurveyStats } | null = null;
let statsInFlight: Promise<SurveyStats> | null = null;

/** Aggregated answer counts for the closed-ended questions. Counts only. */
export async function getSurveyStats(): Promise<SurveyStats> {
  if (statsCache && Date.now() - statsCache.at < STATS_TTL_MS) {
    return statsCache.data;
  }
  if (statsInFlight) return statsInFlight;

  statsInFlight = (async () => {
    const { spreadsheetId, sheetName } = getConfig();
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:U`
    });

    const rows = ((response.data.values as string[][]) || []).slice(1); // skip header
    const keys = Object.keys(STAT_COLUMNS) as StatKey[];
    const data: SurveyStats = {
      total: 0,
      updatedAt: new Date().toISOString(),
      questions: {}
    };

    for (const row of rows) {
      if (!row || !row.some((cell) => String(cell ?? "").trim())) continue;
      data.total += 1;

      for (const key of keys) {
        const raw = String(row[STAT_COLUMNS[key]] ?? "").trim();
        if (!raw) continue;

        const values = MULTI_STATS.includes(key)
          ? raw.split(";").map((v) => v.trim()).filter(Boolean)
          : [raw];
        if (values.length === 0) continue;

        const bucket = (data.questions[key] ??= { responses: 0, counts: {} });
        bucket.responses += 1;
        for (const value of values) {
          bucket.counts[value] = (bucket.counts[value] || 0) + 1;
        }
      }
    }

    statsCache = { at: Date.now(), data };
    return data;
  })();

  try {
    return await statsInFlight;
  } finally {
    statsInFlight = null;
  }
}

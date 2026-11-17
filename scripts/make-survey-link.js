#!/usr/bin/env node
/*
 * Generate signed personalised survey links.
 *
 * Single student (flags):
 *   node scripts/make-survey-link.js \
 *     --base https://your-site.com \
 *     --name "Sulaiman Munaff" --matric UG12345 --programme BBA --level Degree --email a@b.com
 *
 * Bulk from CSV (headers: name,matric,programme,level,email — common variants such
 * as "Student Name", "Matric No" or "Personal Email" are recognised too):
 *   node scripts/make-survey-link.js --base https://your-site.com --csv scripts/students.csv --out scripts/links.csv
 *
 * Rows without a matric number, or repeating one, are skipped and reported.
 *
 * The secret is read from .env.local (SURVEY_TOKEN_SECRET) or the environment.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function loadSecret() {
  if (process.env.SURVEY_TOKEN_SECRET) return process.env.SURVEY_TOKEN_SECRET;
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const line = fs
      .readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .find((l) => l.startsWith("SURVEY_TOKEN_SECRET="));
    if (line) return line.slice("SURVEY_TOKEN_SECRET=".length).trim().replace(/^"|"$/g, "");
  }
  return null;
}

function signToken(payload, secret) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

// Canonicalises the study-level wording from SRB exports to the values the survey
// expects for UG/PG routing (Certificate | Foundation | Diploma | Bachelor | Master | Doctor).
const LEVEL_MAP = {
  certificate: "Certificate",
  certificates: "Certificate",
  foundation: "Foundation",
  diploma: "Diploma",
  bachelor: "Bachelor",
  degree: "Bachelor",
  master: "Master",
  masters: "Master",
  doctor: "Doctor",
  doctorate: "Doctor",
  phd: "Doctor"
};

function normaliseLevel(raw) {
  const key = String(raw || "").trim().toLowerCase();
  return LEVEL_MAP[key] || String(raw || "").trim();
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
      args[key] = val;
    }
  }
  return args;
}

function makeLink(base, secret, student) {
  const payload = {};
  for (const k of ["name", "matric", "programme", "level", "email"]) {
    if (student[k]) {
      payload[k] = k === "level" ? normaliseLevel(student[k]) : String(student[k]).trim();
    }
  }
  const token = signToken(payload, secret);
  const url = new URL("/survey", base);
  url.searchParams.set("token", token);
  return url.toString();
}

// Quote-aware CSV parsing: Excel/SRB exports quote any field containing a comma,
// quote or newline (e.g. "Bachelor of Business (Hons), Marketing").
function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

// Common header spellings in student exports, mapped to the token fields.
const HEADER_ALIASES = {
  name: ["name", "student name", "full name", "nama"],
  matric: ["matric", "matric no", "matric number", "matric_no", "student id", "student no"],
  programme: ["programme", "program", "programme name", "program name", "course"],
  level: ["level", "study level", "study-level", "programme level", "level of study"],
  email: ["email", "personal email", "email address", "student email", "e-mail"]
};

function parseCsv(text) {
  const rows = parseCsvRows(text.replace(/^﻿/, "")); // strip Excel's BOM
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const indexOf = {};
  for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
    indexOf[field] = headers.findIndex((h) => aliases.includes(h));
  }
  return rows.slice(1).map((cells) => {
    const row = {};
    for (const [field, i] of Object.entries(indexOf)) {
      row[field] = i >= 0 ? (cells[i] || "").trim() : "";
    }
    return row;
  });
}

const csvCell = (v) => `"${String(v || "").replace(/"/g, '""')}"`;

function main() {
  const args = parseArgs(process.argv);
  const secret = loadSecret();

  if (!secret) {
    console.error("Error: SURVEY_TOKEN_SECRET not found in environment or .env.local");
    process.exit(1);
  }
  const base = args.base || "http://localhost:3000";

  if (args.csv) {
    const rows = parseCsv(fs.readFileSync(args.csv, "utf8"));
    const lines = ["name,matric,programme,level,email,link"];
    const seen = new Set();
    let skipped = 0;

    rows.forEach((r, i) => {
      const where = `row ${i + 2}`; // +1 header, +1 one-based
      const matricKey = r.matric.toUpperCase();
      if (!r.matric) {
        console.error(`Skipped ${where}: no matric number (${r.name || "no name"})`);
        skipped++;
        return;
      }
      if (seen.has(matricKey)) {
        console.error(`Skipped ${where}: duplicate matric ${r.matric}`);
        skipped++;
        return;
      }
      seen.add(matricKey);
      if (r.level && !LEVEL_MAP[r.level.toLowerCase()]) {
        console.error(`Warning ${where}: unknown level "${r.level}" — student will be asked to pick one`);
      }
      const link = makeLink(base, secret, r);
      lines.push([r.name, r.matric, r.programme, r.level, r.email, link].map(csvCell).join(","));
    });

    const csv = lines.join("\r\n") + "\r\n";
    if (args.out) {
      // UTF-8 with BOM so Excel shows names with accents correctly. Written
      // directly because PowerShell's `>` would re-encode the file as UTF-16.
      fs.writeFileSync(args.out, "﻿" + csv, "utf8");
      console.error(`Wrote ${lines.length - 1} links to ${args.out} (${skipped} skipped)`);
    } else {
      process.stdout.write(csv);
    }
    return;
  }

  const link = makeLink(base, secret, args);
  console.log(link);
}

main();

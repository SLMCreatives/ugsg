#!/usr/bin/env node
/*
 * Generate signed personalised survey links.
 *
 * Single student (flags):
 *   node scripts/make-survey-link.js \
 *     --base https://your-site.com \
 *     --name "Sulaiman Munaff" --matric UG12345 --programme BBA --level Degree --email a@b.com
 *
 * Bulk from CSV (headers: name,matric,programme,level,email):
 *   node scripts/make-survey-link.js --base https://your-site.com --csv students.csv > links.csv
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

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = line.split(",");
    const row = {};
    headers.forEach((h, i) => (row[h] = (cells[i] || "").trim()));
    return row;
  });
}

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
    console.log("name,matric,programme,level,email,link");
    for (const r of rows) {
      const link = makeLink(base, secret, r);
      console.log(
        [r.name, r.matric, r.programme, r.level, r.email, link]
          .map((v) => `"${String(v || "").replace(/"/g, '""')}"`)
          .join(",")
      );
    }
    return;
  }

  const link = makeLink(base, secret, args);
  console.log(link);
}

main();

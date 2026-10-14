"use client";

import type { StatBucket } from "@/lib/survey-stats";
import type { WheelItem } from "./wheel-picker";

export type ResultKind = "single" | "multi" | "rating";

interface ResultRow extends WheelItem {
  count: number;
  pct: number;
  mine: boolean;
}

interface Tally {
  rows: ResultRow[];
  responses: number;
  average: number | null;
}

/**
 * Turns server counts into display rows. With `includeMine` the student's own
 * (not yet submitted) answer is added so the numbers include them.
 */
export function tally(
  kind: ResultKind,
  items: WheelItem[],
  bucket: StatBucket | undefined,
  mine: string | string[] | undefined,
  includeMine: boolean
): Tally {
  const mineList = Array.isArray(mine) ? mine : mine ? [mine] : [];
  const addMine = includeMine && mineList.length > 0;
  const responses = (bucket?.responses || 0) + (addMine ? 1 : 0);

  const rows = items.map((item) => {
    const isMine = mineList.includes(item.value);
    const count = (bucket?.counts[item.value] || 0) + (addMine && isMine ? 1 : 0);
    return {
      ...item,
      count,
      pct: responses ? Math.round((count / responses) * 100) : 0,
      mine: isMine
    };
  });

  let average: number | null = null;
  if (kind === "rating") {
    const scored = rows.reduce((sum, r) => sum + Number(r.value) * r.count, 0);
    const n = rows.reduce((sum, r) => sum + r.count, 0);
    average = n ? scored / n : null;
  }

  // Leaderboard order for plain choices; scales keep their natural order.
  if (kind === "single" || kind === "multi") {
    rows.sort((a, b) => b.count - a.count);
  }

  return { rows, responses, average };
}

/** One playful line about how the student's answer compares. */
export function headline(kind: ResultKind, { rows }: Tally): string {
  if (kind === "multi") {
    const top = rows[0];
    if (!top) return "";
    return top.mine
      ? `You picked the crowd favourite: ${top.label} 🏆`
      : `Crowd favourite: ${top.label} (${top.pct}%)`;
  }

  const mine = rows.find((r) => r.mine);
  if (!mine) return "";
  const topCount = Math.max(...rows.map((r) => r.count));

  if (mine.count === topCount && mine.pct >= 50) {
    return `You're with the majority! 🙌 ${mine.pct}% said the same.`;
  }
  if (mine.count === topCount) return `Most popular answer! 🏆 ${mine.pct}% agree with you.`;
  if (mine.pct <= 10) return `Rare pick! 🦄 Only ${mine.pct}% chose this.`;
  return `${mine.pct}% of students answered like you.`;
}

interface ResultBarsProps {
  tally: Tally;
}

export function ResultBars({ tally: t }: ResultBarsProps) {
  return (
    <ul className="result-bars">
      {t.rows.map((r, i) => (
        <li key={r.value} className={`result-row ${r.mine ? "is-mine" : ""}`}>
          <span
            className="result-fill"
            style={{ width: `${Math.max(r.pct, 2)}%`, animationDelay: `${i * 70}ms` }}
            aria-hidden="true"
          />
          <span className="result-label">
            {r.emoji ? <span className="result-emoji">{r.emoji}</span> : null}
            <span>{r.label}</span>
            {r.mine ? <span className="result-you">You</span> : null}
          </span>
          <span className="result-pct">{r.pct}%</span>
        </li>
      ))}
    </ul>
  );
}

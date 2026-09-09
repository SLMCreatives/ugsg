"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

/**
 * The semester checklist, tickable and remembered.
 *
 * Same shape as the account-setup tracker: progress is kept in localStorage
 * under a per-language key, and the first paint renders everything unticked so
 * the server and client markup agree before the stored value is read back.
 *
 * Items are keyed by position rather than by their text, so editing the wording
 * of an item doesn't silently wipe a student's ticks.
 */

export interface ChecklistGroup {
  title: string;
  items: string[];
}

export interface ChecklistLabels {
  /** e.g. "{done}/{total}" */
  count: string;
  /** Accessible name for the reset control. */
  reset: string;
}

function keyFor(groupIndex: number, itemIndex: number) {
  return `g${groupIndex}-i${itemIndex}`;
}

export function Checklist({
  groups,
  labels,
  storageKey
}: {
  groups: ChecklistGroup[];
  labels: ChecklistLabels;
  /** localStorage key — distinct per language so the two pages don't collide. */
  storageKey: string;
}) {
  const [ticked, setTicked] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTicked(parsed.filter((v): v is string => typeof v === "string"));
        }
      }
    } catch {
      // Private mode, cleared storage, or blocked site data — start fresh.
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(ticked));
    } catch {
      // Nothing to do — progress just won't persist for this visitor.
    }
  }, [ticked, hydrated, storageKey]);

  const toggle = (key: string) =>
    setTicked((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key]
    );

  return (
    <div className="grid gap-3 sm:gap-5 lg:grid-cols-3">
      {groups.map((group, g) => {
        const done = group.items.filter((_, i) =>
          ticked.includes(keyFor(g, i))
        ).length;
        const complete = done === group.items.length;

        return (
          <div
            key={group.title}
            className={`flex flex-col gap-3 rounded-[18px] border bg-white p-5 transition-colors sm:p-6 ${
              complete ? "border-done/40" : "border-sand-300"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="m-0 font-display text-base font-bold text-sand-900 sm:text-[17px]">
                {group.title}
              </h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${
                  complete
                    ? "bg-done-tint text-done"
                    : "bg-sand-100 text-unitar-orange-ink"
                }`}
              >
                {labels.count
                  .replaceAll("{done}", String(done))
                  .replaceAll("{total}", String(group.items.length))}
              </span>
            </div>

            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {group.items.map((item, i) => {
                const key = keyFor(g, i);
                const isTicked = ticked.includes(key);

                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      aria-pressed={isTicked}
                      className="flex w-full items-start gap-2.5 rounded-lg py-2 pr-1 text-left transition-colors hover:bg-sand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-unitar-orange"
                    >
                      <span
                        className={`mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[6px] border-2 transition-colors ${
                          isTicked
                            ? "border-done bg-done text-white"
                            : "border-sand-400"
                        }`}
                      >
                        {isTicked && (
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden="true" />
                        )}
                      </span>
                      <span
                        className={`text-[13.5px] leading-snug transition-colors ${
                          isTicked
                            ? "text-sand-600 line-through decoration-sand-400"
                            : "text-sand-800"
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {done > 0 && (
              <button
                type="button"
                onClick={() =>
                  setTicked((prev) =>
                    prev.filter(
                      (v) => !group.items.some((_, i) => keyFor(g, i) === v)
                    )
                  )
                }
                className="self-start text-[12.5px] font-semibold text-sand-700 underline underline-offset-2 hover:text-sand-900"
              >
                {labels.reset}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

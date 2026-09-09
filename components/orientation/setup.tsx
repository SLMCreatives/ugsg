"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode
} from "react";
import { ArrowRight, Check, ChevronDown, PartyPopper } from "lucide-react";

/**
 * The account-setup tracker shared by the BM and English orientation pages.
 *
 * One client island holds all the state: which steps are ticked off (kept in
 * localStorage so a student can come back to the page and carry on) and which
 * step is currently open. The progress panel sits up in the hero and the step
 * list sits further down the page, so the state lives in a context rather than
 * in either component.
 *
 * All user-facing strings arrive as `labels` — nothing here is translated in
 * place. Templates use {done}, {total} and {n} placeholders because functions
 * cannot cross the server/client boundary.
 */

export interface SetupStep {
  id: string;
  /** Short title, shown in the collapsed row. */
  title: string;
  /** One line under the title while the step is collapsed. */
  summary: string;
  /** The full instructions, rendered when the step is open. */
  content: ReactNode;
}

export interface SetupLabels {
  progress: string;
  /** e.g. "{done} daripada {total} selesai" */
  doneCount: string;
  /** e.g. "Teruskan langkah {n}" */
  continueStep: string;
  allDone: string;
  currentStep: string;
  done: string;
  markDone: string;
  markUndone: string;
  /** e.g. "Langkah {n}" */
  stepLabel: string;
  /** Shown in the panel that appears once every step is ticked off. */
  completeTitle: string;
  completeBody: string;
  completeCta: string;
  /**
   * Anchor the completion button scrolls to — the checklist section. Lives in
   * the labels because the two pages give that section different ids.
   */
  completeHref: string;
}

interface SetupContextValue {
  steps: SetupStep[];
  labels: SetupLabels;
  doneIds: string[];
  openId: string | null;
  currentIndex: number;
  toggleDone: (id: string) => void;
  setOpenId: (id: string | null) => void;
}

const SetupContext = createContext<SetupContextValue | null>(null);

function useSetup() {
  const ctx = useContext(SetupContext);
  if (!ctx) throw new Error("Setup components must be used inside SetupProvider");
  return ctx;
}

function fill(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template
  );
}

/**
 * Glide to an on-page anchor rather than jumping, so a student can see where
 * the button took them. Falls back to the browser's own jump if the target
 * isn't on the page, and honours a reduced-motion preference.
 */
function scrollToAnchor(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", href);
}

export function SetupProvider({
  steps,
  labels,
  storageKey,
  children
}: {
  steps: SetupStep[];
  labels: SetupLabels;
  /** localStorage key — distinct per language so the two pages don't collide. */
  storageKey: string;
  children: ReactNode;
}) {
  const [doneIds, setDoneIds] = useState<string[]>([]);
  // Open the first step on the server too, so the panel doesn't flash shut
  // between first paint and hydration.
  const [openId, setOpenId] = useState<string | null>(steps[0]?.id ?? null);
  // Until the stored value is read, render as if nothing is done, so the
  // server and client markup agree on the first paint.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setDoneIds(parsed.filter((v): v is string => typeof v === "string"));
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
      window.localStorage.setItem(storageKey, JSON.stringify(doneIds));
    } catch {
      // Nothing to do — progress just won't persist for this visitor.
    }
  }, [doneIds, hydrated, storageKey]);

  const currentIndex = useMemo(() => {
    const next = steps.findIndex((step) => !doneIds.includes(step.id));
    return next === -1 ? steps.length : next;
  }, [steps, doneIds]);

  // Open the first unfinished step once progress has been read back.
  useEffect(() => {
    if (!hydrated) return;
    setOpenId(steps[currentIndex]?.id ?? null);
  }, [hydrated, currentIndex, steps]);

  const toggleDone = useCallback((id: string) => {
    setDoneIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }, []);

  const value = useMemo(
    () => ({
      steps,
      labels,
      doneIds,
      openId,
      currentIndex,
      toggleDone,
      setOpenId
    }),
    [steps, labels, doneIds, openId, currentIndex, toggleDone]
  );

  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>;
}

/** Progress bar and "continue" button — designed to sit inside the hero card. */
export function SetupProgress() {
  const { steps, labels, doneIds, currentIndex, setOpenId } = useSetup();
  const total = steps.length;
  const done = doneIds.length;
  const finished = currentIndex >= total;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2.5 rounded-2xl bg-white p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-semibold text-sand-800">
            {labels.progress}
          </span>
          <span className="text-sm font-bold text-unitar-orange-ink">
            {fill(labels.doneCount, { done, total })}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-sand-300">
          <div
            className="h-full rounded-full bg-unitar-orange transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <a
        href={finished ? labels.completeHref : `#${steps[currentIndex]?.id}`}
        onClick={(event) => {
          if (finished) {
            scrollToAnchor(event, labels.completeHref);
            return;
          }
          setOpenId(steps[currentIndex].id);
        }}
        className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-unitar-orange px-7 text-base font-bold text-white transition-colors hover:bg-unitar-orange-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-unitar-orange-ink"
      >
        {finished
          ? labels.allDone
          : fill(labels.continueStep, { n: currentIndex + 1 })}
        <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
      </a>
    </div>
  );
}

/**
 * The reward for finishing: appears under the step list once every step is
 * ticked, and hands the student on to the checklist.
 */
function SetupComplete() {
  const { labels } = useSetup();

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-done/30 bg-done-tint p-5 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-done">
          <PartyPopper className="h-[22px] w-[22px] text-white" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="m-0 font-display text-[17px] font-bold leading-tight text-[#1F5A31] sm:text-xl">
            {labels.completeTitle}
          </p>
          <p className="m-0 text-[13.5px] leading-snug text-[#2F5A3D] sm:text-[14.5px]">
            {labels.completeBody}
          </p>
        </div>
      </div>

      <a
        href={labels.completeHref}
        onClick={(event) => scrollToAnchor(event, labels.completeHref)}
        className="flex min-h-[48px] shrink-0 items-center justify-center gap-2.5 rounded-full bg-done px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#266637] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-done"
      >
        {labels.completeCta}
        <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
      </a>
    </div>
  );
}

/** The four steps, with the current one expanded. */
export function SetupSteps() {
  const {
    steps,
    labels,
    doneIds,
    openId,
    currentIndex,
    toggleDone,
    setOpenId
  } = useSetup();

  const finished = steps.length > 0 && currentIndex >= steps.length;

  return (
    <>
    <ol className="flex list-none flex-col gap-3 p-0">
      {steps.map((step, i) => {
        const isDone = doneIds.includes(step.id);
        const isOpen = openId === step.id;
        const isCurrent = i === currentIndex;

        return (
          <li
            key={step.id}
            id={step.id}
            className={`scroll-mt-6 overflow-hidden rounded-2xl bg-white transition-colors ${
              isOpen
                ? "border-2 border-unitar-orange"
                : "border border-sand-300"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : step.id)}
              aria-expanded={isOpen}
              className="flex min-h-[44px] w-full items-center gap-3.5 p-4 text-left sm:p-5"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] text-sm font-bold ${
                  isDone
                    ? "bg-done-tint text-done"
                    : isCurrent
                      ? "bg-unitar-orange text-white"
                      : "border-2 border-sand-400 text-sand-600"
                }`}
              >
                {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3.2} /> : i + 1}
              </span>

              <span className="flex grow flex-col gap-0.5">
                {isCurrent && !isDone && (
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.07em] text-unitar-orange-ink">
                    {labels.currentStep}
                  </span>
                )}
                <span
                  className={`font-display text-[17px] font-bold leading-tight sm:text-lg ${
                    isDone ? "text-sand-700 line-through decoration-sand-400" : "text-sand-900"
                  }`}
                >
                  {step.title}
                </span>
                {!isOpen && (
                  <span className="text-[13px] leading-snug text-sand-800">
                    {isDone ? labels.done : step.summary}
                  </span>
                )}
              </span>

              <ChevronDown
                className={`h-5 w-5 shrink-0 text-sand-500 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div className="flex flex-col gap-4 px-4 pb-5 sm:px-5">
                <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-sand-800">
                  {step.content}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    toggleDone(step.id);
                    if (!isDone) {
                      const next = steps[i + 1];
                      setOpenId(next ? next.id : null);
                    }
                  }}
                  className={`flex min-h-[48px] items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-colors ${
                    isDone
                      ? "border border-sand-400 text-sand-800 hover:bg-sand-100"
                      : "bg-sand-900 text-white hover:bg-sand-800"
                  }`}
                >
                  {isDone ? labels.markUndone : labels.markDone}
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ol>

    {finished && <SetupComplete />}
    </>
  );
}

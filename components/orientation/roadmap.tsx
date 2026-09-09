import type { LucideIcon } from "lucide-react";
import {
  Backpack,
  BookOpen,
  CalendarClock,
  CalendarDays,
  CheckCheck,
  ClipboardCheck,
  Download,
  FileCheck,
  LayoutDashboard,
  Library,
  Mail,
  MailCheck,
  PartyPopper,
  PencilLine,
  Presentation,
  Rocket,
  Send,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wallet
} from "lucide-react";

/**
 * The student journey roadmap — the 13 steps from the welcome email to the
 * final exam, shown as an at-a-glance map above the detailed account setup.
 *
 * Like the rest of `components/orientation`, this holds no copy: every string
 * arrives as a prop so the BM and English pages stay the single source of
 * their own wording. Icons *are* owned here — they are the same picture in
 * both languages, and keying them by step number keeps the page data plain.
 */

/** One icon per step, indexed by step number (1–13). */
const STEP_ICONS: LucideIcon[] = [
  Mail, // 1  matric number in the welcome email
  LayoutDashboard, // 2  student dashboard
  MailCheck, // 3  activate student email
  Backpack, // 4  Student Resource Backpack
  CalendarDays, // 5  courses + class schedule
  BookOpen, // 6  access courses on CN
  Library, // 7  go through course materials
  Presentation, // 8  attend scheduled classes
  ClipboardCheck, // 9  complete and submit tasks
  Wallet, // 10 settle outstanding fees
  PencilLine, // 11 course registration
  Download, // 12 exam slip
  FileCheck // 13 final exam
];

/** Icons for the four takeaway badges under each phase. */
const BADGE_ICONS: LucideIcon[][] = [
  [Target, Sparkles, Users, Send],
  [BookOpen, CalendarClock, CheckCheck, Trophy]
];

/**
 * Rotating card tints. Six of them, so a row of three never repeats a colour
 * and consecutive rows start on a different one.
 */
const TINTS = [
  {
    card: "border-[#D5E5F0] bg-[#EDF4F9]",
    badge: "bg-[#0E4A73]",
    icon: "text-[#0E4A73]"
  },
  {
    card: "border-[#FBE3C4] bg-[#FFF4E6]",
    badge: "bg-[#C26A0A]",
    icon: "text-[#C26A0A]"
  },
  {
    card: "border-[#D2E8D9] bg-[#E9F4EC]",
    badge: "bg-[#2F7D45]",
    icon: "text-[#2F7D45]"
  },
  {
    card: "border-[#DEDAF3] bg-[#F0EEFA]",
    badge: "bg-[#5B4BB0]",
    icon: "text-[#5B4BB0]"
  },
  {
    card: "border-[#CDE8E1] bg-[#E6F4F1]",
    badge: "bg-[#10736A]",
    icon: "text-[#10736A]"
  },
  {
    card: "border-[#F6DCE1] bg-[#FCEEF0]",
    badge: "bg-[#B0405A]",
    icon: "text-[#B0405A]"
  }
];

/**
 * The dashed rail that links the cards: it runs downwards through the gap on
 * a phone (one column) and sideways from the sm breakpoint up, hidden at the
 * end of each row. The offsets track the badge centre through the padding
 * change at sm.
 */
const CONNECTOR = [
  "after:absolute after:content-[''] after:bg-sand-400/70",
  "after:left-[38px] after:top-full after:h-4 after:w-[2px]",
  "sm:after:left-full sm:after:top-[42px] sm:after:h-[2px] sm:after:w-4",
  "sm:[&:nth-child(2n)]:after:hidden",
  "lg:[&:nth-child(2n)]:after:block lg:[&:nth-child(3n)]:after:hidden"
].join(" ");

export interface RoadmapStep {
  title: string;
  /** Optional clarifier, e.g. "Use the Chrome browser." */
  note?: string;
}

export interface RoadmapPhase {
  /** Small label above the phase title, e.g. "Upon completion of registration". */
  eyebrow: string;
  title: string;
  steps: RoadmapStep[];
  /** The celebratory card that closes the phase. */
  finish: { title: string; note: string };
  /** Four takeaways, mirroring the strip along the bottom of the poster. */
  badges: { title: string; note: string }[];
}

function Phase({
  phase,
  index,
  startAt
}: {
  phase: RoadmapPhase;
  /** 0 for the first phase, 1 for the second — picks the badge icon set. */
  index: number;
  /** Step number the phase starts on, so numbering runs 1–13 across both. */
  startAt: number;
}) {
  const FinishIcon = index === 0 ? Rocket : PartyPopper;
  const badgeIcons = BADGE_ICONS[index] ?? BADGE_ICONS[0];

  // The finish card fills whatever the steps leave empty on the last row, so
  // the grid closes cleanly at every breakpoint.
  const smRest = phase.steps.length % 2;
  const lgRest = phase.steps.length % 3;
  const finishSpan = [
    smRest === 0 ? "sm:col-span-2" : "sm:col-span-1",
    lgRest === 0
      ? "lg:col-span-3"
      : lgRest === 1
        ? "lg:col-span-2"
        : "lg:col-span-1"
  ].join(" ");

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-1">
        <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
          {phase.eyebrow}
        </span>
        <h3 className="m-0 font-display text-[19px] font-bold leading-tight tracking-tight text-sand-900 sm:text-[25px]">
          {phase.title}
        </h3>
      </div>

      <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {phase.steps.map((step, i) => {
          const n = startAt + i;
          const tint = TINTS[(n - 1) % TINTS.length];
          const Icon = STEP_ICONS[n - 1] ?? BookOpen;

          return (
            <li
              key={step.title}
              className={`relative flex flex-col gap-2.5 rounded-[18px] border p-4 sm:p-5 ${tint.card} ${CONNECTOR}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[17px] font-bold text-white ${tint.badge}`}
                >
                  {n}
                </span>
                <Icon
                  className={`h-[22px] w-[22px] shrink-0 opacity-80 ${tint.icon}`}
                  aria-hidden="true"
                />
              </div>
              <p className="m-0 font-display text-[15px] font-bold leading-snug text-sand-900 sm:text-base">
                {step.title}
              </p>
              {step.note && (
                <p className="m-0 text-[12.5px] leading-snug text-sand-800">
                  {step.note}
                </p>
              )}
            </li>
          );
        })}

        <li
          className={`relative flex items-center gap-3.5 rounded-[18px] border border-done/30 bg-done-tint p-4 sm:p-5 ${finishSpan}`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-done">
            <FinishIcon
              className="h-[22px] w-[22px] text-white"
              aria-hidden="true"
            />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-display text-[15px] font-bold leading-snug text-[#1F5A31] sm:text-base">
              {phase.finish.title}
            </span>
            <span className="text-[12.5px] leading-snug text-[#2F5A3D]">
              {phase.finish.note}
            </span>
          </span>
        </li>
      </ol>

      <ul className="m-0 grid list-none grid-cols-1 gap-3 rounded-[18px] bg-sand-100 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        {phase.badges.map((badge, i) => {
          const BadgeIcon = badgeIcons[i] ?? Target;
          return (
            <li key={badge.title} className="flex items-start gap-2.5">
              <BadgeIcon
                className="mt-[3px] h-[18px] w-[18px] shrink-0 text-unitar-orange-ink"
                aria-hidden="true"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-[13.5px] font-bold text-sand-900">
                  {badge.title}
                </span>
                <span className="text-[12.5px] leading-snug text-sand-800">
                  {badge.note}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Roadmap({
  id,
  eyebrow,
  heading,
  intro,
  phases,
  footnote
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  intro: string;
  phases: RoadmapPhase[];
  /** The closing line along the foot of the map. */
  footnote: string;
}) {
  let step = 1;

  return (
    <div className="overflow-hidden rounded-[22px] border border-sand-300 bg-white sm:rounded-[30px]">
      <div className="flex flex-col gap-2.5 border-b border-sand-300 bg-sand-100 px-5 py-6 sm:px-10 sm:py-9">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
          {eyebrow}
        </span>
        <h2
          id={id}
          className="m-0 scroll-mt-20 font-display text-[26px] font-bold leading-[1.1] tracking-tight text-sand-900 sm:text-[38px]"
        >
          {heading}
        </h2>
        <p className="m-0 max-w-2xl text-[14.5px] leading-relaxed text-sand-800 sm:text-[16px]">
          {intro}
        </p>
      </div>

      <div className="flex flex-col gap-8 px-5 py-7 sm:gap-12 sm:px-10 sm:py-10">
        {phases.map((phase, i) => {
          const startAt = step;
          step += phase.steps.length;
          return (
            <Phase key={phase.title} phase={phase} index={i} startAt={startAt} />
          );
        })}
      </div>

      <p className="m-0 border-t border-sand-300 bg-unitar-blue px-5 py-4 text-center font-display text-[15px] font-bold text-white sm:px-10 sm:text-[17px]">
        {footnote}
      </p>
    </div>
  );
}

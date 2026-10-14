"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { titleCaseName } from "@/lib/name-case";
import { MIN_RESPONSES_TO_SHOW, type StatKey, type SurveyStats } from "@/lib/survey-stats";
import { WheelPicker, type WheelItem } from "@/components/survey/wheel-picker";
import {
  ResultBars,
  headline,
  tally,
  type ResultKind
} from "@/components/survey/live-results";
import "./survey.css";

/* ------------------------------------------------------------------ */
/* Types & data                                                        */
/* ------------------------------------------------------------------ */

type QType = "text" | "email" | "textarea" | "single" | "multi" | "rating" | "nps";
type Answers = Record<string, string | string[] | undefined>;

interface Question {
  id: string;
  num: string;
  group: string;
  title: string;
  subtitle?: string;
  helper?: string;
  type: QType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  route?: boolean;
  uppercase?: boolean;
  showIf?: (answers: Answers) => boolean;
  /** Live-results bucket this question feeds, and its short name on the board. */
  statKey?: StatKey;
  short?: string;
}

interface StudentInfo {
  name: string;
  matric: string;
  email: string;
  programme: string;
  level: string;
}

interface SubmittedPayload {
  form_type: "Undergraduate" | "Postgraduate";
  submitted_at: string;
  student: { name: string; programme: string };
  answers: Record<string, string | string[]>;
}

const FORM_ENDPOINT = "/api/survey-submit";
const STATS_ENDPOINT = "/api/survey-stats";
const STATS_POLL_MS = 20_000;

const ugLevels = ["Certificate", "Foundation", "Diploma", "Bachelor"];
const pgLevels = ["Master", "Doctor"];
const employmentOptions = ["Full-Time", "Part time", "Self-employed", "Unemployed"];
const deviceOptions = ["Smartphone", "Tablet", "Laptop", "PC"];
const teams = [
  "Sales Team",
  "Lecturers",
  "Student Success Team (SST)",
  "One Stop Centre (OSC)",
  "None of the above",
  "Others"
];
const onboardingTopics = [
  "Introduction & Welcoming Remarks",
  "SRB, LMS & Learner Responsibilities",
  "Academic Calendar Overview, Schedule Viewing & Course Registration",
  "Apel.C",
  "Fees & Finance Overview",
  "Online Database Walkthrough (Learning Resource Centre)",
  "Examination Overview",
  "One-Stop Centre Helpdesk System Walkthrough",
  "PTPTN Briefing",
  "MPU Course Briefing",
  "Programme Briefing"
];

const optionEmoji: Record<string, string> = {
  Certificate: "📜",
  Foundation: "🧱",
  Diploma: "📘",
  Bachelor: "🎓",
  Master: "🧠",
  Doctor: "🔬",
  "Full-Time": "💼",
  "Part time": "⏰",
  "Self-employed": "🚀",
  Unemployed: "🌱",
  Smartphone: "📱",
  Tablet: "📲",
  Laptop: "💻",
  PC: "🖥️",
  "Sales Team": "🤝",
  Lecturers: "👩‍🏫",
  "Student Success Team (SST)": "🦸",
  "One Stop Centre (OSC)": "🏢",
  "None of the above": "🙅",
  Others: "✍️"
};

const groupEmoji: Record<string, string> = {
  "Personal Information": "👤",
  "Application / Onboarding": "🚀",
  "Onboarding & Application Experience": "🚀",
  "Learning Readiness": "💻",
  "Learning Platform and Support System": "💻",
  "Payment Process": "💳",
  "Payment Process / Fees Understanding": "💳",
  "Student Engagement & Activities": "🎉",
  "Student Support": "🤝",
  Recommendation: "💜"
};

// Best at the top, so swiping up feels like "more".
const ratingItems: WheelItem[] = [
  { value: "5", label: "Very Good", emoji: "🤩", sub: "5 out of 5" },
  { value: "4", label: "Good", emoji: "🙂", sub: "4 out of 5" },
  { value: "3", label: "Neutral", emoji: "😐", sub: "3 out of 5" },
  { value: "2", label: "Poor", emoji: "😕", sub: "2 out of 5" },
  { value: "1", label: "Very Poor", emoji: "😞", sub: "1 out of 5" }
];

const npsItems: WheelItem[] = Array.from({ length: 11 }, (_, i) => {
  const score = 10 - i;
  return {
    value: String(score),
    label: String(score),
    emoji: scoreEmoji(score),
    sub: score === 10 ? "Extremely likely" : score === 0 ? "Not at all likely" : undefined
  };
});

const commonQuestions: Question[] = [
  {
    id: "student_matric",
    num: "1",
    group: "Personal Information",
    title: "Student Matric Number",
    subtitle: "Nombor Matrik Pelajar",
    type: "text",
    placeholder: "Type your matric number here",
    required: true,
    uppercase: true
  },
  {
    id: "student_email",
    num: "2",
    group: "Personal Information",
    title: "Student Personal Email Address",
    subtitle: "Email Pelajar",
    type: "email",
    placeholder: "name@email.com",
    required: true
  },
  {
    id: "study_level",
    num: "3",
    group: "Personal Information",
    title: "Current Study-Level at UNITAR",
    subtitle: "Tahap Pengajian Pelajar",
    type: "single",
    options: ["Certificate", "Foundation", "Diploma", "Bachelor", "Master", "Doctor"],
    required: true,
    route: true,
    statKey: "study_level",
    short: "Study level"
  },
  {
    id: "employment_status",
    num: "4",
    group: "Personal Information",
    title: "What is your current employment status?",
    subtitle: "Apakah status pekerjaan anda sekarang?",
    type: "single",
    options: employmentOptions,
    required: true,
    statKey: "employment_status",
    short: "Working while studying"
  }
];

const branchQuestions: Record<"UG" | "PG", Question[]> = {
  UG: [
    {
      id: "ug_application_process_rating",
      num: "5",
      group: "Application / Onboarding",
      title:
        "How would you rate your experience with the application process at UNITAR International University?",
      subtitle:
        "Bagaimanakah pengalaman anda dengan proses permohonan di UNITAR International University?",
      type: "rating",
      required: true,
      statKey: "application_rating",
      short: "Application experience"
    },
    {
      id: "ug_onboarding_helpfulness_rating",
      num: "6",
      group: "Application / Onboarding",
      title:
        "How helpful was the onboarding session in preparing you for your first semester at UNITAR?",
      subtitle:
        "Sejauh manakah sesi onboarding membantu persediaan semester pertama anda di UNITAR?",
      type: "rating",
      required: true,
      statKey: "onboarding_rating",
      short: "Onboarding session"
    },
    {
      id: "ug_onboarding_topic_learned",
      num: "7",
      group: "Application / Onboarding",
      title: "Which topic did you learn the most from during the Onboarding Session?",
      subtitle: "Apakah topik yang paling banyak anda pelajari semasa sesi orientasi?",
      type: "multi",
      options: onboardingTopics,
      required: true,
      statKey: "onboarding_topics",
      short: "Most useful onboarding topics"
    },
    {
      id: "ug_platform_navigation_confidence",
      num: "8",
      group: "Learning Platform and Support System",
      title: "How confident are you in navigating our learning platforms?",
      subtitle:
        "Sejauh mana keyakinan anda dalam menggunakan platform pembelajaran kami (contohnya: UNITAR Dashboard, CourseNetworking, Microsoft Teams dan Learning Resource Centre (LRC)?",
      helper:
        "Examples: UNITAR Dashboard, CourseNetworking, Microsoft Teams and Learning Resource Centre (LRC).",
      type: "rating",
      required: true,
      statKey: "platform_rating",
      short: "Confidence on learning platforms"
    },
    {
      id: "ug_laptop_access",
      num: "9",
      group: "Learning Platform and Support System",
      title: "What device are you using to access your class and learning materials?",
      subtitle:
        "Apakah peranti yang anda gunakan untuk mengakses kelas dan bahan pembelajaran anda?",
      type: "single",
      options: deviceOptions,
      required: true,
      statKey: "laptop_access",
      short: "Device for class"
    },
    {
      id: "ug_lecturer_guidance_rating",
      num: "10",
      group: "Learning Platform and Support System",
      title:
        "Have you received sufficient guidance from your lecturers to understand your courses?",
      subtitle:
        "Adakah anda telah menerima panduan yang mencukupi daripada pensyarah untuk memahami kursus anda?",
      type: "rating",
      required: true,
      statKey: "lecturer_rating",
      short: "Guidance from lecturers"
    },
    {
      id: "ug_fees_understanding",
      num: "15",
      group: "Payment Process",
      title:
        "How would you rate your understanding of managing your UNITAR fees, including when to pay, how to pay, and how to check your Statement of Account?",
      subtitle:
        "Sila nyatakan tahap kefahaman anda dalam mengurus yuran UNITAR, termasuk bila perlu membayar, cara pembayaran, dan cara menyemak Statement of Account anda.",
      type: "rating",
      required: true,
      statKey: "fees_understanding",
      short: "Understanding of fees"
    },
    {
      id: "ug_additional_support",
      num: "11",
      group: "Learning Platform and Support System",
      title: "What additional support would best improve your study quality?",
      subtitle:
        "Sokongan tambahan manakah yang paling membantu meningkatkan kualiti pembelajaran anda?",
      type: "textarea",
      placeholder: "Share your suggestion here",
      required: true
    },
    {
      id: "ug_campus_programme_interest",
      num: "12",
      group: "Student Engagement & Activities",
      title:
        "How interested are you in taking part in campus programmes organised outside your regular lecture hours?",
      subtitle:
        "Sejauh manakah minat anda untuk menyertai program kampus yang dianjurkan di luar waktu kuliah biasa?",
      type: "rating",
      required: true,
      statKey: "campus_interest",
      short: "Interest in campus programmes"
    },
    {
      id: "ug_most_supportive_department",
      num: "13",
      group: "Student Support",
      title:
        "Which department or team has supported you the most during your time at UNITAR?",
      subtitle:
        "Sila pilih jabatan atau pasukan yang anda rasakan paling membantu sepanjang tempoh pengajian anda di UNITAR",
      type: "single",
      options: teams,
      required: true,
      statKey: "supportive_department",
      short: "Most supportive team"
    },
    {
      id: "ug_supportive_department_other",
      num: "14",
      group: "Student Support",
      title: "If you selected 'Others', please specify",
      subtitle: "Jika anda memilih 'Lain-lain,' sila nyatakan",
      type: "text",
      placeholder: "Type the department or team name",
      required: true,
      showIf: (answers) => answers.ug_most_supportive_department === "Others"
    },
    {
      id: "ug_recommendation_score",
      num: "16",
      group: "Recommendation",
      title:
        "On a scale of 0 to 10, how likely are you to recommend UNITAR International University to your friends?",
      subtitle:
        "Pada skala 0 hingga 10, sejauh manakah anda berkemungkinan akan mengesyorkan UNITAR International University kepada rakan anda?",
      type: "nps",
      required: true,
    }
  ],
  PG: [
    {
      id: "pg_laptop_access",
      num: "5",
      group: "Learning Readiness",
      title: "What device are you using to access your class and learning materials?",
      subtitle:
        "Apakah peranti yang anda gunakan untuk mengakses kelas dan bahan pembelajaran anda?",
      type: "single",
      options: deviceOptions,
      required: true,
      statKey: "laptop_access",
      short: "Device for class"
    },
    {
      id: "pg_application_process_rating",
      num: "6",
      group: "Onboarding & Application Experience",
      title:
        "How would you rate your experience with the application process at UNITAR International University?",
      subtitle:
        "Bagaimanakah pengalaman anda dengan proses permohonan di UNITAR International University?",
      type: "rating",
      required: true,
      statKey: "application_rating",
      short: "Application experience"
    },
    {
      id: "pg_onboarding_helpfulness_rating",
      num: "7",
      group: "Onboarding & Application Experience",
      title:
        "How helpful was the onboarding session in preparing you for your first semester at UNITAR?",
      subtitle:
        "Sejauh manakah sesi onboarding membantu persediaan semester pertama anda di UNITAR?",
      type: "rating",
      required: true,
      statKey: "onboarding_rating",
      short: "Onboarding session"
    },
    {
      id: "pg_platform_navigation_confidence",
      num: "8",
      group: "Learning Platform and Support System",
      title: "How confident are you in navigating our learning platforms?",
      subtitle:
        "Sejauh mana keyakinan anda dalam menggunakan platform pembelajaran kami (contohnya: UNITAR Dashboard, CourseNetworking, Microsoft Teams dan Learning Resource Centre (LRC)?",
      helper:
        "Examples: UNITAR Dashboard, CourseNetworking, Microsoft Teams and Learning Resource Centre (LRC).",
      type: "rating",
      required: true,
      statKey: "platform_rating",
      short: "Confidence on learning platforms"
    },
    {
      id: "pg_lecturer_supervisor_guidance_rating",
      num: "9",
      group: "Learning Platform and Support System",
      title:
        "Have you received sufficient guidance from your lecturers/supervisors to understand your courses or research requirements?",
      subtitle:
        "Adakah anda menerima panduan yang mencukupi daripada pensyarah/penyelia untuk memahami kursus atau keperluan penyelidikan anda?",
      type: "rating",
      required: true,
      statKey: "lecturer_rating",
      short: "Guidance from lecturers"
    },
    {
      id: "pg_most_supportive_department",
      num: "10",
      group: "Student Support",
      title:
        "Which department or team has supported you the most during your time at UNITAR?",
      subtitle:
        "Sila pilih jabatan atau pasukan yang anda rasakan paling membantu sepanjang tempoh pengajian anda di UNITAR",
      type: "single",
      options: teams,
      required: true,
      statKey: "supportive_department",
      short: "Most supportive team"
    },
    {
      id: "pg_supportive_department_other",
      num: "11",
      group: "Student Support",
      title: "If you selected 'Others', please specify",
      subtitle: "Jika anda memilih 'Lain-lain,' sila nyatakan",
      type: "text",
      placeholder: "Type the department or team name",
      required: true,
      showIf: (answers) => answers.pg_most_supportive_department === "Others"
    },
    {
      id: "pg_campus_programme_interest",
      num: "12",
      group: "Student Engagement & Activities",
      title:
        "How interested are you in taking part in campus programmes organised outside your regular lecture hours?",
      subtitle:
        "Sejauh manakah minat anda untuk menyertai program kampus yang dianjurkan di luar waktu kuliah biasa?",
      type: "rating",
      required: true,
      statKey: "campus_interest",
      short: "Interest in campus programmes"
    },
    {
      id: "pg_activities_interested",
      num: "13",
      group: "Student Engagement & Activities",
      title: "If yes, which types of activities would you be interested in?",
      subtitle: "Jika anda berminat, apakah jenis aktiviti universiti yang ingin anda sertai?",
      type: "textarea",
      placeholder: "Share the types of activities here",
      required: false
    },
    {
      id: "pg_fees_understanding",
      num: "14",
      group: "Payment Process / Fees Understanding",
      title:
        "How would you rate your understanding of managing your UNITAR fees, including when to pay, how to pay, and how to check your Statement of Account?",
      subtitle:
        "Sila nyatakan tahap kefahaman anda dalam mengurus yuran UNITAR, termasuk bila perlu membayar, cara pembayaran, dan cara menyemak Statement of Account anda.",
      type: "rating",
      required: true,
      statKey: "fees_understanding",
      short: "Understanding of fees"
    },
    {
      id: "pg_recommendation_score",
      num: "15",
      group: "Recommendation",
      title:
        "On a scale of 0 to 10, how likely are you to recommend UNITAR International University to your friends?",
      subtitle:
        "Pada skala 0 hingga 10, sejauh manakah anda berkemungkinan akan mengesyorkan UNITAR International University kepada rakan anda?",
      type: "nps",
      required: true,
    }
  ]
};

/* ------------------------------------------------------------------ */
/* Pure helpers                                                        */
/* ------------------------------------------------------------------ */

function getBranch(answers: Answers): "UG" | "PG" | null {
  const level = answers.study_level;
  if (typeof level === "string" && ugLevels.includes(level)) return "UG";
  if (typeof level === "string" && pgLevels.includes(level)) return "PG";
  return null;
}

function getFlow(answers: Answers, skipIds: string[] = []): Question[] {
  const branch = getBranch(answers);
  const full = branch ? [...commonQuestions, ...branchQuestions[branch]] : commonQuestions;
  return full.filter((q) => (!q.showIf || q.showIf(answers)) && !skipIds.includes(q.id));
}

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

function scoreEmoji(score: number): string {
  if (score <= 2) return "😞";
  if (score <= 4) return "😕";
  if (score <= 6) return "😐";
  if (score <= 8) return "🙂";
  return "🤩";
}

function wheelItemsFor(q: Question): WheelItem[] {
  if (q.type === "rating") return ratingItems;
  if (q.type === "nps") return npsItems;
  return (q.options || []).map((opt) => ({ value: opt, label: opt, emoji: optionEmoji[opt] }));
}

function isWheel(q: Question): q is Question & { type: ResultKind | "nps" } {
  return q.type === "single" || q.type === "multi" || q.type === "rating" || q.type === "nps";
}

/** Questions whose answers are shared back as live results (never the 0–10 score). */
function hasResults(q: Question): q is Question & { type: ResultKind; statKey: StatKey } {
  return !!q.statKey && (q.type === "single" || q.type === "multi" || q.type === "rating");
}

/** Score questions start on, and default to, their top value. */
function defaultAnswer(q: Question): string | undefined {
  if (q.type === "rating") return ratingItems[0].value;
  if (q.type === "nps") return npsItems[0].value;
  return undefined;
}

function hasEnoughResults(stats: SurveyStats | null, q: Question): boolean {
  if (!stats || !q.statKey) return false;
  return (stats.questions[q.statKey]?.responses || 0) >= MIN_RESPONSES_TO_SHOW;
}

/** Questions with live results, one per stat, for the end-of-survey board. */
function boardQuestions(branch: "UG" | "PG" | null): Question[] {
  const seen = new Set<StatKey>();
  return [...commonQuestions, ...branchQuestions[branch ?? "UG"]].filter((q) => {
    if (!q.statKey || seen.has(q.statKey)) return false;
    seen.add(q.statKey);
    return true;
  });
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const CONFETTI_COLOURS = ["#1c5e8c", "#f2911e", "#7c3aed", "#10b981", "#f43f5e", "#facc15"];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 1.6,
        drift: (Math.random() - 0.5) * 160,
        spin: 360 + Math.random() * 720,
        colour: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
        round: i % 3 === 0
      })),
    []
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className={p.round ? "is-round" : ""}
          style={
            {
              left: `${p.left}%`,
              background: p.colour,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function LiveBadge({ count }: { count: number }) {
  return (
    <span className="live-badge">
      <span className="live-dot" />
      Live · {count.toLocaleString()} {count === 1 ? "student" : "students"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function SurveyPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [submitted, setSubmitted] = useState<SubmittedPayload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [student, setStudent] = useState<StudentInfo>({
    name: "",
    matric: "",
    email: "",
    programme: "",
    level: ""
  });
  const [prefilledIds, setPrefilledIds] = useState<string[]>([]);
  const [skipPrefilled, setSkipPrefilled] = useState(true);
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [checkingMatric, setCheckingMatric] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SurveyStats | null>(null);
  // Question whose live results are showing (after OK, before moving on).
  const [revealId, setRevealId] = useState<string | null>(null);
  const cardRef = useRef<HTMLElement>(null);

  // Live results are a bonus — any failure just hides them.
  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(STATS_ENDPOINT, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as SurveyStats;
      if (data && typeof data.total === "number") setStats(data);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Keep the end-of-survey board live.
  const onFinalScreen = !!submitted || alreadySubmitted;
  useEffect(() => {
    if (!onFinalScreen) return;
    loadStats();
    const timer = setInterval(loadStats, STATS_POLL_MS);
    return () => clearInterval(timer);
  }, [onFinalScreen, loadStats]);

  // Has this matric already responded? Best-effort — fail open so a lookup
  // hiccup never blocks a genuine student.
  const checkMatricSubmitted = useCallback(async (matric: string): Promise<boolean> => {
    if (!matric.trim()) return false;
    try {
      const res = await fetch(`/api/survey-submit?matric=${encodeURIComponent(matric)}`);
      const data = await res.json();
      return !!data.submitted;
    } catch {
      return false;
    }
  }, []);

  // On mount: resolve identity (signed token > plain params), pre-fill, and
  // check whether this matric has already responded.
  // e.g. /survey?token=XXX   or   /survey?name=Sulaiman&programme=BBA&matric=UG12345&level=Degree
  useEffect(() => {
    let cancelled = false;
    const validLevels = [...ugLevels, ...pgLevels];
    const normLevel = (raw: string) =>
      validLevels.find((l) => l.toLowerCase() === String(raw || "").trim().toLowerCase()) || "";

    (async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenParam = (params.get("token") || "").trim();

      let info: StudentInfo = {
        name: (params.get("name") || "").trim(),
        matric: (params.get("matric") || params.get("matricno") || "").trim(),
        email: (params.get("email") || "").trim(),
        programme: (params.get("programme") || params.get("program") || "").trim(),
        level: normLevel(params.get("level") || "")
      };
      let isVerified = false;
      let activeToken = "";
      let failed = false;

      if (tokenParam) {
        try {
          const res = await fetch("/api/survey-verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: tokenParam })
          });
          const data = await res.json();
          if (res.ok && data.valid && data.student) {
            const s = data.student;
            info = {
              name: (s.name || "").trim(),
              matric: (s.matric || "").trim(),
              email: (s.email || "").trim(),
              programme: (s.programme || "").trim(),
              level: normLevel(s.level || "")
            };
            isVerified = true;
            activeToken = tokenParam;
          } else {
            // Token supplied but didn't verify — don't trust any identity.
            failed = true;
            info = { name: "", matric: "", email: "", programme: "", level: "" };
          }
        } catch {
          failed = true;
          info = { name: "", matric: "", email: "", programme: "", level: "" };
        }
      }

      if (cancelled) return;

      setStudent({ ...info, name: titleCaseName(info.name) });
      setVerified(isVerified);
      setToken(activeToken);
      setTokenError(failed);

      const prefill: Answers = {};
      const ids: string[] = [];
      if (info.matric) {
        prefill.student_matric = info.matric;
        ids.push("student_matric");
      }
      if (info.email) {
        prefill.student_email = info.email;
        ids.push("student_email");
      }
      if (info.level) {
        prefill.study_level = info.level;
        ids.push("study_level");
      }
      if (ids.length > 0) {
        setAnswers((prev) => ({ ...prev, ...prefill }));
        setPrefilledIds(ids);
      }

      // Best-effort duplicate check when we already know the matric.
      if (info.matric) {
        try {
          const res = await fetch(
            `/api/survey-submit?matric=${encodeURIComponent(info.matric)}`
          );
          const data = await res.json();
          if (!cancelled && data.submitted) setAlreadySubmitted(true);
        } catch {
          /* fail open */
        }
      }

      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const branch = getBranch(answers);
  const skipIds = skipPrefilled ? prefilledIds : [];
  const flow = getFlow(answers, skipIds);
  // Until the study level picks a branch, size progress against the longer UG flow.
  const expectedTotal = branch
    ? flow.length
    : getFlow({ ...answers, study_level: "Bachelor" }, skipIds).length;
  const safeIndex = currentIndex < 0 ? -1 : Math.min(currentIndex, flow.length - 1);
  const currentQuestion = safeIndex >= 0 ? flow[safeIndex] : null;
  const revealing = !!currentQuestion && revealId === currentQuestion.id;

  const startSurvey = useCallback(() => {
    setCurrentIndex(0);
    setRevealId(null);
    setError("");
  }, []);

  const showIntro = useCallback(() => {
    setCurrentIndex(-1);
    setRevealId(null);
    setError("");
  }, []);

  const setTextAnswer = useCallback((id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError("");
  }, []);

  const chooseOption = useCallback(
    (id: string, value: string, mode: QType) => {
      setError("");
      setAnswers((prev) => {
        if (mode === "multi") {
          const existing = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
          const next = existing.includes(value)
            ? existing.filter((item) => item !== value)
            : [...existing, value];
          return { ...prev, [id]: next };
        }

        const updated: Answers = { ...prev, [id]: value };

        if (id === "study_level") {
          const newBranch = getBranch(updated);
          const otherBranch = newBranch === "UG" ? "PG" : newBranch === "PG" ? "UG" : null;
          if (otherBranch) {
            branchQuestions[otherBranch].forEach((q) => {
              delete updated[q.id];
            });
          }
        }

        return updated;
      });
    },
    []
  );

  const validate = useCallback(
    (q: Question | null, source: Answers): boolean => {
      if (!q) return true;
      const value = source[q.id];
      if (!q.required) return true;
      if (q.type === "multi") return Array.isArray(value) && value.length > 0;
      if (q.type === "email")
        return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      if (q.type === "text" || q.type === "textarea")
        return typeof value === "string" && value.trim().length > 0;
      return value !== undefined && value !== null && String(value).trim() !== "";
    },
    []
  );

  const submitSurvey = useCallback(async () => {
    setIsSubmitting(true);

    const submittedBranch = getBranch(answers);
    // Full flow (no skips) so pre-filled answers are still captured in the payload.
    const submittedFlow = getFlow(answers);
    const normalizedAnswers: Record<string, string | string[]> = {};
    submittedFlow.forEach((q) => {
      normalizedAnswers[q.id] = answers[q.id] ?? "";
    });

    const payload: SubmittedPayload = {
      form_type: submittedBranch === "UG" ? "Undergraduate" : "Postgraduate",
      submitted_at: new Date().toISOString(),
      student: { name: student.name, programme: student.programme },
      answers: normalizedAnswers
    };

    // Local safety-net copy
    try {
      const saved = JSON.parse(
        localStorage.getItem("unitar_onboarding_survey_submissions") || "[]"
      );
      saved.push(payload);
      localStorage.setItem("unitar_onboarding_survey_submissions", JSON.stringify(saved));
    } catch {
      /* ignore storage errors */
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token ? { ...payload, token } : payload)
      });
      if (res.status === 409) {
        // Already submitted under this matric — show the "already responded" screen.
        setIsSubmitting(false);
        setAlreadySubmitted(true);
        return;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.warn("Survey API error:", err);
      }
    } catch (networkError) {
      console.warn("Survey submission network error:", networkError);
    }

    setIsSubmitting(false);
    setSubmitted(payload);
  }, [answers, student, token]);

  const nextQuestion = useCallback(async () => {
    if (checkingMatric || isSubmitting) return;

    if (currentIndex < 0) {
      startSurvey();
      return;
    }

    const q = flow[safeIndex];

    // Second press on a question: leave its live results and move on.
    if (revealId === q.id) {
      setRevealId(null);
      setCurrentIndex(safeIndex + 1);
      setError("");
      return;
    }

    if (!validate(q, answers)) {
      setError(
        q.type === "email"
          ? "Please enter a valid email address before continuing."
          : isWheel(q)
            ? q.type === "multi"
              ? "Tap at least one answer to continue."
              : "Swipe or tap to pick an answer first."
            : "Please answer this question before continuing."
      );
      navigator.vibrate?.([30, 40, 30]);
      return;
    }

    // Block duplicates the moment a matric is entered, before the student
    // invests time in the rest of the survey.
    if (q.id === "student_matric") {
      setCheckingMatric(true);
      const taken = await checkMatricSubmitted(String(answers.student_matric || ""));
      setCheckingMatric(false);
      if (taken) {
        setAlreadySubmitted(true);
        return;
      }
    }

    if (safeIndex >= flow.length - 1) {
      submitSurvey();
      return;
    }

    // Peek at what everyone else said before moving on.
    if (hasEnoughResults(stats, q)) {
      setRevealId(q.id);
      setError("");
      return;
    }

    setCurrentIndex(safeIndex + 1);
    setError("");
  }, [
    answers,
    checkingMatric,
    checkMatricSubmitted,
    currentIndex,
    flow,
    isSubmitting,
    revealId,
    safeIndex,
    startSurvey,
    stats,
    submitSurvey,
    validate
  ]);

  const previousQuestion = useCallback(() => {
    if (revealing) {
      setRevealId(null);
      return;
    }
    if (safeIndex <= 0) {
      showIntro();
      return;
    }
    setCurrentIndex(safeIndex - 1);
    setError("");
  }, [revealing, safeIndex, showIntro]);

  /* Pre-select the top score when a score question is first shown */
  useEffect(() => {
    if (!currentQuestion) return;
    const fallback = defaultAnswer(currentQuestion);
    if (fallback === undefined) return;
    const id = currentQuestion.id;
    setAnswers((prev) => (prev[id] === undefined ? { ...prev, [id]: fallback } : prev));
  }, [currentQuestion]);

  /* Focus the first control whenever the question changes */
  useEffect(() => {
    if (submitted || revealId) return;
    const id = requestAnimationFrame(() => {
      const focusTarget = cardRef.current?.querySelector<HTMLElement>(
        "input, textarea, .wheel-scroller"
      );
      focusTarget?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [currentIndex, submitted, revealId]);

  /* Global keyboard shortcuts */
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (loading || alreadySubmitted) return;

      if (event.key === "Enter" && currentIndex < 0 && !submitted) {
        event.preventDefault();
        startSurvey();
        return;
      }
      if (submitted) return;

      const q = currentQuestion;
      if (!q) return;

      const active = document.activeElement;
      const isTextControl =
        !!active && ["INPUT", "TEXTAREA"].includes(active.tagName);

      if (event.key === "Enter" && !isTextControl) {
        event.preventDefault();
        nextQuestion();
      }

      if (revealing || isTextControl) return;

      if ((q.type === "single" || q.type === "multi") && q.options) {
        const idx = event.key.toUpperCase().charCodeAt(0) - 65;
        if (event.key.length === 1 && idx >= 0 && idx < q.options.length) {
          event.preventDefault();
          chooseOption(q.id, q.options[idx], q.type);
        }
      }

      if (q.type === "rating" && /^[1-5]$/.test(event.key)) {
        event.preventDefault();
        chooseOption(q.id, event.key, "rating");
      }

      if (q.type === "nps" && /^[0-9]$/.test(event.key)) {
        event.preventDefault();
        chooseOption(q.id, event.key, "nps");
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [
    currentIndex,
    currentQuestion,
    submitted,
    loading,
    alreadySubmitted,
    revealing,
    startSurvey,
    nextQuestion,
    chooseOption
  ]);

  /* --------------------------- rendering --------------------------- */

  const routeLabel = submitted
    ? `${submitted.form_type} Survey Completed`
    : branch === "UG"
      ? "Undergraduate Survey"
      : branch === "PG"
        ? "Postgraduate Survey"
        : "";

  const progress = submitted || alreadySubmitted
    ? 100
    : loading || safeIndex < 0
      ? 0
      : ((safeIndex + (revealing ? 1 : 0.5)) / expectedTotal) * 100;

  function milestone(): string {
    if (safeIndex === flow.length - 1) return "Last one! 🏁";
    if (expectedTotal > 6 && safeIndex === Math.floor(expectedTotal / 2)) return "Halfway there! 🔥";
    if (flow.length > 6 && safeIndex === flow.length - 3) return "Almost done! ⚡";
    return "";
  }

  function renderControl(q: Question) {
    const value = answers[q.id];

    if (q.type === "text" || q.type === "email") {
      return (
        <>
          <label className="sr-only" htmlFor={q.id}>
            {q.title}
          </label>
          <input
            className="field"
            id={q.id}
            type={q.type}
            autoComplete={q.type === "email" ? "email" : "off"}
            inputMode={q.type === "email" ? "email" : "text"}
            style={q.uppercase ? { textTransform: "uppercase" } : undefined}
            value={q.uppercase ? ((value as string) || "").toUpperCase() : (value as string) || ""}
            placeholder={q.placeholder || "Type your answer here"}
            onChange={(e) =>
              setTextAnswer(q.id, q.uppercase ? e.target.value.toUpperCase() : e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                nextQuestion();
              }
            }}
          />
        </>
      );
    }

    if (q.type === "textarea") {
      return (
        <>
          <label className="sr-only" htmlFor={q.id}>
            {q.title}
          </label>
          <textarea
            className="field"
            id={q.id}
            placeholder={q.placeholder || "Type your answer here"}
            value={(value as string) || ""}
            onChange={(e) => setTextAnswer(q.id, e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                nextQuestion();
              }
            }}
          />
        </>
      );
    }

    if (!isWheel(q)) return null;

    const items = wheelItemsFor(q);
    const multi = q.type === "multi";
    const picked = multi
      ? Array.isArray(value) ? value : []
      : typeof value === "string" ? value : undefined;
    const answered = multi ? (picked as string[]).length > 0 : picked !== undefined;
    // Score wheels rest on their top value; others mid-list so there is something
    // to swipe either way.
    const restIndex =
      multi || defaultAnswer(q) !== undefined ? 0 : Math.floor((items.length - 1) / 2);

    return (
      <>
        <WheelPicker
          key={q.id}
          id={q.id}
          label={q.title}
          items={items}
          multi={multi}
          value={multi ? undefined : (picked as string | undefined)}
          selected={multi ? (picked as string[]) : undefined}
          onPick={(v) => chooseOption(q.id, v, q.type)}
          restIndex={restIndex}
          itemHeight={multi ? 72 : 60}
        />
        <p className={`wheel-hint ${answered ? "is-done" : ""}`}>
          {multi
            ? answered
              ? `✓ ${(picked as string[]).length} picked — tap more or hit Next`
              : "↕ Swipe through, tap every topic that helped"
            : answered
              ? "✓ Locked in — swipe to change"
              : "↕ Swipe up or down, or tap an answer"}
        </p>
      </>
    );
  }

  function renderReveal(q: Question & { type: ResultKind }) {
    const t = tally(q.type, wheelItemsFor(q), stats?.questions[q.statKey!], answers[q.id], true);
    return (
      <div className="reveal">
        <LiveBadge count={t.responses} />
        <p className="reveal-headline">{headline(q.type, t)}</p>
        {q.type === "rating" && t.average !== null ? (
          <p className="reveal-average">
            Average <strong>{t.average.toFixed(1)}</strong> / 5 {scoreEmoji(t.average * 2)}
          </p>
        ) : null}
        <ResultBars tally={t} />
      </div>
    );
  }

  function renderBoard(mine: Record<string, string | string[]> | null, at: string | null) {
    if (!stats) {
      return (
        <div className="board">
          <p className="board-empty">
            <span className="submitting-spinner is-dark" /> Loading live results…
          </p>
        </div>
      );
    }

    // If the stats predate this student's submission, count them in locally.
    const includeMine = !!at && new Date(stats.updatedAt) < new Date(at);
    const branchForBoard =
      submitted?.form_type === "Postgraduate" ? "PG" : submitted ? "UG" : null;

    return (
      <section className="board" aria-label="Live results from other students">
        <div className="board-head">
          <h2>What everyone said</h2>
          <LiveBadge count={stats.total + (includeMine ? 1 : 0)} />
        </div>
        {boardQuestions(branchForBoard).map((q, i) => {
          if (!hasResults(q)) return null;
          const enough = hasEnoughResults(stats, q);
          const t = tally(q.type, wheelItemsFor(q), stats.questions[q.statKey!], mine?.[q.id], includeMine);
          return (
            <article
              key={q.id}
              className="board-card"
              style={{ animationDelay: `${Math.min(i, 8) * 80}ms` }}
            >
              <h3>
                <span>{groupEmoji[q.group] || "📊"}</span> {q.short}
              </h3>
              {enough ? (
                <>
                  {mine?.[q.id] ? <p className="board-line">{headline(q.type, t)}</p> : null}
                  {q.type === "rating" && t.average !== null ? (
                    <p className="reveal-average">
                      Average <strong>{t.average.toFixed(1)}</strong> / 5
                    </p>
                  ) : null}
                  <ResultBars tally={t} />
                </>
              ) : (
                <p className="board-empty">Not enough answers yet — check back soon 🌱</p>
              )}
            </article>
          );
        })}
      </section>
    );
  }

  function renderBody() {
    if (loading) {
      return (
        <section className="card is-centered" ref={cardRef}>
          <div className="loader-bubbles" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="kicker">Loading your survey…</p>
        </section>
      );
    }

    if (alreadySubmitted) {
      return (
        <>
          <section className="card" ref={cardRef}>
            <p className="kicker">
              Already done{student.name ? `, ${student.name.split(" ")[0]}` : ""}! ✅
            </p>
            <h1>You&apos;ve already responded.</h1>
            <p className="lead">
              Our records show a response has already been submitted for this matric number.
              Thank you — there&apos;s nothing more you need to do. While you&apos;re here, see
              how your classmates are answering 👇
            </p>
            <p className="footer-note">
              If you believe this is a mistake, please contact the Student Success Team.
            </p>
          </section>
          {renderBoard(null, null)}
        </>
      );
    }

    if (submitted) {
      return (
        <>
          <Confetti />
          <section className="card card-celebrate" ref={cardRef}>
            <div className="trophy" aria-hidden="true">
              🎉
            </div>
            <p className="kicker">
              All done{student.name ? `, ${student.name.split(" ")[0]}` : ""}!
            </p>
            <h1>Thank you for sharing your thoughts.</h1>
            <p className="lead">
              Your response has been recorded. Your feedback shapes how we support you and every
              future UNITAR student. Here&apos;s to a great rest of the semester! 💜
            </p>
          </section>
          {renderBoard(submitted.answers, submitted.submitted_at)}
          <p className="footer-note centered">
            You can safely close this tab now. Results refresh automatically.
          </p>
        </>
      );
    }

    if (safeIndex < 0) {
      const hasDetails = !!(
        student.name ||
        student.matric ||
        student.programme ||
        student.level
      );
      const hasPrefill = prefilledIds.length > 0;
      const othersSoFar = stats && stats.total >= MIN_RESPONSES_TO_SHOW ? stats.total : 0;

      return (
        <>
          <section className="card intro" ref={cardRef}>
            <div className="intro-emoji" aria-hidden="true">
              👋
            </div>
            <p className="kicker">
              {student.name ? getTimeGreeting() : "5-minute check-in"}
            </p>
            <h1>
              {student.name ? (
                <>
                  Hi <span className="hero-name">{student.name}</span>, how&apos;s your first
                  semester going?
                </>
              ) : (
                <>How&apos;s your first semester going?</>
              )}
            </h1>
            <p className="lead">
              You&apos;re halfway through your very first semester — high-five! ✋ Swipe through a
              few quick questions and tell us how it&apos;s <em>really</em> going.
            </p>

            <ul className="perks">
              <li>
                <span>⏱️</span> About 5 minutes
              </li>
              <li>
                <span>👆</span> Swipe to answer
              </li>
              <li>
                <span>📡</span>
                {othersSoFar
                  ? ` See how ${othersSoFar.toLocaleString()} others answered`
                  : " See live results as you go"}
              </li>
            </ul>

            {tokenError ? (
              <p className="notice notice-warn">
                We couldn&apos;t verify your personalised link, so we&apos;ve started a blank
                survey. You can still complete it below.
              </p>
            ) : null}

            {hasDetails ? (
              <div className="detail-card">
                {verified ? <div className="verified-badge">🔒 Verified link</div> : null}
                {student.matric ? (
                  <div className="detail-row">
                    <span className="detail-label">Matric No</span>
                    <span className="detail-value">{student.matric}</span>
                  </div>
                ) : null}
                {student.programme ? (
                  <div className="detail-row">
                    <span className="detail-label">Programme</span>
                    <span className="detail-value">{student.programme}</span>
                  </div>
                ) : null}
                {student.level ? (
                  <div className="detail-row">
                    <span className="detail-label">Study Level</span>
                    <span className="detail-value">{student.level}</span>
                  </div>
                ) : null}
                {student.email ? (
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{student.email}</span>
                  </div>
                ) : null}
              </div>
            ) : null}

            <p className="footer-note">
              {hasPrefill
                ? "We've pre-filled your details from your invitation. Confirm to skip ahead, or edit if anything looks off."
                : "Your feedback is confidential. Live results only ever show totals — never names or what any one person said."}
            </p>
          </section>

          <div className="dock">
            {hasPrefill ? (
              <button
                className="secondary-btn"
                type="button"
                onClick={() => {
                  setSkipPrefilled(false);
                  startSurvey();
                }}
              >
                Edit details
              </button>
            ) : null}
            <button
              className="primary-btn"
              type="button"
              onClick={() => {
                setSkipPrefilled(true);
                startSurvey();
              }}
            >
              {hasPrefill ? "Confirm & start" : "Let's go"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </>
      );
    }

    const q = currentQuestion!;
    const isLast = safeIndex === flow.length - 1;
    const badge = milestone();

    return (
      <>
        <section
          className={`card question ${revealing ? "is-revealing" : ""}`}
          ref={cardRef}
          key={`${q.id}-${revealing ? "reveal" : "ask"}`}
        >
          <div className="question-head">
            <span className="group-chip">
              <span aria-hidden="true">{groupEmoji[q.group] || "📝"}</span> {q.group}
            </span>
            {badge && !revealing ? <span className="milestone">{badge}</span> : null}
          </div>
          <h2 className={revealing ? "is-small" : ""}>
            {q.title}
            {q.required && !revealing ? (
              <span aria-label="required" className="required">
                {" *"}
              </span>
            ) : null}
          </h2>
          {!revealing && q.subtitle ? <p className="subtitle">{q.subtitle}</p> : null}
          {!revealing && q.helper ? <p className="footer-note">{q.helper}</p> : null}

          <div className="answer-area">
            {revealing && hasResults(q) ? renderReveal(q) : renderControl(q)}
          </div>
          <p className={`error ${error ? "is-visible" : ""}`} role="alert">
            {error}
          </p>
        </section>

        <div className="dock">
          <button
            className="back-btn"
            type="button"
            onClick={previousQuestion}
            aria-label={revealing ? "Back to my answer" : "Previous question"}
          >
            ←
          </button>
          <button
            className="primary-btn"
            type="button"
            onClick={nextQuestion}
            disabled={isSubmitting || checkingMatric}
          >
            {isSubmitting ? (
              <>
                <span className="submitting-spinner" />
                Submitting…
              </>
            ) : checkingMatric ? (
              <>
                <span className="submitting-spinner" />
                Checking…
              </>
            ) : revealing ? (
              <>
                Next question <span aria-hidden="true">→</span>
              </>
            ) : isLast ? (
              <>
                Submit <span aria-hidden="true">🚀</span>
              </>
            ) : (
              <>
                OK <span aria-hidden="true">✓</span>
              </>
            )}
          </button>
        </div>
      </>
    );
  }

  return (
    <main className="survey-page" aria-live="polite">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />
      <div className="app">
        <header className="topbar">
          <div className="brand-block">
            <div className="logo-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/UIU_logo.png" alt="UNITAR International University" />
            </div>
            <div>
              <p className="brand-title">Student Onboarding Survey</p>
              <p className="brand-subtitle">
                {currentQuestion && !submitted && !alreadySubmitted
                  ? `Question ${safeIndex + 1} of ${expectedTotal}`
                  : "by Student Success Team"}
              </p>
            </div>
          </div>
          {routeLabel ? (
            <div className="route-pill">
              <span className="route-dot" />
              <span>{routeLabel}</span>
            </div>
          ) : null}
        </header>

        <div className="progress-track" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            {progress > 0 && progress < 100 ? <span className="progress-runner">🚀</span> : null}
          </div>
        </div>

        {renderBody()}
      </div>
    </main>
  );
}

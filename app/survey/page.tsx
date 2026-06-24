"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { titleCaseName } from "@/lib/name-case";
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
  showIf?: (answers: Answers) => boolean;
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

const ratingScaleNote =
  "Scale: 1 - Very Poor | 2 - Poor | 3 - Neutral | 4 - Good | 5 - Very Good";
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

const commonQuestions: Question[] = [
  {
    id: "student_matric",
    num: "1",
    group: "Personal Information",
    title: "Student Matric Number",
    subtitle: "Nombor Matrik Pelajar",
    type: "text",
    placeholder: "Type your matric number here",
    required: true
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
    route: true
  },
  {
    id: "employment_status",
    num: "4",
    group: "Personal Information",
    title: "What is your current employment status?",
    subtitle: "Apakah status pekerjaan anda sekarang?",
    type: "single",
    options: employmentOptions,
    required: true
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
      required: true
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
      required: true
    },
    {
      id: "ug_onboarding_topic_learned",
      num: "7",
      group: "Application / Onboarding",
      title: "Which topic did you learn the most from during the Onboarding Session?",
      subtitle: "Apakah topik yang paling banyak anda pelajari semasa sesi orientasi?",
      type: "multi",
      options: onboardingTopics,
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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
      required: true
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

// Emoji for the recommendation slider; -1 means "not answered yet".
function sliderEmoji(score: number): string {
  if (score < 0) return "🤔";
  if (score <= 2) return "😞";
  if (score <= 4) return "😕";
  if (score <= 6) return "😐";
  if (score <= 8) return "🙂";
  return "🤩";
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
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLElement>(null);

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
  const safeIndex = currentIndex < 0 ? -1 : Math.min(currentIndex, flow.length - 1);
  const currentQuestion = safeIndex >= 0 ? flow[safeIndex] : null;

  const startSurvey = useCallback(() => {
    setCurrentIndex(0);
    setError("");
  }, []);

  const showIntro = useCallback(() => {
    setCurrentIndex(-1);
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

  const nextQuestion = useCallback(() => {
    if (currentIndex < 0) {
      startSurvey();
      return;
    }

    const q = flow[safeIndex];
    if (!validate(q, answers)) {
      setError(
        q.type === "email"
          ? "Please enter a valid email address before continuing."
          : "Please answer this question before continuing."
      );
      return;
    }

    if (safeIndex >= flow.length - 1) {
      submitSurvey();
      return;
    }

    setCurrentIndex(safeIndex + 1);
    setError("");
  }, [answers, currentIndex, flow, safeIndex, startSurvey, submitSurvey, validate]);

  const previousQuestion = useCallback(() => {
    if (safeIndex <= 0) {
      showIntro();
      return;
    }
    setCurrentIndex(safeIndex - 1);
    setError("");
  }, [safeIndex, showIntro]);

  /* Focus the first control whenever the question changes */
  useEffect(() => {
    if (submitted) return;
    const id = requestAnimationFrame(() => {
      const focusTarget = cardRef.current?.querySelector<HTMLElement>(
        "input, textarea, button.option-btn"
      );
      focusTarget?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [currentIndex, submitted]);

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

      if ((q.type === "single" || q.type === "multi") && q.options) {
        const idx = event.key.toUpperCase().charCodeAt(0) - 65;
        if (idx >= 0 && idx < q.options.length) {
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
      : ((safeIndex + 1) / flow.length) * 100;

  function renderOptionButton(
    q: Question,
    opt: string,
    index: number,
    selected: boolean,
    mode: QType
  ) {
    const isScale = mode === "rating" || mode === "nps";
    const keyLabel = isScale ? opt : String.fromCharCode(65 + index);
    return (
      <button
        key={opt}
        type="button"
        className={`option-btn ${selected ? "is-selected" : ""}`}
        onClick={() => chooseOption(q.id, opt, mode)}
        aria-pressed={selected}
      >
        {isScale ? null : <span className="option-key">{keyLabel}</span>}
        <span className="option-text">{opt}</span>
      </button>
    );
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
            value={(value as string) || ""}
            placeholder={q.placeholder || "Type your answer here"}
            onChange={(e) => setTextAnswer(q.id, e.target.value)}
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

    if (q.type === "single" && q.options) {
      return (
        <div className="option-grid" role="radiogroup" aria-label={q.title}>
          {q.options.map((opt, index) =>
            renderOptionButton(q, opt, index, value === opt, "single")
          )}
        </div>
      );
    }

    if (q.type === "multi" && q.options) {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div className="option-grid" role="group" aria-label={q.title}>
          {q.options.map((opt, index) =>
            renderOptionButton(q, opt, index, selected.includes(opt), "multi")
          )}
        </div>
      );
    }

    if (q.type === "rating") {
      return (
        <div className="option-grid compact" role="radiogroup" aria-label={q.title}>
          {[1, 2, 3, 4, 5].map((num, index) =>
            renderOptionButton(q, String(num), index, String(value) === String(num), "rating")
          )}
        </div>
      );
    }

    if (q.type === "nps") {
      const touched = value !== undefined && value !== null && String(value) !== "";
      const sliderVal = touched ? Number(value) : 5;
      return (
        <div className="slider-control">
          <div className="slider-readout">
            <span className="slider-emoji">{sliderEmoji(touched ? sliderVal : -1)}</span>
            <span className="slider-score">{touched ? sliderVal : "–"}</span>
            <span className="slider-outof">/ 10</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            className="slider-input"
            value={sliderVal}
            aria-label={q.title}
            onPointerDown={() => {
              if (!touched) setTextAnswer(q.id, String(sliderVal));
            }}
            onInput={(e) => setTextAnswer(q.id, (e.target as HTMLInputElement).value)}
            onChange={(e) => setTextAnswer(q.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                nextQuestion();
              }
            }}
          />
          <div className="nps-labels">
            <span>Not at all likely</span>
            <span>Extremely likely</span>
          </div>
        </div>
      );
    }

    return null;
  }

  function renderCardBody() {
    if (loading) {
      return (
        <div>
          <p className="intro-kicker">Just a moment</p>
          <h1>
            <span className="submitting-spinner" style={{ borderTopColor: "var(--brand)" }} />
            Loading your survey…
          </h1>
        </div>
      );
    }

    if (alreadySubmitted) {
      return (
        <>
          <div>
            <p className="intro-kicker">
              Already done{student.name ? `, ${student.name.split(" ")[0]}` : ""}!
            </p>
            <h1>You&apos;ve already responded.</h1>
            <p className="lead">
              Our records show a response has already been submitted for this matric number.
              Thank you — there&apos;s nothing more you need to do.
            </p>
          </div>
          <p className="footer-note">
            If you believe this is a mistake, please contact the Student Success Team.
          </p>
        </>
      );
    }

    if (submitted) {
      return (
        <>
          <div>
            <p className="greeting">🎉 All done{student.name ? `, ${student.name.split(" ")[0]}` : ""}!</p>
            <h1>Thank you for sharing your thoughts.</h1>
            <p className="lead">
              Your response has been recorded. Taking a few minutes to tell us about your first
              semester genuinely helps — your feedback shapes how we support you and every future
              UNITAR student through their onboarding journey.
            </p>
            <p className="lead" style={{ fontSize: "16px", marginTop: "14px" }}>
              We&apos;re grateful you&apos;re part of the UNITAR family. Here&apos;s to a great rest
              of the semester! 💜
            </p>
          </div>
          <p className="footer-note">
            You can safely close this tab now — there&apos;s nothing more you need to do.
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

      return (
        <>
          <div>
            {student.name ? (
              <p className="greeting">{getTimeGreeting()} 👋</p>
            ) : (
              <p className="intro-kicker">5-minute survey</p>
            )}
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
              You&apos;re halfway through your very first semester — that already deserves a
              high-five! ✋ Now we&apos;d love the inside scoop on how it&apos;s <em>really</em>{" "}
              going. It takes about 5 minutes, every answer counts, and your honest feedback helps
              us make UNITAR even better for you. 💜
            </p>

            {tokenError ? (
              <p className="notice notice-warn">
                We couldn&apos;t verify your personalised link, so we&apos;ve started a blank
                survey. You can still complete it below.
              </p>
            ) : null}

            {hasDetails ? (
              <div className="detail-card">
                {verified ? (
                  <div className="verified-badge">🔒 Verified link</div>
                ) : null}
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
            ) : (
              <p className="lead" style={{ fontSize: "15px", marginTop: "10px" }}>
                Certificate, Foundation, Diploma and Bachelor students will follow the
                Undergraduate form. Master and Doctor students will follow the Postgraduate form.
              </p>
            )}
          </div>

          <div className="actions">
            <button
              className="primary-btn"
              type="button"
              onClick={() => {
                setSkipPrefilled(true);
                startSurvey();
              }}
            >
              {hasPrefill ? "Confirm & start" : "Start survey"}
            </button>
            {hasPrefill ? (
              <button
                className="secondary-btn"
                type="button"
                onClick={() => {
                  setSkipPrefilled(false);
                  startSurvey();
                }}
              >
                Edit my details
              </button>
            ) : null}
            <span className="hint">Press Enter to continue</span>
          </div>

          <p className="footer-note">
            {hasPrefill
              ? "We've pre-filled your details from your invitation. Confirm to skip ahead, or edit if anything looks off."
              : "Your feedback is confidential and helps improve academic quality, student support, learning platforms, and the overall student experience at UNITAR."}
          </p>
        </>
      );
    }

    const q = currentQuestion!;
    const isLast = safeIndex === flow.length - 1;

    return (
      <>
        <div>
          <p className="question-kicker">
            {q.group}{" "}
            <span className="question-count">
              — Question {safeIndex + 1} of {flow.length}
            </span>
          </p>
          <h2>
            {q.title}
            {q.required ? (
              <span aria-label="required" style={{ color: "var(--danger)" }}>
                {" "}
                *
              </span>
            ) : null}
          </h2>
          {q.subtitle ? <p className="subtitle">{q.subtitle}</p> : null}
          {q.helper ? <p className="footer-note">{q.helper}</p> : null}
          {q.type === "rating" ? <div className="scale-note">{ratingScaleNote}</div> : null}
          {q.type === "multi" ? (
            <div className="scale-note">✔️ You can select more than one answer.</div>
          ) : null}
        </div>
        <div className="answer-area">{renderControl(q)}</div>
        <p className={`error ${error ? "is-visible" : ""}`}>{error}</p>
        <div className="actions">
          <button
            className="primary-btn"
            type="button"
            onClick={nextQuestion}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="submitting-spinner" />
                Submitting…
              </>
            ) : isLast ? (
              "Submit"
            ) : (
              "OK"
            )}
          </button>
          <button
            className="secondary-btn"
            type="button"
            onClick={safeIndex > 0 ? previousQuestion : showIntro}
          >
            Back
          </button>
          <span className="hint">Press Enter</span>
        </div>
      </>
    );
  }

  return (
    <main className="survey-page" aria-live="polite">
      <div className="app">
        <header className="topbar">
          <div className="brand-block">
            <div className="logo-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/UIU_logo.png" alt="UNITAR International University" />
            </div>
            <div>
              <p className="brand-title">UNITAR Student Onboarding Survey</p>
              <p className="brand-subtitle">by Student Success Team</p>
            </div>
          </div>
          {routeLabel ? (
            <div className="route-pill is-visible">
              <span className="route-dot" />
              <span>{routeLabel}</span>
            </div>
          ) : null}
        </header>

        <div className="progress-track" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <section className="card" ref={cardRef}>
          {renderCardBody()}
        </section>
      </div>
    </main>
  );
}

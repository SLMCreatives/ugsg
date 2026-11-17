// Shared by the /bangkit26recap page and /api/bangkit-submit, so the client and
// server validate against exactly the same questions and options.

export type BangkitQType = "single" | "multi" | "text";

export interface BangkitQuestion {
  id: string;
  section: string;
  title: string;
  hint?: string;
  type: BangkitQType;
  required?: boolean;
  options?: string[];
  max?: number;
}

export const BANGKIT_QUESTIONS: BangkitQuestion[] = [
  {
    id: "days",
    section: "Make it work for you",
    title: "Which day and time could work for you?",
    hint: "Select all options you can attend. All times are Malaysia time (MYT). The final slot will be confirmed after reviewing responses.",
    type: "multi",
    required: true,
    options: [
      "12 December 2026 (Saturday), 10.30 am–11.30 am",
      "16 December 2026 (Wednesday), 6.30 pm–7.30 pm",
      "21 December 2026 (Monday), 8.00 pm–9.00 pm"
    ]
  },
  {
    id: "topics",
    section: "Make it work for you",
    title: "Whose experiences would you love to hear?",
    hint: "Choose the topics that matter to you.",
    type: "multi",
    required: true,
    options: [
      "Balancing study, work and family",
      "Staying motivated through challenges",
      "Building confidence",
      "Managing assignments and deadlines",
      "Making friends and finding support",
      "Celebrating small wins",
      "Other"
    ]
  },
  {
    id: "participation",
    section: "Make it work for you",
    title: "How would you feel comfortable joining in?",
    type: "single",
    required: true,
    options: [
      "Speaking live",
      "Typing in the chat",
      "Polls and reflection activities",
      "Listening without speaking",
      "Not sure yet"
    ]
  },
  {
    id: "challenge",
    section: "Your 2026 story",
    title: "What is one experience from 2026 you would like to share?",
    hint: "Optional • Tell us about a small win, a challenge or a memorable moment, and what you learned. Share only what feels comfortable; avoid sensitive details about yourself or others.",
    type: "text"
  },
  {
    id: "goal",
    section: "Your 2027 reset",
    title: "What is one realistic goal you have for 2027?",
    hint: "Optional • What would you like to improve or do differently in your student life?",
    type: "text"
  },
  {
    id: "speaker",
    section: "Your 2027 reset",
    title: "Would you like to share your story during the session?",
    hint: "We’ll contact interested students before confirming any speaking arrangement. Selected UG students who share their stories during the session will receive a token of appreciation from UNITAR.",
    type: "single",
    required: true,
    options: [
      "Yes, I’d like to be a student speaker",
      "Maybe—please tell me more",
      "No, I prefer to attend as a participant"
    ]
  },
  {
    id: "permission",
    section: "Your 2027 reset",
    title: "May SST share your written story without your name?",
    hint: "This applies to your 2026 experience and 2027 goal during this sharing session. Saying no will not affect your participation.",
    type: "single",
    required: true,
    options: ["Yes, you may share it without my name", "No, use my answers for planning only"]
  },
  {
    id: "suggestions",
    section: "Your 2027 reset",
    title: "Anything else you’d love us to include?",
    hint: "Optional • Suggest an activity, another topic or an improvement for future student programmes.",
    type: "text"
  }
];

export const BANGKIT_SECTIONS = [
  "Make it work for you",
  "Your 2026 story",
  "Your 2027 reset",
  "Review & send"
];

const NOT_SPEAKER = BANGKIT_QUESTIONS.find((q) => q.id === "speaker")!.options![2];

export type BangkitAnswers = Record<string, unknown>;

/** True when the student said yes/maybe to speaking, so an email is needed. */
export function wantsToSpeak(answers: BangkitAnswers): boolean {
  return typeof answers.speaker === "string" && answers.speaker !== "" && answers.speaker !== NOT_SPEAKER;
}

/** Returns an error message, or null when the answers are valid. */
export function validateBangkit(a: BangkitAnswers): string | null {
  for (const q of BANGKIT_QUESTIONS) {
    const v = a[q.id];
    if (q.type === "multi") {
      if (
        !Array.isArray(v) ||
        v.some((x) => typeof x !== "string" || !q.options?.includes(x)) ||
        new Set(v).size !== v.length ||
        (q.max && v.length > q.max) ||
        (q.required && v.length === 0)
      ) {
        return `Please answer: ${q.title}`;
      }
    } else if (
      typeof v !== "string" ||
      v.length > 2000 ||
      (q.required && !v.trim()) ||
      (q.type === "single" && v !== "" && !q.options?.includes(v))
    ) {
      return `Please answer: ${q.title}`;
    }
  }

  if (typeof a.name !== "string" || !a.name.trim() || a.name.length > 120) {
    return "Please enter your full name.";
  }
  if (typeof a.matric !== "string" || !a.matric.trim() || a.matric.length > 40) {
    return "Please enter your matric number.";
  }
  if (
    wantsToSpeak(a) &&
    (typeof a.email !== "string" || !/^\S+@\S+\.\S+$/.test(a.email) || a.email.length > 254)
  ) {
    return "Please enter a valid email so SST can contact you.";
  }
  if (a.consent !== true) {
    return "Please confirm the survey privacy notice.";
  }
  return null;
}

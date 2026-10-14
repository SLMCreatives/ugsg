/**
 * Shared shape of the aggregated "live results" the survey shows students.
 *
 * Only closed-ended answers are aggregated, and only as counts — names, matric
 * numbers, emails and free-text answers never leave the server.
 */

export type StatKey =
  | "study_level"
  | "employment_status"
  | "laptop_access"
  | "application_rating"
  | "onboarding_rating"
  | "onboarding_topics"
  | "platform_rating"
  | "lecturer_rating"
  | "campus_interest"
  | "supportive_department"
  | "fees_understanding";

export interface StatBucket {
  /** Rows that answered this question (a multi-select row counts once). */
  responses: number;
  counts: Record<string, number>;
}

export interface SurveyStats {
  total: number;
  updatedAt: string;
  questions: Partial<Record<StatKey, StatBucket>>;
}

/**
 * Zero-based sheet column for each stat. Mirrors the row built in
 * app/api/survey-submit/route.ts — keep the two in sync.
 */
export const STAT_COLUMNS: Record<StatKey, number> = {
  study_level: 6,
  employment_status: 7,
  laptop_access: 8,
  application_rating: 9,
  onboarding_rating: 10,
  onboarding_topics: 11,
  platform_rating: 12,
  lecturer_rating: 13,
  campus_interest: 15,
  supportive_department: 17,
  fees_understanding: 19
};

/** Multi-select answers are stored joined with "; ". */
export const MULTI_STATS: StatKey[] = ["onboarding_topics"];

/** Below this many other responses a question's results are not shown. */
export const MIN_RESPONSES_TO_SHOW = 5;

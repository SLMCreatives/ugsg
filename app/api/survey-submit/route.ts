import { NextResponse } from "next/server";
import {
  appendSurveyRow,
  getSubmittedMatrics,
  normaliseMatric
} from "@/lib/googlesheets-survey";
import { verifyToken } from "@/lib/survey-token";

// Duplicate-submission check used by the survey page on load: GET ?matric=...
export async function GET(request: Request) {
  const matric = normaliseMatric(
    new URL(request.url).searchParams.get("matric") || ""
  );

  if (!matric) {
    return NextResponse.json({ submitted: false });
  }

  try {
    const existing = await getSubmittedMatrics();
    return NextResponse.json({ submitted: existing.has(matric) });
  } catch (error) {
    // Fail open — never block a student because the lookup hiccuped.
    console.warn("Survey dedupe check failed:", error);
    return NextResponse.json({ submitted: false });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { form_type, answers: a, token } = body;

    if (!form_type || !a) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    // Resolve the trustworthy identity. If a signed token is supplied it is the
    // source of truth; client-sent name/matric are ignored when a token exists.
    let identity = {
      name: (body.student?.name as string) || "",
      matric: (a.student_matric as string) || "",
      email: (a.student_email as string) || "",
      programme: (body.student?.programme as string) || ""
    };

    if (token) {
      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json(
          { error: "Invalid or tampered survey link." },
          { status: 401 }
        );
      }
      identity = {
        name: payload.name || "",
        matric: payload.matric || "",
        email: payload.email || "",
        programme: payload.programme || ""
      };
    }

    // Duplicate guard (best-effort — fail open on lookup errors).
    const matricKey = normaliseMatric(identity.matric);
    if (matricKey) {
      try {
        const existing = await getSubmittedMatrics();
        if (existing.has(matricKey)) {
          return NextResponse.json(
            { error: "A response has already been recorded for this matric number." },
            { status: 409 }
          );
        }
      } catch (lookupError) {
        console.warn("Survey dedupe lookup failed; proceeding:", lookupError);
      }
    }

    // Normalise shared fields that differ by branch prefix (UG vs PG)
    const laptopAccess = a.ug_laptop_access || a.pg_laptop_access || "";
    const appRating = a.ug_application_process_rating || a.pg_application_process_rating || "";
    const onboardingRating = a.ug_onboarding_helpfulness_rating || a.pg_onboarding_helpfulness_rating || "";
    const platformRating = a.ug_platform_navigation_confidence || a.pg_platform_navigation_confidence || "";
    const lecturerRating = a.ug_lecturer_guidance_rating || a.pg_lecturer_supervisor_guidance_rating || "";
    const campusInterest = a.ug_campus_programme_interest || a.pg_campus_programme_interest || "";
    const supportDept = a.ug_most_supportive_department || a.pg_most_supportive_department || "";
    const supportDeptOther = a.ug_supportive_department_other || a.pg_supportive_department_other || "";
    const feesUnderstanding = a.ug_fees_understanding || a.pg_fees_understanding || "";
    const npsScore = a.ug_recommendation_score || a.pg_recommendation_score || "";

    const onboardingTopics = Array.isArray(a.ug_onboarding_topic_learned)
      ? a.ug_onboarding_topic_learned.join("; ")
      : a.ug_onboarding_topic_learned || "";

    // Column order — keep this in sync with your sheet header row:
    // Timestamp | Form Type | Name | Matric | Email | Programme | Study Level | Employment |
    // Laptop Access | App Rating | Onboarding Rating | Onboarding Topics |
    // Platform Rating | Lecturer Rating | Additional Support (UG) |
    // Campus Interest | Activities Interested (PG) |
    // Supportive Dept | Other Dept | Fees Understanding | NPS Score
    const row: (string | number)[] = [
      new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" }),
      form_type,
      identity.name,
      identity.matric,
      identity.email,
      identity.programme,
      a.study_level || "",
      a.employment_status || "",
      laptopAccess,
      appRating,
      onboardingRating,
      onboardingTopics,
      platformRating,
      lecturerRating,
      a.ug_additional_support || "",
      campusInterest,
      a.pg_activities_interested || "",
      supportDept,
      supportDeptOther,
      feesUnderstanding,
      npsScore
    ];

    await appendSurveyRow(row);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Survey submit error:", error);

    const message =
      error instanceof Error && error.message.includes("not configured")
        ? error.message
        : "Failed to save survey response.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

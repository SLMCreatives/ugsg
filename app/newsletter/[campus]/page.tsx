import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCampus, publishedCampuses } from "@/lib/newsletter/campuses";
import { CampusNewsletterPage } from "@/components/newsletter/campus-newsletter";

const YEAR = 2026;

type Params = { campus: string };

/** Pre-render a route for every campus that has published its edition. */
export function generateStaticParams(): Params[] {
  return publishedCampuses.map((campus) => ({ campus: campus.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { campus: slug } = await params;
  const campus = getCampus(slug);

  if (!campus?.newsletter) {
    return { title: `Student Newsletter ${YEAR} | UNITAR` };
  }

  return {
    title: `${campus.name} Student Newsletter ${YEAR} | UNITAR`,
    description: `What changed at ${campus.fullName} after the September 2025 Student Satisfaction Survey.`
  };
}

export default async function CampusNewsletterRoute({
  params
}: {
  params: Promise<Params>;
}) {
  const { campus: slug } = await params;
  const campus = getCampus(slug);

  // Unknown slug, or a campus that has not published its edition yet.
  if (!campus?.newsletter) {
    notFound();
  }

  return <CampusNewsletterPage campus={campus.newsletter} year={YEAR} />;
}

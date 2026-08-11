import Link from "next/link";
import { publishedCampuses } from "@/lib/newsletter/campuses";

interface MastheadProps {
  /** Second line of the department mark, e.g. "UIU Edition". */
  edition: string;
  /** Issue and date line, e.g. "Issue 01 · August 2026". */
  issue?: string;
  /** Uppercase strapline under the brand row. */
  strapline: string;
  /** Slug of the campus currently being viewed, so it is not linked to itself. */
  currentSlug?: string;
}

export function NewsletterMasthead({
  edition,
  issue,
  strapline,
  currentSlug
}: MastheadProps) {
  const otherCampuses = publishedCampuses.filter((c) => c.slug !== currentSlug);

  return (
    <>
      <div className="top-bar" />

      <header className="masthead">
        <div className="brand-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="unitar-logo"
            src="/logo_unitar_wordmark.png"
            alt="UNITAR International University logo"
          />
          <div className="department-mark">
            <strong>Student Experience Department</strong>
            <span>{edition}</span>
            {issue && <span className="issue-date">{issue}</span>}
          </div>
        </div>
        <div className="issue-line">{strapline}</div>
      </header>

      <div className="campus-bar">
        <span className="campus-bar-label">Campus editions</span>
        <Link href="/newsletter">All campuses</Link>
        {otherCampuses.map((campus) => (
          <Link key={campus.slug} href={`/newsletter/${campus.slug}`}>
            {campus.name}
          </Link>
        ))}
      </div>
    </>
  );
}

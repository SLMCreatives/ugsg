import Link from "next/link";
import { campuses } from "@/lib/newsletter/campuses";
import { NewsletterMasthead } from "@/components/newsletter/newsletter-masthead";

const YEAR = 2026;

/**
 * Campus hub — one card per campus. Campuses with a published edition link
 * through to their own newsletter; the rest show as "Coming soon".
 */
export default function NewsletterHubPage() {
  return (
    <main className="page-shell">
      <NewsletterMasthead
        edition={`Annual Student Newsletter ${YEAR}`}
        issue={`Issue 01 · ${YEAR}`}
        strapline="You spoke • We acted • Progress continues"
      />

      <section className="hub-intro">
        <p className="eyebrow">Choose your campus</p>
        <h1>Student Newsletter {YEAR}</h1>
        <p>
          Following the September 2025 Student Satisfaction Survey, each UNITAR
          campus has been acting on what students told us. Pick a campus to read
          its edition.
        </p>
      </section>

      <div className="campus-grid">
        {campuses.map((campus) =>
          campus.newsletter ? (
            <Link
              key={campus.slug}
              href={`/newsletter/${campus.slug}`}
              className="campus-card"
            >
              <span className="campus-card-name">{campus.name}</span>
              <span className="campus-card-full">{campus.fullName}</span>
              <span className="campus-card-location">{campus.location}</span>
              <span className="campus-card-status live">
                Read this edition →
              </span>
            </Link>
          ) : (
            <div key={campus.slug} className="campus-card pending">
              <span className="campus-card-name">{campus.name}</span>
              <span className="campus-card-full">{campus.fullName}</span>
              <span className="campus-card-location">{campus.location}</span>
              <span className="campus-card-status">Coming soon</span>
            </div>
          )
        )}
      </div>

      <section className="closing">
        <p className="eyebrow">Keep talking to us</p>
        <h2>The next edition starts with your next survey.</h2>
        <p>
          Every story in these editions began as a survey response. Your answers
          tell us what matters to students and where we are falling short, on
          campus and within the online learning environment.
        </p>
        <div className="signature">
          Regards,
          <br />
          Student Experience Department
        </div>
      </section>

      <footer className="newsletter-footer">
        <span>© {YEAR} UNITAR International University</span>
        <span>Annual Student Newsletter {YEAR}</span>
      </footer>
    </main>
  );
}

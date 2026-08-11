import Link from "next/link";
import { NewsletterMasthead } from "@/components/newsletter/newsletter-masthead";

/**
 * Shown for an unknown campus slug, or a campus whose edition is not published
 * yet — so a shared link never lands on a bare 404.
 */
export default function CampusNotFound() {
  return (
    <main className="page-shell">
      <NewsletterMasthead
        edition="Annual Student Newsletter 2026"
        strapline="You spoke • We acted • Progress continues"
      />

      <section className="hub-intro">
        <p className="eyebrow">Not published yet</p>
        <h1>This campus edition isn&rsquo;t available.</h1>
        <p>
          The newsletter for this campus has not been published yet. See the
          campus list for the editions that are live.
        </p>
        <p>
          <Link href="/newsletter">View all campuses →</Link>
        </p>
      </section>

      <footer className="newsletter-footer">
        <span>© 2026 UNITAR International University</span>
        <span>Annual Student Newsletter 2026</span>
      </footer>
    </main>
  );
}

import Link from "next/link";
import type {
  CampusNewsletter,
  NewsletterSection,
  SectionNote
} from "@/lib/newsletter/types";
import { NewsletterMasthead } from "./newsletter-masthead";
import { Gallery } from "./gallery";
import { renderRichText } from "./rich-text";

/**
 * "Coming next" and "Expected" describe the same forthcoming work, so they are
 * merged into one callout rather than stacking two near-identical boxes.
 */
function ForwardNote({ notes }: { notes: SectionNote[] }) {
  const next = notes.find((n) => n.kind === "next");
  const target = notes.find((n) => n.kind === "target");
  if (!next && !target) return null;

  return (
    <div className="callout next">
      <p className="callout-label">Coming next</p>
      {next && <p className="callout-text">{renderRichText(next.text)}</p>}
      {target && (
        <p className="callout-meta">
          Expected <strong>{target.text.replace(/\.$/, "")}</strong>
        </p>
      )}
    </div>
  );
}

function ResultNote({ notes }: { notes: SectionNote[] }) {
  const result = notes.find((n) => n.kind === "result");
  if (!result) return null;

  return (
    <div className="callout result">
      <p className="callout-label">What this means for you</p>
      <p className="callout-text">{renderRichText(result.text)}</p>
    </div>
  );
}

function Article({
  section,
  index
}: {
  section: NewsletterSection;
  index: number;
}) {
  const isComingSoon = section.variant === "coming-soon";
  const notes = section.notes ?? [];

  // Photos alternate sides on wide screens; tinted band on every other article.
  const classes = ["newsletter-section"];
  if (isComingSoon) classes.push("coming-soon");
  else if (index % 2 === 0) classes.push("alt");
  if (index % 2 === 1) classes.push("flip");

  return (
    <article className={classes.join(" ")} id={section.id}>
      <div className="article-grid">
        <header className="article-header">
          <p className="article-meta">
            <span className="section-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="section-kicker">{section.kicker}</span>
          </p>
          <h2>{section.heading}</h2>
          {section.standfirst && (
            <p className="standfirst">{renderRichText(section.standfirst)}</p>
          )}
        </header>

        <div className="article-visual">
          <Gallery
            images={section.images}
            caption={section.caption}
            placeholder={section.placeholder}
            label={section.heading}
          />
        </div>

        <div className="article-body">
          {section.body?.map((paragraph, i) => (
            <p key={i}>{renderRichText(paragraph)}</p>
          ))}

          {section.bullets && section.bullets.length > 0 && (
            <ul>
              {section.bullets.map((bullet, i) => (
                <li key={i}>{renderRichText(bullet)}</li>
              ))}
            </ul>
          )}

          <ForwardNote notes={notes} />
          <ResultNote notes={notes} />
        </div>
      </div>
    </article>
  );
}

export function CampusNewsletterPage({
  campus,
  year
}: {
  campus: CampusNewsletter;
  year: number;
}) {
  return (
    <main className="page-shell">
      <NewsletterMasthead
        edition={`${campus.name} Edition`}
        issue={`${campus.issue.label} · ${campus.issue.date}`}
        strapline="You spoke • We acted • Progress continues"
        currentSlug={campus.slug}
      />

      <nav className="jump-nav" aria-label="In this issue">
        <span className="jump-nav-label">In this issue</span>
        {campus.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.navLabel}
          </a>
        ))}
      </nav>

      <section className="hero">
        <p className="eyebrow">{campus.hero.eyebrow}</p>
        <h1>
          {campus.hero.headline} <span>{campus.hero.headlineAccent}</span>{" "}
          {campus.hero.headlineTail}
        </h1>
        <p className="subtitle">{campus.hero.subtitle}</p>
      </section>

      {/* Editor's letter */}
      <section className="intro">
        {campus.intro.map((paragraph, i) => (
          <p key={i} className={i === 0 ? "drop-cap" : undefined}>
            {renderRichText(paragraph)}
          </p>
        ))}
      </section>

      <section className="numbers">
        <h2 className="numbers-title">{campus.highlightsTitle}</h2>
        <div className="highlights">
          {campus.highlights.map((highlight, i) => (
            <div className="highlight-card" key={i}>
              <span className="highlight-number">{highlight.value}</span>
              <span className="highlight-label">{highlight.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contents — more scannable than the sticky bar on a small screen. */}
      <section className="issue-contents">
        <h2 className="contents-title">In this issue</h2>
        <ol className="contents-list">
          {campus.sections.map((section, i) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span className="contents-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="contents-text">
                  <span className="contents-kicker">{section.kicker}</span>
                  <span className="contents-heading">{section.heading}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {campus.sections.map((section, i) => (
        <Article key={section.id} section={section} index={i} />
      ))}

      <section className="closing">
        <p className="eyebrow">{campus.closing.eyebrow}</p>
        <h2>{campus.closing.heading}</h2>
        <p>{renderRichText(campus.closing.body)}</p>
        <div className="signature">
          Regards,
          <br />
          {campus.closing.signature}
        </div>
      </section>

      <footer className="newsletter-footer">
        <span>
          © {year} {campus.fullName}
        </span>
        <span>
          <Link href="/newsletter">Read other campus editions →</Link>
        </span>
      </footer>
    </main>
  );
}

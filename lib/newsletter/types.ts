/**
 * Types for the Student Experience Department's annual student newsletter.
 *
 * Every campus page is generated from a `CampusNewsletter` object, so adding a
 * campus means adding one data file — no new markup.
 *
 * Text fields support `**bold**` for emphasis (see `renderRichText`).
 */

/** A single figure in the "by the numbers" strip under the editor's letter. */
export interface Highlight {
  /** The figure itself, e.g. "2×", "500+", "Instant". */
  value: string;
  /** Short description under the figure. */
  label: string;
}

/**
 * Callout under an article.
 * `result` = what it means for students, `next` = what is still coming,
 * `target` = when the "next" item is expected.
 *
 * `next` and `target` are rendered together as one "Coming next" callout.
 */
export type NoteKind = "result" | "next" | "target";

export interface SectionNote {
  kind: NoteKind;
  text: string;
}

export interface SectionImage {
  /** Path under /public. */
  src: string;
  alt: string;
  /**
   * How the image fills the frame. "cover" (default) crops to fill and suits
   * photographs; "contain" fits the whole image in, for screenshots and
   * posters that must not be cropped.
   */
  fit?: "cover" | "contain";
  /** Caption for this slide. Falls back to the section caption. */
  caption?: string;
}

/** Briefing shown in the empty frame while a section has no photos. */
export interface SectionPlaceholder {
  /** e.g. "Photo 3". */
  label: string;
  /** Note for whoever supplies the photos. */
  brief: string;
}

/** One article in the issue. */
export interface NewsletterSection {
  /** Anchor id — also used for the "In this issue" contents links. */
  id: string;
  /** Short label for the sticky contents bar. */
  navLabel: string;
  /** Small orange label above the headline, e.g. "Campus dining". */
  kicker: string;
  /** The article headline. */
  heading: string;
  /** Single-sentence standfirst under the headline, in the style of a dek. */
  standfirst?: string;
  /** Paragraphs of body copy. */
  body?: string[];
  bullets?: string[];
  notes?: SectionNote[];
  /**
   * Photos for this article. One renders as a single frame; several render as
   * a swipeable gallery. Empty falls back to `placeholder`.
   */
  images: SectionImage[];
  placeholder: SectionPlaceholder;
  /** Default caption, used for slides that do not set their own. */
  caption: string;
  /** "coming-soon" renders the dark blue treatment. */
  variant?: "default" | "coming-soon";
}

export interface CampusNewsletter {
  /** URL segment, e.g. "uiu" -> /newsletter/uiu */
  slug: string;
  /** Short name used in nav and cards, e.g. "UIU". */
  name: string;
  /** Full legal name for the masthead. */
  fullName: string;
  /** City / state line for the campus card. */
  location: string;
  /** Issue identity printed in the masthead. */
  issue: {
    /** e.g. "Issue 01". */
    label: string;
    /** e.g. "August 2026". */
    date: string;
  };
  hero: {
    eyebrow: string;
    /** Plain lead-in of the cover line. */
    headline: string;
    /** Italic orange middle of the cover line. */
    headlineAccent: string;
    /** Plain tail of the cover line. */
    headlineTail: string;
    subtitle: string;
  };
  /** The editor's letter, opening the issue. Renders with a drop cap. */
  intro: string[];
  /** Heading above the numbers strip, e.g. "By the numbers". */
  highlightsTitle: string;
  highlights: Highlight[];
  sections: NewsletterSection[];
  closing: {
    eyebrow: string;
    heading: string;
    body: string;
    signature: string;
  };
}

/**
 * Registry entry for every campus, including ones whose edition has not been
 * written yet. `newsletter` is null until the campus supplies its content.
 */
export interface CampusEntry {
  slug: string;
  name: string;
  fullName: string;
  location: string;
  newsletter: CampusNewsletter | null;
}

import { Fragment, type ReactNode } from "react";

/**
 * Renders `**bold**` spans inside newsletter copy.
 *
 * Content is authored in plain TypeScript strings rather than HTML, so this
 * keeps emphasis available without reaching for dangerouslySetInnerHTML.
 */
export function renderRichText(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

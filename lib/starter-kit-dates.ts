/**
 * The one place the starter kit campaign dates live.
 *
 * The hero and the form both gate on these and both print them, so keeping two
 * copies in step by hand was a standing trap — bump the window here and every
 * date on the page follows.
 *
 * Offsets are written as +08:00 so the window opens and closes at midnight in
 * Malaysia regardless of the server's timezone. Without it these parse as the
 * host's local time, which on a UTC host would shift the boundary by 8 hours.
 */

/** Registration accepts submissions from this instant... */
export const REGISTRATION_OPENS = new Date("2026-09-10T00:00:00+08:00");
/** ...until the end of this day. */
export const REGISTRATION_CLOSES = new Date("2026-09-27T23:59:59+08:00");

/** Printed labels. Kept beside the dates so they cannot disagree with them. */
export const REGISTRATION_OPENS_LABEL = "10 September 2026";
export const REGISTRATION_CLOSES_LABEL = "27 September 2026";
/** Compact form, for the hero's date tile. */
export const REGISTRATION_RANGE_SHORT = "Sept 10 – 27, 2026";

export const COLLECTION_RANGE = "October 19 – November 2, 2026";
/** Compact form, for the hero's date tile. */
export const COLLECTION_RANGE_SHORT = "Oct 19 – Nov 2";

export type RegistrationStatus = "upcoming" | "open" | "closed";

/**
 * Escape hatch for testing the form outside the live window.
 *
 * Set NEXT_PUBLIC_STARTER_KIT_FORCE_OPEN=true in `.env.local` (which is
 * gitignored, so it cannot reach production) to force the form open. Leave it
 * unset anywhere real and the dates above are the only thing that decides.
 */
const FORCE_OPEN = process.env.NEXT_PUBLIC_STARTER_KIT_FORCE_OPEN === "true";

export function registrationStatus(now: number = Date.now()): RegistrationStatus {
  if (FORCE_OPEN) return "open";
  if (now < REGISTRATION_OPENS.getTime()) return "upcoming";
  if (now > REGISTRATION_CLOSES.getTime()) return "closed";
  return "open";
}

/** Whole days remaining before registration closes; 0 once it has. */
export function daysUntilClose(now: number = Date.now()) {
  return Math.max(
    0,
    Math.ceil((REGISTRATION_CLOSES.getTime() - now) / (1000 * 60 * 60 * 24))
  );
}

/** Whole days until registration opens; 0 once it has. */
export function daysUntilOpen(now: number = Date.now()) {
  return Math.max(
    0,
    Math.ceil((REGISTRATION_OPENS.getTime() - now) / (1000 * 60 * 60 * 24))
  );
}

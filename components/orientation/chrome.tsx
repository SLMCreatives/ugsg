import { readFileSync } from "node:fs";
import path from "node:path";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Info,
  LifeBuoy,
  Mail,
  MessagesSquare
} from "lucide-react";
import type { ReactNode } from "react";

/**
 * Presentational pieces shared by the BM and English orientation pages.
 * Everything user-facing arrives as a prop — these components hold no copy.
 */

/** The warm amber note used for prerequisites and cautions. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-[#FFF7ED] px-4 py-3.5">
      <Info
        className="mt-0.5 h-4 w-4 shrink-0 text-unitar-orange-ink"
        aria-hidden="true"
      />
      <p className="m-0 text-[13px] leading-relaxed text-[#8A5417]">{children}</p>
    </div>
  );
}

/**
 * Intrinsic size of a file under `public/`, read from its header once per
 * build and cached.
 *
 * The step screenshots run from 218px to 1658px wide, so `next/image` needs
 * each one's real dimensions: a single hardcoded pair reserves the wrong box
 * (layout shift) and asks the optimiser for the wrong source width, which is
 * what blurs the small portrait grabs when they are stretched across a desktop
 * column. Safe here because `chrome.tsx` is only ever imported by the two
 * server-rendered orientation pages.
 */
const SIZE_CACHE = new Map<string, { width: number; height: number }>();

function intrinsicSize(src: string) {
  const cached = SIZE_CACHE.get(src);
  if (cached) return cached;

  // Fallback keeps a broken or unreadable path from taking the page down.
  let size = { width: 700, height: 500 };

  try {
    const buf = readFileSync(path.join(process.cwd(), "public", src));

    if (buf.readUInt32BE(0) === 0x89504e47) {
      // PNG — IHDR width/height sit at a fixed offset after the signature.
      size = { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    } else if (buf.readUInt16BE(0) === 0xffd8) {
      // JPEG — walk the segment markers to the start-of-frame.
      let i = 2;
      while (i + 9 < buf.length) {
        if (buf[i] !== 0xff) {
          i += 1;
          continue;
        }
        const marker = buf[i + 1];
        const isStartOfFrame =
          marker >= 0xc0 &&
          marker <= 0xcf &&
          marker !== 0xc4 &&
          marker !== 0xc8 &&
          marker !== 0xcc;
        if (isStartOfFrame) {
          size = { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
          break;
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
  } catch {
    // Keep the fallback.
  }

  SIZE_CACHE.set(src, size);
  return size;
}

/** A screenshot inside the warm frame used throughout the steps. */
export function StepFigure({
  src,
  alt,
  className,
  cap = 640
}: {
  src: string;
  alt: string;
  className?: string;
  /**
   * Widest the figure may render. Capped again by the image's own pixel width,
   * so a screenshot is never scaled up past its native size.
   */
  cap?: number;
}) {
  const { width, height } = intrinsicSize(src);
  const maxWidth = Math.min(width, cap);

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      sizes={`(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`}
      // Screenshots of UI carry small text; the default 75 smudges it.
      quality={90}
      style={{ maxWidth }}
      className={`h-auto w-full rounded-xl border border-sand-300 ${className ?? ""}`}
    />
  );
}

/** Lettered sub-instruction inside a step. */
export function SubStep({ letter, children }: { letter: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] bg-sand-100 text-xs font-bold text-unitar-orange-ink">
        {letter}
      </span>
      <span className="text-[14.5px] leading-relaxed text-sand-900">{children}</span>
    </div>
  );
}

export function NextCard({
  href,
  title,
  body,
  tint,
  dot
}: {
  href: string;
  title: string;
  body: string;
  /** Tailwind background class for the icon tile. */
  tint: string;
  /** Tailwind background class for the inner dot. */
  dot: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-[44px] items-center gap-3.5 rounded-[18px] border border-sand-300 bg-white p-4 transition-colors hover:border-sand-400 sm:flex-col sm:items-start sm:gap-3.5 sm:p-6"
    >
      <span
        className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[13px] sm:h-[46px] sm:w-[46px] ${tint}`}
      >
        <span className={`h-[18px] w-[18px] rounded-[5px] ${dot}`} />
      </span>
      <span className="flex grow flex-col gap-1">
        <span className="font-display text-[15.5px] font-bold text-sand-900 sm:text-lg">
          {title}
        </span>
        <span className="text-[13px] leading-snug text-sand-800 sm:text-[14.5px]">
          {body}
        </span>
      </span>
      <ChevronRight
        className="h-[18px] w-[18px] shrink-0 text-sand-500 sm:hidden"
        aria-hidden="true"
      />
    </Link>
  );
}

export interface HelpContact {
  icon: "email" | "whatsapp";
  /** The address or channel name. */
  label: string;
  note: string;
  /** mailto:/https: target. Omitted when there is nothing to click. */
  href?: string;
}

export function HelpBand({
  eyebrow,
  heading,
  body,
  team,
  contacts
}: {
  eyebrow: string;
  heading: string;
  body: string;
  /**
   * The Student Success Team card. Every student is assigned an SST for their
   * first semester, so it leads the panel and the older channels sit under it.
   */
  team: {
    badge: string;
    name: string;
    body: string;
    note: string;
    email: string;
  };
  /**
   * Any further channels, shown smaller beneath the team card. Omit it and the
   * SST card stands alone.
   */
  contacts?: HelpContact[];
}) {
  return (
    <section
      id="help"
      className="scroll-mt-20 px-5 pb-9 pt-8 lg:px-10 lg:pb-16 lg:pt-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 rounded-[22px] bg-unitar-blue p-6 sm:rounded-[30px] sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange">
              {eyebrow}
            </span>
            <h2 className="m-0 font-display text-[23px] font-bold leading-tight tracking-tight text-white sm:text-[34px]">
              {heading}
            </h2>
            <p className="m-0 max-w-md text-[14.5px] leading-relaxed text-[#C4DAE8] sm:text-base">
              {body}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col gap-3.5 rounded-[18px] bg-white/[0.14] p-5 sm:p-6">
              <div className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-unitar-orange">
                  <LifeBuoy className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.07em] text-unitar-orange">
                    {team.badge}
                  </span>
                  <span className="font-display text-[17px] font-bold leading-tight text-white sm:text-xl">
                    {team.name}
                  </span>
                </span>
              </div>

              <p className="m-0 text-[13.5px] leading-relaxed text-[#C4DAE8] sm:text-[14.5px]">
                {team.body}
              </p>

              <a
                href={`mailto:${team.email}`}
                className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-unitar-orange px-6 text-[14.5px] font-bold text-white transition-colors hover:bg-unitar-orange-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[15px]"
              >
                <Mail className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                <span className="break-all">{team.email}</span>
              </a>

              <p className="m-0 text-center text-xs leading-snug text-[#A9CBE0]">
                {team.note}
              </p>
            </div>

            {/* A lone channel runs the full width rather than sitting in a
                half-empty two-column row. */}
            {contacts && contacts.length > 0 && (
            <div
              className={`grid gap-3 sm:gap-4 ${
                contacts.length > 1 ? "sm:grid-cols-2" : ""
              }`}
            >
              {contacts.map((contact) => {
                const Icon = contact.icon === "email" ? Mail : MessagesSquare;
                const shared =
                  "flex min-h-[44px] items-start gap-3 rounded-[14px] bg-white/10 p-4";
                const inner = (
                  <>
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-unitar-orange"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="break-all text-[14px] font-semibold text-white">
                        {contact.label}
                      </span>
                      <span className="text-xs leading-snug text-[#A9CBE0]">
                        {contact.note}
                      </span>
                    </span>
                  </>
                );

                return contact.href ? (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className={`${shared} transition-colors hover:bg-white/[0.16]`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={contact.label} className={shared}>
                    {inner}
                  </div>
                );
              })}
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OrientationFooter({ text }: { text: string }) {
  return (
    <footer className="px-5 pb-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="m-0 text-xs text-sand-600">{text}</p>
      </div>
    </footer>
  );
}

/** Section heading used down the page. */
export function SectionHeading({
  id,
  children,
  className
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`m-0 scroll-mt-20 font-display text-[22px] font-bold tracking-tight text-sand-900 sm:text-[32px] ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}

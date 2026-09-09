"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

/**
 * The one header across the site.
 *
 * Carries the UNITAR 35 lockup, the main navigation, and — on the two
 * orientation pages only — the language toggle. Everything is derived from the
 * current path so a page just renders <SiteHeader /> with no props.
 */

const NAV = [
  { href: "/", label: "Orientation" },
  { href: "/starter-kit", label: "Starter Kit" },
  { href: "/newsletter", label: "Newsletter" }
  // PTPTN is held back until booking opens. To put it back, restore:
  //   { href: "/ptptn", label: "PTPTN" }
  // The page itself stays live at /ptptn and keeps its BM/EN toggle either way.
];

/**
 * Pages that exist in both languages get a toggle to their counterpart.
 * Everything else on the site is English only.
 */
const LANGUAGE_PAIR: Record<string, { href: string; label: string }> = {
  "/": { href: "/eng", label: "EN" },
  "/eng": { href: "/", label: "BM" },
  "/ptptn": { href: "/ptptn/eng", label: "EN" },
  "/ptptn/eng": { href: "/ptptn", label: "BM" }
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname === "/eng";
  // Campus editions live under /newsletter/<campus>, and PTPTN has an /eng
  // twin — both should light up their parent nav item.
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const language = LANGUAGE_PAIR[pathname];

  return (
    <header className="sticky top-0 z-50 border-b border-sand-300/70 bg-sand-50/90 backdrop-blur supports-[backdrop-filter]:bg-sand-50/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo_br35.png"
            width={2250}
            height={483}
            alt="UNITAR — 35 Bangkit Bersama"
            priority
            className="h-7 w-auto object-contain sm:h-8"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-semibold transition-colors ${
                isActive(pathname, item.href)
                  ? "bg-sand-100 text-unitar-orange-ink"
                  : "text-sand-800 hover:text-sand-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {language && (
            <Link
              href={language.href}
              className="flex min-h-[44px] min-w-[48px] items-center justify-center rounded-full border border-sand-400 px-4 text-[13.5px] font-semibold text-unitar-orange-ink hover:bg-sand-100"
            >
              {language.label}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-nav-mobile"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-400 text-sand-900 hover:bg-sand-100 md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="site-nav-mobile"
          aria-label="Main"
          className="border-t border-sand-300/70 px-5 pb-4 pt-2 md:hidden"
        >
          <ul className="m-0 flex list-none flex-col p-0">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`flex min-h-[48px] items-center rounded-xl px-3 text-[15px] font-semibold transition-colors ${
                    isActive(pathname, item.href)
                      ? "bg-sand-100 text-unitar-orange-ink"
                      : "text-sand-800 hover:bg-sand-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

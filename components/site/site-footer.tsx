import Image from "next/image";
import Link from "next/link";

/**
 * Shared site footer. `note` carries any page-specific small print, such as
 * the starter kit's availability caveat.
 */
export function SiteFooter({ note }: { note?: string }) {
  return (
    <footer className="border-t border-sand-300 bg-sand-50 px-5 py-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo_unitar.png"
            alt=""
            width={1080}
            height={1080}
            className="h-8 w-8 rounded-md object-contain"
          />
          <p className="m-0 text-xs text-sand-700">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://www.unitar.my"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-unitar-orange-ink hover:underline"
            >
              UNITAR International University
            </Link>
            . All rights reserved.
          </p>
        </div>
        {note && (
          <p className="m-0 text-xs text-sand-600 sm:text-right">{note}</p>
        )}
      </div>
    </footer>
  );
}

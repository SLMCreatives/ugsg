import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo_unitar.png"
            alt="UNITAR International University"
            width={36}
            height={36}
            className="rounded-md"
          />
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://www.unitar.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#126595] hover:text-[#FF8000] font-medium transition-colors"
            >
              UNITAR International University
            </Link>
            . All rights reserved.
          </p>
        </div>
        <p className="text-gray-400 text-xs text-center md:text-right">
          For registered students only. Starter kit subject to availability.
        </p>
      </div>
    </footer>
  );
}

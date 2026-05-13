import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur ">
      <div className="max-w-7xl mx-auto flex h-16 items-center px-8">
        <Link href="/">
          <Image
            src="/logo_br35.png"
            width={100}
            height={100}
            alt="UNITAR Logo"
            className="w-52 h-24 rounded-full object-contain -ml-4"
            priority
          />
        </Link>
        <span className="sr-only">UNITAR International University</span>
      </div>
    </header>
  );
}

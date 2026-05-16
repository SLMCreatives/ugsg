import { HelpForm } from "@/components/help-form";
import Image from "next/image";
import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-8 mx-auto">
          <div className="flex items-center">
            <Link href="/help">
              <Image
                src="/logo_unitar.png"
                width={40}
                height={40}
                alt="UNITAR Logo"
                className="w-36 h-24 rounded-full object-cover -ml-4"
              />
            </Link>
            <p>SST Help Request</p>
          </div>
        </div>
      </header>

      <section className="py-16 px-4 text-center">
        <div className="max-w-lg mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
            Need Help from SST?
          </h1>
          <p className="text-muted-foreground text-balance">
            Fill in the form below and one of our Student Success Team advisors
            will reach out to you as soon as possible.
          </p>
        </div>
        <HelpForm />
      </section>

      <footer className="py-8 px-4 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          Student Success Team @ UNITAR International University.{" "}
          <Link href="mailto:sst@unitar.my" className="underline">
            sst@unitar.my
          </Link>
        </p>
      </footer>
    </main>
  );
}

import Link from "next/link";

import { HeroSectionBM } from "@/components/hero-section-bm";
import { SessionInfoBM } from "@/components/session-info-bm";
import { BookingSectionBM } from "@/components/booking-section-bm";

export default function PTPTNPageBM() {
  return (
    <>
      <HeroSectionBM />
      <SessionInfoBM />
      <BookingSectionBM />

      <section className="px-5 pb-9 pt-4 lg:px-10 lg:pb-14">
        <div className="mx-auto max-w-6xl">
          <p className="m-0 text-center text-[13px] leading-relaxed text-sand-700">
            Satu inisiatif oleh Student Success Team @ UNITAR International
            University. Untuk sebarang pertanyaan, sila hubungi kami di{" "}
            <Link
              href="mailto:sst@unitar.my"
              className="font-semibold text-unitar-orange-ink hover:underline"
            >
              sst@unitar.my
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

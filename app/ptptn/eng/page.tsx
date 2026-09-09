import Link from "next/link";

import { HeroSection } from "@/components/hero-section";
import { SessionInfo } from "@/components/session-info";
import { BookingSection } from "@/components/booking-section";

export default function PTPTNPageEN() {
  return (
    <>
      <HeroSection />
      <SessionInfo />
      <BookingSection />

      <section className="px-5 pb-9 pt-4 lg:px-10 lg:pb-14">
        <div className="mx-auto max-w-6xl">
          <p className="m-0 text-center text-[13px] leading-relaxed text-sand-700">
            An initiative by the Student Success Team @ UNITAR International
            University. For any enquiries, please contact us at{" "}
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

"use client";

import { PartyPopper, Clock, Target } from "lucide-react";

import { BookingForm } from "./booking-form";

export function BookingSection() {
  return (
    <section id="booking" className="scroll-mt-20 px-5 pt-9 lg:px-10 lg:pt-14">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-[22px] border border-sand-300 bg-white sm:rounded-[30px]">
          <div className="flex flex-col items-center gap-3 bg-sand-100 px-5 py-8 text-center sm:px-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-unitar-orange">
              <PartyPopper className="h-7 w-7 text-white" aria-hidden="true" />
            </span>
            <h2 className="m-0 font-display text-[24px] font-bold tracking-tight text-sand-900 sm:text-[32px]">
              Book your slot
            </h2>
            <p className="m-0 max-w-md text-[14.5px] leading-relaxed text-sand-800">
              Pick a time that works for you, and let us make sure your
              application is 100% error-free.
            </p>
          </div>

          <div className="flex flex-col gap-6 p-5 sm:p-8">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-sand-300 bg-sand-50 p-4">
                <Clock
                  className="mt-0.5 h-6 w-6 shrink-0 text-unitar-orange-ink"
                  aria-hidden="true"
                />
                <div>
                  <p className="m-0 font-display text-[15px] font-bold text-sand-900">
                    What to expect
                  </p>
                  <p className="m-0 mt-1 text-[13px] leading-relaxed text-sand-800">
                    A 30-minute, 1-to-1 session where we walk you through the
                    online portal step by step.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-sand-300 bg-sand-50 p-4">
                <Target
                  className="mt-0.5 h-6 w-6 shrink-0 text-unitar-orange-ink"
                  aria-hidden="true"
                />
                <div>
                  <p className="m-0 font-display text-[15px] font-bold text-sand-900">
                    The goal
                  </p>
                  <p className="m-0 mt-1 text-[13px] leading-relaxed text-sand-800">
                    Submit your application correctly the very first time.
                  </p>
                </div>
              </div>
            </div>

            <BookingForm />

            <p className="m-0 text-center text-xs text-sand-700">
              We look forward to helping you secure your PTPTN loan!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

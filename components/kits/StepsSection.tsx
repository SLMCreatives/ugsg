import { ClipboardCheck, MapPin, PackageCheck } from "lucide-react";

import { COLLECTION_RANGE } from "@/lib/starter-kit-dates";

/**
 * The three steps between wanting a starter pack and holding one. Sits above
 * the form, so "the form below" reads correctly.
 */
const steps = [
  {
    icon: ClipboardCheck,
    title: "Confirm your pack",
    description:
      "Fill in the form below to confirm that you want to receive your starter pack."
  },
  {
    icon: MapPin,
    title: "Pick your campus",
    description:
      "Choose the UNITAR campus closest to you. We will send your starter pack there."
  },
  {
    icon: PackageCheck,
    title: "Collect it",
    description: `Pick it up at the campus you chose. The collection period runs from ${COLLECTION_RANGE}.`
  }
];

export default function StepsSection() {
  return (
    <section className="px-5 pt-9 lg:px-10 lg:pt-14">
      <div className="mx-auto max-w-6xl">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
          How it works
        </p>
        <h2 className="m-0 mt-1.5 font-display text-[22px] font-bold tracking-tight text-sand-900 sm:text-[32px]">
          Three steps to your pack
        </h2>

        <ol className="m-0 mt-5 grid list-none grid-cols-1 gap-4 p-0 sm:mt-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className="relative flex flex-col gap-3 rounded-[18px] border border-sand-300 bg-white p-5 sm:p-6"
            >
              {/* The rail joins the cards on desktop; it has nowhere to go
                  after the last one, or in a single column. */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-full top-[42px] hidden h-[2px] w-4 bg-sand-400/70 md:block"
                />
              )}

              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-unitar-orange font-display text-[17px] font-bold text-white">
                  {index + 1}
                </span>
                <Icon
                  className="h-[22px] w-[22px] text-unitar-orange-ink opacity-80"
                  aria-hidden="true"
                />
              </div>

              <h3 className="m-0 font-display text-base font-bold leading-snug text-sand-900 sm:text-[17px]">
                {title}
              </h3>
              <p className="m-0 text-[13.5px] leading-relaxed text-sand-800">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

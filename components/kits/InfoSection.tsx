import type { LucideIcon } from "lucide-react";
import { Mail, Ticket, Shirt, BookOpen, BadgeCheck, Layers } from "lucide-react";

const kitContents: {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional small print, pinned to the foot of the card. */
  note?: string;
}[] = [
  {
    icon: Shirt,
    title: "UNITAR T-Shirt",
    description:
      "Branded tee to rep your uni from day one — available in sizes S to 3XL."
  },
  {
    icon: BookOpen,
    title: "Notebook",
    description:
      "Branded UNITAR notebook to keep your notes organised throughout your studies."
  },
  {
    icon: Layers,
    title: "Sticker Pad",
    description:
      "A fun sticker pad to personalise your space and show off your UNITAR spirit."
  },
  {
    icon: BadgeCheck,
    title: "Student Lanyard",
    description:
      "Carry your essentials with the UNITAR lanyard — access card, keys, event passes, anything. Keep them close and never lose them again.",
    note: "*Fully online students receive a Digital Matric Card on request."
  }
];

export default function InfoSection() {
  return (
    <>
      {/* What's included */}
      <section className="px-5 pt-9 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
            Inside the pack
          </p>
          <h2 className="m-0 mt-1.5 font-display text-[22px] font-bold tracking-tight text-sand-900 sm:text-[32px]">
            What&apos;s in your starter kit?
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
            {kitContents.map(({ icon: Icon, title, description, note }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-[18px] border border-sand-300 bg-white p-5 sm:p-6"
              >
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-[#E7F0F6]">
                  <Icon className="h-6 w-6 text-unitar-blue" aria-hidden="true" />
                </span>
                <h3 className="m-0 font-display text-base font-bold text-sand-900 sm:text-[17px]">
                  {title}
                </h3>
                <p className="m-0 text-[13.5px] leading-relaxed text-sand-800">
                  {description}
                </p>
                {note && (
                  <p className="m-0 mt-auto pt-1 text-[12px] leading-snug text-sand-700">
                    {note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need help */}
      <section className="px-5 pb-9 pt-9 lg:px-10 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 rounded-[22px] bg-unitar-blue p-6 sm:rounded-[30px] sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange">
                Help &amp; support
              </span>
              <h2 className="m-0 font-display text-[23px] font-bold leading-tight tracking-tight text-white sm:text-[34px]">
                Questions about your pack?
              </h2>
              <p className="m-0 max-w-md text-[14.5px] leading-relaxed text-[#C4DAE8] sm:text-base">
                Either route reaches us — pick whichever is easier for you.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="flex min-h-[44px] items-start gap-3 rounded-[14px] bg-white/10 p-4">
                <Ticket
                  className="mt-0.5 h-5 w-5 shrink-0 text-unitar-orange"
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-semibold text-white">
                    Raise a support ticket
                  </span>
                  <span className="text-xs leading-snug text-[#A9CBE0]">
                    Use the One Stop Centre (OSC) for any query about your starter
                    kit registration.
                  </span>
                </span>
              </div>

              <a
                href="mailto:enquiries@unitar.my"
                className="flex min-h-[44px] items-start gap-3 rounded-[14px] bg-white/10 p-4 transition-colors hover:bg-white/[0.16]"
              >
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-unitar-orange"
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-0.5">
                  <span className="break-all text-[14px] font-semibold text-white">
                    enquiries@unitar.my
                  </span>
                  <span className="text-xs leading-snug text-[#A9CBE0]">
                    Email us with your questions and enquiries.
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

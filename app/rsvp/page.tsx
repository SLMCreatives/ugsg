import Image from "next/image";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { RsvpForm } from "@/components/rsvp-form";
import { EVENT } from "@/lib/event";

export const metadata = {
  title: `${EVENT.name} | UNITAR RSVP`,
  description: EVENT.subtitle
};

const heroStats = [
  { label: "Date", value: EVENT.date },
  { label: "Time", value: EVENT.time },
  { label: "Venue", value: EVENT.venue }
];

export default function RsvpPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] bg-[radial-gradient(circle_at_top_right,rgba(240,138,29,0.10),transparent_28rem),linear-gradient(180deg,#eef4f8_0,#f7f8fa_36rem,#f4f6f8_100%)] text-[#25313a]">
      <main className="w-[min(1180px,100%-22px)] sm:w-[min(1180px,100%-32px)] mx-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-6 py-4 sm:py-6">
          <Link href="/">
            <Image
              src="/logo_unitar_wordmark.png"
              width={888}
              height={255}
              alt="UNITAR International University"
              className="h-11 sm:h-14 lg:h-16 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-unitar-blue/[0.13] bg-white/[0.78] px-3.5 py-2.5 text-[13px] font-bold text-unitar-blue backdrop-blur">
            {EVENT.audience}
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-gradient-to-br from-unitar-blue via-unitar-blue-light to-unitar-blue-dark text-white shadow-[0_18px_50px_rgba(14,74,115,0.12)]">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-[130px] -top-[150px] h-[360px] w-[360px] rounded-full bg-white/[0.08]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[150px] -bottom-[170px] h-[260px] w-[260px] rounded-full bg-unitar-orange/[0.18]"
          />

          <div className="relative z-10 grid items-center gap-8 lg:gap-11 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-14">
            <div>
              <span className="mb-4 inline-block rounded-full bg-unitar-orange px-[15px] py-[7px] text-xs font-extrabold uppercase tracking-[1.25px]">
                {EVENT.eyebrow}
              </span>

              <h1 className="m-0 text-[43px] sm:text-[clamp(42px,6vw,72px)] font-bold leading-[1.02] tracking-[-1.2px] sm:tracking-[-2px]">
                {EVENT.name}
              </h1>

              <h2 className="mt-3.5 text-[21px] sm:text-[clamp(20px,2.7vw,30px)] font-semibold leading-[1.25] text-[#dcecf7]">
                {EVENT.subtitle}
              </h2>

              <p className="mt-[22px] max-w-[720px] text-[17px] text-[#e7f1f8]">
                A special session for{" "}
                <strong className="text-white">
                  UNITAR Foundation and Diploma graduates
                </strong>{" "}
                to hear directly from Bachelor&apos;s Programme Leaders,
                understand your available progression options and ask the
                questions you need answered before making your decision.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#rsvp"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-[10px] bg-unitar-orange px-[22px] font-extrabold text-white shadow-[0_10px_24px_rgba(240,138,29,0.25)] transition hover:-translate-y-px"
                >
                  RSVP My Slot
                </a>
                <a
                  href="#agenda"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-[10px] border border-white/25 bg-white/10 px-[22px] font-extrabold text-white transition hover:-translate-y-px"
                >
                  View Agenda
                </a>
              </div>

              <p className="mt-3.5 text-[13px] font-bold text-[#f8c887]">
                RSVP is required — the {EVENT.platform} link will be sent to
                your registered email.
              </p>
            </div>

            <dl className="grid gap-3.5 sm:grid-cols-3 lg:grid-cols-1">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.16] bg-white/[0.09] px-5 py-[19px] backdrop-blur"
                >
                  <dt className="mb-[3px] text-[11px] font-extrabold uppercase tracking-[1.3px] text-[#b9d5e6]">
                    {stat.label}
                  </dt>
                  <dd className="text-[17px] font-bold leading-[1.35]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Why attend */}
        <section className="pt-14 sm:pt-[78px]">
          <p className="mb-[7px] text-xs font-extrabold uppercase tracking-[1.6px] text-unitar-orange">
            Why You Should Attend
          </p>
          <h2 className="m-0 max-w-[780px] text-[34px] sm:text-[clamp(30px,4vw,46px)] font-bold leading-[1.12] tracking-[-1px] text-unitar-blue">
            Get the latest programme information directly from the people who
            lead it.
          </h2>
          <p className="mt-4 max-w-[780px] text-[17px] text-[#667783]">
            This is your opportunity to explore your Bachelor&apos;s pathway
            with more context than a brochure can give you.
          </p>

          <div className="mt-[30px] grid gap-[18px] md:grid-cols-3">
            {EVENT.benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[18px] border border-[#dce6ed] bg-white p-[26px] shadow-[0_8px_24px_rgba(14,74,115,0.05)] md:min-h-[230px]"
              >
                <div
                  aria-hidden
                  className="mb-[19px] grid h-[46px] w-[46px] place-items-center rounded-xl bg-[#eaf1f6] text-[23px]"
                >
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold leading-[1.3] text-unitar-blue">
                  {benefit.title}
                </h3>
                <p className="m-0 text-[15px] text-[#667783]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>

          {/* Offers */}
          <div className="mt-[34px] rounded-[22px] bg-gradient-to-br from-[#132c40] to-unitar-blue p-6 sm:p-8 text-white shadow-[0_18px_50px_rgba(14,74,115,0.12)]">
            <div className="mb-[22px]">
              <p className="mb-[7px] text-xs font-extrabold uppercase tracking-[1.6px] text-unitar-orange">
                Your September Progression Offer
              </p>
              <h2 className="m-0 max-w-[690px] text-[26px] sm:text-[31px] font-bold leading-[1.18]">
                There&apos;s more than one reason to progress now.
              </h2>
              <p className="mt-2 text-[#cfe1ec]">
                Hear the full details during the session and understand how each
                benefit applies to you.
              </p>
            </div>

            <div className="grid gap-3.5 md:grid-cols-3">
              {EVENT.offers.map((offer) => (
                <div
                  key={offer.title}
                  className="rounded-[15px] border border-white/[0.12] bg-white/[0.07] p-[22px] md:min-h-[170px]"
                >
                  <strong
                    className={`mb-[7px] block text-[22px] leading-[1.2] ${
                      offer.accent ? "text-[#f7bd73]" : "text-white"
                    }`}
                  >
                    {offer.title}
                  </strong>
                  <span className="text-sm text-[#d5e6f0]">
                    {offer.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="scroll-mt-8 pt-14 sm:pt-[78px]">
          <p className="mb-[7px] text-xs font-extrabold uppercase tracking-[1.6px] text-unitar-orange">
            60-Minute Session
          </p>
          <h2 className="m-0 max-w-[780px] text-[34px] sm:text-[clamp(30px,4vw,46px)] font-bold leading-[1.12] tracking-[-1px] text-unitar-blue">
            What will happen during {EVENT.name}?
          </h2>

          <div className="mt-[30px] grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[18px] border border-[#f4d2aa] bg-[#fff4e8] p-7">
              <h3 className="mb-2 text-2xl font-bold text-[#9a570d]">
                Come with your questions.
              </h3>
              <p className="m-0 text-[#6b4a22]">
                The breakout and Q&amp;A are designed to help you make a more
                informed choice. You do not need to have decided on your
                programme before attending.
              </p>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-[#dce6ed] bg-white shadow-[0_8px_24px_rgba(14,74,115,0.05)]">
              {EVENT.agenda.map((item, index) => (
                <div
                  key={item.title}
                  className={`grid grid-cols-[88px_1fr] ${
                    index < EVENT.agenda.length - 1
                      ? "border-b border-[#dce6ed]"
                      : ""
                  }`}
                >
                  <div className="bg-[#eaf1f6] px-3.5 py-[22px] text-center text-2xl font-black leading-none text-unitar-blue">
                    {item.minutes}
                    <span className="mt-[5px] block text-[10px] uppercase tracking-[1px]">
                      mins
                    </span>
                  </div>
                  <div className="px-[22px] py-5">
                    <strong className="block text-[17px] text-unitar-blue">
                      {item.title}
                    </strong>
                    <span className="mt-1 block text-sm text-[#667783]">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Giveaway */}
          <div className="mt-[34px] grid items-center gap-[22px] rounded-[22px] bg-gradient-to-br from-[#171e27] to-[#27394d] p-6 sm:p-[34px] text-white md:grid-cols-[auto_1fr]">
            <div
              aria-hidden
              className="grid h-[84px] w-[84px] place-items-center rounded-[18px] bg-white/[0.08] text-[44px]"
            >
              💻
            </div>
            <div>
              <h3 className="mb-[7px] text-[28px] font-bold leading-[1.2]">
                Secure your place at UNITAR this September.
              </h3>
              <p className="m-0 text-[#d7e1e8]">
                Progress into the September intake and you also stand a chance
                to be{" "}
                <strong className="text-[#f7bd73]">
                  1 of 350 students to win a MacBook Neo.
                </strong>{" "}
                Campaign eligibility and terms apply.
              </p>
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="scroll-mt-8 pb-[88px] pt-14 sm:pt-[78px]">
          <div className="grid overflow-hidden rounded-[26px] border border-[#dce6ed] bg-white shadow-[0_18px_50px_rgba(14,74,115,0.12)] lg:grid-cols-[0.82fr_1.18fr]">
            <div className="bg-gradient-to-b from-unitar-blue to-unitar-blue-dark p-7 sm:p-9 lg:p-11 text-white">
              <p className="mb-[7px] text-xs font-extrabold uppercase tracking-[1.6px] text-[#f7bd73]">
                RSVP Your Slot
              </p>
              <h2 className="m-0 text-[31px] lg:text-4xl font-bold leading-[1.15]">
                Reserve your place and get the {EVENT.platform} link.
              </h2>
              <p className="mt-3.5 text-[#dceaf3]">
                Complete the form and we&apos;ll use your details to register
                your attendance for {EVENT.name}. The joining link is sent to
                the email address you provide below.
              </p>

              <ul className="mt-[26px] list-none space-y-0 p-0">
                {EVENT.rsvpChecklist.map((item) => (
                  <li
                    key={item}
                    className="relative pb-[13px] pl-[30px] text-sm text-[#edf5fa]"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 grid h-5 w-5 place-items-center rounded-full bg-unitar-orange/[0.18] text-xs font-black text-[#f8bd76]"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {EVENT.rsvpOpen ? (
              <RsvpForm />
            ) : (
              <div className="p-8 sm:p-10 text-center">
                <XCircle className="mx-auto mb-4 h-12 w-12 text-[#9aa8b1]" />
                <h3 className="mb-2 text-lg font-bold text-unitar-blue">
                  RSVPs are closed
                </h3>
                <p className="text-[#667783]">
                  Registration for this event has closed. Email us at{" "}
                  <Link href="mailto:sst@unitar.my" className="underline">
                    sst@unitar.my
                  </Link>{" "}
                  if you still have questions.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="px-4 pb-[38px] pt-[26px] text-center text-xs leading-relaxed text-[#70808b]">
        <strong className="text-unitar-blue">
          UNITAR International University
        </strong>
        <br />
        Student Success Team (SST) &nbsp;•&nbsp; September 2026 Intake
        <br />
        Terms and conditions apply to discounts, credit transfer, fast-track
        applications and the MacBook Neo campaign.
      </footer>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Calendar, Package, Clock } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "../ui/carousel";
import {
  COLLECTION_RANGE_SHORT,
  REGISTRATION_OPENS_LABEL,
  REGISTRATION_RANGE_SHORT,
  daysUntilClose,
  registrationStatus,
  type RegistrationStatus
} from "@/lib/starter-kit-dates";

const carouselImages = [
  "/starter-kit/pack/1.png",
  "/starter-kit/pack/2.png",
  "/starter-kit/pack/3.png",
  "/starter-kit/pack/4.png"
];

const kitItems = ["UNITAR T-Shirt", "Notebook", "Sticker Pad", "Student Lanyard"];

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [daysLeft, setDaysLeft] = useState(daysUntilClose());
  const [status, setStatus] = useState<RegistrationStatus>(registrationStatus());

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    const tick = () => {
      setDaysLeft(daysUntilClose());
      setStatus(registrationStatus());
    };
    tick();
    const timer = setInterval(tick, 60_000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToForm = () => {
    const formSection = document.getElementById("form-section");
    if (!formSection) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    formSection.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  const autoplay = useMemo(() => Autoplay({ delay: 3000 }) as any, []);

  return (
    <section className="px-5 pt-3 lg:px-10 lg:pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-[22px] bg-sand-100 sm:rounded-[30px] lg:grid-cols-[1.05fr_0.95fr]">
          {/* Content */}
          <div className="flex flex-col gap-5 p-6 sm:gap-6 sm:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-unitar-orange px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
                100% Free
              </span>
              <span className="text-[13.5px] text-sand-800">
                For enrolled online students only
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="m-0 font-display text-[33px] font-bold leading-[1.08] tracking-tight text-sand-900 sm:text-[52px]">
                Your student life
                <br />
                <span className="text-unitar-orange-ink">starts here.</span>
              </h1>
              <p className="m-0 max-w-md text-[15px] leading-relaxed text-sand-800 sm:text-[17.5px]">
                Grab your{" "}
                <span className="font-bold text-sand-900">
                  free UNITAR Starter Pack
                </span>{" "}
                — loaded with merch to rep your uni from day one.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
                What&apos;s inside
              </p>
              <div className="flex flex-wrap gap-2">
                {kitItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sand-300 bg-white px-4 py-1.5 text-[13.5px] text-sand-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid max-w-md grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5 rounded-2xl bg-white p-4">
                <p className="m-0 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sand-700">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Register
                </p>
                <p className="m-0 font-display text-[15px] font-bold text-sand-900">
                  {REGISTRATION_RANGE_SHORT}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 rounded-2xl bg-white p-4">
                <p className="m-0 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sand-700">
                  <Package className="h-3.5 w-3.5" aria-hidden="true" />
                  Collection
                </p>
                <p className="m-0 font-display text-[15px] font-bold text-sand-900">
                  {COLLECTION_RANGE_SHORT}
                </p>
              </div>
            </div>

            <div className="flex max-w-md flex-col gap-3">
              <button
                type="button"
                onClick={handleScrollToForm}
                className="group flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-unitar-orange px-7 text-base font-bold text-white transition-colors hover:bg-unitar-orange-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-unitar-orange-ink"
              >
                Claim my Starter Pack
                <ArrowRight
                  className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              {status === "upcoming" && (
                <p className="m-0 flex items-center gap-1.5 text-[13.5px] text-unitar-orange-ink">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    Registration opens{" "}
                    <span className="font-bold">{REGISTRATION_OPENS_LABEL}</span>
                  </span>
                </p>
              )}
              {status === "open" && daysLeft > 0 && (
                <p className="m-0 flex items-center gap-1.5 text-[13.5px] text-unitar-orange-ink">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="font-bold">
                      {daysLeft} day{daysLeft !== 1 ? "s" : ""}
                    </span>{" "}
                    left to register
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Pack carousel */}
          <div className="order-first flex items-center justify-center bg-sand-200 p-6 sm:p-10 lg:order-last">
            <div className="w-full max-w-sm">
              <Carousel
                setApi={setApi}
                plugins={[autoplay]}
                opts={{ loop: true, align: "center" }}
              >
                <CarouselContent>
                  {carouselImages.map((src, index) => (
                    <CarouselItem key={src}>
                      <Image
                        src={src}
                        alt={`Starter kit item ${index + 1}`}
                        width={1080}
                        height={1080}
                        className="rounded-2xl object-cover"
                        priority={index === 0}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="mt-4 flex justify-center gap-2">
                {carouselImages.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? "w-6 bg-unitar-orange"
                        : "w-2 bg-sand-400 hover:bg-sand-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

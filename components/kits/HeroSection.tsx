"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useRef, useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";

const carouselImages = [
  "/starter-kit/pack/1.png",
  "/starter-kit/pack/2.png",
  "/starter-kit/pack/3.png",
  "/starter-kit/pack/4.png"
];

export default function HeroSection() {
  const handleScrollToForm = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const autoplay = useMemo(() => Autoplay({ delay: 3000 }) as any, []);

  return (
    <section className="dark bg-gradient-to-b from-orange-200 via-[#e5f5ff] to-white dark:from-gray-900 dark:to-gray-950 py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left - Image */}
        <div className="flex justify-center items-center order-1 md:order-1">
          <div className="relative w-full max-w-md aspect-square">
            <Carousel
              plugins={[autoplay]}
              opts={{
                loop: true,
                align: "center"
              }}
            >
              <CarouselContent>
                {carouselImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={src}
                      alt={`Starter Kit Item ${index + 1}`}
                      width={1080}
                      height={1080}
                      className="object-cover"
                      priority
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* <Image
              src="/starter-kit/merch-promo.jpg"
              alt="Starter Kit Package"
              fill
              className="object-cover rounded-lg shadow-2xl"
              priority
            /> */}
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex flex-col justify-center gap-6 order-1 md:order-2">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              Claim Your FREE
            </h1>
            <p className="text-[#FF8000] text-5xl md:text-6xl font-black">
              UNITAR Starter Kit
            </p>
            <p className="text-xl ">
              Everything you need to get started with your online learning
              journey
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-sm text-slate-500 mb-1">
                📅 Registration Deadline
              </p>
              <p className="text-2xl font-bold">June 2, 2026</p>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-sm text-slate-500 mb-1">📦 Pick-Up Window</p>
              <p className="text-2xl font-bold">June 29 - July 30, 2026</p>
            </div>
          </div>

          <Button
            onClick={handleScrollToForm}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-6 text-lg rounded-lg w-full md:w-auto"
          >
            Register Now
          </Button>
        </div>
      </div>
    </section>
  );
}

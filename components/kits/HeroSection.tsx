"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Calendar, Package } from "lucide-react";

const carouselImages = [
  "/starter-kit/pack/1.png",
  "/starter-kit/pack/2.png",
  "/starter-kit/pack/3.png",
  "/starter-kit/pack/4.png"
];

const kitItems = ["UNITAR T-Shirt", "Notebook & Pen", "Student Lanyard"];

export default function HeroSection() {
  const handleScrollToForm = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const autoplay = useMemo(() => Autoplay({ delay: 3000 }) as any, []);

  return (
    <section className="relative overflow-hidden bg-[#0b1628] py-16 md:py-24 px-4">
      {/* Radial glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(255,128,0,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_80%,rgba(18,101,149,0.18),transparent)]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center items-center order-2 md:order-1">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-6 bg-gradient-to-br from-[#FF8000]/20 via-[#126595]/10 to-transparent rounded-3xl blur-2xl" />
            <div className="relative">
              <Carousel
                plugins={[autoplay]}
                opts={{ loop: true, align: "center" }}
              >
                <CarouselContent>
                  {carouselImages.map((src, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={src}
                        alt={`Starter Kit Item ${index + 1}`}
                        width={1080}
                        height={1080}
                        className="object-cover rounded-2xl"
                        priority
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-7 order-1 md:order-2 text-white">
          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="bg-[#FF8000] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              100% Free
            </span>
            <span className="text-slate-400 text-sm">For Registered Students Only</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-balance">
              Your Student Life
              <br />
              <span className="text-[#FF8000]">Starts Here.</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Grab your <span className="text-white font-semibold">FREE UNITAR Starter Pack</span> — loaded with merch to rep your uni from day one.
            </p>
          </div>

          {/* What's inside */}
          <div className="space-y-2">
            <p className="text-xs text-slate-500 uppercase tracking-widest">What&apos;s inside</p>
            <div className="flex flex-wrap gap-2">
              {kitItems.map((item) => (
                <span
                  key={item}
                  className="border border-white/15 bg-white/5 text-slate-200 text-sm rounded-full px-4 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
              <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Register By
              </p>
              <p className="text-base font-bold text-white">June 2, 2026</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
              <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                Pick Up
              </p>
              <p className="text-base font-bold text-white">Jun 29 – Jul 30</p>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleScrollToForm}
            className="bg-[#FF8000] hover:bg-[#e07000] text-white font-bold py-6 text-lg rounded-xl w-full md:w-auto flex items-center gap-2 group transition-colors"
          >
            Claim My Starter Pack
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  Mail,
  ScreenShare,
  BadgeCheck,
  AlertTriangle,
  CalendarCheck
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stages = [
  {
    icon: Mail,
    label: "Before your session",
    title: "A reminder and a checklist",
    description:
      "You will receive an email reminder before your slot, together with a checklist so you can have everything ready before the call."
  },
  {
    icon: ScreenShare,
    label: "During your session",
    title: "We go through it together",
    description:
      "Join the Microsoft Teams call and share your screen with an SST officer. We walk you through the whole application, step by step, as you fill it in."
  },
  {
    icon: BadgeCheck,
    label: "After you submit",
    title: "Approval and accepting your offer",
    description:
      "We will show you when to expect your approval, and exactly how to accept your loan offer once it comes through."
  }
];

const mistakes = [
  {
    title: "The wrong intake date",
    detail: "Your intake month and year must match your offer letter exactly."
  },
  {
    title: "The wrong name of institution",
    detail: "Picking a similar-looking campus or the wrong UNITAR entry."
  },
  {
    title: "The wrong offer letter",
    detail: "Uploading an outdated letter, or one for a different programme."
  }
];

export function SessionInfo() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="session" className="py-20 px-4 bg-card scroll-mt-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-primary mb-3">
            About the session
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
            One session, so your application is right the first time
          </h2>
          <p className="text-muted-foreground text-base md:text-lg text-balance max-w-2xl mx-auto">
            Most PTPTN applications are rejected over small mistakes in the
            form. This free 1-to-1 session with the Student Success Team (SST)
            is here to make sure yours is not one of them.
          </p>
        </div>

        {/* Feature image */}
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm mb-12">
          <Image
            src="/ptptn/session-online.jpg"
            alt="A student joining an online guidance session on a laptop"
            width={1400}
            height={933}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full h-56 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="text-lg md:text-2xl font-semibold text-white text-balance">
              Share your screen. We guide you through it live.
            </p>
            <p className="text-sm md:text-base text-white/80 mt-2 text-balance">
              A 30-minute Microsoft Teams call, one-to-one with the Student
              Success Team.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="space-y-4 mb-12">
          {stages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <Card
                key={stage.label}
                className="relative overflow-hidden transition-shadow hover:shadow-md"
              >
                <span className="absolute left-0 inset-y-0 w-1 bg-primary" />
                <CardContent className="flex items-start gap-4 p-6 pl-7">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">
                        STEP {index + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        · {stage.label}
                      </span>
                    </div>
                    <p className="font-medium text-foreground text-balance">
                      {stage.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1.5 text-balance">
                      {stage.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Common mistakes */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
            <h3 className="text-xl font-semibold text-foreground">
              The mistakes we see most often
            </h3>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {mistakes.map((mistake) => (
              <Card
                key={mistake.title}
                className="border-destructive/30 bg-destructive/5"
              >
                <CardContent className="p-5">
                  <p className="font-medium text-foreground text-balance">
                    {mistake.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1.5 text-balance">
                    {mistake.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-4 text-balance">
            Any one of these can get your application rejected. We check all of
            them with you during the session.
          </p>
        </div>

        {/* Closing CTA */}
        <div className="p-8 rounded-2xl bg-accent/10 border border-accent/20 text-center">
          <p className="text-lg font-medium text-foreground text-balance mb-2">
            Booking is free and takes less than a minute.
          </p>
          <p className="text-muted-foreground text-balance mb-6">
            We strongly encourage every student to book a slot before applying.
          </p>
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="rounded-full px-8 py-6 text-base gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Your Slot
          </Button>
        </div>
      </div>
    </section>
  );
}

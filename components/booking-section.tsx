"use client";

import { PartyPopper, Clock, Target, Calendar, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingForm } from "./booking-form";

interface BookingSectionProps {
  isUnlocked: boolean;
}

export function BookingSection({ isUnlocked }: BookingSectionProps) {
  return (
    <section id="booking" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card
          className={`transition-all duration-500 ${
            isUnlocked
              ? "border-accent border-2 shadow-lg"
              : "opacity-60 grayscale"
          }`}
        >
          <CardHeader className="text-center pb-4">
            {isUnlocked ? (
              <>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <PartyPopper className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">
                  {"You're Ready for Guidance!"}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  It looks like you have everything prepared.{" "}
                  {"Let's make sure your application is 100% error-free."}
                </CardDescription>
              </>
            ) : (
              <>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl md:text-3xl text-muted-foreground">
                  Phase 3: Book Your Session
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Complete all steps above to unlock booking.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {isUnlocked ? (
              <div className="space-y-6">
                {/* What to expect */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <Clock className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">
                        What to expect
                      </p>
                      <p className="text-sm text-muted-foreground">
                        A 20-minute, 1-to-1 session where we walk you through
                        the online portal step-by-step.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <Target className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">The Goal</p>
                      <p className="text-sm text-muted-foreground">
                        Submit your application correctly the very first time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <BookingForm />

                <p className="text-center text-sm text-muted-foreground">
                  Spots are limited. Book your session today to secure your
                  place.
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="space-y-4">
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div
                        key={step}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Complete all 5 checklist steps to unlock booking.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

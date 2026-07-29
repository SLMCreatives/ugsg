"use client";

import { PartyPopper, Clock, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { BookingForm } from "./booking-form";

export function BookingSection() {
  return (
    <section id="booking" className="py-16 px-4 scroll-mt-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-primary border-2 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              {"Book Your Slot"}
            </CardTitle>
            <CardDescription className="text-base mt-2 text-balance">
              {"Pick a time that works for you and let's make sure your application is 100% error-free!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Clock className="w-8 h-8 text-primary mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">
                      What to Expect
                    </p>
                    <p className="text-sm text-muted-foreground text-balance">
                      A 30-minute, 1-to-1 session where we walk you through
                      the online portal step-by-step.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-4 rounded-lg bg-muted/50 justify-center">
                  <Target className="w-8 h-8 text-primary" />
                  <div className="pr-10">
                    <p className="font-medium text-foreground">The Goal</p>
                    <p className="text-sm text-muted-foreground text-balance">
                      Submit your application correctly the very first time.
                    </p>
                  </div>
                </div>
              </div>

              <BookingForm />

              <p className="text-center text-xs text-muted-foreground">
                We look forward to helping you secure your PTPTN loan!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

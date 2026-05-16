"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { BookingFormBM } from "./booking-form-bm";

interface BookingSectionProps {
  isUnlocked: boolean;
}

export function BookingSectionBM({ isUnlocked }: BookingSectionProps) {
  return (
    <section id="booking" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-primary border-2 shadow-lg">
          <CardHeader className="text-center pb-4" />
          <CardContent>
            <div className="space-y-6">
              <BookingFormBM />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

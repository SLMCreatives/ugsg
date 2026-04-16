"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";

interface SlotCount {
  [key: string]: number;
}

const AVAILABLE_DATES = [
  "Tuesday, 5 May 2026",
  "Wednesday, 6 May 2026",
  "Thursday, 7 May 2026",
  "Tuesday, 12 May 2026",
  "Wednesday, 13 May 2026",
  "Thursday, 14 May 2026"
];
const TIME_SLOTS = [
  { label: "Morning (10am - 12pm)", value: "morning" },
  { label: "Evening (3pm - 5pm)", value: "evening" }
];
const MAX_SUBMISSIONS_PER_SLOT = 6;

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [slotCounts, setSlotCounts] = useState<SlotCount>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Fetch slot counts on mount
  /*  useState(() => {
    fetchSlotCounts();
  }, []);

  const fetchSlotCounts = async () => {
    try {
      const response = await fetch('/api/booking/slot-counts');
      if (response.ok) {
        const data = await response.json();
        setSlotCounts(data.counts);
      }
    } catch (err) {
      console.log('[v0] Error fetching slot counts:', err);
    }
  }; */

  const validatePhone = (value: string) => {
    const phoneRegex = /^(\+?6?01)[0-9]{8,9}$/;
    const isValid = phoneRegex.test(value.replace(/\s/g, ""));

    if (!isValid && value.length > 0) {
      setPhoneError("Please enter a valid Malaysian phone number");
    } else {
      setPhoneError("");
    }

    setPhone(value);
  };

  const isSlotFull = (selectedDate: string, selectedTime: string) => {
    const slotKey = `${selectedDate}__${selectedTime}`;
    return (slotCounts[slotKey] || 0) >= MAX_SUBMISSIONS_PER_SLOT;
  };

  const getAvailableDates = () => {
    return AVAILABLE_DATES.filter((d) => {
      const hasFullSlots = TIME_SLOTS.every((t) => isSlotFull(d, t.value));
      return !hasFullSlots;
    });
  };

  const getAvailableTimeSlots = () => {
    return TIME_SLOTS.filter((t) => !isSlotFull(date, t.value));
  };

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
      setError("");
    } else if (step === 1) {
      setError("Please enter your name");
    } else if (step === 2 && phone.trim() && !phoneError) {
      setStep(3);
      setError("");
    } else if (step === 2) {
      setError("Please enter a valid phone number");
    } else if (step === 3 && date && timeSlot) {
      handleSubmit();
    }
  };

  
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/booking/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          date,
          timeSlot
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      setSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setName("");
        setPhone("");
        setDate("");
        setTimeSlot("");
        setStep(1);
        setSuccess(false);
        //fetchSlotCounts();
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center bg-white">
        <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-muted-foreground mb-4">
          Thank you for booking with us. We&apos;ll send you a confirmation
          email shortly.
        </p>
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-white">
      {/* Progress Indicator */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-accent" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Name */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What&apos;s your name?
            </h3>
            <Label htmlFor="name" className="text-foreground mb-2 block">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Step 2: Phone Number */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What&apos;s your phone number?
            </h3>
            <Label htmlFor="phone" className="text-foreground mb-2 block">
              Phone Number (Malaysia)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01234567890 or +60123456789"
              value={phone}
              onChange={(e) => validatePhone(e.target.value)}
              className="w-full"
              autoFocus
            />
            {phoneError && (
              <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {phoneError}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Choose your slot
          </h3>

          <div>
            <Label htmlFor="date" className="text-foreground mb-2 block">
              Date
            </Label>
            <select
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTimeSlot(""); // Reset time slot when date changes
              }}
              className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            >
              <option value="">Select a date</option>
              {getAvailableDates().map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {date && (
            <div>
              <Label htmlFor="time" className="text-foreground mb-2 block">
                Time Slot
              </Label>
              <select
                id="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Select a time</option>
                {getAvailableTimeSlots().map((t) => {
                  const slotKey = `${date}__${t.value}`;
                  const count = slotCounts[slotKey] || 0;
                  const remaining = MAX_SUBMISSIONS_PER_SLOT - count;
                  return (
                    <option key={t.value} value={t.value}>
                      {t.label} ({remaining} slots left)
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <Button
            onClick={() => {
              setStep(step - 1);
              setError("");
            }}
            variant="outline"
            className="flex-1"
          >
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={loading}
          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {loading ? "Submitting..." : step === 3 ? "Confirm Booking" : "Next"}
        </Button>
      </div>

      {/* Step Indicator Text */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Step {step} of 3
      </p>
    </Card>
  );
}

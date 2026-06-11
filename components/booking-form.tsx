"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";
import { SLOTS } from "@/lib/slots";
export { SLOTS };

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [bookingCounts, setBookingCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/slots")
      .then((r) => r.json())
      .then(setBookingCounts)
      .catch(() => {});
  }, []);

  const isSlotFull = (slotDate: string, slotTime: string) => {
    const def = SLOTS.find((s) => s.date === slotDate && s.time === slotTime);
    if (!def) return true;
    return (bookingCounts[`${slotDate}__${slotTime}`] || 0) >= def.slots;
  };

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const phoneRegex = /^(\+?6?01)[0-9]{8,9}$/;
    const isValid = phoneRegex.test(cleaned);

    if (!isValid && value.length > 0) {
      setPhoneError("Please enter a valid Malaysian phone number");
    } else {
      setPhoneError("");
    }

    setPhone(value);
  };

  const getAvailableDates = () => {
    return SLOTS.map((s) => s.date)
      .filter((v, i, a) => a.indexOf(v) === i)
      .filter((d) => SLOTS.some((s) => s.date === d && !isSlotFull(d, s.time)));
  };

  const getAvailableTimeSlots = () => {
    return SLOTS.filter((s) => s.date === date && !isSlotFull(date, s.time)).map(
      (s) => {
        const booked = bookingCounts[`${date}__${s.time}`] || 0;
        const remaining = s.slots - booked;
        return {
          label: `${s.time} (${remaining} slot${remaining === 1 ? "" : "s"} left)`,
          value: s.time
        };
      }
    );
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }
      setError("");
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!phone.trim() || phoneError) {
        setError("Please enter a valid phone number");
        return;
      }
      setError("");
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!date || !timeSlot) {
        setError("Please choose a date and time slot");
        return;
      }
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\s/g, "").trim(),
          date,
          timeSlot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const selectedTimeLabel = timeSlot;

    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center bg-white">
        <CheckCircle className="w-12 h-12 text-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Your Slot Has Been Booked!
        </h3>
        <p className="text-muted-foreground mb-4 text-balance">
          Thank you, {name}! <br></br> Your booking for{" "}
          <span className="font-bold">
            1-1 Step-by-Step PTPTN Application Session
          </span>{" "}
          has been confirmed. Please check your booking details below:
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-2 mb-6 items-center justify-end">
          <p className="text-muted-foreground text-balance text-sm text-right">
            Booking Date:
          </p>
          <Input
            className="text-sm text-foreground text-center w-full"
            readOnly
            value={`${date}`}
          />
          <p className="text-muted-foreground text-balance text-sm text-right">
            Booking Time:
          </p>
          <Input
            className="text-sm text-foreground text-center w-full"
            readOnly
            value={`${selectedTimeLabel}`}
          />
        </div>
        <p className="text-sm text-muted-foreground text-balance">
          We will contact you at{" "}
          <span className="font-bold">({phone})</span> to confirm your
          appointment and share the meeting link.
          <br></br>Please arrive at your designated slot time. If you need to
          reschedule, contact us at least 24 hours before the time.
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-white">
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What is your full name?
            </h3>
            <Label htmlFor="name" className="text-foreground mb-2 block">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Nur Farzana Binti Abdul Azizan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What is your phone number?
            </h3>
            <Label htmlFor="phone" className="text-foreground mb-2 block">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0123456789 or 60123456789"
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

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Choose your slot
          </h3>
          <p className="text-muted-foreground mb-2 text-sm">
            Select your preferred date and time. Please note that we have a
            limited number of slots per time period, so book early to secure
            your spot!
          </p>

          <div>
            <Label htmlFor="date" className="text-foreground mb-2 block">
              Date
            </Label>
            <select
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTimeSlot("");
              }}
              className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            >
              <option value="">Choose a date</option>
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
                Time
              </Label>
              <select
                id="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Choose a time</option>
                {getAvailableTimeSlots().map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <Button
            onClick={() => {
              setStep(step - 1);
              setError("");
            }}
            variant="outline"
            className="flex-1"
            type="button"
          >
            Back
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={loading}
          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
          type="button"
        >
          {loading ? "Submitting..." : step === 3 ? "Confirm Booking" : "Next"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Step {step} of 3
      </p>
    </Card>
  );
}

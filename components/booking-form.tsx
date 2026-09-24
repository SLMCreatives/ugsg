"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";
import { SLOTS, isSlotBookable } from "@/lib/slots";
export { SLOTS };

/**
 * Everything a student must already have before the session is worth booking.
 * Walked one at a time between the phone number and the slot picker, so nobody
 * takes a 30-minute slot they cannot use.
 */
type PrereqId = "bankIslam" | "sspn" | "myDigitalId" | "offerLetter";

const PREREQS: {
  id: PrereqId;
  question: string;
  body: string;
  /** Optional account number we collect while they are here. */
  account?: { label: string; placeholder: string; hint: string };
  /** Shown when they answer "not yet" — what to do about it. */
  help: string;
}[] = [
  {
    id: "bankIslam",
    question: "Do you already have a Bank Islam account?",
    body: "PTPTN disburses funding through a Bank Islam account, so this needs to be open before you apply.",
    account: {
      label: "Bank Islam account number",
      placeholder: "e.g. 12345678901234",
      hint: "Optional — share it if you have the number to hand."
    },
    help: "Open an account at any Bank Islam branch. Bring your IC and your UNITAR offer letter."
  },
  {
    id: "sspn",
    question: "Do you already have an SSPN Prime account?",
    body: "An SSPN Prime account is a PTPTN requirement. It can be opened online in a few minutes.",
    account: {
      label: "SSPN Prime account number",
      placeholder: "e.g. 1234567890",
      hint: "Optional — share it if you have the number to hand."
    },
    help: "Register at sspn.ptptn.gov.my or through the myPTPTN app. A minimum opening deposit of RM20 is enough."
  },
  {
    id: "myDigitalId",
    question: "Is your MyDigital ID activated?",
    body: "The PTPTN application verifies your identity through an active MyDigital ID.",
    help: "Download the MyDigital ID app, register with your IC and complete the face verification. Activation can take up to 24 hours."
  },
  {
    id: "offerLetter",
    question: "Do you have your UNITAR offer letter?",
    body: "A soft copy (PDF) is fine. You will upload it with your application and copy the details from it into the form, so make sure it is the current letter for your programme.",
    help: "The offer letter is sent to your personal email as a PDF. If you cannot find it, contact the Student Success Team at sst@unitar.my."
  }
];

const FIRST_PREREQ_STEP = 3;
const SLOT_STEP = FIRST_PREREQ_STEP + PREREQS.length;
const TOTAL_STEPS = SLOT_STEP;

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<Record<PrereqId, "yes" | "no">>>(
    {}
  );
  const [accounts, setAccounts] = useState<Partial<Record<PrereqId, string>>>({});
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
      .filter((d) => SLOTS.some((s) => s.date === d && !isSlotFull(d, s.time) && isSlotBookable(d)));
  };

  const getAvailableTimeSlots = () => {
    return SLOTS.filter((s) => s.date === date && !isSlotFull(date, s.time) && isSlotBookable(date)).map(
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

    if (step >= FIRST_PREREQ_STEP && step < SLOT_STEP) {
      const prereq = PREREQS[step - FIRST_PREREQ_STEP];
      if (answers[prereq.id] !== "yes") {
        setError("Please confirm this before continuing");
        return;
      }
      setError("");
      setStep(step + 1);
      return;
    }

    if (step === SLOT_STEP) {
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
          timeSlot,
          prerequisites: {
            bankIslam: answers.bankIslam === "yes",
            sspn: answers.sspn === "yes",
            myDigitalId: answers.myDigitalId === "yes",
            offerLetter: answers.offerLetter === "yes"
          },
          bankIslamAccount: (accounts.bankIslam ?? "").trim(),
          sspnAccount: (accounts.sspn ?? "").trim()
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
        <CheckCircle className="w-12 h-12 text-sand-900 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-sand-900 mb-2">
          Your Slot Has Been Booked!
        </h3>
        <p className="text-sand-800 mb-4 text-balance">
          Thank you, {name}! <br></br> Your booking for{" "}
          <span className="font-bold">
            1-1 Step-by-Step PTPTN Application Session
          </span>{" "}
          has been confirmed. Please check your booking details below:
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-2 mb-6 items-center justify-end">
          <p className="text-sand-800 text-balance text-sm text-right">
            Booking Date:
          </p>
          <Input
            className="text-sm text-sand-900 text-center w-full"
            readOnly
            value={`${date}`}
          />
          <p className="text-sand-800 text-balance text-sm text-right">
            Booking Time:
          </p>
          <Input
            className="text-sm text-sand-900 text-center w-full"
            readOnly
            value={`${selectedTimeLabel}`}
          />
        </div>
        <p className="text-sm text-sand-800 text-balance">
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
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-unitar-orange" : "bg-sand-300"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-sand-900 mb-4">
              What is your full name?
            </h3>
            <Label htmlFor="name" className="text-sand-900 mb-2 block">
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
            <h3 className="text-lg font-semibold text-sand-900 mb-4">
              What is your phone number?
            </h3>
            <Label htmlFor="phone" className="text-sand-900 mb-2 block">
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
              <p className="text-[#B3261E] text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {phoneError}
              </p>
            )}
          </div>
        </div>
      )}

      {step >= FIRST_PREREQ_STEP &&
        step < SLOT_STEP &&
        (() => {
          const prereq = PREREQS[step - FIRST_PREREQ_STEP];
          const answer = answers[prereq.id];

          return (
            <div className="space-y-4">
              <p className="m-0 text-[11.5px] font-bold uppercase tracking-[0.07em] text-unitar-orange-ink">
                Checklist {step - FIRST_PREREQ_STEP + 1} of {PREREQS.length}
              </p>
              <div>
                <h3 className="text-lg font-semibold text-sand-900 mb-2">
                  {prereq.question}
                </h3>
                <p className="m-0 text-sm leading-relaxed text-sand-800">
                  {prereq.body}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "yes", label: "Yes, I have this" },
                    { value: "no", label: "Not yet" }
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        [prereq.id]: option.value
                      }));
                      // Drop any number they typed if they change their mind.
                      if (option.value === "no") {
                        setAccounts((prev) => ({ ...prev, [prereq.id]: "" }));
                      }
                      setError("");
                    }}
                    aria-pressed={answer === option.value}
                    className={`flex min-h-[48px] items-center justify-center rounded-xl border-2 px-3 text-sm font-semibold transition-colors ${
                      answer === option.value
                        ? option.value === "yes"
                          ? "border-done bg-done-tint text-[#1F5A31]"
                          : "border-unitar-orange bg-[#FFF7ED] text-unitar-orange-ink"
                        : "border-sand-300 bg-white text-sand-800 hover:bg-sand-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {answer === "yes" && prereq.account && (
                <div>
                  <Label
                    htmlFor={`${prereq.id}-account`}
                    className="text-sand-900 mb-2 block"
                  >
                    {prereq.account.label}
                  </Label>
                  <Input
                    id={`${prereq.id}-account`}
                    type="text"
                    inputMode="numeric"
                    maxLength={30}
                    placeholder={prereq.account.placeholder}
                    value={accounts[prereq.id] ?? ""}
                    onChange={(e) =>
                      setAccounts((prev) => ({
                        ...prev,
                        [prereq.id]: e.target.value
                      }))
                    }
                    className="w-full"
                  />
                  <p className="m-0 mt-2 text-xs text-sand-700">
                    {prereq.account.hint}
                  </p>
                </div>
              )}

              {answer === "no" && (
                <div className="rounded-xl bg-[#FFF7ED] px-4 py-3.5">
                  <p className="m-0 text-[13px] font-bold text-[#8A5417]">
                    Sort this out first
                  </p>
                  <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#8A5417]">
                    {prereq.help}
                  </p>
                  <p className="m-0 mt-2 text-[13px] leading-relaxed text-[#8A5417]">
                    Come back and book your slot once it is ready — the session
                    needs all four.
                  </p>
                </div>
              )}
            </div>
          );
        })()}

      {step === SLOT_STEP && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-xl bg-done-tint px-4 py-3">
            <CheckCircle className="h-4 w-4 shrink-0 text-done" />
            <p className="m-0 text-[13px] font-semibold text-[#1F5A31]">
              All {PREREQS.length} requirements confirmed.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-sand-900 mb-4">
            Choose your slot
          </h3>
          <p className="text-sand-800 mb-2 text-sm">
            Select your preferred date and time. Please note that we have a
            limited number of slots per time period, so book early to secure
            your spot! Slots must be booked at least one day in advance.
          </p>

          <div>
            <Label htmlFor="date" className="text-sand-900 mb-2 block">
              Date
            </Label>
            <select
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTimeSlot("");
              }}
              className="w-full px-3 py-2 border border-sand-300 rounded-md bg-white text-sand-900 focus:outline-none focus:ring-2 focus:ring-unitar-orange"
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
              <Label htmlFor="time" className="text-sand-900 mb-2 block">
                Time
              </Label>
              <select
                id="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 border border-sand-300 rounded-md bg-white text-sand-900 focus:outline-none focus:ring-2 focus:ring-unitar-orange"
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
          <AlertCircle className="w-4 h-4 text-[#B3261E] flex-shrink-0" />
          <p className="text-sm text-[#B3261E]">{error}</p>
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
          {loading
            ? "Submitting..."
            : step === SLOT_STEP
            ? "Confirm Booking"
            : "Next"}
        </Button>
      </div>

      <p className="text-xs text-sand-800 text-center mt-4">
        Step {step} of {TOTAL_STEPS}
      </p>
    </Card>
  );
}

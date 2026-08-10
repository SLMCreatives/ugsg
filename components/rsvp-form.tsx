"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PROGRAMME_GROUPS, NOT_SURE_YET } from "@/lib/programmes";
import { EVENT } from "@/lib/event";

type Field = "name" | "email" | "phone" | "matric" | "programme";

const initialValues: Record<Field, string> = {
  name: "",
  email: "",
  phone: "",
  matric: "",
  programme: ""
};

const inputClass =
  "w-full min-h-[50px] px-3.5 rounded-[10px] border border-[#cfdbe2] bg-white text-[#24313a] placeholder:text-[#9aa8b1] outline-none transition focus:border-unitar-blue-light focus:ring-4 focus:ring-unitar-blue-light/10 disabled:opacity-60";

const labelClass = "text-[13px] font-extrabold text-[#34434d]";

export function RsvpForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState<typeof initialValues | null>(null);

  const setField = (field: Field, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (error) setError("");
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};

    if (!values.name.trim()) {
      next.name = "Please enter your full name";
    }

    const email = values.email.trim();
    if (!email) {
      next.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address";
    }

    const phone = values.phone.replace(/\s|-/g, "");
    if (!phone) {
      next.phone = "Please enter your phone number";
    } else if (!/^(\+?6?01)[0-9]{8,9}$/.test(phone)) {
      next.phone = "Please enter a valid Malaysian phone number";
    }

    const matric = values.matric.trim();
    if (!matric) {
      next.matric = "Please enter your matric number";
    } else if (!/^[A-Za-z0-9-]{5,20}$/.test(matric)) {
      next.matric = "Please check your matric number";
    }

    if (!values.programme) {
      next.programme = "Please select a programme, or choose “Not sure yet”";
    }

    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.replace(/\s|-/g, "").trim(),
        matric: values.matric.trim().toUpperCase(),
        programme: values.programme
      };

      const response = await fetch("/api/rsvp-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit your RSVP");
      }

      setConfirmed(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="p-8 md:p-10">
        <div className="rounded-xl border border-[#b9ddc8] bg-[#edf8f1] p-6 text-[#245c37]">
          <CheckCircle className="w-10 h-10 mb-3" />
          <p className="text-xl font-extrabold mb-1">RSVP received.</p>
          <p className="text-sm leading-relaxed">
            Thank you, {confirmed.name}! Your place at{" "}
            <strong>{EVENT.name}</strong> is reserved.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 text-sm">
          <dt className="text-[#7c8991]">Matric No.</dt>
          <dd className="font-semibold text-[#24313a]">{confirmed.matric}</dd>
          <dt className="text-[#7c8991]">Programme</dt>
          <dd className="font-semibold text-[#24313a]">
            {confirmed.programme}
          </dd>
          <dt className="text-[#7c8991]">Date</dt>
          <dd className="font-semibold text-[#24313a]">{EVENT.date}</dd>
          <dt className="text-[#7c8991]">Time</dt>
          <dd className="font-semibold text-[#24313a]">{EVENT.time}</dd>
        </dl>

        <p className="mt-6 text-sm text-[#667783] leading-relaxed">
          We will send the {EVENT.platform} joining link to{" "}
          <strong className="text-[#24313a]">{confirmed.email}</strong> before
          the session. See you there!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-7 sm:p-8 md:p-10"
    >
      <div className="grid gap-[18px] sm:grid-cols-2">
        {/* Full Name */}
        <div className="flex flex-col gap-[7px] sm:col-span-2">
          <label htmlFor="name" className={labelClass}>
            Full Name <span className="text-[#d86b00]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            className={inputClass}
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            disabled={loading}
          />
          {errors.name && (
            <p
              id="name-error"
              className="text-[#c0392b] text-xs flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-[#d86b00]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@email.com"
            className={inputClass}
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : "email-hint"}
            disabled={loading}
          />
          {errors.email ? (
            <p
              id="email-error"
              className="text-[#c0392b] text-xs flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errors.email}
            </p>
          ) : (
            <p id="email-hint" className="text-xs text-[#7b8992]">
              Your {EVENT.platform} link is sent here.
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="phone" className={labelClass}>
            Phone Number <span className="text-[#d86b00]">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 012-345 6789"
            className={inputClass}
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            disabled={loading}
          />
          {errors.phone && (
            <p
              id="phone-error"
              className="text-[#c0392b] text-xs flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Matric */}
        <div className="flex flex-col gap-[7px] sm:col-span-2">
          <label htmlFor="matric" className={labelClass}>
            Matric Number <span className="text-[#d86b00]">*</span>
          </label>
          <input
            id="matric"
            name="matric"
            type="text"
            placeholder="Enter your matric number"
            className={inputClass}
            value={values.matric}
            onChange={(e) => setField("matric", e.target.value)}
            aria-invalid={!!errors.matric}
            aria-describedby={errors.matric ? "matric-error" : "matric-hint"}
            disabled={loading}
          />
          {errors.matric ? (
            <p
              id="matric-error"
              className="text-[#c0392b] text-xs flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errors.matric}
            </p>
          ) : (
            <p id="matric-hint" className="text-xs text-[#7b8992]">
              Found on your offer letter or student portal.
            </p>
          )}
        </div>

        {/* Programme */}
        <div className="flex flex-col gap-[7px] sm:col-span-2">
          <label htmlFor="programme" className={labelClass}>
            Interested Bachelor Programme{" "}
            <span className="text-[#d86b00]">*</span>
          </label>
          <Select
            value={values.programme}
            onValueChange={(value) => setField("programme", value)}
            disabled={loading}
          >
            <SelectTrigger
              id="programme"
              aria-invalid={!!errors.programme}
              aria-describedby={
                errors.programme ? "programme-error" : "programme-hint"
              }
              className="w-full min-h-[50px] h-auto px-3.5 rounded-[10px] border-[#cfdbe2] bg-white text-left text-[#24313a] focus:border-unitar-blue-light focus:ring-4 focus:ring-unitar-blue-light/10 [&>span]:whitespace-normal"
            >
              <SelectValue placeholder="Select a programme" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value={NOT_SURE_YET}>{NOT_SURE_YET}</SelectItem>
              {PROGRAMME_GROUPS.map((group) => (
                <SelectGroup key={group.label}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          {errors.programme ? (
            <p
              id="programme-error"
              className="text-[#c0392b] text-xs flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {errors.programme}
            </p>
          ) : (
            <p id="programme-hint" className="text-xs text-[#7b8992]">
              Not decided yet? Choose “{NOT_SURE_YET}”.
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-[10px] border border-[#f0c2bc] bg-[#fdf0ee] p-3">
          <AlertCircle className="w-4 h-4 text-[#c0392b] flex-shrink-0" />
          <p className="text-sm text-[#c0392b]">{error}</p>
        </div>
      )}

      <div className="mt-[22px]">
        <button
          type="submit"
          disabled={loading}
          className="w-full min-h-[54px] rounded-[10px] bg-unitar-orange text-white font-extrabold shadow-[0_10px_24px_rgba(240,138,29,0.20)] transition hover:bg-[#df7d13] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Submitting..."
            : `RSVP My Slot & Get ${EVENT.platform} Link`}
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-[#7c8991]">
          By submitting this form, you agree that UNITAR may contact you
          regarding this event, your programme enquiry and related progression
          information.
        </p>
      </div>
    </form>
  );
}

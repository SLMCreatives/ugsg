"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";
import { SLOTS, isSlotPast } from "@/lib/slots";

const DATE_BM: Record<string, string> = {
  Monday: "Isnin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Khamis",
  Friday: "Jumaat",
  June: "Jun"
};

const TIME_BM: Record<string, string> = {
  "10:00 - 10:20 am": "10:00 - 10:20 pagi",
  "10:35 - 10:55 am": "10:35 - 10:55 pagi",
  "11:10 - 11:30 am": "11:10 - 11:30 pagi",
  "11:45 am - 12:05 pm": "11:45 pagi - 12:05 tengahari",
  "12:20 - 12:40 pm": "12:20 - 12:40 tengahari",
  "12:55 - 1:15 pm": "12:55 - 1:15 petang",
  "1:30 - 1:50 pm": "1:30 - 1:50 petang",
  "2:05 - 2:25 pm": "2:05 - 2:25 petang",
  "2:40 - 3:00 pm": "2:40 - 3:00 petang",
  "3:15 - 3:35 pm": "3:15 - 3:35 petang",
  "3:50 - 4:10 pm": "3:50 - 4:10 petang",
  "4:25 - 4:45 pm": "4:25 - 4:45 petang"
};

function translateDate(date: string) {
  return Object.entries(DATE_BM).reduce(
    (s, [en, bm]) => s.replace(en, bm),
    date
  );
}

function translateTime(time: string) {
  return TIME_BM[time] ?? time;
}

export function BookingFormBM() {
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
      setPhoneError("Sila masukkan nombor telefon Malaysia yang sah");
    } else {
      setPhoneError("");
    }

    setPhone(value);
  };

  const getAvailableDates = () => {
    return SLOTS.map((s) => s.date)
      .filter((v, i, a) => a.indexOf(v) === i)
      .filter((d) => SLOTS.some((s) => s.date === d && !isSlotFull(d, s.time) && !isSlotPast(d, s.time)));
  };

  const getAvailableTimeSlots = () => {
    return SLOTS.filter(
      (s) => s.date === date && !isSlotFull(date, s.time) && !isSlotPast(date, s.time)
    ).map((s) => {
      const booked = bookingCounts[`${date}__${s.time}`] || 0;
      const remaining = s.slots - booked;
      return {
        label: `${translateTime(s.time)} (${remaining} slot lagi)`,
        value: s.time
      };
    });
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!name.trim()) {
        setError("Sila masukkan nama anda");
        return;
      }
      setError("");
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!phone.trim() || phoneError) {
        setError("Sila masukkan nombor telefon yang sah");
        return;
      }
      setError("");
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!date || !timeSlot) {
        setError("Sila pilih tarikh dan masa");
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
        headers: { "Content-Type": "application/json" },
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
    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center bg-white">
        <CheckCircle className="w-12 h-12 text-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Slot Anda Telah Ditempah!
        </h3>
        <p className="text-muted-foreground mb-4 text-balance">
          Terima kasih, {name}! <br /> Tempahan anda untuk{" "}
          <span className="font-bold">
            1-1 Step-by-Step PTPTN Application Session
          </span>{" "}
          telah berjaya dibuat. Sila semak butiran tempahan anda di bawah:
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-2 mb-6 items-center justify-end">
          <p className="text-muted-foreground text-balance text-sm text-right">
            Tarikh Tempahan:
          </p>
          <Input
            className="text-sm text-foreground text-center w-full"
            readOnly
            value={translateDate(date)}
          />
          <p className="text-muted-foreground text-balance text-sm text-right">
            Masa Tempahan:
          </p>
          <Input
            className="text-sm text-foreground text-center w-full"
            readOnly
            value={translateTime(timeSlot)}
          />
        </div>
        <p className="text-sm text-muted-foreground text-balance">
          Kami akan menghubungi anda di{" "}
          <span className="font-bold">({phone})</span> untuk mengesahkan temu
          janji anda dan berkongsi pautan mesyuarat.
          <br />Sila tiba pada masa yang ditentukan untuk slot anda. Jika anda
          perlu menetapkan semula, hubungi kami sekurang-kurangnya 24 jam
          sebelum masa.
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
              Apakah nama penuh anda?
            </h3>
            <Label htmlFor="name" className="text-foreground mb-2 block">
              Nama Penuh
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
              Apakah nombor telefon anda?
            </h3>
            <Label htmlFor="phone" className="text-foreground mb-2 block">
              Nombor Telefon
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
            Pilih slot anda
          </h3>
          <p className="text-muted-foreground mb-2 text-sm">
            Pilih tarikh dan masa pilihan anda. Sila ambil perhatian bahawa kami
            mempunyai bilangan slot yang terhad untuk setiap tempoh masa, jadi
            tempah awal untuk mendapatkan tempat anda!
          </p>

          <div>
            <Label htmlFor="date" className="text-foreground mb-2 block">
              Tarikh
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
              <option value="">Pilih tarikh</option>
              {getAvailableDates().map((d) => (
                <option key={d} value={d}>
                  {translateDate(d)}
                </option>
              ))}
            </select>
          </div>

          {date && (
            <div>
              <Label htmlFor="time" className="text-foreground mb-2 block">
                Masa
              </Label>
              <select
                id="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Pilih masa</option>
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
            Kembali
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={loading}
          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
          type="button"
        >
          {loading
            ? "Menghantar..."
            : step === 3
            ? "Sahkan Tempahan"
            : "Seterusnya"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Langkah {step} dari 3
      </p>
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";
import { SLOTS, isSlotBookable } from "@/lib/slots";

const DATE_BM: Record<string, string> = {
  Monday: "Isnin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Khamis",
  Friday: "Jumaat",
  Saturday: "Sabtu",
  Sunday: "Ahad",
  January: "Januari",
  February: "Februari",
  March: "Mac",
  April: "April",
  May: "Mei",
  June: "Jun",
  July: "Julai",
  August: "Ogos",
  September: "September",
  October: "Oktober",
  November: "November",
  December: "Disember"
};

function translateDate(date: string) {
  return Object.entries(DATE_BM).reduce(
    (s, [en, bm]) => s.replace(en, bm),
    date
  );
}

// am → pagi, 12:xx pm → tengahari, other pm → petang.
// "11:30 am - 12:00 pm" → "11:30 pagi - 12:00 tengahari"
function translateTime(time: string) {
  const [startRaw, endRaw] = time.split(" - ");
  const endMeridiem = endRaw.slice(-2);
  const startMeridiem = /(am|pm)$/.test(startRaw) ? startRaw.slice(-2) : endMeridiem;
  const startClock = startRaw.replace(/\s*(am|pm)$/, "");
  const endClock = endRaw.replace(/\s*(am|pm)$/, "");
  const period = (clock: string, meridiem: string) =>
    meridiem === "am" ? "pagi" : clock.startsWith("12:") ? "tengahari" : "petang";

  const startPeriod = period(startClock, startMeridiem);
  const endPeriod = period(endClock, endMeridiem);
  return startPeriod === endPeriod
    ? `${startClock} - ${endClock} ${endPeriod}`
    : `${startClock} ${startPeriod} - ${endClock} ${endPeriod}`;
}

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
    question: "Adakah anda sudah ada akaun Bank Islam?",
    body: "PTPTN menyalurkan pembiayaan melalui akaun Bank Islam, jadi akaun ini perlu dibuka sebelum anda memohon.",
    account: {
      label: "Nombor akaun Bank Islam",
      placeholder: "Contoh: 12345678901234",
      hint: "Pilihan — kongsikan jika anda ada nombornya sekarang."
    },
    help: "Buka akaun di mana-mana cawangan Bank Islam. Bawa kad pengenalan dan surat tawaran UNITAR anda."
  },
  {
    id: "sspn",
    question: "Adakah anda sudah ada akaun SSPN Prime?",
    body: "Akaun SSPN Prime adalah syarat wajib PTPTN. Ia boleh dibuka dalam talian dalam beberapa minit.",
    account: {
      label: "Nombor akaun SSPN Prime",
      placeholder: "Contoh: 1234567890",
      hint: "Pilihan — kongsikan jika anda ada nombornya sekarang."
    },
    help: "Daftar di sspn.ptptn.gov.my atau melalui aplikasi myPTPTN. Deposit permulaan minimum RM20 sudah memadai."
  },
  {
    id: "myDigitalId",
    question: "Adakah MyDigital ID anda sudah diaktifkan?",
    body: "Permohonan PTPTN memerlukan pengesahan identiti melalui MyDigital ID yang aktif.",
    help: "Muat turun aplikasi MyDigital ID, daftar dengan kad pengenalan anda dan lengkapkan pengesahan wajah. Pengaktifan boleh mengambil masa sehingga 24 jam."
  },
  {
    id: "offerLetter",
    question: "Adakah surat tawaran UNITAR anda sudah tersedia?",
    body: "Salinan lembut (PDF) memadai. Anda perlu memuat naiknya bersama permohonan dan menyalin butiran daripadanya ke dalam borang, jadi pastikan ia surat terkini bagi program anda.",
    help: "Surat tawaran dihantar ke emel peribadi anda dalam bentuk PDF. Jika anda tidak menemuinya, hubungi Student Success Team di sst@unitar.my."
  }
];

const FIRST_PREREQ_STEP = 3;
const SLOT_STEP = FIRST_PREREQ_STEP + PREREQS.length;
const TOTAL_STEPS = SLOT_STEP;

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
  const [answers, setAnswers] = useState<Partial<Record<PrereqId, "yes" | "no">>>(
    {}
  );
  const [accounts, setAccounts] = useState<Partial<Record<PrereqId, string>>>({});

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
      .filter((d) => SLOTS.some((s) => s.date === d && !isSlotFull(d, s.time) && isSlotBookable(d)));
  };

  const getAvailableTimeSlots = () => {
    return SLOTS.filter(
      (s) => s.date === date && !isSlotFull(date, s.time) && isSlotBookable(date)
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

    if (step >= FIRST_PREREQ_STEP && step < SLOT_STEP) {
      const prereq = PREREQS[step - FIRST_PREREQ_STEP];
      if (answers[prereq.id] !== "yes") {
        setError("Sila sahkan perkara ini sebelum meneruskan");
        return;
      }
      setError("");
      setStep(step + 1);
      return;
    }

    if (step === SLOT_STEP) {
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
    return (
      <Card className="w-full max-w-md mx-auto p-8 text-center bg-white">
        <CheckCircle className="w-12 h-12 text-sand-900 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-sand-900 mb-2">
          Slot Anda Telah Ditempah!
        </h3>
        <p className="text-sand-800 mb-4 text-balance">
          Terima kasih, {name}! <br /> Tempahan anda untuk{" "}
          <span className="font-bold">
            1-1 Step-by-Step PTPTN Application Session
          </span>{" "}
          telah berjaya dibuat. Sila semak butiran tempahan anda di bawah:
        </p>
        <div className="grid grid-cols-[auto_1fr] gap-2 mb-6 items-center justify-end">
          <p className="text-sand-800 text-balance text-sm text-right">
            Tarikh Tempahan:
          </p>
          <Input
            className="text-sm text-sand-900 text-center w-full"
            readOnly
            value={translateDate(date)}
          />
          <p className="text-sand-800 text-balance text-sm text-right">
            Masa Tempahan:
          </p>
          <Input
            className="text-sm text-sand-900 text-center w-full"
            readOnly
            value={translateTime(timeSlot)}
          />
        </div>
        <p className="text-sm text-sand-800 text-balance">
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
              Apakah nama penuh anda?
            </h3>
            <Label htmlFor="name" className="text-sand-900 mb-2 block">
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
            <h3 className="text-lg font-semibold text-sand-900 mb-4">
              Apakah nombor telefon anda?
            </h3>
            <Label htmlFor="phone" className="text-sand-900 mb-2 block">
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
                Senarai semak {step - FIRST_PREREQ_STEP + 1} daripada{" "}
                {PREREQS.length}
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
                    { value: "yes", label: "Ya, saya ada" },
                    { value: "no", label: "Belum ada" }
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
                    Sediakan ini dahulu
                  </p>
                  <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#8A5417]">
                    {prereq.help}
                  </p>
                  <p className="m-0 mt-2 text-[13px] leading-relaxed text-[#8A5417]">
                    Kembali dan tempah slot anda setelah ia sedia — sesi ini
                    memerlukan kesemua empat perkara.
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
              Kesemua {PREREQS.length} keperluan disahkan.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-sand-900 mb-4">
            Pilih slot anda
          </h3>
          <p className="text-sand-800 mb-2 text-sm">
            Pilih tarikh dan masa pilihan anda. Sila ambil perhatian bahawa kami
            mempunyai bilangan slot yang terhad untuk setiap tempoh masa, jadi
            tempah awal untuk mendapatkan tempat anda! Slot perlu ditempah
            sekurang-kurangnya sehari lebih awal.
          </p>

          <div>
            <Label htmlFor="date" className="text-sand-900 mb-2 block">
              Tarikh
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
              <Label htmlFor="time" className="text-sand-900 mb-2 block">
                Masa
              </Label>
              <select
                id="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 border border-sand-300 rounded-md bg-white text-sand-900 focus:outline-none focus:ring-2 focus:ring-unitar-orange"
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
            : step === SLOT_STEP
            ? "Sahkan Tempahan"
            : "Seterusnya"}
        </Button>
      </div>

      <p className="text-xs text-sand-800 text-center mt-4">
        Langkah {step} dari {TOTAL_STEPS}
      </p>
    </Card>
  );
}

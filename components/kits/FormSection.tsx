"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  CalendarClock,
  XCircle
} from "lucide-react";

import {
  COLLECTION_RANGE,
  REGISTRATION_CLOSES_LABEL,
  REGISTRATION_OPENS_LABEL,
  registrationStatus
} from "@/lib/starter-kit-dates";

const newlocations = [
  {
    value: "unitar-international-university-main-campus-petaling-jaya",
    label: "UNITAR International University Main Campus Petaling Jaya",
    address:
      "Tierra Crest, Jalan SS6/3, Kelana Jaya, 47301 Petaling Jaya, Selangor Darul Ehsan",
    phone: "+603-7627 7200"
  },
  {
    value: "unitar-college-sungai-petani",
    label: "UNITAR College Sungai Petani",
    address:
      "No. 77 & 78, Wisma Cosmopoint, Jalan Mawar 1, Taman Pekan Baru, 08000 Sungai Petani, Kedah. Additional Premises: Plot A-G, Jalan Kampung Baru, 08000 Sungai Petani, Kedah",
    phone: "04-425 6061/63"
  },
  {
    value: "unitar-college-penang",
    label: "UNITAR College Penang",
    address:
      "Unit 72-1-46, 72-1-47, 72-2-43, 72-2-43a, 72-2-45, 72-2-46, 72-2-47, 72-2-48, 72-3-47 & 72-3-48, Arena Curve, Jalan Mahsuri, 11950 Bayan Lepas, Pulau Pinang",
    phone: "04-611 0658"
  },
  {
    value: "unitar-college-ipoh",
    label: "UNITAR College Ipoh",
    address:
      "Unit 1-A, 1-B, 3-A, 3-B, 5-A, 5-B, 7-A, 7-B, 9, 9-A, 9-B, 11, 11-A, 11-B, 13, 13-A, 13-B, 15, 15-A, 15-B, Arena Niaga Pari 2, Arena Niaga Pari Off Jalan Silibin, 30100 Ipoh, Perak",
    phone: "05-249 2626/21"
  },
  {
    value: "unitar-college-melaka",
    label: "UNITAR College Melaka",
    address: "No. 112, 114 & 116, Jalan Kubu, 75200 Melaka, Melaka",
    phone: "06-286 0686"
  },
  {
    value: "unitar-college-johor-bahru",
    label: "UNITAR College Johor Bahru",
    address:
      "No. 14, 14A, 14B, 14C, 16, 16A, 16B & 16C, Jalan Lembah 16, Bandar Seri Alam, 81750 Masai, Johor",
    phone: "07-382 4705"
  },
  {
    value: "unitar-college-kuantan",
    label: "UNITAR College Kuantan",
    address:
      "No. 74/4, Jalan Teluk Sisek, 25000 Kuantan, Pahang. New Campus: B92-B98 Jalan Dato Lim Hoe Lek, 25300 Kuantan, Pahang",
    phone: "09-516 2857/59/72"
  },
  {
    value: "unitar-college-kuala-terengganu",
    label: "UNITAR College Kuala Terengganu",
    address:
      "Tingkat 2 dan 3, Kompleks Maksak, Jalan Cerung Lanjut, 20300 Kuala Terengganu, Terengganu",
    phone: "09-631 2223/4"
  },
  {
    value: "unitar-college-kota-bharu",
    label: "UNITAR College Kota Bharu",
    address:
      "No. 5, 6, 7 & 8, Vista Square, Jalan Sri Cemerlang, 15350 Kota Bharu, Kelantan",
    phone: "09-743 7677"
  },
  {
    value: "unitar-college-kuching",
    label: "UNITAR College Kuching",
    address:
      "Lot 3127-3130, PL 1106, Block 10, Kuching Central Land District, Jalan Tun Ahmad Zaidi Adruce, 93250 Kuching, Sarawak",
    phone: "082-240 340"
  },
  {
    value: "unitar-college-kota-kinabalu",
    label: "UNITAR College Kota Kinabalu",
    address:
      "Lot 102, 103, 104 & 105, Block P, Alamesra Plaza Utama, Phase 3, Alamesra, Along Sulaman Coastal, Kuala Menggatal, 88400 Kota Kinabalu, Sabah",
    phone: "088-348 800"
  },
  {
    value: "unitar-university-college-kuala-lumpur",
    label: "UNITAR University College Kuala Lumpur",
    address:
      "01-03, 09-01, 09-02, 09-03, 09-04 & 09-05, Wisma Hong Leong, 18 Jalan Perak, 50450 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    phone: "03-2603 1500"
  }
];

/* const locations = [
  {
    value: "kelana_jaya",
    label: "UNITAR International University, (Main Campus) Petaling Jaya"
  },
  { value: "kuala_lumpur", label: "UNITAR University College Kuala Lumpur" },
  {
    value: "sungai_petani",
    label: "UNITAR College Sungai Petani"
  },
  {
    value: "ipoh",
    label: "UNITAR College Ipoh"
  },
  {
    value: "johor_bharu",
    label: "UNITAR College Johor Bahru"
  },
  {
    value: "kota_bharu",
    label: "UNITAR College Kota Bharu"
  },
  {
    value: "kota_kinabalu",
    label: "UNITAR College Kota Kinabalu"
  },
  {
    value: "kuala_terengganu",
    label: "UNITAR College Kuala Terengganu "
  },
  {
    value: "pulau_pinang",
    label: "UNITAR College Penang"
  },
  {
    value: "melaka",
    label: "UNITAR College Melaka"
  },
  {
    value: "kuching",
    label: "UNITAR College Kuching"
  },
  {
    value: "kuantan",
    label: "UNITAR College Kuantan"
  }
]; */

const getLocationDetails = (value: string) => {
  return newlocations.find((loc) => loc.value === value) || null;
};

type FormData = {
  name: string;
  matricNumber: string;
  phone: string;
  email: string;
  campus: string;
  tshirtSize: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  matricNumber: "",
  phone: "",
  email: "",
  campus: "",
  tshirtSize: ""
};

export default function FormSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState(registrationStatus());

  // Re-checked on a timer so the panel flips on its own if someone leaves the
  // page open across the moment registration opens or closes.
  useEffect(() => {
    const timer = setInterval(() => setStatus(registrationStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: undefined
      }));
    }

    if (error) {
      setError("");
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.matricNumber.trim()) {
      newErrors.matricNumber = "Matric number is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{8,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.campus) {
      newErrors.campus = "Please select a pickup campus";
    }

    if (!formData.tshirtSize) {
      newErrors.tshirtSize = "Please select a t-shirt size";
    }

    return newErrors;
  };

  const selectedLocation = getLocationDetails(formData.campus);
  const submittedLocation = submittedData
    ? getLocationDetails(submittedData.campus)
    : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess(false);

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const payload: FormData = {
        name: formData.name.trim(),
        matricNumber: formData.matricNumber.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        campus: formData.campus,
        tshirtSize: formData.tshirtSize
      };

      const response = await fetch("/api/starter-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to submit registration");
      }

      setSubmittedData(payload);
      setSuccess(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "border-sand-300 bg-white text-sand-900 placeholder:text-sand-500 focus-visible:ring-unitar-orange";
  const errorClass = "m-0 text-[13px] font-medium text-[#B3261E]";
  const hintClass = "m-0 text-xs text-sand-700";

  return (
    <section id="form-section" className="scroll-mt-20 px-5 pt-9 lg:px-10 lg:pt-14">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-1.5 text-center">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
            Step 1
          </p>
          <h2 className="m-0 font-display text-[26px] font-bold tracking-tight text-sand-900 sm:text-[38px]">
            Claim your free pack
          </h2>
          <p className="m-0 text-[14.5px] text-sand-800 sm:text-base">
            Fill in your details below to reserve your starter kit.
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          {status === "upcoming" ? (
            <div className="overflow-hidden rounded-[18px] border border-sand-300 bg-white">
              <div className="flex items-center gap-4 bg-unitar-blue px-5 py-5 sm:px-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <CalendarClock className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="m-0 font-display text-lg font-bold leading-tight text-white">
                    Registration opens soon
                  </p>
                  <p className="m-0 mt-0.5 text-[13.5px] text-[#C4DAE8]">
                    Registration opens on {REGISTRATION_OPENS_LABEL}.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
                <p className="m-0 text-[14.5px] leading-relaxed text-sand-800">
                  You will be able to claim your UNITAR Starter Pack from{" "}
                  {REGISTRATION_OPENS_LABEL} until {REGISTRATION_CLOSES_LABEL}. Check
                  back then to reserve yours.
                </p>
                <Link
                  href="/"
                  className="flex min-h-[48px] items-center rounded-full bg-unitar-orange px-6 text-[15px] font-bold text-white transition-colors hover:bg-unitar-orange-ink"
                >
                  Back to the orientation guide
                </Link>
              </div>
            </div>
          ) : status === "closed" ? (
            <div className="overflow-hidden rounded-[18px] border border-sand-300 bg-white">
              <div className="flex items-center gap-4 bg-[#B3261E] px-5 py-5 sm:px-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <XCircle className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="m-0 font-display text-lg font-bold leading-tight text-white">
                    Registration closed
                  </p>
                  <p className="m-0 mt-0.5 text-[13.5px] text-[#F6D5D2]">
                    The deadline to register was {REGISTRATION_CLOSES_LABEL}.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 text-center sm:p-8">
                <p className="m-0 text-[14.5px] leading-relaxed text-sand-800">
                  Sorry, registration for the UNITAR Starter Pack has ended. Stay
                  tuned for future opportunities.
                </p>
                <Link
                  href="/"
                  className="flex min-h-[48px] items-center rounded-full bg-unitar-orange px-6 text-[15px] font-bold text-white transition-colors hover:bg-unitar-orange-ink"
                >
                  Back to the orientation guide
                </Link>
              </div>
            </div>
          ) : success && submittedData ? (
            <div className="overflow-hidden rounded-[18px] border border-sand-300 bg-white">
              <div className="flex items-center gap-4 bg-done px-5 py-5 sm:px-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="m-0 font-display text-lg font-bold leading-tight text-white">
                    Registration successful!
                  </p>
                  <p className="m-0 mt-0.5 text-[13.5px] text-[#D4EBDA]">
                    Your starter kit has been reserved.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6 p-5 sm:p-6">
                {submittedLocation && (
                  <div className="flex flex-col gap-3">
                    <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
                      Your pickup location
                    </p>
                    <div className="flex flex-col gap-4 rounded-xl border border-sand-300 bg-sand-50 p-5">
                      <h3 className="m-0 font-display text-base font-bold leading-snug text-sand-900">
                        {submittedLocation.label}
                      </h3>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <MapPin
                            className="mt-0.5 h-4 w-4 shrink-0 text-unitar-orange-ink"
                            aria-hidden="true"
                          />
                          <p className="m-0 text-[13.5px] leading-relaxed text-sand-800">
                            {submittedLocation.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone
                            className="h-4 w-4 shrink-0 text-unitar-orange-ink"
                            aria-hidden="true"
                          />
                          <p className="m-0 text-[13.5px] text-sand-800">
                            {submittedLocation.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
                    Collection period
                  </p>
                  <div className="rounded-xl bg-[#FFF7ED] px-5 py-4">
                    <p className="m-0 font-display text-base font-bold text-unitar-orange-ink">
                      {COLLECTION_RANGE}
                    </p>
                    <p className="m-0 mt-1 text-[13px] text-[#8A5417]">
                      Exact date and time will be communicated to you via email.
                    </p>
                  </div>
                </div>

                <p className="m-0 border-t border-sand-300 pt-4 text-[13.5px] text-sand-800">
                  Please check your inbox regularly for updates on your starter kit
                  pickup.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 rounded-[18px] border border-sand-300 bg-white p-5 sm:p-8">
              <p className="m-0 text-[13.5px] text-sand-700">
                All fields marked with{" "}
                <span className="font-bold text-[#B3261E]">*</span> are required.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-[14.5px] text-sand-900">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    disabled={loading}
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p id="name-error" className={errorClass}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Matric Number */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="matricNumber"
                    className="text-[14.5px] text-sand-900"
                  >
                    Matric Number *
                  </Label>
                  <Input
                    id="matricNumber"
                    name="matricNumber"
                    type="text"
                    placeholder="e.g. MC26090123"
                    value={formData.matricNumber}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.matricNumber}
                    aria-describedby={
                      errors.matricNumber ? "matricNumber-error" : undefined
                    }
                    disabled={loading}
                    className={fieldClass}
                  />
                  {errors.matricNumber ? (
                    <p id="matricNumber-error" className={errorClass}>
                      {errors.matricNumber}
                    </p>
                  ) : (
                    <p className={hintClass}>
                      Found on your offer letter or student portal
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="text-[14.5px] text-sand-900">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. 0123456789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    disabled={loading}
                    className={fieldClass}
                  />
                  {errors.phone ? (
                    <p id="phone-error" className={errorClass}>
                      {errors.phone}
                    </p>
                  ) : (
                    <p className={hintClass}>
                      Malaysian number — include country code if international (e.g.
                      +6012...)
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-[14.5px] text-sand-900">
                    Personal Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={loading}
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p id="email-error" className={errorClass}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Campus */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="campus" className="text-[14.5px] text-sand-900">
                    Preferred Pickup Campus *
                  </Label>
                  <Select
                    value={formData.campus}
                    onValueChange={(value) => handleSelectChange("campus", value)}
                    disabled={loading}
                  >
                    <SelectTrigger
                      id="campus"
                      aria-invalid={!!errors.campus}
                      aria-describedby={errors.campus ? "campus-error" : undefined}
                      className="border-sand-300 bg-white text-left text-sand-900"
                    >
                      <SelectValue placeholder="Select a campus" />
                    </SelectTrigger>
                    <SelectContent className="border-sand-300 bg-white">
                      {newlocations.map((loc) => (
                        <SelectItem key={loc.value} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.campus ? (
                    <p id="campus-error" className={errorClass}>
                      {errors.campus}
                    </p>
                  ) : (
                    <p className={hintClass}>
                      Pick the campus closest to you — your pack will be sent there.
                    </p>
                  )}
                </div>

                {/* T-Shirt Size */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="tshirtSize"
                    className="text-[14.5px] text-sand-900"
                  >
                    T-Shirt Size *
                  </Label>
                  <Select
                    value={formData.tshirtSize}
                    onValueChange={(value) =>
                      handleSelectChange("tshirtSize", value)
                    }
                    disabled={loading}
                  >
                    <SelectTrigger
                      id="tshirtSize"
                      aria-invalid={!!errors.tshirtSize}
                      aria-describedby={
                        errors.tshirtSize ? "tshirtSize-error" : undefined
                      }
                      className="border-sand-300 bg-white text-left text-sand-900"
                    >
                      <SelectValue placeholder="Select your size" />
                    </SelectTrigger>
                    <SelectContent className="border-sand-300 bg-white">
                      <SelectItem value="S">Small (S)</SelectItem>
                      <SelectItem value="M">Medium (M)</SelectItem>
                      <SelectItem value="L">Large (L)</SelectItem>
                      <SelectItem value="XL">Extra Large (XL)</SelectItem>
                      <SelectItem value="2XL">2X Large (2XL)</SelectItem>
                      <SelectItem value="3XL">3X Large (3XL)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tshirtSize && (
                    <p id="tshirtSize-error" className={errorClass}>
                      {errors.tshirtSize}
                    </p>
                  )}
                </div>

                {error && (
                  <Alert className="border-[#B3261E]/30 bg-[#FDECEA]">
                    <AlertCircle className="h-4 w-4 text-[#B3261E]" />
                    <AlertDescription className="text-[#8C1D18]">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-unitar-orange px-7 text-base font-bold text-white transition-colors hover:bg-unitar-orange-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit registration"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

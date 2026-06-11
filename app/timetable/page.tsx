"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Upload,
  Calendar,
  Download,
  Plus,
  Trash2,
  Clock,
  MapPin,
  User,
  FileText,
  CheckCircle,
  Pencil,
  X,
  ChevronRight,
  Info,
} from "lucide-react";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
type Day = (typeof DAYS)[number];

const CLASS_TYPES = ["Lecture", "Tutorial", "Lab", "Seminar", "Other"] as const;

interface TimetableEntry {
  id: string;
  subject: string;
  code: string;
  day: Day;
  startTime: string;
  endTime: string;
  venue: string;
  lecturer: string;
  type: string;
}

// ── Colour palette ────────────────────────────────────────────────────────────

const SUBJECT_COLORS = [
  {
    bg: "bg-blue-50",
    border: "border-l-blue-500",
    text: "text-blue-900",
    dot: "bg-blue-500",
  },
  {
    bg: "bg-emerald-50",
    border: "border-l-emerald-500",
    text: "text-emerald-900",
    dot: "bg-emerald-500",
  },
  {
    bg: "bg-violet-50",
    border: "border-l-violet-500",
    text: "text-violet-900",
    dot: "bg-violet-500",
  },
  {
    bg: "bg-orange-50",
    border: "border-l-orange-500",
    text: "text-orange-900",
    dot: "bg-orange-500",
  },
  {
    bg: "bg-pink-50",
    border: "border-l-pink-500",
    text: "text-pink-900",
    dot: "bg-pink-500",
  },
  {
    bg: "bg-teal-50",
    border: "border-l-teal-500",
    text: "text-teal-900",
    dot: "bg-teal-500",
  },
  {
    bg: "bg-amber-50",
    border: "border-l-amber-500",
    text: "text-amber-900",
    dot: "bg-amber-500",
  },
  {
    bg: "bg-cyan-50",
    border: "border-l-cyan-500",
    text: "text-cyan-900",
    dot: "bg-cyan-500",
  },
];

function buildColorMap(entries: TimetableEntry[]): Record<string, number> {
  const map: Record<string, number> = {};
  let idx = 0;
  entries.forEach((e) => {
    const key = e.code || e.subject;
    if (key && !(key in map)) map[key] = idx++ % SUBJECT_COLORS.length;
  });
  return map;
}

// ── CSV parser ────────────────────────────────────────────────────────────────

function parseCSV(content: string): TimetableEntry[] {
  const lines = content.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/^"|"$/g, ""));

  return lines
    .slice(1)
    .filter((l) => l.trim())
    .map((line, idx) => {
      const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      const row: Record<string, string> = {};
      headers.forEach((h, i) => {
        row[h] = values[i] || "";
      });

      const rawDay = (row["day"] || "Monday") as Day;
      const day: Day = DAYS.includes(rawDay) ? rawDay : "Monday";

      return {
        id: `csv-${idx}-${Date.now()}`,
        subject: row["subject"] || row["course"] || row["module"] || "",
        code: row["code"] || row["course code"] || row["subject code"] || "",
        day,
        startTime:
          row["start time"] ||
          row["start"] ||
          row["starttime"] ||
          row["from"] ||
          "",
        endTime:
          row["end time"] || row["end"] || row["endtime"] || row["to"] || "",
        venue: row["venue"] || row["room"] || row["location"] || "",
        lecturer: row["lecturer"] || row["instructor"] || row["faculty"] || "",
        type: row["type"] || row["class type"] || "Lecture",
      };
    });
}

// ── ICS generator ─────────────────────────────────────────────────────────────

const DAY_NUM: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function generateICS(
  entries: TimetableEntry[],
  semesterStart: string,
  weeks: number
): string {
  const start = new Date(semesterStart + "T00:00:00");

  const pad = (n: number) => String(n).padStart(2, "0");

  const formatDT = (date: Date, h: number, m: number) =>
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(h)}${pad(m)}00`;

  const events = entries
    .map((entry) => {
      const target = DAY_NUM[entry.day];
      const diff = (target - start.getDay() + 7) % 7;
      const eventDate = new Date(start);
      eventDate.setDate(start.getDate() + diff);

      const [sh, sm] = entry.startTime.split(":").map(Number);
      const [eh, em] = entry.endTime.split(":").map(Number);

      const uid = `${entry.id}@unitar-timetable`;
      const summary = entry.code
        ? `${entry.subject} (${entry.code})`
        : entry.subject;
      const desc = [
        entry.lecturer && `Lecturer: ${entry.lecturer}`,
        entry.type && `Type: ${entry.type}`,
      ]
        .filter(Boolean)
        .join("\\n");

      return [
        "BEGIN:VEVENT",
        `DTSTART:${formatDT(eventDate, sh, sm)}`,
        `DTEND:${formatDT(eventDate, eh, em)}`,
        `RRULE:FREQ=WEEKLY;COUNT=${weeks}`,
        `SUMMARY:${summary}`,
        entry.venue ? `LOCATION:${entry.venue}` : "",
        desc ? `DESCRIPTION:${desc}` : "",
        `UID:${uid}`,
        "END:VEVENT",
      ]
        .filter(Boolean)
        .join("\r\n");
    })
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UNITAR//Timetable Import//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    events,
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Weekly grid ───────────────────────────────────────────────────────────────

const GRID_START = 7; // 7 AM
const GRID_END = 22; // 10 PM
const HOUR_PX = 64;

function WeeklyGrid({
  entries,
  colorMap,
  onEdit,
  onDelete,
}: {
  entries: TimetableEntry[];
  colorMap: Record<string, number>;
  onEdit: (e: TimetableEntry) => void;
  onDelete: (id: string) => void;
}) {
  const totalH = (GRID_END - GRID_START) * HOUR_PX;

  const toTop = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return (h - GRID_START) * HOUR_PX + (m / 60) * HOUR_PX;
  };
  const toHeight = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return (eh - sh) * HOUR_PX + ((em - sm) / 60) * HOUR_PX;
  };

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <div className="flex min-w-[700px]">
        {/* Time axis */}
        <div className="w-14 flex-shrink-0 border-r bg-gray-50">
          <div className="h-10 border-b" />
          <div className="relative" style={{ height: totalH }}>
            {Array.from({ length: GRID_END - GRID_START }, (_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-gray-100"
                style={{ top: i * HOUR_PX }}
              >
                <span className="absolute -top-2.5 right-1 text-[10px] text-gray-400">
                  {String(GRID_START + i).padStart(2, "0")}:00
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Day columns */}
        {DAYS.map((day) => {
          const dayEntries = entries.filter((e) => e.day === day);
          return (
            <div
              key={day}
              className="flex-1 min-w-[110px] border-r last:border-r-0"
            >
              <div className="h-10 border-b bg-gray-50 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {day.slice(0, 3)}
                </span>
              </div>
              <div className="relative" style={{ height: totalH }}>
                {Array.from({ length: GRID_END - GRID_START }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-b border-gray-50"
                    style={{ top: i * HOUR_PX }}
                  />
                ))}
                {dayEntries.map((entry) => {
                  const colorIdx =
                    colorMap[entry.code || entry.subject] ?? 0;
                  const c = SUBJECT_COLORS[colorIdx % SUBJECT_COLORS.length];
                  const top = toTop(entry.startTime);
                  const height = Math.max(toHeight(entry.startTime, entry.endTime), 28);
                  return (
                    <div
                      key={entry.id}
                      className={`absolute left-1 right-1 rounded border-l-4 px-1.5 py-1 text-[11px] overflow-hidden cursor-pointer group transition-opacity hover:opacity-90 ${c.bg} ${c.border} ${c.text}`}
                      style={{ top, height }}
                      title={`${entry.subject}\n${entry.startTime}–${entry.endTime}\n${entry.venue}`}
                    >
                      <div className="font-bold truncate leading-tight">
                        {entry.code || entry.subject}
                      </div>
                      {height > 40 && (
                        <div className="truncate opacity-70 leading-tight">
                          {entry.venue}
                        </div>
                      )}
                      {height > 56 && (
                        <div className="truncate opacity-60 leading-tight">
                          {entry.startTime}–{entry.endTime}
                        </div>
                      )}
                      <div className="absolute top-0.5 right-0.5 hidden group-hover:flex gap-0.5">
                        <button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            onEdit(entry);
                          }}
                          className="p-0.5 rounded bg-white/70 hover:bg-white"
                        >
                          <Pencil size={10} />
                        </button>
                        <button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            onDelete(entry.id);
                          }}
                          className="p-0.5 rounded bg-white/70 hover:bg-white text-red-600"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Entry form ────────────────────────────────────────────────────────────────

const EMPTY_ENTRY: Omit<TimetableEntry, "id"> = {
  subject: "",
  code: "",
  day: "Monday",
  startTime: "08:00",
  endTime: "10:00",
  venue: "",
  lecturer: "",
  type: "Lecture",
};

function EntryForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: TimetableEntry;
  onSave: (entry: Omit<TimetableEntry, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<TimetableEntry, "id">>(
    initial ? { ...initial } : { ...EMPTY_ENTRY }
  );

  const set = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Subject Name *</Label>
          <Input
            placeholder="e.g. Mathematics"
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Course Code</Label>
          <Input
            placeholder="e.g. MATH101"
            value={form.code}
            onChange={(e) => set("code", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Day *</Label>
          <Select value={form.day} onValueChange={(v) => set("day", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DAYS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Start Time *</Label>
          <Input
            type="time"
            value={form.startTime}
            onChange={(e) => set("startTime", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">End Time *</Label>
          <Input
            type="time"
            value={form.endTime}
            onChange={(e) => set("endTime", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Venue / Room</Label>
          <Input
            placeholder="e.g. LT1"
            value={form.venue}
            onChange={(e) => set("venue", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Lecturer</Label>
          <Input
            placeholder="e.g. Dr. Ahmad"
            value={form.lecturer}
            onChange={(e) => set("lecturer", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Type</Label>
          <Select value={form.type} onValueChange={(v) => set("type", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CLASS_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => {
            if (!form.subject || !form.startTime || !form.endTime) {
              toast.error("Subject name, start time, and end time are required.");
              return;
            }
            onSave(form);
          }}
        >
          Save Class
        </Button>
      </div>
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = ["Upload", "Preview & Edit", "Export"];
  return (
    <div className="flex items-center gap-1 justify-center mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={label} className="flex items-center gap-1">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                done
                  ? "bg-green-100 text-green-700"
                  : active
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {done ? (
                <CheckCircle size={14} />
              ) : (
                <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] leading-none">
                  {idx}
                </span>
              )}
              {label}
            </div>
            {i < steps.length - 1 && (
              <ChevronRight size={14} className="text-gray-300 mx-0.5" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function TimetablePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadTab, setUploadTab] = useState<"image" | "csv">("image");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editEntry, setEditEntry] = useState<TimetableEntry | null>(null);
  const [semesterStart, setSemesterStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [semesterWeeks, setSemesterWeeks] = useState("14");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const colorMap = buildColorMap(entries);

  // ── File handlers ──────────────────────────────────────────────────────────

  const handleImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        toast.error("Please upload an image file (JPG, PNG, etc.).");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        toast.success("Timetable image loaded. Add your classes below.");
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleImageFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        toast.success("Timetable image loaded. Add your classes below.");
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleCSVFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = parseCSV(ev.target?.result as string);
          if (parsed.length === 0) {
            toast.error("No valid entries found in CSV. Check the format.");
            return;
          }
          setEntries(parsed);
          toast.success(`Imported ${parsed.length} classes from CSV.`);
          setStep(2);
        } catch {
          toast.error("Failed to parse CSV. Please check the format.");
        }
      };
      reader.readAsText(file);
    },
    []
  );

  const handleCSVDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (!file.name.endsWith(".csv")) {
        toast.error("Please upload a .csv file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = parseCSV(ev.target?.result as string);
          if (parsed.length === 0) {
            toast.error("No valid entries found in CSV.");
            return;
          }
          setEntries(parsed);
          toast.success(`Imported ${parsed.length} classes from CSV.`);
          setStep(2);
        } catch {
          toast.error("Failed to parse CSV.");
        }
      };
      reader.readAsText(file);
    },
    []
  );

  // ── Entry CRUD ─────────────────────────────────────────────────────────────

  const addEntry = (data: Omit<TimetableEntry, "id">) => {
    setEntries((prev) => [
      ...prev,
      { ...data, id: `entry-${Date.now()}-${Math.random()}` },
    ]);
    setShowAddForm(false);
    toast.success("Class added.");
  };

  const updateEntry = (id: string, data: Omit<TimetableEntry, "id">) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...data, id } : e)));
    setEditEntry(null);
    toast.success("Class updated.");
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast.success("Class removed.");
  };

  // ── Sample CSV ─────────────────────────────────────────────────────────────

  const downloadSampleCSV = () => {
    const sample = [
      "Day,Start Time,End Time,Subject,Code,Venue,Lecturer,Type",
      "Monday,08:00,10:00,Mathematics,MATH101,LT1,Dr. Ahmad,Lecture",
      "Tuesday,10:00,11:00,English,ENGL102,B301,Ms. Lee,Tutorial",
      "Wednesday,14:00,16:00,Programming,CS103,Lab2,Mr. Rajan,Lab",
      "Thursday,08:00,10:00,Mathematics,MATH101,LT1,Dr. Ahmad,Lecture",
      "Friday,13:00,14:00,English,ENGL102,B301,Ms. Lee,Tutorial",
    ].join("\n");
    const blob = new Blob([sample], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timetable-sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Export ─────────────────────────────────────────────────────────────────

  const handleExport = () => {
    if (entries.length === 0) {
      toast.error("No classes to export.");
      return;
    }
    const ics = generateICS(entries, semesterStart, Number(semesterWeeks));
    downloadICS(ics, "my-timetable.ics");
    toast.success("Calendar file downloaded!");
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Calendar size={14} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900">Timetable Import</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            UNITAR
          </Badge>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Import Your Class Timetable
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Upload your timetable image or CSV, preview your schedule, then
            export it directly to Google Calendar, Outlook, or Apple Calendar.
          </p>
        </div>

        <StepIndicator step={step} />

        {/* ── STEP 1: Upload ─────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <Tabs
              value={uploadTab}
              onValueChange={(v) => setUploadTab(v as "image" | "csv")}
            >
              <TabsList className="w-full mb-4">
                <TabsTrigger value="image" className="flex-1 gap-1.5">
                  <Upload size={14} /> Upload Image / PDF
                </TabsTrigger>
                <TabsTrigger value="csv" className="flex-1 gap-1.5">
                  <FileText size={14} /> Import CSV
                </TabsTrigger>
              </TabsList>

              {/* Image tab */}
              <TabsContent value="image">
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Upload your timetable screenshot
                    </CardTitle>
                    <CardDescription>
                      Take a screenshot from your student portal (ORION) and
                      upload it here. You&apos;ll manually add class entries
                      while referencing the image.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-colors"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleImageDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Upload size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">
                            Drop your timetable here
                          </p>
                          <p className="text-sm text-gray-400 mt-0.5">
                            JPG, PNG, or PDF — up to 20 MB
                          </p>
                        </div>
                        <Button variant="outline" size="sm" type="button">
                          Browse Files
                        </Button>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleImageFile}
                    />

                    {uploadedImage && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <CheckCircle size={14} />
                          <span>Image uploaded successfully</span>
                        </div>
                        <div className="rounded-lg border overflow-hidden max-h-60 overflow-y-auto">
                          <Image
                            src={uploadedImage}
                            alt="Uploaded timetable"
                            className="w-full object-contain"
                            width={600}
                            height={400}
                            unoptimized
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => setStep(2)}
                        >
                          Continue to Add Classes
                          <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    )}

                    {!uploadedImage && (
                      <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-xs text-amber-800">
                        <Info size={13} className="mt-0.5 flex-shrink-0" />
                        <span>
                          After uploading, you&apos;ll enter class details
                          manually while viewing your timetable image on screen.
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="text-center mt-4">
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setStep(2)}
                  >
                    Skip upload — enter classes manually
                  </button>
                </div>
              </TabsContent>

              {/* CSV tab */}
              <TabsContent value="csv">
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Import from CSV file
                    </CardTitle>
                    <CardDescription>
                      Export your timetable as a CSV file and upload it for
                      automatic parsing. Download the sample to see the expected
                      format.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-colors"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleCSVDrop}
                      onClick={() => csvInputRef.current?.click()}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                          <FileText size={20} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">
                            Drop your CSV here
                          </p>
                          <p className="text-sm text-gray-400 mt-0.5">
                            .csv files only
                          </p>
                        </div>
                        <Button variant="outline" size="sm" type="button">
                          Browse CSV File
                        </Button>
                      </div>
                    </div>
                    <input
                      ref={csvInputRef}
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleCSVFile}
                    />

                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText size={14} className="text-gray-500" />
                      <div className="flex-1 text-sm text-gray-600">
                        Not sure of the format? Download the sample CSV.
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadSampleCSV}
                      >
                        <Download size={12} className="mr-1" /> Sample
                      </Button>
                    </div>

                    <div className="rounded-lg border overflow-hidden">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50">
                          <tr>
                            {[
                              "Day",
                              "Start Time",
                              "End Time",
                              "Subject",
                              "Code",
                              "Venue",
                              "Lecturer",
                              "Type",
                            ].map((h) => (
                              <th
                                key={h}
                                className="px-2 py-1.5 text-left font-medium text-gray-600 border-r last:border-r-0"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            {[
                              "Monday",
                              "08:00",
                              "10:00",
                              "Mathematics",
                              "MATH101",
                              "LT1",
                              "Dr. Ahmad",
                              "Lecture",
                            ].map((v, i) => (
                              <td
                                key={i}
                                className="px-2 py-1.5 text-gray-500 border-r last:border-r-0"
                              >
                                {v}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* ── STEP 2: Preview & Edit ─────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Image reference panel (if uploaded) */}
            {uploadedImage && (
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Upload size={14} /> Your uploaded timetable (reference)
                    </CardTitle>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      Hide
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="max-h-56">
                    <Image
                      src={uploadedImage}
                      alt="Uploaded timetable"
                      className="w-full object-contain rounded"
                      width={1000}
                      height={600}
                      unoptimized
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {/* Weekly grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Weekly Schedule Preview
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{entries.length} classes</Badge>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowAddForm(true);
                      setEditEntry(null);
                    }}
                  >
                    <Plus size={13} className="mr-1" /> Add Class
                  </Button>
                </div>
              </div>

              {entries.length === 0 ? (
                <div className="border-2 border-dashed rounded-xl p-16 text-center text-gray-400">
                  <Calendar size={32} className="mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No classes yet</p>
                  <p className="text-sm mt-1">
                    Click &quot;Add Class&quot; to enter your first class.
                  </p>
                </div>
              ) : (
                <WeeklyGrid
                  entries={entries}
                  colorMap={colorMap}
                  onEdit={(e) => {
                    setEditEntry(e);
                    setShowAddForm(false);
                  }}
                  onDelete={deleteEntry}
                />
              )}
            </div>

            {/* Add / Edit form */}
            {(showAddForm || editEntry) && (
              <Card className="shadow-sm border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    {editEntry ? "Edit Class" : "Add New Class"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EntryForm
                    initial={editEntry ?? undefined}
                    onSave={(data) => {
                      if (editEntry) {
                        updateEntry(editEntry.id, data);
                      } else {
                        addEntry(data);
                      }
                    }}
                    onCancel={() => {
                      setShowAddForm(false);
                      setEditEntry(null);
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Class list */}
            {entries.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  All Classes
                </h3>
                <div className="space-y-2">
                  {entries.map((entry) => {
                    const colorIdx =
                      colorMap[entry.code || entry.subject] ?? 0;
                    const c =
                      SUBJECT_COLORS[colorIdx % SUBJECT_COLORS.length];
                    return (
                      <div
                        key={entry.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border-l-4 ${c.bg} ${c.border}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold text-sm ${c.text}`}>
                              {entry.subject}
                            </span>
                            {entry.code && (
                              <Badge variant="outline" className="text-xs">
                                {entry.code}
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">
                              {entry.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-0.5 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {entry.day} {entry.startTime}–{entry.endTime}
                            </span>
                            {entry.venue && (
                              <span className="flex items-center gap-1">
                                <MapPin size={10} />
                                {entry.venue}
                              </span>
                            )}
                            {entry.lecturer && (
                              <span className="flex items-center gap-1">
                                <User size={10} />
                                {entry.lecturer}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => {
                              setEditEntry(entry);
                              setShowAddForm(false);
                            }}
                          >
                            <Pencil size={12} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteEntry(entry.id)}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  if (entries.length === 0) {
                    toast.error("Add at least one class before continuing.");
                    return;
                  }
                  setStep(3);
                }}
              >
                Continue to Export
                <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Export ─────────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Mini preview */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle size={15} className="text-green-600" />
                  {entries.length} classes ready to export
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(entries.map((e) => e.code || e.subject))
                  ).map((key) => {
                    const colorIdx = colorMap[key] ?? 0;
                    const c = SUBJECT_COLORS[colorIdx % SUBJECT_COLORS.length];
                    return (
                      <span
                        key={key}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border-l-2 ${c.bg} ${c.border} ${c.text}`}
                      >
                        {key}
                      </span>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Semester settings */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Semester Settings</CardTitle>
                <CardDescription>
                  Set your semester start date and duration. All recurring
                  events will be generated based on these values.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Semester Start Date</Label>
                    <Input
                      type="date"
                      value={semesterStart}
                      onChange={(e) => setSemesterStart(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Number of Weeks</Label>
                    <Select
                      value={semesterWeeks}
                      onValueChange={setSemesterWeeks}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[10, 12, 14, 16, 18, 20].map((w) => (
                          <SelectItem key={w} value={String(w)}>
                            {w} weeks
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download ICS */}
            <Card className="shadow-sm border-blue-200 bg-blue-50/40">
              <CardContent className="pt-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Download size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Download Calendar File (.ics)
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Download a universal .ics file compatible with Google
                      Calendar, Outlook, and Apple Calendar.
                    </p>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={handleExport}>
                  <Download size={15} className="mr-2" />
                  Download my-timetable.ics
                </Button>
              </CardContent>
            </Card>

            {/* Import instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">
                How to import into your calendar
              </h3>

              <Tabs defaultValue="google">
                <TabsList className="w-full">
                  <TabsTrigger value="google" className="flex-1">
                    Google Calendar
                  </TabsTrigger>
                  <TabsTrigger value="outlook" className="flex-1">
                    Outlook
                  </TabsTrigger>
                  <TabsTrigger value="apple" className="flex-1">
                    Apple Calendar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="google">
                  <Card className="shadow-sm">
                    <CardContent className="pt-4">
                      <ol className="space-y-2.5 text-sm text-gray-700">
                        {[
                          "Open Google Calendar on your computer (calendar.google.com).",
                          'Click the ⚙ gear icon (top right) and choose "Settings".',
                          'In the left sidebar, click "Import & export".',
                          'Under "Import", click "Select file from your computer" and choose my-timetable.ics.',
                          'Choose which calendar to add the events to, then click "Import".',
                          "All your classes will appear as recurring weekly events.",
                        ].map((step, i) => (
                          <li key={i} className="flex gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="outlook">
                  <Card className="shadow-sm">
                    <CardContent className="pt-4">
                      <ol className="space-y-2.5 text-sm text-gray-700">
                        {[
                          "Open Outlook (desktop app or outlook.com).",
                          'Go to Calendar view. On the web, click the calendar icon on the left.',
                          'Click "Add calendar" or go to File → Open & Export → Import/Export.',
                          'Choose "Import an iCalendar (.ics) file".',
                          "Browse and select my-timetable.ics.",
                          'Click "Import" to add all classes to your calendar.',
                        ].map((step, i) => (
                          <li key={i} className="flex gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="apple">
                  <Card className="shadow-sm">
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            On Mac:
                          </p>
                          <ol className="space-y-2 text-sm text-gray-600">
                            {[
                              "Open the Calendar app on your Mac.",
                              'Go to File → Import…',
                              "Select my-timetable.ics and click Import.",
                              "Choose which calendar to add events to and click OK.",
                            ].map((step, i) => (
                              <li key={i} className="flex gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            On iPhone / iPad:
                          </p>
                          <ol className="space-y-2 text-sm text-gray-600">
                            {[
                              "Transfer my-timetable.ics to your iPhone (via AirDrop, email, or Files app).",
                              "Tap the file — iOS will automatically prompt you to open it with Calendar.",
                              'Tap "Add All Events" to import your timetable.',
                            ].map((step, i) => (
                              <li key={i} className="flex gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back to Preview
              </Button>
              <Button variant="outline" onClick={() => {
                setStep(1);
                setEntries([]);
                setUploadedImage(null);
                toast.success("Cleared. Ready for a new timetable.");
              }}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

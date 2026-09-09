/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  SetupProvider,
  SetupProgress,
  SetupSteps,
  type SetupStep
} from "@/components/orientation/setup";
import {
  Callout,
  HelpBand,
  NextCard,
  OrientationFooter,
  SectionHeading,
  StepFigure,
  SubStep
} from "@/components/orientation/chrome";
import { Checklist } from "@/components/orientation/checklist";
import { SiteHeader } from "@/components/site/site-header";
import {
  Roadmap,
  type RoadmapPhase
} from "@/components/orientation/roadmap";

const LABELS = {
  progress: "Kemajuan anda",
  doneCount: "{done} daripada {total} selesai",
  continueStep: "Teruskan langkah {n}",
  allDone: "Semua langkah selesai!",
  currentStep: "Langkah semasa",
  done: "Selesai",
  markDone: "Tandakan selesai",
  markUndone: "Buat asal",
  stepLabel: "Langkah {n}",
  completeTitle: "Anda sudah bersedia!",
  completeBody:
    "Akaun anda sudah aktif. Mari mulakan perjalanan pembelajaran anda.",
  completeCta: "Pergi ke senarai semak",
  completeHref: "#senarai-semak"
};

const STEPS: SetupStep[] = [
  {
    id: "log-masuk",
    title: "Log masuk ke Dashboard Pelajar",
    summary: "Guna Nombor Matrik dan kata laluan lalai anda.",
    content: (
      <>
        <p className="m-0">
          Pergi ke{" "}
          <span className="font-bold text-sand-900">Halaman Log Masuk UNITAR</span>:
        </p>
        <Link href="https://auth.unitar.my/" target="_blank" className="self-start">
          <span className="flex min-h-[48px] items-center gap-2 rounded-full bg-unitar-blue px-6 text-[15px] font-semibold text-white transition-colors hover:bg-unitar-blue-light">
            <HomeIcon className="h-4 w-4" aria-hidden="true" />
            auth.unitar.my
          </span>
        </Link>

        <p className="m-0">Masukkan Butiran Log Masuk Anda:</p>
        <div className="overflow-hidden rounded-xl border border-sand-300">
          <div className="flex flex-col items-center gap-2 bg-unitar-blue px-4 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#A9CBE0]">
              Username
            </span>
            <span className="text-[15px] font-bold text-white">Nombor Matrik</span>
            <span className="text-xs italic text-[#91B9D3]">
              Contoh: MC2301XXXXX
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-unitar-orange px-4 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#FDEBD4]">
              Default Password
            </span>
            <span className="text-center text-[15px] font-bold text-white">
              4 digit terakhir No. Matrik + 4 digit terakhir NRIC/Pasport
            </span>
            <span className="text-xs italic text-[#FCE0BE]">Contoh: 77993883</span>
          </div>
        </div>

        <p className="m-0">
          Tekan <span className="font-bold text-sand-900">"Login"</span>.
        </p>
        <StepFigure src="/auth_unitar.png" alt="Skrin log masuk UNITAR" />
      </>
    )
  },
  {
    id: "emel-sandaran",
    title: "Sediakan emel sandaran anda",
    summary: "Tindakan sekali sahaja, digesa oleh Microsoft.",
    content: (
      <>
        <p className="m-0">
          Ini adalah <span className="font-bold text-sand-900">Tindakan Sekali</span>{" "}
          (digesa oleh Microsoft).
        </p>
        <SubStep letter="a">
          Masukkan{" "}
          <span className="font-bold text-unitar-orange-ink">
            Emel Peribadi Anda — DUA KALI!
          </span>
        </SubStep>
        <SubStep letter="b">
          Tekan <span className="font-bold">"Add/Change Email"</span>
        </SubStep>
        <StepFigure src="/secondary_email.png" alt="Persediaan emel sandaran" />
      </>
    )
  },
  {
    id: "emel-pelajar",
    title: "Aktifkan emel pelajar anda",
    summary: "Buka Office 365 daripada dashboard anda.",
    content: (
      <>
        <p className="m-0">
          Dalam <span className="font-bold text-sand-900">"Student Dashboard"</span>{" "}
          anda:
        </p>
        <SubStep letter="a">
          Tekan <span className="font-bold">Office 365</span>
        </SubStep>
        <StepFigure
          src="/big-o.png"
          alt="Ikon Office 365"
          cap={140}
        />
        <SubStep letter="b">
          Masukkan{" "}
          <span className="font-bold uppercase text-unitar-orange-ink">
            emel pelajar
          </span>{" "}
          anda, kemudian tekan <span className="font-bold">"Next"</span>
        </SubStep>
        <StepFigure src="/mfa1.png" alt="Masukkan emel pelajar" />
        <SubStep letter="c">
          Masukkan{" "}
          <span className="font-bold uppercase text-unitar-orange-ink">
            kata laluan
          </span>{" "}
          anda, kemudian tekan <span className="font-bold">"Sign In"</span>
        </SubStep>
        <StepFigure src="/mfa2-password.png" alt="Masukkan kata laluan" />
        <SubStep letter="d">
          Tekan <span className="font-bold">"Next"</span> (maklumat lanjut
          diperlukan untuk melindungi akaun anda)
        </SubStep>
        <StepFigure src="/mfa3.png" alt="Maklumat lanjut diperlukan" />
      </>
    )
  },
  {
    id: "mfa",
    title: "Lindungi akaun anda — persediaan MFA",
    summary: "Pasang Microsoft Authenticator dan imbas kod QR.",
    content: (
      <>
        <SubStep letter="a">
          Muat turun dan pasang{" "}
          <span className="font-bold">"Microsoft Authenticator"</span> pada peranti
          anda (iOS atau Android).
        </SubStep>
        <div className="flex flex-wrap items-center gap-4">
          <Image
            src="/mauthlogo.png"
            width={200}
            height={200}
            alt="Microsoft Authenticator"
            className="h-auto w-20 rounded-xl drop-shadow"
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458"
              target="_blank"
            >
              <Image
                src="/appstore.png"
                width={300}
                height={100}
                alt="App Store"
                className="h-auto w-32"
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.azure.authenticator&pli=1"
              target="_blank"
            >
              <Image
                src="/gplay.png"
                width={300}
                height={100}
                alt="Google Play"
                className="h-auto w-32"
              />
            </Link>
          </div>
        </div>

        <SubStep letter="b">
          Buka app dan benarkan Microsoft Authenticator{" "}
          <span className="font-bold">mengakses Kamera anda.</span>
        </SubStep>
        <SubStep letter="c">
          Tekan <span className="font-bold">"Add Account (+)"</span>
        </SubStep>
        <StepFigure src="/mauth2.png" alt="Tambah akaun" />
        <SubStep letter="d">
          Pilih <span className="font-bold">"Work or School Account"</span>, kemudian
          pilih <span className="font-bold">"Scan QR code"</span>
        </SubStep>
        <StepFigure src="/mfad.png" alt="Imbas kod QR" />
        <SubStep letter="e">
          Klik akaun berdaftar yang <span className="font-bold">dipaparkan</span>.
        </SubStep>
        <StepFigure src="/mfae.png" alt="Akaun berdaftar" />
        <SubStep letter="f">
          Masukkan nombor yang dipaparkan ke dalam pengesah.
        </SubStep>
        <StepFigure src="/mfaf.png" alt="Masukkan nombor pengesah" />
        <SubStep letter="g">
          Jika persediaan berjaya, anda akan menerima pengesahan{" "}
          <span className="font-bold">"Notification Approved"</span>. Tekan{" "}
          <span className="font-bold">"Next"</span>.
        </SubStep>
        <StepFigure src="/mfag.png" alt="Pengesahan berjaya" />

        <Callout>
          Perhatian: akaun mungkin mengambil masa 24 jam untuk diaktifkan.
        </Callout>

        <div className="rounded-xl border border-sand-300 bg-sand-50 p-4">
          <h4 className="m-0 mb-1.5 font-display text-[15px] font-bold text-sand-900">
            Pilihan MFA alternatif
          </h4>
          <p className="m-0 mb-3 text-[13.5px] text-sand-800">
            Jika anda tidak dapat menyediakan Microsoft Authenticator, anda boleh
            menggunakan alternatif ini:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 text-[13.5px]">
              <p className="m-0 font-semibold text-sand-900">Pengesahan Telefon:</p>
              <ul className="m-0 list-disc space-y-1 pl-5 text-sand-800">
                <li>Tekan "I want to set up a different method"</li>
                <li>Pilih "Phone" dan tekan "Confirm"</li>
                <li>Masukkan nombor telefon bimbit anda</li>
                <li>Pilih "Receive a code" dan ikut arahan seterusnya</li>
              </ul>
            </div>
            <div className="flex flex-col gap-1.5 text-[13.5px]">
              <p className="m-0 font-semibold text-sand-900">Untuk Pengguna Huawei:</p>
              <ul className="m-0 list-disc space-y-1 pl-5 text-sand-800">
                <li>Muat turun "Cooper Authy" melalui Huawei AppGallery</li>
                <li>Buka apl dan tekan + di penjuru kanan sebelah atas</li>
                <li>Imbas kod QR di skrin Authentication</li>
                <li>Masukkan kod 6 digit dan klik "Submit"</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
];

const ROADMAP: RoadmapPhase[] = [
  {
    eyebrow: "Selepas pendaftaran selesai",
    title: "Perjalanan pelajar anda bermula di sini",
    steps: [
      {
        title: "Dapatkan Nombor Matrik & kata laluan lalai anda",
        note: 'Dalam emel "Welcome" daripada UNITAR, dihantar ke emel peribadi anda.'
      },
      {
        title: "Log masuk ke Papan Pemuka Pelajar anda",
        note: "Guna pelayar Chrome."
      },
      { title: "Aktifkan Emel Pelajar anda (Office 365)" },
      { title: "Akses Student Resource Backpack (SRB) dalam CN" },
      {
        title: "Semak kursus yang didaftarkan dan jadual kelas",
        note: "Dalam UNIEC Campus V2 (UNIECOLLEGE untuk UNITAR College)."
      },
      { title: "Akses kursus anda dalam CN" }
    ],
    finish: {
      title: "Anda sudah bersedia!",
      note: "Mari mulakan perjalanan pembelajaran anda."
    },
    badges: [
      {
        title: "Bersedia",
        note: "Siapkan segalanya untuk permulaan yang lancar."
      },
      {
        title: "Kekal termaklum",
        note: "Dapatkan maklumat yang betul pada masa yang tepat."
      },
      { title: "Kami sedia membantu", note: "Pasukan kami sedia membantu anda." },
      {
        title: "Perjalanan anda, keutamaan kami",
        note: "Mari jadikan semester pertama anda berjaya."
      }
    ]
  },
  {
    eyebrow: "Aktiviti utama sepanjang semester",
    title: "Perjalanan semester anda diteruskan",
    steps: [
      { title: "Kaji bahan kursus anda" },
      { title: "Hadir dalam kelas yang dijadualkan" },
      { title: "Selesaikan (dan serahkan) tugasan yang diperlukan" },
      { title: "Selesaikan yuran tertunggak", note: "Jika ada." },
      {
        title: "Laksanakan pendaftaran kursus",
        note: "Dalam UNIEC Campus V2 / UNIECOLLEGE."
      },
      { title: "Muat turun (atau cetak) slip peperiksaan", note: "Jika berkenaan." },
      { title: "Duduki peperiksaan akhir", note: "Jika berkenaan." }
    ],
    finish: {
      title: "Semester berjaya diselesaikan!",
      note: "Syabas — kekalkan momentum dan tamatkan dengan cemerlang."
    },
    badges: [
      { title: "Kekal aktif", note: "Kaji bahan anda dan sertai dengan aktif." },
      { title: "Ikut jadual", note: "Hadir kelas dan jejaki tarikh penting." },
      {
        title: "Lengkapkan pentaksiran",
        note: "Serahkan tugasan tepat pada masa dan sebaik mungkin."
      },
      {
        title: "Tamatkan dengan cemerlang",
        note: "Bersedia dan lakukan yang terbaik dalam peperiksaan akhir."
      }
    ]
  }
];

const CHECKLIST = [
  {
    title: "Persediaan untuk Semester Pertama anda",
    items: [
      'Dapatkan Nombor Matrik & kata laluan lalai (dalam emel "Welcome" daripada UNITAR)',
      "Log masuk ke Papan Pemuka Pelajar anda",
      "Aktifkan Emel Pelajar anda (Office 365)",
      "Akses Student Resource Backpack (SRB) dalam CN",
      "Semak kursus yang didaftarkan dan jadual kelas dalam UNIEC Campus V2",
      "Akses kursus anda dalam CN"
    ]
  },
  {
    title: "Sepanjang Semester",
    items: [
      "Kaji bahan kursus",
      "Hadir dalam kelas yang dijadualkan",
      "Selesaikan (dan serahkan) tugasan yang diperlukan",
      "Selesaikan yuran tertunggak (jika ada)",
      "Laksanakan pendaftaran kursus (dalam UNIEC Campus V2/UNIECCOLLEGE)",
      "Muat turun (atau cetak) slip peperiksaan (jika berkenaan)",
      "Duduki peperiksaan akhir (jika berkenaan)"
    ]
  },
  {
    title: "Persediaan untuk Semester Seterusnya",
    items: [
      "Semak kursus yang didaftarkan dan jadual kelas dalam UNIEC Campus V2",
      "Akses kursus anda dalam CN",
      'Ulang senarai dalam "Sepanjang Semester"'
    ]
  }
];

const FAQS = [
  {
    q: "Bagaimana saya boleh dapatkan Nombor Matrik pelajar saya untuk mengakses sistem UNITAR?",
    a: (
      <p className="m-0">
        Nombor Matrik anda dinyatakan dalam{" "}
        <span className="font-bold text-sand-900">SURAT TAWARAN (OFFER LETTER)</span>{" "}
        yang anda terima melalui alamat emel peribadi yang didaftarkan.
      </p>
    )
  },
  {
    q: "Bagaimana saya boleh mendapatkan kad matrik saya?",
    a: (
      <>
        <p className="m-0">
          <span className="font-bold text-sand-900">Pelajar Konvensional</span>:
          Anda boleh mengambil kad matrik fizikal semasa Sesi Onboarding, atau
          hubungi kampus masing-masing untuk menyemak sama ada kad anda sedia untuk
          diambil.
        </p>
        <p className="m-0 mt-2">
          <span className="font-bold text-sand-900">Pelajar Dalam Talian</span>: Kad
          Matrik Digital disediakan untuk Pelajar Dalam Talian dan akan dijana atas
          permintaan. Anda boleh{" "}
          <span className="font-bold text-sand-900">buka tiket</span> (melalui ikon{" "}
          <span className="font-bold text-sand-900">OSC Helpdesk</span> dalam Student
          Dashboard anda) untuk memohon{" "}
          <span className="font-bold text-sand-900">kad matrik digital</span>.
        </p>
      </>
    )
  },
  {
    q: "Bagaimanakah saya boleh menyertai kelas berjadual (dalam talian) saya?",
    a: (
      <>
        <p className="m-0 mb-2">
          NOTA: Kelas berjadual (dalam talian) anda akan dijalankan pada Ms Teams.
          Butang mesyuarat Teams berada dalam kursus anda. Jika anda mempunyai akaun
          Microsoft peribadi/kerja, pastikan anda telah log masuk ke akaun Microsoft
          Pelajar UNITAR anda.
        </p>
        <ol className="m-0 list-[lower-alpha] space-y-1 pl-5">
          <li>Log masuk ke Student Dashboard: auth.unitar.my anda</li>
          <li>
            Klik CourseNetworking &gt; Courses &gt; Scheduled Classes &gt; Link to
            Join Your Classes (klik butang Teams Meeting di bahagian bawah halaman)
          </li>
        </ol>
        <p className="m-0 mt-3 text-sm text-sand-800">
          JIKA anda cuba menyertai sesi Teams TANPA melog masuk akaun Microsoft
          UNITAR anda (melangkau Langkah a), anda akan:
        </p>
        <ul className="m-0 list-disc space-y-1 pl-5 text-sm text-sand-800">
          <li>
            Terperangkap di Lobi sesi, menunggu seseorang untuk membenarkan anda
            masuk bilik.
          </li>
          <li>Menyertai sesi sebagai Tetamu.</li>
        </ul>
      </>
    )
  },
  {
    q: "Adakah OK untuk menyertai sesi kelas Teams sebagai Tetamu?",
    a: (
      <>
        <p className="m-0">
          <span className="font-semibold">
            Anda amat dinasihatkan untuk TIDAK berbuat demikian.
          </span>{" "}
          Sila rujuk FAQ 3.
        </p>
        <ul className="m-0 mt-2 list-disc space-y-1 pl-5">
          <li>
            "Tetamu" dalam sesi Teams ialah "orang luar". Ini bermakna anda belum log
            masuk ke akaun Microsoft UNITAR pelajar anda.
          </li>
          <li>
            Selagi ada SATU Tetamu hadir dalam sesi Teams:
            <ul className="m-0 mt-1 list-[circle] space-y-1 pl-5">
              <li>
                Tetamu tidak akan mendapat akses sepenuhnya kepada fungsi Teams.
              </li>
              <li>SEMUA ORANG dalam sesi tidak akan dapat berkongsi fail.</li>
            </ul>
          </li>
        </ul>
      </>
    )
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-sand-50 font-sans text-sand-900">
      <SiteHeader />

      <SetupProvider
        steps={STEPS}
        labels={LABELS}
        storageKey="unitar-orientasi-bm"
      >
        {/* Welcome + progress */}
        <section className="px-5 pt-3 lg:px-10 lg:pt-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid overflow-hidden rounded-[22px] bg-sand-100 sm:rounded-[30px] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col gap-4 p-6 sm:gap-5 sm:p-12">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
                  Orientasi pelajar baharu
                </span>
                <h1 className="m-0 font-display text-[33px] font-bold leading-[1.08] tracking-tight text-sand-900 sm:text-[52px]">
                  Selamat datang.
                  <br />
                  Mari kita mulakan.
                </h1>
                <p className="m-0 max-w-md text-[15px] leading-relaxed text-sand-800 sm:text-[17.5px]">
                  Empat langkah untuk mengaktifkan akaun pelajar anda, akses kursus,
                  dan bersedia untuk semester pertama.
                </p>

                <div className="max-w-md">
                  <SetupProgress />
                </div>

                <div className="max-w-md">
                  <Callout>
                    Pastikan anda sudah terima{" "}
                    <span className="font-bold text-sand-900">Nombor Matrik</span> dan{" "}
                    <span className="font-bold text-sand-900">Kata Laluan lalai</span>{" "}
                    daripada emel peribadi anda.
                  </Callout>
                </div>
              </div>

              <Image
                src="/hero.jpeg"
                width={900}
                height={700}
                alt="Pelajar UNITAR"
                priority
                className="order-first h-48 w-full object-cover sm:h-64 lg:order-last lg:h-full"
              />
            </div>
          </div>
        </section>

        {/* The whole journey at a glance, before the detailed steps */}
        <section className="px-5 pt-9 lg:px-10 lg:pt-14">
          <div className="mx-auto max-w-6xl">
            <Roadmap
              id="peta-perjalanan"
              eyebrow="Peta perjalanan anda"
              heading="13 langkah semester pertama anda"
              intro='Inilah keseluruhan perjalanan anda sepintas lalu — daripada emel "Welcome" sehingga peperiksaan akhir. Lengkapkan persediaan akaun di bawah, kemudian jadikan peta ini rujukan sepanjang semester.'
              phases={ROADMAP}
              footnote="Setiap langkah membawa anda lebih dekat kepada kejayaan!"
            />
          </div>
        </section>

        {/* Account setup */}
        <section className="px-5 pt-9 lg:px-10 lg:pt-14">
          <div className="mx-auto max-w-6xl">
            <SectionHeading id="persediaan">Persediaan akaun</SectionHeading>
            <div className="mt-4 sm:mt-6">
              <SetupSteps />
            </div>
          </div>
        </section>
      </SetupProvider>

      {/* What's next */}
      <section className="px-5 pt-9 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="seterusnya">Seterusnya</SectionHeading>
          <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-5">
            <NextCard
              href="#senarai-semak"
              title="Senarai Semak"
              body="Jejaki kemajuan anda sepanjang semester."
              tint="bg-sand-100"
              dot="bg-unitar-orange"
            />
            <NextCard
              href="#bahan"
              title="Bahan Pengajian"
              body="Akses Student Resource Backpack dalam CN."
              tint="bg-[#E7F0F6]"
              dot="bg-unitar-blue"
            />
            <NextCard
              href="#soalan-lazim"
              title="Soalan Lazim"
              body="Jawapan kepada soalan yang kerap ditanya."
              tint="bg-done-tint"
              dot="bg-done"
            />
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="px-5 pt-9 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="senarai-semak">Senarai semak</SectionHeading>
          <p className="m-0 mt-2 text-[14.5px] text-sand-800">
            Tandakan setiap item setelah selesai — kemajuan anda disimpan pada
            peranti ini.
          </p>
          <div className="mt-5">
            <Checklist
              groups={CHECKLIST}
              labels={{ count: "{done}/{total}", reset: "Kosongkan senarai ini" }}
              storageKey="unitar-senarai-semak-bm"
            />
          </div>
          <p className="m-0 mt-4 text-[13px] text-sand-700">
            Untuk penjelasan lanjut, rujuk Student Resource Backpack (SRB) anda.
          </p>
        </div>
      </section>

      {/* Materials */}
      <section className="px-5 pt-9 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="bahan">Bahan pengajian</SectionHeading>
          <p className="m-0 mt-2 max-w-2xl text-[14.5px] text-sand-800">
            Ketahui cara mengakses{" "}
            <span className="font-semibold text-sand-900">
              Student Resource Backpack (SRB)
            </span>{" "}
            anda dengan semua bahan onboarding.
          </p>

          <div className="mt-5">
            <Callout>
              Anda akan dapat mengakses Student Resource Backpack (SRB) anda pada
              hari Isnin Minggu Onboarding anda. Untuk pendaftaran lewat, SRB akan
              tersedia 12 tengah hari keesokan harinya.
            </Callout>
          </div>

          <div className="mt-5 grid gap-5 rounded-[18px] border border-sand-300 bg-white p-5 sm:p-6 lg:grid-cols-2 lg:items-center">
            <ol className="m-0 flex list-none flex-col gap-4 p-0">
              {[
                <>
                  Log masuk ke{" "}
                  <span className="font-bold text-sand-900">auth.unitar.my</span>{" "}
                  dashboard.
                </>,
                <>
                  Tekan <span className="font-bold text-sand-900">CourseNetworking</span>
                </>,
                <>
                  Tekan <span className="font-bold text-sand-900">Courses</span> dan
                  pilih{" "}
                  <span className="font-bold text-sand-900">
                    Student Resource Backpack
                  </span>{" "}
                  untuk mengakses bahan onboarding anda.
                </>
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-unitar-blue text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-sand-800">
                    {text}
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex flex-col items-center gap-4 rounded-xl bg-sand-50 p-5">
              <Image
                src="/cn.png"
                width={200}
                height={200}
                alt="CourseNetworking"
                className="h-auto w-24"
              />
              <StepFigure src="/srb.png" alt="Student Resource Backpack" />
            </div>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="px-5 pt-9 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="soalan-lazim">Soalan lazim</SectionHeading>
          <div className="mt-4 rounded-[18px] border border-sand-300 bg-white px-5 sm:mt-6 sm:px-6">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-sand-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-sand-900 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14.5px] leading-relaxed text-sand-800">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <HelpBand
        eyebrow="Bantuan & sokongan"
        heading="Tersekat di mana-mana langkah?"
        body="Anda tidak perlu hadapinya sendirian. Seorang ahli Student Success Team telah pun ditugaskan khas untuk anda sepanjang semester pertama."
        team={{
          badge: "Hubungan pertama anda",
          name: "Student Success Team (SST)",
          body: "SST sedia membantu anda sepanjang pengalaman semester pertama — daripada mengaktifkan akaun sehingga menyesuaikan diri dengan kursus anda. Kami telah pun menugaskan seorang ahli SST khas untuk anda.",
          note: "Emelkan kami dan SST anda akan menguruskannya.",
          email: "sst@unitar.my"
        }}
      />

      <OrientationFooter text="Â© 2026 Universiti Antarabangsa UNITAR. Semua hak terpelihara." />
    </div>
  );
}

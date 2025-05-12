/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Mail,
  Shield,
  BookOpen,
  CheckSquare,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  MessagesSquare,
  HomeIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-8 mx-auto">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo_unitar.png"
                width={40}
                height={40}
                alt="UNITAR Logo"
                className="w-36 h-24 rounded-full object-cover -ml-4"
              />
            </Link>
            <span className="hidden font-bold sr-only sm:inline-block">
              UNITAR International University
            </span>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/orientation/bm">Orientasi</Link>
            </Button>
            <Link href="/eng">
              <Button size="sm" variant="ghost" className="p-0 font-bold">
                <Image
                  src="/eng.png"
                  width={20}
                  height={20}
                  alt="English"
                  className="w-auto max-h-6"
                />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 min-h-[80vh] md:py-24 lg:py-32 bg-gradient-to-b from-blue-200 via-[#e5f5ff] to-white dark:from-gray-900 dark:to-gray-950 items-center justify-center flex px-2 lg:px-0">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="py-0">
                  <p className="text-2xl font-semibold tracking-tighter sm:text-4xl xl:text-5xl/none">
                    Selamat Datang ke
                  </p>
                  <h1 className="text-3xl font-bold tracking-tighter xl:text-6xl/none">
                    Universiti Antarabangsa{" "}
                    <span className="font-black text-8xl text-nowrap">
                      UNITAR
                    </span>
                  </h1>
                </div>
                <h2 className="text-2xl font-semibold tracking-tighter sm:text-4xl xl:text-5xl/none pt-10">
                  Mari Mulakan Orientasi Anda!
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Ketahui perkara yang anda perlu lakukan untuk mengaktifkan
                  akaun pelajar, akses kursus anda, dan dapatkan permulaan yang
                  hebat bersama UNITAR!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#start">
                  <Button size="sm" className="gap-1.5">
                    Mulakan Orientasi Saya
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/orientation/bm">
                  <Button size="sm" className="gap-1.5" variant="outline">
                    Agenda Orientasi
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-start gap-2 text-sm italic">
                <AlertCircle className="min-h-4 min-w-4 text-amber-500" />
                <p className="font-medium text-muted-foreground pt-1">
                  Sebelum bermula, pastikan anda sudah terima{" "}
                  <span className="font-bold">Nombor Matrik</span> dan{" "}
                  <span className="font-bold">
                    Kata Laluan lalai atau 'default password'
                  </span>{" "}
                  daripada <span className="font-bold">emel peribadi</span>{" "}
                  anda.
                </p>
              </div>
            </div>
            <Image
              src="/hero.jpeg"
              width={550}
              height={550}
              alt="Student Orientation"
              className="mx-auto order-first md:order-last aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        className="container px-4 py-12 md:px-6 flex self-center"
        id="start"
      >
        <Tabs defaultValue="account-setup" className="w-full">
          <TabsList className="lg:flex flex-row flex-wrap grid grid-cols-2 lg:justify-around justify-around w-full h-fit sticky top-2 z-50 bg-gray-200 gap-x-4">
            <TabsTrigger
              value="account-setup"
              className="flex items-center gap-2 justify-between py-2"
            >
              <span>Persediaan Akaun</span>
              <Shield className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="checklist"
              className="flex items-center gap-2 justify-between py-2"
            >
              <span>Senarai Semak</span>
              <CheckSquare className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              className="flex items-center gap-2 justify-between py-2"
            >
              <span>Bahan Pengajian</span>
              <BookOpen className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="faqs"
              className="flex items-center gap-2 justify-between py-2"
            >
              <span>Soalan Lazim</span>
              <HelpCircle className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          {/* Account Setup Tab */}
          <TabsContent value="account-setup" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sediakan Akaun Pelajar Anda</CardTitle>
                <CardDescription>
                  Ikuti langkah berikutnya untuk sediakan akaun pelajar UNITAR
                  anda dan selamatkannya dengan Multi-Factor Authentication
                  (MFA).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Step 1 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <h3 className="text-xl font-semibold">
                      Log masuk ke Dashboard Pelajar
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <ul className="ml-6 list-disc space-y-2">
                          <li>
                            <p>
                              Pergi ke{" "}
                              <span className="font-bold">
                                Halaman Log Masuk UNITAR
                              </span>
                              :{" "}
                            </p>
                            <Link
                              href="https://auth.unitar.my/"
                              className=""
                              target="_blank"
                            >
                              <Image
                                src="/auth_unitar.png"
                                width={500}
                                height={500}
                                alt="Login Screen"
                                className="mx-auto rounded-md w-full h-auto flex lg:hidden"
                              />
                            </Link>
                            <Link
                              href="https://auth.unitar.my/"
                              className=""
                              target="_blank"
                            >
                              <Button
                                variant={"default"}
                                size="default"
                                className="my-4"
                              >
                                <HomeIcon className="h-4 w-4 mr-2" />
                                auth.unitar.my
                              </Button>
                            </Link>
                          </li>
                          <li className="space-y-2 pt-2">
                            <p>Masukkan Butiran Log Masuk Anda:</p>

                            <div className="flex flex-col gap-0">
                              <Card className="bg-[#005b90] text-white rounded-none">
                                <CardContent className="space-y-2 p-2">
                                  <p className="font-medium text-md text-center">
                                    Username
                                  </p>
                                  <p className="text-red-400 uppercase tracking-tighter font-bold bg-gray-100 text-center py-2 rounded-sm">
                                    Nombor Matrik
                                  </p>
                                  <p className="italic text-xs text-center">
                                    Contoh. MC2301XXXXX
                                  </p>
                                </CardContent>
                              </Card>
                              <Card className="bg-[#f39313] text-white rounded-none py-2">
                                <CardContent className="space-y-2 p-2">
                                  <p className="font-medium text-md text-center">
                                    Default Password
                                  </p>
                                  <div className="grid grid-cols-[1fr,auto,1fr] gap-2 justify-center w-full items-center text-balance text-xs">
                                    <p className="text-red-400 uppercase tracking-tighter font-black bg-gray-100 text-center p-2  w-full">
                                      4 Digit Terakhir No Matrik
                                    </p>
                                    <p className="font-bold text-lg">+</p>
                                    <p className="text-red-400 uppercase tracking-tighter font-black bg-gray-100 text-center p-2 w-full">
                                      4 Digit Terakhir NRIC/Pasport
                                    </p>
                                  </div>
                                  <p className="italic text-center text-xs">
                                    Contoh. 77993883
                                  </p>
                                </CardContent>
                              </Card>
                            </div>

                            {/* <div className="p-4 bg-black text-white text-sm rounded-lg space-y-2">
                              <p className="font-bold">Username:</p>
                              <p className="text-red-500 font-bold bg-gray-100 text-center py-2 rounded-sm">
                                Nombor Matrik anda
                              </p>
                              <p className="italic text-gray-200 text-xs text-center">
                                Contoh. [ MC2301XXXXX ]
                              </p>
                              <p className="font-bold pt-4">
                                Default Password:
                              </p>
                              <div className="grid grid-cols-[1fr,auto,1fr] gap-2 justify-center w-full items-center text-balance text-xs">
                                <p className="text-red-500 font-bold bg-gray-100 text-center p-2 rounded-sm w-full">
                                  4 Digit Terakhir No Matrik
                                </p>{" "}
                                +{" "}
                                <p className="text-red-500 font-bold bg-gray-100 text-center p-2 rounded-sm w-full">
                                  4 Digit Terakhir NRIC/Pasport
                                </p>
                              </div>
                              <p className="italic text-gray-200 text-center text-xs">
                                Contoh. [ 77993883 ]
                              </p>
                            </div> */}
                          </li>
                          <li className="pt-4">
                            Tekan <span className="font-bold">"Login"</span>
                          </li>
                        </ul>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4 hidden lg:flex">
                        <Image
                          src="/auth_unitar.png"
                          width={500}
                          height={500}
                          alt="Login Screen"
                          className="mx-auto rounded-md w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <h3 className="text-xl font-semibold">
                      Sediakan Emel Sandaran Anda
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p>
                          Ini adalah{" "}
                          <span className="font-bold">Tindakan Sekali</span>{" "}
                          (Digesa oleh Microsoft)
                        </p>
                        <ul className="ml-6 list-disc space-y-2">
                          <li>
                            Masukan{" "}
                            <span className="font-bold text-red-500">
                              Emel Peribadi Anda - DUA KALI!
                            </span>
                          </li>
                          <li>
                            Tekan{" "}
                            <span className="font-bold">
                              "Add/Change Email"
                            </span>
                          </li>
                        </ul>
                        <Image
                          src="/secondary_email.png"
                          width={500}
                          height={500}
                          alt="Backup Email Setup"
                          className="mx-auto rounded-md w-full h-auto lg:hidden flex"
                        />
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4 hidden lg:flex">
                        <Image
                          src="/secondary_email.png"
                          width={500}
                          height={500}
                          alt="Backup Email Setup"
                          className="mx-auto rounded-md w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-4 ">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">
                      Sediakan Akaun Pelajar Anda
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex flex-row gap-4 items-center">
                          <p>
                            Dalam{" "}
                            <span className="font-bold">
                              "Student Dashboard"
                            </span>{" "}
                            anda
                          </p>
                        </div>
                        <ol className="ml-6 list-none space-y-6 ">
                          <li className="flex flex-col gap-2 w-fit items-start">
                            <p>
                              a. Tekan{" "}
                              <span className="font-bold">Office 365</span>
                            </p>
                            <Image
                              src="/big-o.png"
                              width={300}
                              height={200}
                              alt="Office 365"
                              className="mx-auto rounded-md w-32 h-auto md:hidden flex"
                            />
                          </li>
                          <li className="flex flex-col gap-2 w-fit items-start">
                            <p>
                              b. Masukkan{" "}
                              <span className="font-bold uppercase text-red-500">
                                EMEL PELAJAR
                              </span>{" "}
                              anda. Lepas itu, tekan{" "}
                              <span className="font-bold">"Next"</span>
                            </p>
                            <Image
                              src="/mfa1.png"
                              width={300}
                              height={200}
                              alt="MFA Setup"
                              className="mx-auto rounded-md h-auto md:hidden flex w-full"
                            />
                          </li>
                          <li className="flex flex-col gap-2 w-fit items-start">
                            <p>
                              c. Masukkan{" "}
                              <span className="font-bold uppercase text-red-500">
                                KATA LALUAN
                              </span>{" "}
                              anda. Lepas itu, tekan{" "}
                              <span className="font-bold">"Sign In"</span>
                            </p>
                            <Image
                              src="/mfa2-password.png"
                              width={300}
                              height={200}
                              alt="MFA Setup"
                              className="mx-auto rounded-md w-full h-auto md:hidden flex"
                            />
                          </li>
                          <li className="flex flex-col gap-2 w-fit items-start justify-start">
                            <p>
                              d. Tekan <span className="font-bold">"Next"</span>{" "}
                              (Maklumat lanjut diperlukan untuk melindungi akaun
                              anda){" "}
                            </p>
                            <Image
                              src="/mfa3.png"
                              width={300}
                              height={200}
                              alt="MFA Setup"
                              className="mx-auto rounded-md w-full h-auto md:hidden flex"
                            />
                          </li>
                        </ol>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4 hidden md:flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-4">
                          <Image
                            src="/big-o.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-32 h-auto"
                          />
                          <Image
                            src="/mfa1.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-54 h-auto"
                          />
                          <Image
                            src="/mfa2-password.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-54 h-auto"
                          />
                          <Image
                            src="/mfa3.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-54 h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <h3 className="text-xl font-semibold">
                      Lindungi Akaun Anda - Persediaan MFA
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <ol className="ml-6 list-none space-y-6">
                          <li className="space-y-2 w-fit items-start">
                            a. Muat turun dan pasang{" "}
                            <span className="font-bold">
                              "Microsoft Authenticator"
                            </span>{" "}
                            pada peranti anda (iOS atau Android).
                            <div className="w-fit flex flex-row gap-4 items-center py-2">
                              <Image
                                src="/mauthlogo.png"
                                width={500}
                                height={500}
                                alt="Microsoft Authenticator App"
                                className="mx-auto w-24 h-auto drop-shadow-lg rounded-xl"
                              />
                              <div className="flex flex-col lg:flex-row">
                                <Link
                                  href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458"
                                  target="_blank"
                                >
                                  <Image
                                    src="/appstore.png"
                                    width={500}
                                    height={500}
                                    alt="App Store"
                                    className="mx-auto w-32 h-auto drop-shadow-sm"
                                  />
                                </Link>
                                <Link
                                  href="https://play.google.com/store/apps/details?id=com.azure.authenticator&pli=1"
                                  target="_blank"
                                >
                                  <Image
                                    src="/gplay.png"
                                    width={500}
                                    height={500}
                                    alt="App Store"
                                    className="mx-auto w-32 h-auto drop-shadow-md"
                                  />
                                </Link>
                              </div>
                            </div>
                            <p className="italic text-sm flex flex-row gap-2 items-center">
                              Pilihan MFA alternatif di bawah{" "}
                              <ChevronDown className="h-4 w-4 text-black" />
                            </p>
                          </li>
                          <li className="space-y-2 w-fit items-start">
                            b. Buka app dan benarkan Microsoft Authenticator{" "}
                            <span className="font-bold">
                              mengakses Kamera anda.
                            </span>
                          </li>
                          <li className="space-y-2 w-fit items-start">
                            <p>
                              c. Tekan{" "}
                              <span className="font-bold">
                                "Add Account (+)"
                              </span>
                            </p>
                            <Image
                              src="/mauth2.png"
                              width={300}
                              height={200}
                              alt="MFA Setup"
                              className="mx-auto rounded-md w-full h-auto lg:col-span-2 md:hidden flex"
                            />
                          </li>
                          <li className="space-y-2 w-fit items-start justify-start">
                            <p>
                              d. Pilih{" "}
                              <span className="font-bold">
                                "Work or School Account"
                              </span>
                              , kemudian pilih{" "}
                              <span className="font-bold">"Scan QR code"</span>
                            </p>
                            <Image
                              src="/mfad.png"
                              width={300}
                              height={200}
                              alt="MFA Setup"
                              className="mx-auto rounded-md w-full h-auto md:hidden flex"
                            />
                          </li>
                          <li className="space-y-2 w-fit items-start">
                            <p>
                              e. Klik akaun berdaftar yang{" "}
                              <span className="font-bold">dipaparkan</span>.
                            </p>
                            <Image
                              src="/mfae.png"
                              width={300}
                              height={200}
                              alt="MFA Setup"
                              className="mx-auto rounded-md w-full h-auto md:hidden flex"
                            />
                          </li>
                          <li className="space-y-2 w-fit items-start">
                            <p>
                              f. Masukkan nombor yang dipaparkan ke dalam
                              pengesah.
                            </p>
                            <Image
                              src="/mfaf.png"
                              width={300}
                              height={200}
                              alt="MFA Setup"
                              className="mx-auto rounded-md w-full h-auto md:hidden flex"
                            />
                          </li>
                          <li className="space-y-2 w-fit items-start">
                            g. Jika persediaan berjaya, anda akan menerima
                            pengesahan berikutan. Tekan{" "}
                            <span className="font-bold">"Next"</span>
                            <p className="font-bold flex flex-row gap-2 items-center py-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />{" "}
                              Notification Approved
                            </p>
                            <Image
                              src="/mfag.png"
                              width={300}
                              height={200}
                              alt="MFA Setup"
                              className="mx-auto rounded-md w-full h-auto md:hidden flex"
                            />
                          </li>
                        </ol>
                        <div className="bg-gray-50 p-4 rounded-xl flex w-fit">
                          <p className="text-sm text-muted-background">
                            ⚠️ Perhatian: Akaun mungkin mengambil masa 24 jam
                            untuk dibuat diaktifkan.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4 md:flex flex-col gap-2 hidden">
                        <div className="grid grid-cols-2 gap-4">
                          <Image
                            src="/mauth2.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-54 h-auto lg:col-span-2"
                          />
                          <Image
                            src="/mfad.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-full h-auto lg:col-span-2"
                          />
                          <Image
                            src="/mfae.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-54 h-auto lg:col-span-2"
                          />
                          <Image
                            src="/mfaf.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-full h-auto lg:col-span-2"
                          />
                          <Image
                            src="/mfag.png"
                            width={300}
                            height={200}
                            alt="MFA Setup"
                            className="mx-auto rounded-md w-54 h-auto lg:col-span-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternative MFA */}
                <div className="rounded-lg border bg-muted/10 p-4">
                  <h4 className="mb-2 font-medium">Pilihan MFA Alternatif</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Jika anda tidak dapat menyediakan Microsoft Authenticator,
                    anda boleh menggunakan alternatif ini:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Pengesahan Telefon:</p>
                      <ul className="ml-6 list-disc space-y-1">
                        <li>Tekan "I want to set up a different method"</li>
                        <li>Pilih "Phone" and tekan "Confirm"</li>
                        <li>Masukkan nombor telefon bimbit anda</li>
                        <li>
                          Pilih "Receive a code" dan ikut arahan seterusnya.
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Untuk Pengguna Huawei:</p>
                      <ul className="ml-6 list-disc space-y-1">
                        <li>
                          Muat turun applikasi "Cooper Authy" melalui Huawei
                          AppGallery
                        </li>
                        <li>
                          Buka apl dan tekan + di penjuru kanan sebelah atas
                        </li>
                        <li>Imbas kod QR di Skrin {"Authentication"}.</li>
                        <li>Masukkan kod 6 digit dan klik "Submit"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="#help" className="w-full">
                  <Button variant="outline" className="w-full">
                    Perlukan Bantuan? Hubungi sekarang!
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onboarding Materials Tab */}
          <TabsContent value="materials" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Akses Bahan Pengajian Anda</CardTitle>
                <CardDescription>
                  Ketahui cara mengakses anda{" "}
                  <span className="font-bold">
                    Student Resource Backpack (SRB)
                  </span>{" "}
                  dengan semua bahan onboarding anda.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-1 h-5 w-5 text-amber-600 dark:text-amber-500" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-400">
                        Nota Penting
                      </h4>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-amber-700 dark:text-amber-300">
                        <li>
                          Anda akan dapat mengakses "Student Resource Backpack"
                          (SRB) pada hari Rabu Minggu Onboarding anda.
                        </li>
                        <li>
                          Untuk pendaftaran lewat: SRB akan tersedia 12 tengah
                          hari keesokan harinya.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ikuti langkah ini:</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          1
                        </div>
                        <p>
                          Log masuk ke{" "}
                          <span className="font-bold">auth.unitar.my</span>{" "}
                          dashboard.
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          2
                        </div>
                        <p>
                          Tekan{" "}
                          <span className="font-bold">CourseNetworking</span>
                        </p>
                        <Image
                          src="/cn.png"
                          width={300}
                          height={200}
                          alt="Student Resource Backpack"
                          className="mx-auto rounded-md w-28 h-28 md:hidden flex"
                        />
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          3
                        </div>
                        <p>
                          Tekan <span className="font-bold">Courses</span> dan
                          pilih{" "}
                          <span className="font-bold">
                            Student Resource Backpack
                          </span>{" "}
                          untuk mengakses bahan onboarding anda.
                        </p>
                      </div>
                      <Image
                        src="/srb.png"
                        width={300}
                        height={200}
                        alt="Student Resource Backpack"
                        className="mx-auto rounded-md w-full h-auto md:hidden flex"
                      />
                    </div>
                    <div className="rounded-lg border bg-muted/50 p-4 md:flex hidden flex-col gap-4">
                      <Image
                        src="/cn.png"
                        width={300}
                        height={200}
                        alt="Student Resource Backpack"
                        className="mx-auto rounded-md w-32 h-32"
                      />
                      <Image
                        src="/srb.png"
                        width={300}
                        height={200}
                        alt="Student Resource Backpack"
                        className="mx-auto rounded-md w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-10">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                    Mengalami Masalah?
                  </h2>
                  <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-balance">
                    Jika anda mempunyai sebarang pertanyaan atau isu berkaitan
                    CN, ikuti langkah berikutnya untuk dapatkan bantuan:
                  </p>
                </div>
                <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
                  <Card className="flex flex-col  items-center justify-center">
                    <CardHeader>
                      <CardTitle className="flex flex-row gap-8 items-center justify-center">
                        <div className="mx-auto mb-4 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xl font-bold text-primary">
                            1
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                          <p>Akses "One Stop Centre"</p>
                          <p className="text-sm text-muted-foreground text-left">
                            Dalam "Student Dashboard" anda, tekan icon{" "}
                            <span className="font-bold">"One Stop Centre"</span>
                            .
                          </p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                      <Image
                        src="/osc.png"
                        width={300}
                        height={300}
                        alt="One Stop Centre"
                        className="mx-auto rounded-md w-32 h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="flex flex-col items-center justify-between">
                    <CardHeader className="text-center">
                      <CardTitle className="flex flex-row gap-8 items-center justify-center">
                        <div className="mx-auto mb-4 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xl font-bold text-primary">
                            2
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                          <p>Pilih Topik Bantuan</p>
                          <p className="text-sm text-muted-foreground text-left">
                            Untuk Topik Bantuan, pilih
                            "Portal/Course/Class/Email Access.""
                          </p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Image
                        src="/help_topic.png"
                        width={200}
                        height={120}
                        alt="Help Topic"
                        className="mx-auto rounded-md w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                  <Card className="flex flex-col items-center justify-between">
                    <CardHeader className="text-center ">
                      <CardTitle className="flex flex-row gap-8 items-center justify-center">
                        <div className="mx-auto mb-4 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xl font-bold text-primary">
                            3
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                          <p>Pilih Sub-Topik</p>
                          <p className="text-sm text-muted-foreground text-left">
                            Pilih Sub-Topik yang berkaitan dengan isu/pertanyaan
                            anda.
                          </p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src="/sub_topic.png"
                        width={200}
                        height={120}
                        alt="Sub-Topic"
                        className="mx-auto rounded-md w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Checklist Tab */}
          <TabsContent value="checklist" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Senarai Semak Permulaan Anda</CardTitle>
                <CardDescription>
                  Jejaki kemajuan orientasi anda dengan senarai semak ini.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-3">
                  {/* First Semester Prep */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Persediaan untuk Semester Pertama anda
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check1" className="mt-1" />
                        <label htmlFor="check1" className="text-sm">
                          Dapatkan Nombor Matrik & kata laluan lalai (dalam emel
                          "Welcome" daripada UNITAR)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check2" className="mt-1" />
                        <label htmlFor="check2" className="text-sm">
                          Log masuk ke Papan Pemuka Pelajar anda
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check3" className="mt-1" />
                        <label htmlFor="check3" className="text-sm">
                          Aktifkan Emel Pelajar anda (Office 365){" "}
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check4" className="mt-1" />
                        <label htmlFor="check4" className="text-sm">
                          Akses Student Resource Backpack (SRB) dalam CN
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check5" className="mt-1" />
                        <label htmlFor="check5" className="text-sm">
                          Semak kursus yang didaftarkan dan jadual kelas dalam
                          UNIEC Campus V2
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check6" className="mt-1" />
                        <label htmlFor="check6" className="text-sm">
                          Akses kursus anda dalam CN
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* During the Semester */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Sepanjang Semester
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check7" className="mt-1" />
                        <label htmlFor="check7" className="text-sm">
                          Kaji bahan kursus
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check8" className="mt-1" />
                        <label htmlFor="check8" className="text-sm">
                          Hadir dalam kelas yang dijadualkan
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check9" className="mt-1" />
                        <label htmlFor="check9" className="text-sm">
                          Selesaikan (dan serahkan) tugasan yang diperlukan{" "}
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check10" className="mt-1" />
                        <label htmlFor="check10" className="text-sm">
                          Selesaikan yuran tertunggak (jika ada)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check11" className="mt-1" />
                        <label htmlFor="check11" className="text-sm">
                          Laksanakan pendaftaran kursus (dalam UNIEC Campus
                          V2/UNIECCOLLEGE)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check12" className="mt-1" />
                        <label htmlFor="check12" className="text-sm">
                          Muat turun (atau cetak) slip peperiksaan (jika
                          berkenaan)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check13" className="mt-1" />
                        <label htmlFor="check13" className="text-sm">
                          Duduki peperiksaan akhir (jika berkenaan)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Subsequent Semesters */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Persediaan untuk Semester Seterusnya
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check14" className="mt-1" />
                        <label htmlFor="check14" className="text-sm">
                          Semak kursus yang didaftarkan dan jadual kelas dalam
                          UNIEC Campus V2
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check15" className="mt-1" />
                        <label htmlFor="check15" className="text-sm">
                          Akses kursus anda dalam CN
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check16" className="mt-1" />
                        <label htmlFor="check16" className="text-sm">
                          Ulang senarai dalam "Sepanjang Semester"
                        </label>
                      </div>
                    </div>
                    <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm text-muted-foreground">
                        For clarifications on any of these items, refer to your
                        Student Resource Backpack (SRB).
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              {/* <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Printable Checklist
                </Button>
              </CardFooter> */}
            </Card>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Soalan Lazim</CardTitle>
                <CardDescription>
                  Cari jawapan kepada soalan lazim tentang permulaan di UNITAR.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full text-left"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-medium text-left">
                      Bagaimana saya boleh dapatkan Nombor Matrik pelajar saya
                      untuk mengakses sistem UNITAR?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Semak emel peribadi anda (peti masuk atau spam) untuk
                        emel "Welcome" dari UNITAR.
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        NOTA: Jika anda tidak dapat{" "}
                        <span className="font-bold">emel "Welcome:</span>,
                        hantar emel kepada admission@unitar.my.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-medium text-left">
                      Bagaimana untuk mengumpul kad matrik fizikal saya?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="font-medium">PILIHAN 1:</p>
                      <p>Singgah ke Kampus UNITAR.</p>
                      <p className="mt-2 font-medium">PILIHAN 2:</p>
                      <p>
                        Buat tiket (melalui ikon One Stop Center pada anda
                        Student Dashboard) untuk meminta kad matrik dihantar ke
                        rumah anda. Pastikan anda memasukkan nama penuh anda,
                        gambar berukuran pasport dan alamat surat menyurat.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-medium text-left">
                      Bagaimanakah saya boleh menyertai kelas berjadual (dalam
                      talian) saya?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">
                        NOTA: Kelas berjadual (dalam talian) anda akan
                        dijalankan pada Ms Teams. Butang mesyuarat Teams berada
                        dalam kursus anda. Jika anda mempunyai akaun Microsoft
                        peribadi/kerja, pastikan anda telah log masuk ke UNITAR
                        Student Microsoft anda akaun.
                      </p>
                      <ol className="ml-5 list-decimal space-y-1">
                        <li>
                          Log masuk ke Student Dashboard: auth.unitar.my anda
                        </li>
                        <li>
                          Klik "CourseNetworking" &gt; Courses &gt; Scheduled
                          Classes &gt; Link to Join Your Classes (Klik pada
                          Butang "Teams Meeting" di bahagian bawah halaman)
                        </li>
                      </ol>
                      <p className="mt-3 text-sm text-muted-foreground">
                        JIKA anda cuba menyertai "Teams Meeting" TANPA melog
                        masuk akaun Microsoft UNITAR anda (melangkau Langkah 1),
                        anda akan:
                      </p>
                      <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>
                          Terperangkap di Lobi sesi, menunggu seseorang untuk
                          membenarkan awak masuk bilik.
                        </li>
                        <li>Menyertai kelas sebagai tetamu.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="font-medium text-left">
                      Adakah OK untuk menyertai kelas "Teams Meeting" sebagai
                      tetamu?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="font-medium">
                        Anda dinasihatkan untuk TIDAK berbuat demikian
                      </p>
                      <ul className="ml-5 mt-2 list-disc space-y-1">
                        <li>
                          Tetamu dalam sesi Teams ialah orang luar. Ini bermakna
                          anda belum log masuk ke pelajar anda akaun Microsoft
                          UNITAR.
                        </li>
                        <li>
                          Selagi ada SATU tetamu hadir dalam sesi Teams, tetamu
                          tidak akan mendapat akses sepenuhnya Fungsi Teams.
                        </li>
                        <li>
                          SEMUA ORANG dalam kelas tidak akan dapat berkongsi
                          fail.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Help & Support Section */}
      <section id="help" className="w-full py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 md:px-6 self-center mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Bantuan & Sokongan
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground text-balance sm:text-lg sm:leading-7">
              Jika anda mempunyai sebarang masalah atau pertanyaan, sila hubungi
              kami melalui:
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-md flex flex-row flex-wrap gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Kakitangan UNITAR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <MessagesSquare className="h-5 w-5 text-primary" />
                  <p className="font-medium">WhatsApp</p>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Butiran hubungan WhatsApp tersedia dalam Emel "Welcome" yang
                  dihantar ke emel peribadi anda.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Hubungan Langsung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="font-medium">admission@unitar.my</p>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Untuk urusan segera atau jika anda tidak boleh mengakses One
                  Stop Center, sila emel terus kepada kami.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="mailto:admission@unitar.my">Hantar Emel</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 mx-auto">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row mx-auto">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Universiti Antarabangsa UNITAR.
            Semua hak terpelihara.
          </p>
        </div>
      </footer>
    </div>
  );
}

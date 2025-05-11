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
          <div className="mr-4 flex items-center">
            <Image
              src="/logo_unitar.png"
              width={40}
              height={40}
              alt="UNITAR Logo"
              className="mr-2 w-36 h-28 rounded-full object-cover"
            />
            <span className="hidden font-bold sr-only sm:inline-block">
              UNITAR International University
            </span>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#help">Help & Support</Link>
            </Button>
            <Link href="/bm">
              <Button size="sm" variant="ghost" className="p-0 font-bold">
                <Image
                  src="/mal.png"
                  width={20}
                  height={20}
                  alt="Bahasa Malaysia"
                  className="w-auto max-h-6"
                />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 min-h-[80vh] md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 items-center justify-center flex px-6 lg:px-0">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Welcome to UNITAR International University
                </h1>
                <h2 className="text-2xl font-semibold tracking-tighter sm:text-4xl xl:text-5xl/none">
                  Let's Get You Started!
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Find out what you need to do to activate your student account,
                  access your courses, and basically get a great head-start on
                  your learning journey with UNITAR!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#start">
                  <Button size="sm" className="gap-1.5">
                    Start My Orientation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-8 w-8 text-amber-500" />
                <p className="font-medium">
                  Before you start, check your{" "}
                  <span className="font-bold">personal email</span> for your{" "}
                  <span className="font-bold">Matric Number</span> and{" "}
                  <span className="font-bold">Default Password.</span>
                </p>
              </div>
            </div>
            <Image
              src="/hero.jpeg"
              width={550}
              height={550}
              alt="Student Orientation"
              className="mx-auto order-first md:order-last aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
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
              <span>Account Setup</span>
              <Shield className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              className="flex items-center gap-2 justify-between py-2"
            >
              <span>Onboarding Materials</span>
              <BookOpen className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="checklist"
              className="flex items-center gap-2 justify-between py-2"
            >
              <span>Checklist</span>
              <CheckSquare className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="faqs"
              className="flex items-center gap-2 justify-between py-2"
            >
              <span>FAQs</span>
              <HelpCircle className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          {/* Account Setup Tab */}
          <TabsContent value="account-setup" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Set Up Your Student Account</CardTitle>
                <CardDescription>
                  Follow these steps to set up your UNITAR student account and
                  secure it with Multi-Factor Authentication (MFA).
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
                      Login to Student Dashboard
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <ul className="ml-6 list-disc space-y-2">
                          <li>
                            <p>
                              Go to{" "}
                              <span className="font-bold">
                                UNITAR's Login Page
                              </span>
                              :{" "}
                            </p>
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
                            <Image
                              src="/auth_unitar.png"
                              width={500}
                              height={500}
                              alt="Login Screen"
                              className="mx-auto rounded-md w-full h-auto flex lg:hidden"
                            />
                          </li>
                          <li className="space-y-2 pt-2">
                            <p>Key in Your Login Details:</p>
                            <div className="p-4 bg-black text-white text-sm rounded-lg space-y-2">
                              <p className="font-bold">Username:</p>
                              <p className="text-red-500 font-bold bg-gray-100 text-center py-2 rounded-sm">
                                Your Matric Number
                              </p>
                              <p className="italic text-gray-200 text-xs text-center">
                                eg. [ MC2301XXXXX ]
                              </p>
                              <p className="font-bold pt-4">
                                Default Password:
                              </p>
                              <div className="flex flex-row gap-2 justify-center w-full items-center text-balance">
                                <p className="text-red-500 font-bold bg-gray-100 text-center py-2 rounded-sm w-full">
                                  Last 4 digits of Matric No
                                </p>{" "}
                                +{" "}
                                <p className="text-red-500 font-bold bg-gray-100 text-center py-2 rounded-sm w-full">
                                  Last 4 digits of IC/Passport No
                                </p>
                              </div>
                              <p className="italic text-gray-200 text-center text-xs">
                                eg. [ 77993883 ]
                              </p>
                            </div>
                          </li>
                          <li className="pt-4">
                            Click <span className="font-bold">Login</span>
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
                      Provide Your Backup Email
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p>
                          This is a{" "}
                          <span className="font-bold">One-Time Action</span>{" "}
                          (prompted by Microsoft)
                        </p>
                        <ul className="ml-6 list-disc space-y-2">
                          <li>
                            Enter your{" "}
                            <span className="font-bold text-red-500">
                              Personal Email - TWICE!
                            </span>
                          </li>
                          <li>
                            Click{" "}
                            <span className="font-bold">Add/Change Email</span>
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
                      Set Up Your Student Account
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex flex-row gap-4 items-center">
                          <p>
                            On your{" "}
                            <span className="font-bold">Student Dashboard</span>
                          </p>
                        </div>
                        <ol className="ml-6 list-none space-y-6 ">
                          <li className="flex flex-col gap-2 w-fit items-start">
                            <p>
                              a. Click{" "}
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
                              b. Key in your{" "}
                              <span className="font-bold uppercase text-red-500">
                                STUDENT EMAIL.
                              </span>{" "}
                              Then click <span className="font-bold">Next</span>
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
                              c. Key in your{" "}
                              <span className="font-bold uppercase text-red-500">
                                PASSWORD.
                              </span>{" "}
                              Then click{" "}
                              <span className="font-bold">Sign In</span>
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
                              d. Click <span className="font-bold">Next</span>{" "}
                              (More information required to secure your account)
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
                      Secure Your Account - MFA Setup
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <ol className="ml-6 list-none space-y-6">
                          <li className="space-y-2 w-fit items-start">
                            a. Install{" "}
                            <span className="font-bold">
                              Microsoft Authenticator
                            </span>{" "}
                            on your device (iOS or Android)
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
                              Alternative MFA options below{" "}
                              <ChevronDown className="h-4 w-4 text-black" />
                            </p>
                          </li>
                          <li className="space-y-2 w-fit items-start">
                            b. Open the app and allow Microsoft Authenticator to{" "}
                            <span className="font-bold">
                              access your Camera.
                            </span>
                          </li>
                          <li className="space-y-2 w-fit items-start">
                            <p>
                              c. Click{" "}
                              <span className="font-bold">Add Account (+)</span>
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
                              d. Select{" "}
                              <span className="font-bold">
                                Work or School Account
                              </span>
                              , then choose{" "}
                              <span className="font-bold">Scan QR code</span>
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
                              e. Click the registered account that is{" "}
                              <span className="font-bold">displayed</span>.
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
                              f. Enter the number displayed into the
                              authenticator.
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
                            g. If the setup is successful, you will receive the
                            following confirmation. Click{" "}
                            <span className="font-bold">Next</span>
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
                            ⚠️ Attention: Account might take 24 hours to be
                            activated.
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
                  <h4 className="mb-2 font-medium">Alternative MFA Options</h4>
                  <p className="mb-2 text-sm text-muted-foreground">
                    If you cant set up Microsoft Authenticator, you can use
                    these alternatives:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Phone Authentication:</p>
                      <ul className="ml-6 list-disc space-y-1">
                        <li>Click I want to set up a different method</li>
                        <li>Select Phone and click Confirm</li>
                        <li>Enter your mobile number</li>
                        <li>Select Receive a code and follow the prompts</li>
                      </ul>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">For Huawei Users:</p>
                      <ul className="ml-6 list-disc space-y-1">
                        <li>
                          Download the Cooper Authy app via the Huawei
                          AppGallery
                        </li>
                        <li>
                          Open the app and tap the + at the top right corner
                        </li>
                        <li>
                          Scan the QR code at the {"Authentication"} Screen
                        </li>
                        <li>Enter the 6-digit code and click Submit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="#help" className="w-full">
                  <Button variant="outline" className="w-full">
                    Need Help? Contact Support
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onboarding Materials Tab */}
          <TabsContent value="materials" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Your Onboarding Materials</CardTitle>
                <CardDescription>
                  Learn how to access your{" "}
                  <span className="font-bold">
                    Student Resource Backpack (SRB)
                  </span>{" "}
                  with all your onboarding materials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-1 h-5 w-5 text-amber-600 dark:text-amber-500" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-400">
                        Important Note
                      </h4>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-amber-700 dark:text-amber-300">
                        <li>
                          You will be able to access your Student Resource
                          Backpack (SRB) on Wednesday of your Onboarding Week.
                        </li>
                        <li>
                          For late enrollment: the SRB will be available 12 noon
                          the following day.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Follow these steps:</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          1
                        </div>
                        <p>
                          Log-in to your{" "}
                          <span className="font-bold">auth.unitar.my</span>{" "}
                          dashboard.
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          2
                        </div>
                        <p>
                          Click{" "}
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
                          Click <span className="font-bold">Courses</span> and
                          then select{" "}
                          <span className="font-bold">
                            Student Resource Backpack
                          </span>{" "}
                          to access your onboarding materials.
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
                    Having Trouble?
                  </h2>
                  <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-balance">
                    If you have any CN-related queries or issues, follow these
                    steps to get help:
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
                          <p>Access One Stop Centre</p>
                          <p className="text-sm text-muted-foreground text-left">
                            On your AUTH Student Dashboard, click the{" "}
                            <span className="font-bold">One Stop Centre</span>{" "}
                            icon.
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
                          <p>Select Help Topic</p>
                          <p className="text-sm text-muted-foreground text-left">
                            For Help Topic, select Portal/Course/Class/Email
                            Access.
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
                          <p>Select Sub-Topic</p>
                          <p className="text-sm text-muted-foreground text-left">
                            Select the Sub-Topic related to your issue/query.
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
                <CardTitle>Your Starting-Out Checklist</CardTitle>
                <CardDescription>
                  Keep track of your onboarding progress with this comprehensive
                  checklist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-3">
                  {/* First Semester Prep */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Prepping for your First Semester
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check1" className="mt-1" />
                        <label htmlFor="check1" className="text-sm">
                          Obtain Matric Number & default password (in welcome
                          email from UNITAR)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check2" className="mt-1" />
                        <label htmlFor="check2" className="text-sm">
                          Log in to your Student Dashboard (use Chrome Browser)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check3" className="mt-1" />
                        <label htmlFor="check3" className="text-sm">
                          Activate your Student Email (Office365)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check4" className="mt-1" />
                        <label htmlFor="check4" className="text-sm">
                          Access Student Resource Backpack (SRB) on CN
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check5" className="mt-1" />
                        <label htmlFor="check5" className="text-sm">
                          Check course(s) registered and class schedule on UNIEC
                          Campus V2
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check6" className="mt-1" />
                        <label htmlFor="check6" className="text-sm">
                          Access course(s) on CN
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* During the Semester */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      During the Semester
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check7" className="mt-1" />
                        <label htmlFor="check7" className="text-sm">
                          Go through course materials
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check8" className="mt-1" />
                        <label htmlFor="check8" className="text-sm">
                          Attend scheduled classes
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check9" className="mt-1" />
                        <label htmlFor="check9" className="text-sm">
                          Complete (and submit) tasks required
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check10" className="mt-1" />
                        <label htmlFor="check10" className="text-sm">
                          Settle (if any) outstanding fees
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check11" className="mt-1" />
                        <label htmlFor="check11" className="text-sm">
                          Perform course registration (on UNIEC Campus
                          V2/UNIECCOLLEGE)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check12" className="mt-1" />
                        <label htmlFor="check12" className="text-sm">
                          Download (or print) exam slip (if applicable)
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check13" className="mt-1" />
                        <label htmlFor="check13" className="text-sm">
                          Sit for final exam (if applicable)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Subsequent Semesters */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Prepping for Subsequent Semesters
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check14" className="mt-1" />
                        <label htmlFor="check14" className="text-sm">
                          Check course(s) registered and class schedule on UNIEC
                          Campus V2
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check15" className="mt-1" />
                        <label htmlFor="check15" className="text-sm">
                          Access course(s) on CN
                        </label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check16" className="mt-1" />
                        <label htmlFor="check16" className="text-sm">
                          Repeat items "During the Semester"
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
                <CardTitle>Get-Started FAQs</CardTitle>
                <CardDescription>
                  Find answers to commonly asked questions about getting started
                  at UNITAR.
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
                      How do I find my student matric ID to access UNITAR
                      systems?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Check your personal email (inbox or spam) for the
                        welcome email from UNITAR.
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        NOTE: If you are unable to find the{" "}
                        <span className="font-bold">welcome email</span>, email
                        to admission@unitar.my.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-medium text-left">
                      How to collect my physical matric card?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="font-medium">OPTION 1:</p>
                      <p>Drop by your UNITAR Campus to collect.</p>
                      <p className="mt-2 font-medium">OPTION 2:</p>
                      <p>
                        Create a ticket (via One Stop Centre icon on your
                        Student Dashboard) to request for your matric card to be
                        delivered. Make sure to include your full name,
                        passport-sized photo and mailing address.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-medium text-left">
                      How do I join my (online) scheduled classes?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">
                        NOTE: Your (online) scheduled classes will be conducted
                        on Ms Teams. The Teams meeting button is in your course.
                        If you have a personal/work Microsoft account, make sure
                        you are signed in to your UNITAR Student Microsoft
                        account.
                      </p>
                      <ol className="ml-5 list-decimal space-y-1">
                        <li>Login to your Student Dashboard: auth.unitar.my</li>
                        <li>
                          Click CourseNetworking &gt; Courses &gt; Scheduled
                          Classes &gt; Link to Join Your Classes (Click the
                          Teams Meeting button at the bottom of the page)
                        </li>
                      </ol>
                      <p className="mt-3 text-sm text-muted-foreground">
                        IF you try to join a Teams session WITHOUT signing in to
                        your UNITAR Microsoft account (skipping Step 1), you
                        will end up:
                      </p>
                      <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>
                          Stuck in the session Lobby, waiting for someone to let
                          you enter the room.
                        </li>
                        <li>Joining the session as a Guest.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="font-medium text-left">
                      Is it OK to join a Teams class session as a Guest?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="font-medium">
                        You are strongly advised NOT to do so. Please refer to
                        FAQ3.
                      </p>
                      <ul className="ml-5 mt-2 list-disc space-y-1">
                        <li>
                          A {"guest"} in a Teams session is an {"outsider"}.
                          This means you have not logged in to your student
                          UNITAR Microsoft account.
                        </li>
                        <li>
                          As long as there is ONE Guest present in a Teams
                          session, the guest will not have access to the full
                          Teams functions.
                        </li>
                        <li>
                          EVERYONE in the session will not be able to share
                          files.
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
              Help & Support
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground text-balance sm:text-lg sm:leading-7">
              If you have any issues or queries, please reach out to us via:
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-md flex flex-row flex-wrap gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Dedicated UNITAR Personnels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <MessagesSquare className="h-5 w-5 text-primary" />
                  <p className="font-medium">WhatsApp</p>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Their WhatsApp contact details are available in the Welcome
                  Email sent to your personal email.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Direct Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <p className="font-medium">admission@unitar.my</p>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  For urgent matters or if you cannot access the One Stop
                  Centre, please email us directly.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="mailto:admission@unitar.my">Send Email</Link>
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
            &copy; {new Date().getFullYear()} UNITAR International University.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

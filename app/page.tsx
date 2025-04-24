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
  AlertCircle
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Image
              src="/logo_unitar.png"
              width={40}
              height={40}
              alt="UNITAR Logo"
              className="mr-2"
            />
            <span className="hidden font-bold sm:inline-block">
              UNITAR International University
            </span>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#help">Help & Support</Link>
            </Button>
            <Button size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Welcome to UNITAR – Lets Get You Started!
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Heres everything you need to activate your account, access
                  your courses, and thrive at UNITAR.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1.5">
                  Start My Orientation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <p className="font-medium">
                  Before you start, check your email for your Matric Number and
                  Default Password.
                </p>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Student Orientation"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 py-12 md:px-6">
        <Tabs defaultValue="account-setup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger
              value="account-setup"
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              <span>Account Setup</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Onboarding Materials</span>
            </TabsTrigger>
            <TabsTrigger value="checklist" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              <span>Checklist</span>
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>FAQs</span>
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
                        <p>On your browser:</p>
                        <ul className="ml-6 list-disc space-y-2">
                          <li>
                            Go to UNITARs Login Page:{" "}
                            <Link
                              href="https://auth.unitar.my/"
                              className="text-primary underline"
                            >
                              https://auth.unitar.my/
                            </Link>
                          </li>
                          <li>Key in Username: your matric number</li>
                          <li>
                            Key in Default Password: Last 4 digits of matric no
                            + Last 4 digits of IC/passport no
                          </li>
                          <li>Click Login</li>
                        </ul>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <Image
                          src="/placeholder.svg?height=200&width=300"
                          width={300}
                          height={200}
                          alt="Login Screen"
                          className="mx-auto rounded-md"
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
                        <p>One-Time Action, prompted by Microsoft:</p>
                        <ul className="ml-6 list-disc space-y-2">
                          <li>Enter your secondary email - TWICE</li>
                          <li>Click Add/Change Email</li>
                        </ul>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <Image
                          src="/placeholder.svg?height=200&width=300"
                          width={300}
                          height={200}
                          alt="Backup Email Setup"
                          className="mx-auto rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">
                      Set Up MFA (Microsoft Authenticator)
                    </h3>
                  </div>
                  <div className="ml-11 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p>On your Student Dashboard:</p>
                        <ul className="ml-6 list-disc space-y-2">
                          <li>Click O365</li>
                          <li>Key in your student email then click Next</li>
                          <li>
                            Install Microsoft Authenticator on your device (iOS
                            and/or Android)
                          </li>
                          <li>
                            Allow Microsoft Authenticator to access your Camera
                          </li>
                          <li>Click Add Account</li>
                          <li>
                            Select Work or school account, then choose Scan QR
                            code
                          </li>
                          <li>
                            Enter the number displayed into the authenticator
                          </li>
                        </ul>
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <Image
                          src="/placeholder.svg?height=200&width=300"
                          width={300}
                          height={200}
                          alt="MFA Setup"
                          className="mx-auto rounded-md"
                        />
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
                <Button variant="outline" className="w-full">
                  Need Help? Contact Support
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Onboarding Materials Tab */}
          <TabsContent value="materials" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Your Onboarding Materials</CardTitle>
                <CardDescription>
                  Learn how to access your Student Resource Backpack (SRB) with
                  all your onboarding materials.
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
                        <p>Log-in to your auth.unitar.my dashboard.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          2
                        </div>
                        <p>Click the red CourseNetworking icon.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          3
                        </div>
                        <p>
                          Click {"COURSES"}... and select{" "}
                          {"Student Resource Backpack"} to access your
                          onboarding materials.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-muted/50 p-4">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        width={300}
                        height={200}
                        alt="Student Resource Backpack"
                        className="mx-auto rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">
                    Whats in your Student Resource Backpack?
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Student Handbook</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Academic Calendar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Course Materials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Important Contacts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Campus Resources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Student Support Services</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Go to CourseNetworking</Button>
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
                    <h3 className="text-lg font-medium">
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
                    <h3 className="text-lg font-medium">During the Semester</h3>
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
                    <h3 className="text-lg font-medium">
                      Prepping for Subsequent Semesters
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" id="check14" className="mt-1" />
                        <label htmlFor="check14" className="text-sm">
                          Repeat items 5 onwards from the first semester
                          checklist
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Printable Checklist
                </Button>
              </CardFooter>
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I find my student matric ID to access UNITAR
                      systems?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Check your personal email (inbox or spam) for the
                        welcome email from UNITAR.
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        NOTE: If you are unable to find the welcome email, email
                        to admission@unitar.my.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
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
                    <AccordionTrigger>
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
                    <AccordionTrigger>
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
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Help & Support
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              If you have any CN-related queries or issues, follow these steps
              to get help:
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
            <Card className="flex flex-col items-center justify-between">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Access One Stop Centre</CardTitle>
                <CardDescription>
                  On your AUTH Student Dashboard, click the One Stop Centre
                  icon.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <Image
                  src="/placeholder.svg?height=120&width=200"
                  width={200}
                  height={120}
                  alt="One Stop Centre"
                  className="mx-auto rounded-md"
                />
              </CardContent>
            </Card>

            <Card className="flex flex-col items-center justify-between">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Select Help Topic</CardTitle>
                <CardDescription>
                  For Help Topic, select Portal/Course/Class/Email Access.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <Image
                  src="/placeholder.svg?height=120&width=200"
                  width={200}
                  height={120}
                  alt="Help Topic"
                  className="mx-auto rounded-md"
                />
              </CardContent>
            </Card>

            <Card className="flex flex-col items-center justify-between">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Select Sub-Topic</CardTitle>
                <CardDescription>
                  Select the Sub-Topic related to your issue/query.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <Image
                  src="/placeholder.svg?height=120&width=200"
                  width={200}
                  height={120}
                  alt="Sub-Topic"
                  className="mx-auto rounded-md"
                />
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto mt-8 max-w-md">
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
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} UNITAR International University.
            All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

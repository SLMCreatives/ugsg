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
  progress: "Your progress",
  doneCount: "{done} of {total} done",
  continueStep: "Continue step {n}",
  allDone: "All steps done!",
  currentStep: "Current step",
  done: "Done",
  markDone: "Mark as done",
  markUndone: "Undo",
  stepLabel: "Step {n}",
  completeTitle: "You are all set!",
  completeBody:
    "Your account is ready. You can now start your learning journey.",
  completeCta: "Go to your checklist",
  completeHref: "#checklist"
};

const STEPS: SetupStep[] = [
  {
    id: "log-in",
    title: "Log in to your Student Dashboard",
    summary: "Use your Matric Number and default password.",
    content: (
      <>
        <p className="m-0">
          Go to the{" "}
          <span className="font-bold text-sand-900">UNITAR Login Page</span>:
        </p>
        <Link href="https://auth.unitar.my/" target="_blank" className="self-start">
          <span className="flex min-h-[48px] items-center gap-2 rounded-full bg-unitar-blue px-6 text-[15px] font-semibold text-white transition-colors hover:bg-unitar-blue-light">
            <HomeIcon className="h-4 w-4" aria-hidden="true" />
            auth.unitar.my
          </span>
        </Link>

        <p className="m-0">Enter your login details:</p>
        <div className="overflow-hidden rounded-xl border border-sand-300">
          <div className="flex flex-col items-center gap-2 bg-unitar-blue px-4 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#A9CBE0]">
              Username
            </span>
            <span className="text-[15px] font-bold text-white">Matric Number</span>
            <span className="text-xs italic text-[#91B9D3]">e.g. MC2301XXXXX</span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-unitar-orange px-4 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[#FDEBD4]">
              Default Password
            </span>
            <span className="text-center text-[15px] font-bold text-white">
              Last 4 digits of your Matric No. + last 4 of your NRIC/Passport
            </span>
            <span className="text-xs italic text-[#FCE0BE]">e.g. 77993883</span>
          </div>
        </div>

        <p className="m-0">
          Click <span className="font-bold text-sand-900">"Login"</span>.
        </p>
        <StepFigure src="/auth_unitar.png" alt="UNITAR login screen" />
      </>
    )
  },
  {
    id: "backup-email",
    title: "Set up your backup email",
    summary: "A one-time action, prompted by Microsoft.",
    content: (
      <>
        <p className="m-0">
          This is a <span className="font-bold text-sand-900">One-Time Action</span>{" "}
          (prompted by Microsoft).
        </p>
        <SubStep letter="a">
          Enter{" "}
          <span className="font-bold text-unitar-orange-ink">
            your personal email — TWICE!
          </span>
        </SubStep>
        <SubStep letter="b">
          Click <span className="font-bold">"Add/Change Email"</span>
        </SubStep>
        <StepFigure src="/secondary_email.png" alt="Backup email setup" />
      </>
    )
  },
  {
    id: "student-email",
    title: "Activate your student email",
    summary: "Open Office 365 from your dashboard.",
    content: (
      <>
        <p className="m-0">
          In your <span className="font-bold text-sand-900">"Student Dashboard"</span>:
        </p>
        <SubStep letter="a">
          Click <span className="font-bold">Office 365</span>
        </SubStep>
        <StepFigure
          src="/big-o.png"
          alt="Office 365 icon"
          cap={140}
        />
        <SubStep letter="b">
          Enter your{" "}
          <span className="font-bold uppercase text-unitar-orange-ink">
            student email
          </span>
          , then click <span className="font-bold">"Next"</span>
        </SubStep>
        <StepFigure src="/mfa1.png" alt="Enter your student email" />
        <SubStep letter="c">
          Enter your{" "}
          <span className="font-bold uppercase text-unitar-orange-ink">password</span>
          , then click <span className="font-bold">"Sign In"</span>
        </SubStep>
        <StepFigure src="/mfa2-password.png" alt="Enter your password" />
        <SubStep letter="d">
          Click <span className="font-bold">"Next"</span> (more information is
          required to protect your account)
        </SubStep>
        <StepFigure src="/mfa3.png" alt="More information required" />
      </>
    )
  },
  {
    id: "mfa",
    title: "Secure your account — MFA setup",
    summary: "Install Microsoft Authenticator and scan the QR code.",
    content: (
      <>
        <SubStep letter="a">
          Download and install{" "}
          <span className="font-bold">"Microsoft Authenticator"</span> on your device
          (iOS or Android).
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
          Open the app and allow Microsoft Authenticator to{" "}
          <span className="font-bold">access your Camera.</span>
        </SubStep>
        <SubStep letter="c">
          Tap <span className="font-bold">"Add Account (+)"</span>
        </SubStep>
        <StepFigure src="/mauth2.png" alt="Add account" />
        <SubStep letter="d">
          Choose <span className="font-bold">"Work or School Account"</span>, then
          select <span className="font-bold">"Scan QR code"</span>
        </SubStep>
        <StepFigure src="/mfad.png" alt="Scan QR code" />
        <SubStep letter="e">
          Click the registered account <span className="font-bold">displayed</span>.
        </SubStep>
        <StepFigure src="/mfae.png" alt="Registered account" />
        <SubStep letter="f">
          Enter the number displayed into the authenticator.
        </SubStep>
        <StepFigure src="/mfaf.png" alt="Enter the authenticator number" />
        <SubStep letter="g">
          If setup is successful you'll see{" "}
          <span className="font-bold">"Notification Approved"</span>. Click{" "}
          <span className="font-bold">"Next"</span>.
        </SubStep>
        <StepFigure src="/mfag.png" alt="Setup successful" />

        <Callout>
          Please note: accounts may take up to 24 hours to be activated.
        </Callout>

        <div className="rounded-xl border border-sand-300 bg-sand-50 p-4">
          <h4 className="m-0 mb-1.5 font-display text-[15px] font-bold text-sand-900">
            Alternative MFA options
          </h4>
          <p className="m-0 mb-3 text-[13.5px] text-sand-800">
            If you can't set up Microsoft Authenticator, you can use these
            alternatives:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 text-[13.5px]">
              <p className="m-0 font-semibold text-sand-900">Phone verification:</p>
              <ul className="m-0 list-disc space-y-1 pl-5 text-sand-800">
                <li>Click "I want to set up a different method"</li>
                <li>Choose "Phone" and click "Confirm"</li>
                <li>Enter your mobile number</li>
                <li>Choose "Receive a code" and follow the instructions</li>
              </ul>
            </div>
            <div className="flex flex-col gap-1.5 text-[13.5px]">
              <p className="m-0 font-semibold text-sand-900">For Huawei users:</p>
              <ul className="m-0 list-disc space-y-1 pl-5 text-sand-800">
                <li>Download "Cooper Authy" from the Huawei AppGallery</li>
                <li>Open the app and tap + in the top right corner</li>
                <li>Scan the QR code on the Authentication screen</li>
                <li>Enter the 6-digit code and click "Submit"</li>
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
    eyebrow: "Upon completion of registration",
    title: "Your student journey starts here",
    steps: [
      {
        title: "Obtain your Matric Number & default password",
        note: "In the welcome email from UNITAR, sent to your personal email."
      },
      {
        title: "Log in to your Student Dashboard",
        note: "Use the Chrome browser."
      },
      { title: "Activate your Student Email (Office 365)" },
      { title: "Access the Student Resource Backpack (SRB) on CN" },
      {
        title: "Check your registered courses and class schedule",
        note: "On UNIEC Campus V2 (UNIECOLLEGE for UNITAR College)."
      },
      { title: "Access your courses on CN" }
    ],
    finish: {
      title: "You are ready!",
      note: "Let us begin your learning journey."
    },
    badges: [
      { title: "Be prepared", note: "Get everything set for a smooth start." },
      {
        title: "Stay informed",
        note: "Access the right information at the right time."
      },
      {
        title: "We are here to support you",
        note: "Our team is ready to assist you."
      },
      {
        title: "Your journey, our priority",
        note: "Let us make your first semester a successful one."
      }
    ]
  },
  {
    eyebrow: "Key activities during the semester",
    title: "Your semester journey continues",
    steps: [
      { title: "Go through your course materials" },
      { title: "Attend your scheduled classes" },
      { title: "Complete (and submit) the tasks required" },
      { title: "Settle outstanding fees", note: "If any." },
      {
        title: "Perform course registration",
        note: "On UNIEC Campus V2 / UNIECOLLEGE."
      },
      { title: "Download (or print) your exam slip", note: "If applicable." },
      { title: "Sit for your final exam", note: "If applicable." }
    ],
    finish: {
      title: "Semester successfully completed!",
      note: "Great job — keep up the momentum and finish strong."
    },
    badges: [
      {
        title: "Stay engaged",
        note: "Go through your materials and participate actively."
      },
      {
        title: "Stay on schedule",
        note: "Attend classes and keep track of important dates."
      },
      {
        title: "Complete your assessments",
        note: "Submit tasks on time and to the best of your ability."
      },
      {
        title: "Finish strong",
        note: "Prepare well and do your best in the final examinations."
      }
    ]
  }
];

const CHECKLIST = [
  {
    title: "Preparing for your First Semester",
    items: [
      'Get your Matric Number & default password (in the "Welcome" email from UNITAR)',
      "Log in to your Student Dashboard",
      "Activate your Student Email (Office 365)",
      "Access the Student Resource Backpack (SRB) in CN",
      "Check your registered courses and class schedule in UNIEC Campus V2",
      "Access your courses in CN"
    ]
  },
  {
    title: "During the Semester",
    items: [
      "Study the course materials",
      "Attend your scheduled classes",
      "Complete (and submit) the required assignments",
      "Settle any outstanding fees",
      "Complete course registration (in UNIEC Campus V2/UNIECCOLLEGE)",
      "Download (or print) your exam slip (if applicable)",
      "Sit your final exams (if applicable)"
    ]
  },
  {
    title: "Preparing for the Next Semester",
    items: [
      "Check your registered courses and class schedule in UNIEC Campus V2",
      "Access your courses in CN",
      'Repeat the "During the Semester" list'
    ]
  }
];

const FAQS = [
  {
    q: "How do I get my student Matric Number to access UNITAR systems?",
    a: (
      <p className="m-0">
        Your Matric Number is stated in the{" "}
        <span className="font-bold text-sand-900">OFFER LETTER</span> that you have
        received via your registered personal email address.
      </p>
    )
  },
  {
    q: "How do I collect my matric card?",
    a: (
      <>
        <p className="m-0">
          <span className="font-bold text-sand-900">Conventional Students</span>:
          Students may collect their physical matric card during the Onboarding
          Session, or visit the respective campus to check if the card is ready for
          collection.
        </p>
        <p className="m-0 mt-2">
          <span className="font-bold text-sand-900">Online Students</span>: A
          Digital Matric Card is available for Online Students and will be generated
          upon request. You may{" "}
          <span className="font-bold text-sand-900">create a ticket</span> (via the{" "}
          <span className="font-bold text-sand-900">OSC Helpdesk</span> icon on your
          Student Dashboard) to request the{" "}
          <span className="font-bold text-sand-900">digital matric card</span>.
        </p>
      </>
    )
  },
  {
    q: "How do I join my (online) scheduled classes?",
    a: (
      <>
        <p className="m-0 mb-2">
          NOTE: Your (online) scheduled classes will be conducted on Ms Teams. The
          Teams meeting button is in your course. If you have a personal/work
          Microsoft account, make sure you are signed in to your UNITAR Student
          Microsoft account.
        </p>
        <ol className="m-0 list-[lower-alpha] space-y-1 pl-5">
          <li>Login to your Student Dashboard: auth.unitar.my</li>
          <li>
            Click CourseNetworking &gt; Courses &gt; Scheduled Classes &gt; Link to
            Join Your Classes (click the Teams Meeting button at the bottom of the
            page)
          </li>
        </ol>
        <p className="m-0 mt-3 text-sm text-sand-800">
          IF you try to join a Teams session WITHOUT signing in to your UNITAR
          Microsoft account (skipping Step a), you will end up:
        </p>
        <ul className="m-0 list-disc space-y-1 pl-5 text-sm text-sand-800">
          <li>
            Stuck in the session Lobby, waiting for someone to let you enter the
            room.
          </li>
          <li>Joining the session as a Guest.</li>
        </ul>
      </>
    )
  },
  {
    q: "Is it OK to join a Teams class session as a Guest?",
    a: (
      <>
        <p className="m-0">
          <span className="font-semibold">
            You are strongly advised NOT to do so.
          </span>{" "}
          Please refer to FAQ 3.
        </p>
        <ul className="m-0 mt-2 list-disc space-y-1 pl-5">
          <li>
            A "guest" in a Teams session is an "outsider". This means you have not
            logged in to your student UNITAR Microsoft account.
          </li>
          <li>
            As long as there is ONE Guest present in a Teams session:
            <ul className="m-0 mt-1 list-[circle] space-y-1 pl-5">
              <li>The guest will not have access to the full Teams functions.</li>
              <li>
                EVERYONE in the session will not be able to share files.
              </li>
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

      <SetupProvider steps={STEPS} labels={LABELS} storageKey="unitar-orientation-en">
        {/* Welcome + progress */}
        <section className="px-5 pt-3 lg:px-10 lg:pt-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid overflow-hidden rounded-[22px] bg-sand-100 sm:rounded-[30px] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col gap-4 p-6 sm:gap-5 sm:p-12">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-unitar-orange-ink">
                  New student orientation
                </span>
                <h1 className="m-0 font-display text-[33px] font-bold leading-[1.08] tracking-tight text-sand-900 sm:text-[52px]">
                  Welcome.
                  <br />
                  Let's get you started.
                </h1>
                <p className="m-0 max-w-md text-[15px] leading-relaxed text-sand-800 sm:text-[17.5px]">
                  Four steps to activate your student account, access your courses,
                  and get ready for your first semester.
                </p>

                <div className="max-w-md">
                  <SetupProgress />
                </div>

                <div className="max-w-md">
                  <Callout>
                    Check your personal email for your{" "}
                    <span className="font-bold text-sand-900">Matric Number</span> and{" "}
                    <span className="font-bold text-sand-900">Default Password</span>{" "}
                    before you start.
                  </Callout>
                </div>
              </div>

              <Image
                src="/hero.jpeg"
                width={900}
                height={700}
                alt="UNITAR students"
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
              id="roadmap"
              eyebrow="Your roadmap"
              heading="The 13 steps of your first semester"
              intro="Here is the whole journey at a glance — from your welcome email to your final exam. Work through the account setup below, then keep this roadmap to hand as the semester goes on."
              phases={ROADMAP}
              footnote="Every step counts towards your success!"
            />
          </div>
        </section>

        {/* Account setup */}
        <section className="px-5 pt-9 lg:px-10 lg:pt-14">
          <div className="mx-auto max-w-6xl">
            <SectionHeading id="setup">Account setup</SectionHeading>
            <div className="mt-4 sm:mt-6">
              <SetupSteps />
            </div>
          </div>
        </section>
      </SetupProvider>

      {/* What's next */}
      <section className="px-5 pt-9 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="whats-next">What's next</SectionHeading>
          <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-5">
            <NextCard
              href="#checklist"
              title="Checklist"
              body="Track your progress through the semester."
              tint="bg-sand-100"
              dot="bg-unitar-orange"
            />
            <NextCard
              href="#materials"
              title="Materials"
              body="Access your Student Resource Backpack in CN."
              tint="bg-[#E7F0F6]"
              dot="bg-unitar-blue"
            />
            <NextCard
              href="#faqs"
              title="FAQs"
              body="Answers to common get-started questions."
              tint="bg-done-tint"
              dot="bg-done"
            />
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="px-5 pt-9 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="checklist">Your checklist</SectionHeading>
          <p className="m-0 mt-2 text-[14.5px] text-sand-800">
            Tick items off as you go — your progress is saved on this device.
          </p>
          <div className="mt-5">
            <Checklist
              groups={CHECKLIST}
              labels={{ count: "{done}/{total}", reset: "Clear this list" }}
              storageKey="unitar-checklist-en"
            />
          </div>
          <p className="m-0 mt-4 text-[13px] text-sand-700">
            For clarification on any of these items, refer to your Student Resource
            Backpack (SRB).
          </p>
        </div>
      </section>

      {/* Materials */}
      <section className="px-5 pt-9 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="materials">Onboarding materials</SectionHeading>
          <p className="m-0 mt-2 max-w-2xl text-[14.5px] text-sand-800">
            Find out how to access your{" "}
            <span className="font-semibold text-sand-900">
              Student Resource Backpack (SRB)
            </span>{" "}
            with all your onboarding materials.
          </p>

          <div className="mt-5">
            <Callout>
              You will be able to access your Student Resource Backpack (SRB) on the
              Monday of your Onboarding Week. For late enrolment, the SRB will be
              available at 12 noon the following day.
            </Callout>
          </div>

          <div className="mt-5 grid gap-5 rounded-[18px] border border-sand-300 bg-white p-5 sm:p-6 lg:grid-cols-2 lg:items-center">
            <ol className="m-0 flex list-none flex-col gap-4 p-0">
              {[
                <>
                  Log in to the{" "}
                  <span className="font-bold text-sand-900">auth.unitar.my</span>{" "}
                  dashboard.
                </>,
                <>
                  Click{" "}
                  <span className="font-bold text-sand-900">CourseNetworking</span>
                </>,
                <>
                  Click <span className="font-bold text-sand-900">Courses</span> and
                  select{" "}
                  <span className="font-bold text-sand-900">
                    Student Resource Backpack
                  </span>{" "}
                  to access your onboarding materials.
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
          <SectionHeading id="faqs">Get-started FAQs</SectionHeading>
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
        eyebrow="Help & support"
        heading="Stuck on any step?"
        body="You don't have to work it out on your own. A dedicated Student Success Team member has already been assigned to you for your first semester."
        team={{
          badge: "Your first stop",
          name: "Student Success Team (SST)",
          body: "The SST is here to support you through your first semester experience — from getting your account working to finding your way around your courses. We have already assigned a dedicated SST member to you.",
          note: "Email us and your SST will take it from there.",
          email: "sst@unitar.my"
        }}
      />

      <OrientationFooter text="Â© 2026 UNITAR International University. All rights reserved." />
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { HelpCircle, Mail, Ticket } from "lucide-react";

export default function InfoSection() {
  return (
    <section className="dark py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Key Information */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Important Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Registration Deadline */}
            <Card className="dark bg-slate-700 border-slate-600 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Registration Deadline</h3>
              </div>
              <p className="text-2xl font-semibold text-cyan-400">
                June 2, 2024
              </p>
              <p className="">
                Make sure to register before this date to secure your starter
                kit
              </p>
            </Card>

            {/* Pick-Up Window */}
            <Card className="dark bg-slate-700 border-slate-600 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4m0 0L4 7m16 0l-8 4m0 0l8 4m-8-4v10m0 0L4 15m16 0l-8 4m0 0l-8-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Pick-Up Window</h3>
              </div>
              <p className="text-2xl font-semibold text-cyan-400">
                June 29 - July 30, 2024
              </p>
              <p className="">
                Pick up your starter kit from your selected campus during this
                period
              </p>
            </Card>
          </div>
        </div>

        {/* Support Section */}

        {/* What&apos;s Included */}
        <div className="space-y-6 border-t border-slate-200 dark:border-slate-800  py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            What&apos;s in Your Starter Kit?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="bg-cyan-500/20 p-4 rounded-lg inline-block">
                <svg
                  className="w-8 h-8 text-cyan-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg">Fresh Start, Fresh Style</h3>
              <p className="">
                Rocking the UNITAR tee straight from the welcome kit!
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-cyan-500/20 p-4 rounded-lg inline-block">
                <svg
                  className="w-8 h-8 text-cyan-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg">Study Materials</h3>
              <p className="">
                Branded UNITAR notebook and pen to help you take notes and stay
                organized during your studies.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="bg-cyan-500/20 p-4 rounded-lg inline-block">
                <svg
                  className="w-8 h-8 text-cyan-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg">UNITAR Lanyard</h3>
              <p className="">
                A stylish lanyard to hold your student ID and keys, showing off
                your UNITAR pride!
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6 border-t border-slate-600 pt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Need Help?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OSC Support */}
            <Card className="dark bg-slate-700 border-slate-600 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Ticket className="w-6 h-6 text-cyan-500" />
                <h3 className="text-lg font-bold">Raise a Support Ticket</h3>
              </div>
              <p className="">
                Visit the Online Student Centre (OSC) to raise a support ticket
                for any queries regarding your starter kit registration.
              </p>
            </Card>

            {/* Email Support */}
            <Card className="dark bg-slate-700 border-slate-600 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-cyan-500" />
                <h3 className="text-lg font-bold">Send an Email</h3>
              </div>
              <p className="">
                Email us at{" "}
                <a
                  href="mailto:enquires@unitar.my"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  enquires@unitar.my
                </a>{" "}
                with your questions and inquiries.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

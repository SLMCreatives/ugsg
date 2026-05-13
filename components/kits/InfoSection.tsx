import { Card } from "@/components/ui/card";
import { Mail, Ticket, Shirt, BookOpen, BadgeCheck, Layers } from "lucide-react";

const kitContents = [
  {
    icon: Shirt,
    title: "UNITAR T-Shirt",
    description: "Branded tee to rep your uni from day one — available in sizes S to 3XL."
  },
  {
    icon: BookOpen,
    title: "Notebook",
    description: "Branded UNITAR notebook to keep your notes organized throughout your studies."
  },
  {
    icon: Layers,
    title: "Sticker Pad",
    description: "A fun sticker pad to personalize your space and show off your UNITAR spirit."
  },
  {
    icon: BadgeCheck,
    title: "Student Lanyard",
    description: "A stylish lanyard to carry your student ID with UNITAR pride."
  }
];

export default function InfoSection() {
  return (
    <section className="bg-[#0b1628] py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* What's Included */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
            What&apos;s in Your Starter Kit?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {kitContents.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="dark bg-slate-800 border-slate-700 p-6 space-y-3 text-center"
              >
                <div className="bg-[#126595]/30 p-4 rounded-xl inline-block mx-auto">
                  <Icon className="w-7 h-7 text-[#FF8000]" />
                </div>
                <h3 className="font-bold text-lg text-white">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Need Help */}
        <div className="space-y-8 border-t border-slate-700 pt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
            Need Help?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OSC Support */}
            <Card className="dark bg-slate-800 border-slate-700 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Ticket className="w-6 h-6 text-[#FF8000]" />
                <h3 className="text-lg font-bold text-white">Raise a Support Ticket</h3>
              </div>
              <p className="text-slate-400">
                Visit the{" "}
                <span className="font-bold text-[#FF8000]">
                  One Stop Center (OSC)
                </span>{" "}
                to raise a support ticket for any queries regarding your starter
                kit registration.
              </p>
            </Card>

            {/* Email Support */}
            <Card className="dark bg-slate-800 border-slate-700 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#FF8000]" />
                <h3 className="text-lg font-bold text-white">Send an Email</h3>
              </div>
              <p className="text-slate-400">
                Email us at{" "}
                <a
                  href="mailto:enquiries@unitar.my"
                  className="text-[#FF8000] hover:text-[#FF8000]/80 font-semibold"
                >
                  enquiries@unitar.my
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

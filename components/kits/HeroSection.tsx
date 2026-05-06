import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  const handleScrollToForm = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="dark bg-gradient-to-b from-orange-200 via-[#e5f5ff] to-white dark:from-gray-900 dark:to-gray-950 py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left - Image */}
        <div className="flex justify-center items-center order-2 md:order-1">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/unitarmc.png"
              alt="Starter Kit Package"
              fill
              className="object-cover rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex flex-col justify-center gap-6 order-1 md:order-2">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              Claim Your{" "}
              <span className="text-[#FF8000]">Free Starter Kit</span>
            </h1>
            <p className="text-xl ">
              Everything you need to get started with your online learning
              journey
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-sm text-cyan-400 font-semibold mb-1">
                📅 Registration Deadline
              </p>
              <p className="text-2xl font-bold">June 2, 2024</p>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-sm text-cyan-400 font-semibold mb-1">
                📦 Pick-Up Window
              </p>
              <p className="text-2xl font-bold">June 29 - July 30, 2024</p>
            </div>
          </div>

          <Button
            onClick={handleScrollToForm}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-6 text-lg rounded-lg w-full md:w-auto"
          >
            Register Now
          </Button>
        </div>
      </div>
    </section>
  );
}

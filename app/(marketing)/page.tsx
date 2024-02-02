import { Button } from "@/components/ui/button";
import Image from "next/image";
import Heading from "./_components/Heading";
import Footer from "./_components/Footer";
import { Hero } from "./_components/Hero";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Hero />
      </div>
      <Footer />
    </div>
  );
}

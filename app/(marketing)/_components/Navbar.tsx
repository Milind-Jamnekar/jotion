"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/theme-selector";

const Navbar = () => {
  const scrolled = useScrollTop();
  console.log(scrolled);

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6 transform",
        scrolled && "border-b shadow-md"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;

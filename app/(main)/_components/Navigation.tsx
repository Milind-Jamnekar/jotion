"use client";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from "@/components/ui/sheet";

const Navigation = () => {
  return (
    <>
      <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-full flex-col">
        <div>
          <p>action items</p>
        </div>
        <div>
          <p>Documents</p>
        </div>

        <div
          onClick={() => {}}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        ></div>
      </aside>
      <MobileSidebar />
    </>
  );
};

const MobileSidebar = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button size="icon" className="absolute top-0 left-0 md:hidden">
        Meow
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[200px] sm:w-[300px] p-0">
      <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-full flex-col">
        <div>
          <p>action items</p>
        </div>
        <div>
          <p>Documents</p>
        </div>
      </aside>
    </SheetContent>
  </Sheet>
);

export default Navigation;

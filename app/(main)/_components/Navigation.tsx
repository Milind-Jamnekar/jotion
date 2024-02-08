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
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

import UserItem from "./UserItem";
import { PlusCircle, Settings } from "lucide-react";
import Item from "./Item";
import { toast } from "sonner";

const Navigation = () => {
  // const documents = useQuery(api.documents.get);
  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating new document... ",
      success: "Document created successfully 🎉",
      error: "Problem creating Document 💀",
    });
  };

  return (
    <>
      <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-full flex-col">
        <div>
          <UserItem />
          <Item label="New page" onClick={handleCreate} icon={PlusCircle} />
          <Item
            label="Settings"
            icon={Settings}
            isSearch
            level={0}
            key={12}
            onClick={() => {}}
          />
        </div>
        <div>
          {/* {documents?.map((document) => (
            <p key={document._id}>{document.title}</p>
          ))} */}
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
          <UserItem />
        </div>
        <div>
          <p>Documents</p>
        </div>
      </aside>
    </SheetContent>
  </Sheet>
);

export default Navigation;

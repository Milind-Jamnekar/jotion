"use client";

// UI components
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
import { Menu, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// DB componets
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

//Hooks
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSearch } from "@/hooks/use-search";

// Main Page components //
import UserItem from "./UserItem";
import Item from "./Item";
import { DocumentList } from "./DocumentList";
import Trashbox from "./Trashbox";
import SettingModal from "@/components/modals/SettingModal";

const Navigation = () => {
  const create = useMutation(api.documents.create);
  const isMobile = useMediaQuery("(max-width:786px)");
  const search = useSearch();

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
          <Item label="Search" icon={Search} onClick={search.onOpen} isSearch />
          <SettingModal>
            <Item label="Settings" icon={Settings} onClick={() => {}} />
          </SettingModal>
          <Item label="New page" onClick={handleCreate} icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-1 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <Trashbox />
            </PopoverContent>
          </Popover>
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

const MobileSidebar = () => {
  const create = useMutation(api.documents.create);
  const isMobile = useMediaQuery("(max-width:786px)");
  const search = useSearch();

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating new document... ",
      success: "Document created successfully 🎉",
      error: "Problem creating Document 💀",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="absolute top-0 left-0 md:hidden ml-4 mt-4"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[200px] sm:w-[300px] p-0">
        <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-full flex-col">
          <div>
            <UserItem />
            <Item
              label="Search"
              icon={Search}
              onClick={search.onOpen}
              isSearch
            />
            <Item label="Settings" icon={Settings} onClick={() => {}} />
            <Item label="New page" onClick={handleCreate} icon={PlusCircle} />
          </div>
          <div className="mt-4">
            <DocumentList />
            <Item onClick={handleCreate} icon={Plus} label="Add a page" />
            <Popover>
              <PopoverTrigger className="w-full mt-4">
                <Item label="Trash" icon={Trash} />
              </PopoverTrigger>
              <PopoverContent
                className="p-1 w-72"
                side={isMobile ? "bottom" : "right"}
              >
                <Trashbox />
              </PopoverContent>
            </Popover>
          </div>
          <div
            onClick={() => {}}
            className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
          ></div>
        </aside>
      </SheetContent>
    </Sheet>
  );
};

export default Navigation;

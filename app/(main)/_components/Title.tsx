"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { toast } from "sonner";

const Title = ({ initialData }: { initialData: Doc<"documents"> }) => {
  const update = useMutation(api.documents.update);
  const archive = useMutation(api.documents.archive);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const [title, setTitle] = useState(initialData.title || "untitled");
  const [edit, setEdit] = useState(false);

  const enableInput = () => {
    setTitle(initialData.title);
    setEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const onArchive = () => {
    const promise = archive({ id: initialData._id });

    toast.promise(promise, {
      success: "Page is removed",
      error: "Failed to delete the page",
      loading: "Page is removing ...",
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({ id: initialData._id, title: e.target.value || "untitled" });
  };

  const disableInput = () => setEdit(false);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center justify-between gap-x-1 ml-16 md:mx-2">
      <div className="flex items-center gap-1">
        {!!initialData.icon && <p className="">{initialData.icon}</p>}
        {edit ? (
          <Input
            ref={inputRef}
            onClick={enableInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={disableInput}
            value={title}
            className="h-7 px-2 w-1/4 focus-visible:ring-transparent"
          />
        ) : (
          <Button variant="ghost" onClick={enableInput} size="sm">
            <span className="truncate">{initialData.title}</span>
          </Button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="mr-4" variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={10}>
          <DropdownMenuItem onClick={onArchive}>
            <Trash className="h-4 w-5 mr-2" />
            <span>Delete</span>
          </DropdownMenuItem>

          <DropdownMenuLabel className="">
            <span className="font-normal text-xs text-muted-foreground">
              last edited by {user?.fullName}{" "}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

Title.Skeleton = function TitlteSkeleton() {
  return (
    <div className="ml-16 md:mx-2">
      <Skeleton className="h-7 w-10 rounded-md" />
    </div>
  );
};
export default Title;

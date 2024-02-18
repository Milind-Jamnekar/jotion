import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

const Title = ({ initialData }: { initialData: Doc<"documents"> }) => {
  const update = useMutation(api.documents.update);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="flex items-center gap-x-1 ml-16 md:mx-2">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {edit ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button variant="ghost" onClick={enableInput} size="sm">
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitlteSkeleton() {
  return <Skeleton className="h-7 w-10 rounded-md" />;
};
export default Title;

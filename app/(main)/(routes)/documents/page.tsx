"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = async () => {
    const promise = create({
      title: "untitled",
    });

    toast.promise(promise, {
      loading: "Creating new document... ",
      success: "Document created successfully 🎉",
      error: "Problem creating Document 💀",
    });
  };

  return (
    <div className="flex flex-col h-full items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height={300}
        width={300}
        className="dark:hidden"
        alt="empty person image"
      />
      <Image
        src="/empty-dark.png"
        height={300}
        width={300}
        className="hidden dark:block"
        alt="empty person image"
      />
      <h2>Welcome to {user?.firstName}&apos;s Jotion </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;

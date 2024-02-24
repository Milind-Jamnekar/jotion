"use client";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Banner = ({ documentId }: { documentId: Id<"documents"> }) => {
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const router = useRouter();

  const onRestore = async () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      success: "Restore successfully",
      loading: "Restoreing page...",
      error: "Failed to restore",
    });
  };

  const onRemove = async () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      success: "Removed successfully",
      loading: "Removing page...",
      error: "Failed to remove",
    });

    router.push("/documents");
  };
  return (
    <div className="p-2 flex items-center text-white bg-rose-500 mt-2 text-center justify-center gap-x-3">
      <p>This page is in trash</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRestore}
        className="h-7 bg-transparent hover:bg-rose-400 border-white"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          size="sm"
          className="h-7 bg-transparent hover:bg-rose-400 border-white"
        >
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;

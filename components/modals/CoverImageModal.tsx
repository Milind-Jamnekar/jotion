"use client";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { ImageDropzone } from "../ImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

const CoverImageModal = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({ file });

      const promise = update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      toast.promise(promise, {
        loading: "Cover image is uploading...",
        error: "Failed to upload cover image 🛑",
        success: "Cover image is uploaded 🚀",
      });

      setFile(undefined);
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg text-semibold">Cover Image</h2>
        </DialogHeader>
        <ImageDropzone
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;

"use client";
import Navbar from "@/app/(main)/_components/Navbar";
import { Toolbar } from "@/app/(main)/_components/Toolbar";
import Spinner from "@/components/Spinner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
interface DocumentIDPageProps {
  params: { documentId: Id<"documents"> };
}

const DocumentIDPage = ({ params }: DocumentIDPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (document === null) return <div>Not found</div>;

  return (
    <div className="mt-5">
      <Navbar />
      <div className="h-20"></div>
      <Toolbar initialData={document} />
    </div>
  );
};

export default DocumentIDPage;

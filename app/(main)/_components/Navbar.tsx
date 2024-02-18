"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import Title from "./Title";
import Banner from "./Banner";

const Navbar = () => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined)
    return (
      <>
        <Title.Skeleton />
      </>
    );

  if (document === null) return null;

  return (
    <nav className="bg-background dark:bg-[#1f1f1f] w-full flex flex-col gap-x-4">
      <Title initialData={document} />
      {document.isArchived && <Banner documentId={document._id} />}
    </nav>
  );
};

export default Navbar;

"use client";
import Spinner from "@/components/ui/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { ReactNode, useRef } from "react";
import Navigation from "./_components/Navigation";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ImperativePanelGroupHandle } from "react-resizable-panels";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { SearchCommand } from "@/components/ui/search-command";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const isMobile = useMediaQuery("(max-width:786px)");
  const sidebarMaxSize = isMobile ? 0 : 30;
  const sidebarMinSize = isMobile ? 0 : 20;

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!isAuthenticated) return redirect("/");

  return (
    <div className="h-full flex dark:bg-[#1f1f1f] relative">
      {/* <Navigation />
      <main className="flex-1 h-full overflow-y-hidden">{children}</main> */}
      <ResizablePanelGroup direction="horizontal" autoSaveId="persistence">
        <ResizablePanel maxSize={sidebarMaxSize} minSize={sidebarMinSize}>
          <Navigation />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <SearchCommand />
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;

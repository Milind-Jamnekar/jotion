"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronLeftIcon, ChevronsLeftIcon } from "lucide-react";

const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center justify-between w-full text-sm p-3 hover:bg-primary/5"
        >
          <div className="gap-x-4 md:gap-x-2 flex md:items-center gap-y-2 md:gap-y-0 flex-col md:flex-row  max-w-[150px]">
            <Avatar className="md:h-5 md:w-5">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.fullName}</AvatarFallback>
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}&apos;s jotion
            </span>
          </div>

          <ChevronsLeftIcon className="h-4 w-4 rotate-90 text-muted-foreground hidden md:block" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuItem>
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
            <div className="flex items-center gap-x-2">
              <div className="rounded-md bg-secondary p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
              </div>

              <div className="space-y-1">
                <p className="text-sm line-clamp-1">
                  {user?.fullName}&apos;s Jotion
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
          <SignOutButton>Sign out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  ChevronUpCircle,
  LucideIcon,
} from "lucide-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  level?: number;
  expanded?: boolean;
  onExpanded?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

const Item = ({
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  expanded,
  id,
  isSearch,
  level = 0,
  onExpanded,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <>
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
            onClick={() => {}}
          >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          </div>
        </>
      )}
      {documentIcon ? (
        <div className="shirink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2" />
      )}
      <span className="text-muted-foreground truncate select-none">
        {label}
      </span>
      {isSearch && (
        <kbd
          className="ml-auto pointer-events-none inline-flex h-5 
        select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono
        text-[10px] font-medium text-muted-foreground"
        >
          <span>⌘</span>K
        </kbd>
      )}
    </div>
  );
};

Item.skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex  gap-x-2 py-[3px]"
    >
      <Skeleton className=" h-4 w-4" />
      <Skeleton className=" h-4 w-[30%]" />
    </div>
  );
};

export default Item;
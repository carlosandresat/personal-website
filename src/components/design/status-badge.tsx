import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * The mono status pill. A wrapper rather than a new `badgeVariants` entry:
 * it changes typography as well as colour, which is outside what shadcn's
 * variant axis models, and `components/ui` stays regenerable.
 */
export function StatusBadge({
  tone = "muted",
  className,
  children,
}: {
  tone?: "brand" | "muted";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-[10px] font-medium uppercase tracking-wider",
        tone === "brand" && "border-brand/25 bg-brand/10 text-brand",
        tone === "muted" && "text-muted-foreground",
        className
      )}
    >
      {children}
    </Badge>
  );
}

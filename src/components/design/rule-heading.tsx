import { cn } from "@/lib/utils";

/**
 * A heading sitting on the heavy `border-foreground` rule, optionally with
 * right-aligned mono metadata on the same baseline.
 *
 * `level="sub"` is the in-page heading used on the course detail page;
 * `level="section"` is the larger landing-section heading.
 */
export function RuleHeading({
  children,
  meta,
  level = "section",
  id,
  className,
}: {
  children: React.ReactNode;
  meta?: React.ReactNode;
  level?: "section" | "sub";
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-6 border-b border-foreground pb-2",
        className
      )}
    >
      <h2
        id={id}
        className={cn(
          "scroll-m-20 font-semibold tracking-tight",
          level === "section" ? "text-2xl md:text-3xl" : "text-xl"
        )}
      >
        {children}
      </h2>
      {meta ? (
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

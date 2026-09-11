import { cn } from "@/lib/utils";

/**
 * Bracket ticks on a panel's corners. These mark a *meaningful state* — an
 * enrolling course, a core technology, an experience with a certificate —
 * never plain decoration.
 *
 * The parent must be `relative`.
 */
export function CornerTicks({
  corners = "top",
  tone = "brand",
  className,
}: {
  corners?: "top" | "all";
  tone?: "brand" | "muted";
  className?: string;
}) {
  const base = cn(
    "pointer-events-none absolute size-2.5",
    tone === "brand" ? "border-brand/50" : "border-muted-foreground/30",
    className
  );

  return (
    <>
      <span aria-hidden className={cn(base, "left-0 top-0 border-l border-t")} />
      <span
        aria-hidden
        className={cn(base, "right-0 top-0 border-r border-t")}
      />
      {corners === "all" ? (
        <>
          <span
            aria-hidden
            className={cn(base, "bottom-0 left-0 border-b border-l")}
          />
          <span
            aria-hidden
            className={cn(base, "bottom-0 right-0 border-b border-r")}
          />
        </>
      ) : null}
    </>
  );
}

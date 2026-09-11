import { cn } from "@/lib/utils";

/**
 * The bracketed mono kicker that opens every section and page.
 * Owns the literal brackets so call sites pass the bare label.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em] text-brand",
        className
      )}
    >
      [ {children} ]
    </span>
  );
}

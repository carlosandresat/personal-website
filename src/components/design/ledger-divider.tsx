import { cn } from "@/lib/utils";

/** Zero-padded index, for anything ordered: `01`, `02`, … */
export const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * A brand label, a hairline that grows to fill, and optional right-aligned
 * metadata — the rule that separates entries in a ledger.
 */
export function LedgerDivider({
  label,
  meta,
  className,
}: {
  label: string;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 pb-2 pt-6", className)}>
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-brand">
        {label}
      </span>
      <span className="h-px flex-grow bg-border" />
      {meta ? (
        <span className="shrink-0 font-mono text-[11px] tracking-wide text-muted-foreground">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

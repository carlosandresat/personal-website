import { cn } from "@/lib/utils";

/**
 * A hairline-separated label/value row. The deliberate contrast is mono
 * uppercase label against a sans, semibold value.
 */
export function SpecRow({
  label,
  value,
  className,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b py-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground last:border-b-0",
        className
      )}
    >
      <span>{label}</span>
      <span className="font-sans text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

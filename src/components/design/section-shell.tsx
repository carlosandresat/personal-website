import { cn } from "@/lib/utils";

/**
 * The landing/page section wrapper: banding, vertical rhythm, max width and
 * the scroll offset that clears the fixed header.
 *
 * `pad` is a prop rather than a `className` override on purpose — `cn("py-16",
 * "pt-28")` keeps *both* classes, since tailwind-merge treats `pt` as only a
 * partial conflict with `py`, so the winner would depend on emission order.
 */
export function SectionShell({
  id,
  band = "plain",
  grid = false,
  divider = true,
  pad = "default",
  className,
  innerClassName,
  children,
}: {
  id?: string;
  band?: "plain" | "muted";
  grid?: boolean;
  divider?: boolean;
  pad?: "default" | "hero";
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        // `isolate` keeps the -z-10 texture layer inside this section instead
        // of sliding behind the body background.
        "relative isolate flex w-full flex-col items-center",
        "scroll-mt-28 md:scroll-mt-20",
        pad === "hero"
          ? "pb-16 pt-28 md:pb-24 md:pt-32"
          : "py-16 md:py-24 lg:py-28",
        divider && "border-t",
        band === "muted" && "bg-muted/30",
        className
      )}
    >
      {grid ? (
        <div
          aria-hidden
          className="circuit-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
      ) : null}
      <div
        className={cn(
          "flex w-full max-w-screen-xl flex-col gap-8 px-6 md:px-8",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

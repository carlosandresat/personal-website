import { RuleHeading } from "@/components/design/rule-heading";

/** Building blocks for /explora articles, so every topic reads the same. */

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <RuleHeading level="sub">{title}</RuleHeading>
      {children}
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-foreground/90">{children}</p>;
}

export function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-foreground/90 marker:text-brand">
      {children}
    </ul>
  );
}

export function Code({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border bg-muted/40 p-4 font-mono text-[13px] leading-relaxed [font-variant-ligatures:none] md:p-5">
      <code>{code}</code>
    </pre>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] [font-variant-ligatures:none]">{children}</code>;
}

/** The fixed close of every topic, like the videos: homework, answer hidden. */
export function Homework({ task, answer }: { task: React.ReactNode; answer: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-brand/60 p-5">
      <span className="font-mono text-[11px] uppercase tracking-wider text-brand">Tarea para la casa</span>
      <p className="text-lg font-semibold leading-snug">{task}</p>
      <details className="group text-[15px] text-muted-foreground">
        <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-wider hover:text-foreground">
          Ver la respuesta
        </summary>
        <div className="pt-3 leading-relaxed">{answer}</div>
      </details>
    </div>
  );
}

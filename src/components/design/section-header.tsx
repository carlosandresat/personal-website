import { Eyebrow } from "@/components/design/eyebrow";
import { RuleHeading } from "@/components/design/rule-heading";

/**
 * Eyebrow + ruled heading + optional lead, the standard opening of a section.
 * Takes resolved strings — primitives stay translation-free so they can never
 * run a `useTranslations` before a page's `setRequestLocale`.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  meta,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <RuleHeading id={id} meta={meta}>
        {title}
      </RuleHeading>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

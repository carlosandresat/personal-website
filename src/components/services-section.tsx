import { Award, Globe, Database, UserCheck, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

import { pad2 } from "@/components/design/ledger-divider";
import { SectionHeader } from "@/components/design/section-header";
import { SectionShell } from "@/components/design/section-shell";

export default function ServicesSection() {
  const t = useTranslations("Services");

  const services: {
    icon: LucideIcon;
    title: string;
    description: string;
    href?: string;
  }[] = [
    {
      icon: Globe,
      title: t("service3"),
      description: t("service3description"),
      href: "/development",
    },
    {
      icon: Database,
      title: t("service4"),
      description: t("service4description"),
    },
    {
      icon: UserCheck,
      title: t("service1"),
      description: t("service1description"),
    },
    {
      icon: Award,
      title: t("service2"),
      description: t("service2description"),
      href: "/courses",
    },
  ];

  return (
    <SectionShell id="services" band="muted">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        meta={pad2(services.length)}
      />

      <div className="grid w-full gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="flex flex-col gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-brand/40"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-wider text-brand">
                {pad2(index + 1)}
              </span>
              <span className="h-px flex-grow bg-border" />
              <service.icon className="size-[18px] shrink-0 text-brand" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            {service.href && (
              <div className="mt-auto pt-2">
                <Button variant="brand" asChild>
                  <Link href={service.href}>{t("learnButtonText")}</Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

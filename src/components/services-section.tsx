import { Award, Globe, Database, UserCheck, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

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
    <section
      className="w-full flex flex-col justify-center items-center py-12 md:py-24 lg:py-28"
      id="services"
    >
      <h2 className="mt-10 scroll-m-20 border-b border-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t("title")}
      </h2>
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 p-8 max-w-screen-xl w-full">
        {services.map((service) => (
          <div key={service.title} className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex justify-center items-center bg-brand rounded-md shadow-lg">
              <service.icon className="w-8 h-8 text-brand-foreground" />
            </div>
            <div className="flex flex-col">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="leading-7 mt-2">{service.description}</p>
              {service.href && (
                <Button className="mt-2 w-fit" asChild>
                  <Link href={service.href}>{t("learnButtonText")}</Link>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

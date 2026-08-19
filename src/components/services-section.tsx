import { Award, Globe, Database, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function ServicesSection() {
  const t = useTranslations("Services");

  return (
    <section
      className="w-full flex flex-col justify-center items-center py-12 md:py-24 lg:py-28"
      id="services"
    >
      <h2 className="mt-10 scroll-m-20 border-b border-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t("title")}
      </h2>
      <div className="flex flex-col gap-8 p-8 max-w-screen-xl  justify-center items-center">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12 items-center justify-center">
          <div className="flex gap-8 xl:gap-12 items-center w-full">
            <div className="flex flex-col">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                {t("service3")}
              </h3>
              <p className="leading-7 mt-2 text-right">
                {t("service3description")}
              </p>
              <Button className="mt-2 w-fit self-end" asChild>
                <Link href="/development">{t("learnButtonText")}</Link>
              </Button>
            </div>
            <div className="flex-shrink-0 w-20 h-20 md:w-14 md:h-14 xl:w-24 xl:h-24 flex justify-center items-center bg-brand md:bg-secondary rounded-md shadow-lg">
              <Globe className="w-8 h-8 invert dark:invert-0 md:invert-0" />
            </div>
          </div>
          <div className="flex gap-8 xl:gap-12 items-center w-full">
            <div className="flex-shrink-0 w-20 h-20 md:w-14 md:h-14 xl:w-24 xl:h-24 flex justify-center items-center bg-secondary md:bg-brand rounded-md shadow-lg ">
              <Database className="w-8 h-8 md:invert dark:invert-0" />
            </div>

            <div className="flex flex-col">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {t("service4")}
              </h3>
              <p className="leading-7 mt-2">{t("service4description")}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:gap-12 items-center justify-center">
          <div className="flex gap-8 xl:gap-12 items-center w-full">
            <div className="flex flex-col">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                {t("service1")}
              </h3>
              <p className="leading-7 text-right">{t("service1description")}</p>
            </div>
            <div className="flex-shrink-0  w-20 h-20 md:w-14 md:h-14 xl:w-24 xl:h-24 flex justify-center items-center bg-brand rounded-md shadow-lg">
              <UserCheck className="w-8 h-8 invert dark:invert-0" />
            </div>
          </div>
          <div className="flex gap-8 xl:gap-12 items-center w-full">
            <div className="flex-shrink-0  w-20 h-20 md:w-14 md:h-14 xl:w-24 xl:h-24 flex justify-center items-center bg-secondary rounded-md shadow-lg">
              <Award className="w-8 h-8" />
            </div>

            <div className="flex flex-col">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {t("service2")}
              </h3>
              <p className="leading-7 mt-2">{t("service2description")}</p>
              <Button className="mt-2 w-fit self-start" asChild>
                <Link href="/courses">{t("learnButtonText")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

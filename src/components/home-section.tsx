import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomeSection() {
  const t = useTranslations("HomePage");

  return (
    <section
      className="w-full pt-28 md:pt-32 bg-secondary pb-12 md:pb-24 lg:pb-32 flex flex-col items-center"
      id="home"
    >
      <div className="flex max-w-screen-xl md:flex-row items-center justify-center p-8 w-full gap-8 md:gap-14 flex-col-reverse">
        <div className="w-full xl:pr-24">
          <h1 className="lg:leading-tight text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
            {t("title")} <span className=" text-brand">Carlos Arévalo</span>
          </h1>
          <p className="md:text-xl mt-6">
            {t("description1")}
            <span className="font-semibold dark:font-normal dark:text-brand">{t("description2")}</span>
            {t("description3")}
            <span className="font-semibold dark:font-normal dark:text-brand">{t("description4")}</span>
            {t("description5")}
            <span className="font-semibold dark:font-normal dark:text-brand">{t("description6")}</span>
            {t("description7")}
            <span className="font-semibold dark:font-normal dark:text-brand">{t("description8")}</span>
            {t("description9")}
            <span className="font-semibold dark:font-normal dark:text-brand">{t("description10")}</span>
            {t("description11")}
            <span className="font-semibold dark:font-normal dark:text-brand">{t("description12")}</span>
            {t("description13")}
          </p>
          <div className="flex gap-4 mt-6">
            <Button variant="brand" size="icon" aria-label="Link to Github" asChild>
              <a href="https://github.com/carlosandresat" target="_blank">
                <Github />
              </a>
            </Button>
            <Button variant="brand" size="icon" aria-label="Link to LinkedIn" asChild>
              <a
                href="https://www.linkedin.com/in/carlosandresat/"
                target="_blank"
              >
                <Linkedin />
              </a>
            </Button>
            <Button variant="brand" size="icon" aria-label="Link to Mail" asChild>
              <a href="mailto:carlosandresat@hotmail.com" target="_blank">
                <Mail />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
          <Image
            alt="profile picture"
            className="mx-auto aspect-[1/1] overflow-hidden rounded-full object-cover w-52 md:w-[550px] xl:w-[650px] shadow-xl"
            height="900"
            src="/carlos.arevalo.jpg"
            width="900"
          />
        </div>
      </div>
    </section>
  );
}

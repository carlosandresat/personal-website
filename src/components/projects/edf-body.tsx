import { useTranslations } from "next-intl";

import { Bullet, Bullets, H, P } from "@/components/projects/shared";

export default function EdfBody() {
  const t = useTranslations("Projects.projects.edf.content");

  return (
    <>
      <P>{t("introduction")}</P>
      <P>
        🛠️ <span className="font-semibold">{t("title1")} </span>
        {t("p1")}
      </P>
      <Bullets>
        <Bullet term="React & Typescript">{t("item1description")}</Bullet>
        <Bullet term="TailwindCSS">{t("item2description")}</Bullet>
        <Bullet term="Next.js 14">{t("item3description")}</Bullet>
        <Bullet term="Shadcn,">{t("item4description")}</Bullet>
        <Bullet term="Prisma & MySQL">{t("item5description")}</Bullet>
        <Bullet term="Google Cloud Platform (GCP)">
          {t("item6description")}
        </Bullet>
      </Bullets>
      <H>🔍 {t("title2")}</H>
      <p className="mt-2 leading-7">{t("p2")}</p>
      <H>🌐 {t("title3")}</H>
      <p className="mt-2 leading-7">{t("p3")}</p>
    </>
  );
}

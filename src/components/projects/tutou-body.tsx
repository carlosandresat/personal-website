import { useTranslations } from "next-intl";

import { Bullet, Bullets, P } from "@/components/projects/shared";

export default function TutoUBody() {
  const t = useTranslations("Projects.projects.tutou.content");

  return (
    <>
      <p className="mt-8 leading-7">{t("introduction")}</p>
      <Bullets>
        <Bullet term={t("item1")}>{t("item1desc")}</Bullet>
        <Bullet term={t("item2")}>{t("item2desc")}</Bullet>
        <Bullet term={t("item3")}>{t("item3desc")}</Bullet>
        <Bullet term={t("item4")}>{t("item4desc")}</Bullet>
        <Bullet term={t("item5")}>{t("item5desc")}</Bullet>
        <Bullet term={t("item6")}>{t("item6desc")}</Bullet>
      </Bullets>
      <P>{t("p2")}</P>
    </>
  );
}

import { useTranslations } from "next-intl";

import { Bullet, Bullets, H, P, Shots } from "@/components/projects/shared";

export default function KidneyAppBody() {
  const t = useTranslations("Projects.projects.kidneyapp.content");

  return (
    <>
      <P>{t("introduction")}</P>
      <Bullets>
        <Bullet term={t("item1")}>{t("item1desc")}</Bullet>
        <Bullet term={t("item2")}>{t("item2desc")}</Bullet>
        <Bullet term={t("item3")}>{t("item3desc")}</Bullet>
        <Bullet term={t("item4")}>{t("item4desc")}</Bullet>
      </Bullets>
      <H>👨‍💻 Screenshots:</H>
      <Shots
        images={[
          { src: "/Kidney1.png", alt: "Kidney1" },
          { src: "/Kidney2.png", alt: "Kidney2" },
          { src: "/Kidney3.png", alt: "Kidney3" },
          { src: "/Kidney4.png", alt: "Kidney4" },
          { src: "/Kidney5.png", alt: "Kidney5" },
        ]}
      />
      <p className="mt-2 leading-7">{t("p1")}</p>
      <p className="mt-2 leading-7">{t("p2")}</p>
    </>
  );
}

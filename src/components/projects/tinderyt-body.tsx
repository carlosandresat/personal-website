import { useTranslations } from "next-intl";

import { Bullet, Bullets, H, P, Shots } from "@/components/projects/shared";

export default function TinderYTBody() {
  const t = useTranslations("Projects.projects.tinderyt.content");

  return (
    <>
      <P>{t("introduction")}</P>
      <P>
        💡 <span className="font-semibold">{t("title1")}</span>
      </P>
      <P>{t("p1")}</P>
      <P>{t("p2")}</P>
      <P>{t("p3")}</P>
      <P>
        📊 <span className="font-semibold">{t("title2")}</span>
      </P>
      <P>{t("p4")}</P>
      <Shots
        images={[
          { src: "/tinderYTanalytics.png", alt: "TinderYT Analytics" },
        ]}
      />
      <P>{t("p5")}</P>
      <Bullets>
        <Bullet term={t("item1")}>{t("item1desc")}</Bullet>
        <Bullet term={t("item2")}>{t("item2desc")}</Bullet>
        <Bullet term={t("item3")}>{t("item3desc")}</Bullet>
      </Bullets>
      <P>{t("p6")}</P>
      <P>
        🔮 <span className="font-semibold">{t("title3")}</span>
      </P>
      <P>{t("p7")}</P>
      <H>👨‍💻 Screenshots:</H>
      <Shots
        images={[
          { src: "/tinderYTform.png", alt: "TinderYT Form" },
          { src: "/tinderYTmatches.png", alt: "TinderYT Matches" },
        ]}
      />
    </>
  );
}

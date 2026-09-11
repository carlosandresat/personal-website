import { useTranslations } from "next-intl";

import { H, P, Shots } from "@/components/projects/shared";

export default function OrientaYTBody() {
  const t = useTranslations("Projects.projects.orientayt.content");

  return (
    <>
      <P>{t("introduction")}</P>
      <H>⚙️ {t("title1")}</H>
      <P>{t("p1")}</P>
      <P>{t("p2")}</P>
      <H>✨ Screenshots:</H>
      <Shots
        images={[
          { src: "/TutoYT4.png", alt: "OrientaYT4" },
          { src: "/TutoYT5.png", alt: "OrientaYT5" },
          { src: "/TutoYT6.png", alt: "OrientaYT6" },
          { src: "/TutoYT1.png", alt: "OrientaYT1" },
          { src: "/TutoYT2.png", alt: "OrientaYT2", size: 600 },
          { src: "/TutoYT3.png", alt: "OrientaYT3", size: 600 },
          { src: "/TutoYT7.png", alt: "OrientaYT7" },
        ]}
      />
      <p className="mt-2 leading-7">{t("p3")}</p>
    </>
  );
}

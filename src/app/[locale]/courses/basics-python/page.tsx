import Image from "next/image";
import { Award, BookOpen, MapPin, Timer } from "lucide-react";
import ContentTimeline from "@/components/content-timeline";
import { useTranslations } from "next-intl";

export default function BasicsPython() {
  const t = useTranslations("Courses.BasicsPython");

  const timelineItems = [
    {
      title: `${t("lecture")} 1`,
      duration: `20 min`,
      description: t("lecturesData.1"),
      image: "/theoretical.png",
    },
    {
      title: `${t("workshop")} 1`,
      duration: `40 min`,
      description: t("workshopsData.1"),
      image: "/workshop.png",
    },
    {
      title: `${t("assessment")} 1`,
      duration: `2 ${t("time")}`,
      description: "",
      image: "/assessment.png",
    },
    {
      title: `${t("lecture")} 2`,
      duration: `20 min`,
      description: t("lecturesData.2"),
      image: "/theoretical.png",
    },
    {
      title: `${t("workshop")} 2`,
      duration: `40 min`,
      description: t("workshopsData.2"),
      image: "/workshop.png",
    },
    {
      title: `${t("assessment")} 2`,
      duration: `2 ${t("time")}`,
      description: "",
      image: "/assessment.png",
    },
    {
      title: `${t("lecture")} 3`,
      duration: `20 min`,
      description: t("lecturesData.3"),
      image: "/theoretical.png",
    },
    {
      title: `${t("workshop")} 3`,
      duration: `40 min`,
      description: t("workshopsData.3"),
      image: "/workshop.png",
    },
    {
      title: `${t("assessment")} 3`,
      duration: `2 ${t("time")}`,
      description: "",
      image: "/assessment.png",
    },
    {
      title: `${t("lecture")} 4`,
      duration: `20 min`,
      description: t("lecturesData.4"),
      image: "/theoretical.png",
    },
    {
      title: `${t("workshop")} 4`,
      duration: `40 min`,
      description: t("workshopsData.4"),
      image: "/workshop.png",
    },
    {
      title: `${t("assessment")} 4`,
      duration: `2 ${t("time")}`,
      description: "",
      image: "/assessment.png",
    },
    {
      title: `${t("lecture")} 5`,
      duration: `20 min`,
      description: t("lecturesData.5"),
      image: "/theoretical.png",
    },
    {
      title: `${t("workshop")} 5`,
      duration: `40 min`,
      description: t("workshopsData.5"),
      image: "/workshop.png",
    },
    {
      title: `${t("assessment")} 5`,
      duration: `2 ${t("time")}`,
      description: "",
      image: "/assessment.png",
    },
    {
      title: `${t("lecture")} 6`,
      duration: `20 min`,
      description: t("lecturesData.6"),
      image: "/theoretical.png",
    },
    {
      title: `${t("workshop")} 6`,
      duration: `40 min`,
      description: t("workshopsData.6"),
      image: "/workshop.png",
    },
    {
      title: `${t("assessment")} 6`,
      duration: `2 ${t("time")}`,
      description: "",
      image: "/assessment.png",
    },
    {
      title: `${t("lecture")} 7`,
      duration: `20 min`,
      description: t("lecturesData.7"),
      image: "/theoretical.png",
    },
    {
      title: `${t("workshop")} 7`,
      duration: `40 min`,
      description: t("workshopsData.7"),
      image: "/workshop.png",
    },
    {
      title: `${t("assessment")} 7`,
      duration: `2 ${t("time")}`,
      description: "",
      image: "/assessment.png",
    },
    {
      title: `${t("lecture")} 8`,
      duration: `20 min`,
      description: t("lecturesData.8"),
      image: "/theoretical.png",
    },
    {
      title: `${t("workshop")} 8`,
      duration: `40 min`,
      description: t("workshopsData.8"),
      image: "/workshop.png",
    },
    {
      title: `${t("assessment")} 8`,
      duration: `2 ${t("time")}`,
      description: "",
      image: "/assessment.png",
    },
    {
      title: t("finalProject"),
      duration: `6 ${t("time")}`,
      description: "",
      image: "/idea.png",
    },
    {
      title: t("obtainCertificate"),
      duration: "",
      description: "",
      image: "/certificate.png",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex pt-24 lg:pt-32 w-full p-8 gap-6 lg:gap-12 items-center flex-col-reverse lg:flex-row max-w-screen-xl">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
            {t("title")}
          </h1>
          <p className="mt-4">{t("description")}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-4 gap-2">
            <div className="flex items-center gap-2">
              <Timer /> <p>30 {t("time")}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin /> <p>Online ({t("place")})</p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen /> <p>{t("difficulty")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Award /> <p>{t("certificate")}</p>
            </div>
          </div>
        </div>
        <div className="w-40 lg:w-64 shrink-0 bg-secondary mx-auto rounded-xl shadow-lg aspect-square flex items-center justify-center p-8">
          <Image
            src="/Python.png"
            height={500}
            width={500}
            alt="Python"
          ></Image>
        </div>
      </div>
      <div className="w-full bg-secondary flex items-center justify-center">
        <div className="flex flex-col lg:flex-row  w-full max-w-screen-xl">
          <div className="border-b w-full border-background lg:border-b-0 lg:w-1/2 flex flex-col p-8 justify-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {t("learningObjective.title")}
            </h4>

            <ul className="mt-4 ml-6 list-disc [&>li]:mt-2">
              <li>{t("learningObjective.1")}</li>
              <li>{t("learningObjective.2")}</li>
              <li>{t("learningObjective.3")}</li>
              <li>{t("learningObjective.4")}</li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="w-full flex items-center">
              <div className="w-1/3 flex flex-col items-center justify-center border-r border-background lg:border-0 p-4 aspect-square md:aspect-video lg:aspect-square">
                <div className="flex flex-col items-center justify-center lg:border-green-500 lg:border-8 rounded-full w-full aspect-square md:aspect-video lg:aspect-square">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    8
                  </h4>
                  <p className="leading-4 text-center">{t("lectures")}</p>
                </div>
              </div>
              <div className="w-1/3 flex flex-col items-center justify-center border-r border-background lg:border-0 p-4 aspect-square md:aspect-video lg:aspect-square">
                <div className="flex flex-col items-center justify-center lg:border-green-500 lg:border-8 rounded-full w-full aspect-square md:aspect-video lg:aspect-square">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    8
                  </h4>
                  <p className="leading-4 text-center">{t("workshops")}</p>
                </div>
              </div>
              <div className="w-1/3 flex flex-col items-center justify-center p-4 aspect-square md:aspect-video lg:aspect-square">
                <div className="flex flex-col items-center justify-center lg:border-green-500 lg:border-8 rounded-full w-full aspect-square md:aspect-video lg:aspect-square">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    8
                  </h4>
                  <p className="leading-4 text-center">{t("assessments")}</p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center border-t lg:border-0 border-background grow  h-full">
              <div className="w-full flex flex-col items-center justify-center p-4">
                <div className="w-[30%] flex flex-col items-center justify-center lg:border-green-500 lg:border-8 rounded-full lg:aspect-square">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    1
                  </h4>
                  <p className="leading-4 text-center">{t("project")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  w-full p-8 items-start max-w-screen-xl">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {t("prerequisites")}
        </h4>

        <ul className="mt-4 ml-6 list-disc [&>li]:mt-2">
          <li>{t("req.1")}</li>
        </ul>
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-secondary">
        <div className="w-full flex flex-col items-center justify-center max-w-screen-xl p-8">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight self-start">
            {t("content")}
          </h4>
          <ContentTimeline timelineItems={timelineItems} />
        </div>
      </div>
    </main>
  );
}

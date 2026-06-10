import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  MapPin,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Experience = {
  type: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  certificate?: string;
};

export default function ExperiencesSection() {
  const t = useTranslations("Experiences");

  const defaultExperiences: Experience[] = [
    {
      type: t("claude-code.type"),
      title: t("claude-code.title"),
      description: t("claude-code.description"),
      date: t("claude-code.date"),
      location: t("claude-code.location"),
      certificate:
        "https://platzi.com/p/carlosarevalodev/curso/12284-course/diploma/detalle/",
    },
    {
      type: t("exec-leadership.type"),
      title: t("exec-leadership.title"),
      description: t("exec-leadership.description"),
      date: t("exec-leadership.date"),
      location: t("exec-leadership.location"),
      certificate:
        "https://drive.google.com/file/d/1zBEsgnxT3q2HF-uYWKu8tEAwjNVGlnFX/view?usp=drive_link",
    },
    {
      type: t("uide-ta.type"),
      title: t("uide-ta.title"),
      description: t("uide-ta.description"),
      date: t("uide-ta.date"),
      location: t("uide-ta.location"),
    },
    {
      type: t("ieee-techweek.type"),
      title: t("ieee-techweek.title"),
      description: t("ieee-techweek.description"),
      date: t("ieee-techweek.date"),
      location: t("ieee-techweek.location"),
      certificate:
        "https://www.facebook.com/share/p/1D5crgEXYa/",
    },
    {
      type: t("dorothy-challenge.type"),
      title: t("dorothy-challenge.title"),
      description: t("dorothy-challenge.description"),
      date: t("dorothy-challenge.date"),
      location: t("dorothy-challenge.location"),
      certificate:
        "https://www.flickr.com/photos/197862188@N04/54708543524/in/photostream",
    },
    {
      type: t("epic5-attendee.type"),
      title: t("epic5-attendee.title"),
      description: t("epic5-attendee.description"),
      date: t("epic5-attendee.date"),
      location: t("epic5-attendee.location"),
      certificate:
        "https://drive.google.com/file/d/10AFPSEcPsk8VHposCksqHc3jbOWlfOb2/view?usp=sharing",
    },
    {
      type: t("python-data.type"),
      title: t("python-data.title"),
      description: t("python-data.description"),
      date: t("python-data.date"),
      location: t("python-data.location"),
      certificate:
        "https://www.datacamp.com/certificate/PDA0017800048674",
    },
    {
      type: t("github-actions.type"),
      title: t("github-actions.title"),
      description: t("github-actions.description"),
      date: t("github-actions.date"),
      location: t("github-actions.location"),
      certificate:
        "https://www.udemy.com/certificate/UC-e4d0c722-1f13-466f-956e-5143ab95f4bb/",
    },
    {
      type: t("docker-k8s.type"),
      title: t("docker-k8s.title"),
      description: t("docker-k8s.description"),
      date: t("docker-k8s.date"),
      location: t("docker-k8s.location"),
      certificate:
        "http://ude.my/UC-d531c97e-05ae-48bc-9364-775a2961cf59/",
    },
    {
      type: t("nestjs-guide.type"),
      title: t("nestjs-guide.title"),
      description: t("nestjs-guide.description"),
      date: t("nestjs-guide.date"),
      location: t("nestjs-guide.location"),
      certificate:
        "https://www.udemy.com/certificate/UC-8fd07ed2-700b-45d2-a8e6-48f673432f84/",
    },
    {
      type: t("edf-se.type"),
      title: t("edf-se.title"),
      description: t("edf-se.description"),
      date: t("edf-se.date"),
      location: t("edf-se.location"),
    },
    {
      type: t("hult-prize.type"),
      title: t("hult-prize.title"),
      description: t("hult-prize.description"),
      date: t("hult-prize.date"),
      location: t("hult-prize.location"),
      certificate:
        "https://drive.google.com/file/d/1-GvVc5b8bg8fNBOuxL8U2fwPDPq2kHZv/view?usp=sharing",
    },
    {
      type: t("scientific-poster.type"),
      title: t("scientific-poster.title"),
      description: t("scientific-poster.description"),
      date: t("scientific-poster.date"),
      location: t("scientific-poster.location"),
      certificate:
        "https://drive.google.com/file/d/1Uvj9UCsvFPhH8kbiKozF5ue_BpDAmMRM/view?usp=drive_link",
    },
    {
      type: t("talov-intern.type"),
      title: t("talov-intern.title"),
      description: t("talov-intern.description"),
      date: t("talov-intern.date"),
      location: t("talov-intern.location"),
    },
    {
      type: t("software-seminar.type"),
      title: t("software-seminar.title"),
      description: t("software-seminar.description"),
      date: t("software-seminar.date"),
      location: t("software-seminar.location"),
      certificate:
        "https://drive.google.com/file/d/1BZ0aSQV2ArIjwuf7SqOIvmrCZJnQizv8/view?usp=sharing",
    },
    {
      type: t("sdas-seminar.type"),
      title: t("sdas-seminar.title"),
      description: t("sdas-seminar.description"),
      date: t("sdas-seminar.date"),
      location: t("sdas-seminar.location"),
    },
    {
      type: t("board-member.type"),
      title: t("board-member.title"),
      description: t("board-member.description"),
      date: t("board-member.date"),
      location: t("board-member.location"),
    },
  ];

  const getNormalizedType = (type: string): "work" | "course" | "event" => {
    const tLower = type.toLowerCase();
    if (tLower === "work" || tLower === "trabajo") return "work";
    if (tLower === "course" || tLower === "curso") return "course";
    if (tLower === "event" || tLower === "evento") return "event";
    return "work";
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "course":
      case "curso":
        return <GraduationCap className="size-4" />;
      case "event":
      case "evento":
        return <Ticket className="size-4" />;
      case "work":
      case "trabajo":
        return <Briefcase className="size-4" />;
    }
  };

  const workExperiences = defaultExperiences.filter(
    (exp) => getNormalizedType(exp.type) === "work"
  );
  const courseExperiences = defaultExperiences.filter(
    (exp) => getNormalizedType(exp.type) === "course"
  );
  const eventExperiences = defaultExperiences.filter(
    (exp) => getNormalizedType(exp.type) === "event"
  );

  const renderExperienceCards = (experiences: Experience[]) => {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-8 max-w-screen-xl w-full">
        {experiences.map((exp, index) => (
          <Card key={index} className="flex flex-col h-full justify-between">
            <CardHeader>
              <div className="flex items-start justify-between mb-2 gap-2">
                <CardTitle className="text-lg">{exp.title}</CardTitle>
                <Badge variant="secondary" className="capitalize flex items-center gap-1">
                  {getIcon(exp.type)}
                  <span>{exp.type}</span>
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  <span>{exp.date}</span>
                </div>
                {exp.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    <span>{exp.location}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardFooter className="justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>{t("moreInfo")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{exp.title}</DialogTitle>
                    <DialogDescription className="capitalize flex items-center gap-1">
                      {getIcon(exp.type)}
                      <span>{exp.type}</span>
                    </DialogDescription>
                  </DialogHeader>
                  <p className="leading-relaxedyy">{exp.description}</p>
                  <DialogFooter className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                    {exp.certificate && (
                      <Button asChild>
                        <a href={exp.certificate} target="_blank" rel="noopener noreferrer">
                          {t("viewCertificate")}
                        </a>
                      </Button>
                    )}
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        {t("back")}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <section
      className="w-full bg-secondary flex flex-col justify-center items-center py-12 md:py-24 lg:py-28"
      id="tech-stack"
    >
      <h2 className="scroll-m-20 border-b border-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t("title")}
      </h2>
      <Tabs defaultValue="work" className="w-full max-w-screen-xl flex flex-col items-center mt-8">
        <TabsList className="flex w-full max-w-md h-full py-1 justify-center gap-1 bg-muted rounded-lg">
          <TabsTrigger
            value="work"
            className="flex-1 py-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            {t("tabWork")}
          </TabsTrigger>
          <TabsTrigger
            value="course"
            className="flex-1 py-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            {t("tabCourses")}
          </TabsTrigger>
          <TabsTrigger
            value="event"
            className="flex-1 py-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            {t("tabEvents")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="work" className="w-full">
          {renderExperienceCards(workExperiences)}
        </TabsContent>
        <TabsContent value="course" className="w-full">
          {renderExperienceCards(courseExperiences)}
        </TabsContent>
        <TabsContent value="event" className="w-full">
          {renderExperienceCards(eventExperiences)}
        </TabsContent>
      </Tabs>
    </section>
  );
}

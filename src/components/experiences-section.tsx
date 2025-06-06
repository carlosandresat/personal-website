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
      type: t("11.type"),
      title: t("11.title"),
      description: t("11.description"),
      date: t("11.date"),
      location: t("11.location"),
      certificate:
        "https://www.udemy.com/certificate/UC-e4d0c722-1f13-466f-956e-5143ab95f4bb/",
    },
    {
      type: t("10.type"),
      title: t("10.title"),
      description: t("10.description"),
      date: t("10.date"),
      location: t("10.location"),
      certificate:
        "https://www.udemy.com/certificate/UC-d531c97e-05ae-48bc-9364-775a2961cf59/",
    },
    {
      type: t("9.type"),
      title: t("9.title"),
      description: t("9.description"),
      date: t("9.date"),
      location: t("9.location"),
      certificate:
        "https://www.udemy.com/certificate/UC-8fd07ed2-700b-45d2-a8e6-48f673432f84/",
    },
    {
      type: t("8.type"),
      title: t("8.title"),
      description: t("8.description"),
      date: t("8.date"),
      location: t("8.location"),
      certificate:
        "https://drive.google.com/file/d/1Uvj9UCsvFPhH8kbiKozF5ue_BpDAmMRM/view?usp=drive_link",
    },
    {
      type: t("7.type"),
      title: t("7.title"),
      description: t("7.description"),
      date: t("7.date"),
      location: t("7.location"),
    },
    {
      type: t("6.type"),
      title: t("6.title"),
      description: t("6.description"),
      date: t("6.date"),
      location: t("6.location"),
      certificate:
        "https://www.cloudskillsboost.google/public_profiles/84fd359f-c2dc-40ed-952e-0c15c770f547/badges/3994394",
    },
    {
      type: t("5.type"),
      title: t("5.title"),
      description: t("5.description"),
      date: t("5.date"),
      location: t("5.location"),
      certificate:
        "https://drive.google.com/file/d/1BZ0aSQV2ArIjwuf7SqOIvmrCZJnQizv8/view?usp=sharing",
    },
    {
      type: t("4.type"),
      title: t("4.title"),
      description: t("4.description"),
      date: t("4.date"),
      location: t("4.location"),
      certificate:
        "https://drive.google.com/file/d/1-KlFzNerXEhrc8XNmf7VorVgha7gE1GM/view?usp=sharing",
    },
    {
      type: t("3.type"),
      title: t("3.title"),
      description: t("3.description"),
      date: t("3.date"),
      location: t("3.location"),
      certificate:
        "https://drive.google.com/file/d/1kCUiT5kkI3ajeMcnyv2nxOPJGRwOhCSq/view?usp=sharing",
    },
    {
      type: t("2.type"),
      title: t("2.title"),
      description: t("2.description"),
      date: t("2.date"),
      location: t("2.location"),
    },
    {
      type: t("1.type"),
      title: t("1.title"),
      description: t("1.description"),
      date: t("1.date"),
      location: t("1.location"),
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "course":
      case "curso":
        return <GraduationCap className="h-4 w-4" />;
      case "event":
      case "evento":
        return <Ticket className="h-4 w-4" />;
      case "work":
      case "trabajo":
        return <Briefcase className="h-4 w-4" />;
    }
  };

  return (
    <section
      className="w-full bg-secondary flex flex-col justify-center items-center py-12 md:py-24 lg:py-28"
      id="tech-stack"
    >
      <h2 className="scroll-m-20 border-b border-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t("title")}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-8 max-w-screen-xl w-full">
        {defaultExperiences.map((exp, index) => (
          <Card key={index} className="flex flex-col h-full justify-between">
            <CardHeader>
              <div className="flex items-start justify-between mb-2 space-x-2">
                <CardTitle className="text-lg">{exp.title}</CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {getIcon(exp.type)}
                  <span className="ml-1">{exp.type}</span>
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {exp.date}
                </div>
                {exp.location && (
                  <div className="flex items-center mt-1">
                    <div>
                      <MapPin className="h-4 w-4 mr-2" />
                    </div>
                    {exp.location}
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
                    <DialogDescription className="capitalize flex items-center">
                      {getIcon(exp.type)}
                      <span className="ml-1">{exp.type}</span>
                    </DialogDescription>
                  </DialogHeader>
                  <p className="leading-relaxedyy">{exp.description}</p>
                  <DialogFooter className="md:justify-between w-full">
                    {exp.certificate && (
                      <Button asChild>
                        <a href={exp.certificate} target="_blank">{t("viewCertificate")}</a>
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
    </section>
  );
}

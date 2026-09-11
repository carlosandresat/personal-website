import { useTranslations } from "next-intl";
import {
  Briefcase,
  GraduationCap,
  Ticket,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CornerTicks } from "@/components/design/corner-ticks";
import {
  FilterTabsList,
  FilterTabsTrigger,
} from "@/components/design/filter-tabs";
import { SectionHeader } from "@/components/design/section-header";
import { SectionShell } from "@/components/design/section-shell";
import { StatusBadge } from "@/components/design/status-badge";
import { pad2 } from "@/components/design/ledger-divider";

type ExperienceKind = "work" | "course" | "event";

/**
 * `kind` is structural, not the translated label — filtering on the localized
 * string only worked because the Spanish values happened to be lowercase.
 */
const EXPERIENCES: {
  key: string;
  kind: ExperienceKind;
  certificate?: string;
}[] = [
  { key: "claude-code", kind: "course", certificate: "https://platzi.com/p/carlosarevalodev/curso/12284-course/diploma/detalle/" },
  { key: "exec-leadership", kind: "event", certificate: "https://drive.google.com/file/d/1zBEsgnxT3q2HF-uYWKu8tEAwjNVGlnFX/view?usp=drive_link" },
  { key: "uide-ta", kind: "work" },
  { key: "ieee-techweek", kind: "event", certificate: "https://www.facebook.com/share/p/1D5crgEXYa/" },
  { key: "dorothy-challenge", kind: "event", certificate: "https://www.flickr.com/photos/197862188@N04/54708543524/in/photostream" },
  { key: "epic5-attendee", kind: "event", certificate: "https://drive.google.com/file/d/10AFPSEcPsk8VHposCksqHc3jbOWlfOb2/view?usp=sharing" },
  { key: "python-data", kind: "course", certificate: "https://www.datacamp.com/certificate/PDA0017800048674" },
  { key: "github-actions", kind: "course", certificate: "https://www.udemy.com/certificate/UC-e4d0c722-1f13-466f-956e-5143ab95f4bb/" },
  { key: "docker-k8s", kind: "course", certificate: "http://ude.my/UC-d531c97e-05ae-48bc-9364-775a2961cf59/" },
  { key: "nestjs-guide", kind: "course", certificate: "https://www.udemy.com/certificate/UC-8fd07ed2-700b-45d2-a8e6-48f673432f84/" },
  { key: "edf-se", kind: "work" },
  { key: "hult-prize", kind: "event", certificate: "https://drive.google.com/file/d/1-GvVc5b8bg8fNBOuxL8U2fwPDPq2kHZv/view?usp=sharing" },
  { key: "scientific-poster", kind: "event", certificate: "https://drive.google.com/file/d/1Uvj9UCsvFPhH8kbiKozF5ue_BpDAmMRM/view?usp=drive_link" },
  { key: "talov-intern", kind: "work" },
  { key: "software-seminar", kind: "event", certificate: "https://drive.google.com/file/d/1BZ0aSQV2ArIjwuf7SqOIvmrCZJnQizv8/view?usp=sharing" },
  { key: "sdas-seminar", kind: "event" },
  { key: "board-member", kind: "work" },
];

const KIND_ICON: Record<ExperienceKind, LucideIcon> = {
  work: Briefcase,
  course: GraduationCap,
  event: Ticket,
};

const TABS: { value: ExperienceKind; labelKey: string }[] = [
  { value: "work", labelKey: "tabWork" },
  { value: "course", labelKey: "tabCourses" },
  { value: "event", labelKey: "tabEvents" },
];

export default function ExperiencesSection() {
  const t = useTranslations("Experiences");

  const kindLabel: Record<ExperienceKind, string> = {
    work: t("kindWork"),
    course: t("kindCourse"),
    event: t("kindEvent"),
  };

  const renderCards = (kind: ExperienceKind) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {EXPERIENCES.filter((exp) => exp.kind === kind).map((exp) => {
        const Icon = KIND_ICON[exp.kind];
        const title = t(`${exp.key}.title` as never);
        const meta = [
          t(`${exp.key}.date` as never),
          t(`${exp.key}.location` as never),
        ]
          .filter(Boolean)
          .join(" · ");

        return (
          <Card
            key={exp.key}
            className="relative flex h-full flex-col justify-between border-border/80 transition-colors hover:border-brand/40"
          >
            {/* Ticks mark the entries backed by a certificate. */}
            {exp.certificate ? <CornerTicks /> : null}
            <CardHeader>
              <div className="mb-2 flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                <StatusBadge className="flex shrink-0 items-center gap-1">
                  <Icon className="size-3" />
                  <span>{kindLabel[exp.kind]}</span>
                </StatusBadge>
              </div>
              <div className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {meta}
              </div>
            </CardHeader>
            <CardFooter className="justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>{t("moreInfo")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="font-mono text-[11px] uppercase tracking-wider">
                      {kindLabel[exp.kind]} · {meta}
                    </DialogDescription>
                  </DialogHeader>
                  <p className="leading-relaxed">
                    {t(`${exp.key}.description` as never)}
                  </p>
                  <DialogFooter className="flex w-full flex-col gap-2 md:flex-row md:justify-between">
                    {exp.certificate && (
                      <Button asChild>
                        <a
                          href={exp.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
        );
      })}
    </div>
  );

  return (
    <SectionShell id="experiences">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        meta={pad2(EXPERIENCES.length)}
      />

      <Tabs defaultValue="work" className="flex w-full flex-col items-center">
        <FilterTabsList className="flex w-full max-w-md">
          {TABS.map((tab) => (
            <FilterTabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1"
            >
              {`${t(tab.labelKey as never)} · ${
                EXPERIENCES.filter((e) => e.kind === tab.value).length
              }`}
            </FilterTabsTrigger>
          ))}
        </FilterTabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-8 w-full">
            {renderCards(tab.value)}
          </TabsContent>
        ))}
      </Tabs>
    </SectionShell>
  );
}

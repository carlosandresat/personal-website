import Image from "next/image";
import { LayoutPanelLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

/** The logo plate, at card size or the larger dialog size. */
function ProjectLogo({
  project,
  size,
}: {
  project: Project;
  size: "card" | "dialog";
}) {
  const box =
    size === "card"
      ? "size-12 rounded-[10px] bg-muted p-2"
      : "size-52 rounded-full bg-muted p-8";
  const dimension = size === "card" ? 52 : 400;

  if (!project.logo) {
    return (
      <div
        className={cn("flex shrink-0 items-center justify-center", box)}
        aria-hidden
      >
        <LayoutPanelLeftIcon className="size-full" />
      </div>
    );
  }

  return (
    <div className={cn("flex shrink-0 items-center justify-center", box)}>
      <Image
        alt={`${project.name} logo`}
        src={project.logo}
        width={dimension}
        height={dimension}
        className={cn(
          "max-h-full object-contain",
          project.logoRounded && "rounded-full",
          project.logoClassName,
          project.logoLight && "hidden dark:block"
        )}
      />
      {project.logoLight && (
        <Image
          alt={`${project.name} logo`}
          src={project.logoLight}
          width={dimension}
          height={dimension}
          className={cn(
            "max-h-full object-contain dark:hidden",
            project.logoClassName
          )}
        />
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  children,
}: {
  project: Project;
  /** The project's own write-up, rendered inside the dialog's scroll area. */
  children: React.ReactNode;
}) {
  const t = useTranslations("Projects");
  const description = t(`projects.${project.id}.description` as never);

  return (
    <Card className="flex flex-col border-border/80 transition-colors hover:border-brand/40">
      <CardHeader className="flex flex-row items-center gap-4">
        <ProjectLogo project={project} size="card" />
        <div className="grid gap-1">
          <CardTitle>{project.name}</CardTitle>
          <CardDescription className="text-brand">
            {description ? (
              description
            ) : project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:border-b"
              >
                {new URL(project.live).host}
              </a>
            ) : null}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
          {project.tech.join(" · ")}
        </p>
      </CardContent>

      <CardFooter
        className={cn(
          "mt-auto flex flex-row gap-4",
          project.live ? "justify-between" : "justify-end"
        )}
      >
        {project.live && (
          <Button variant="link" className="hover:text-brand" asChild>
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              {t("liveButtonText")}
            </a>
          </Button>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button>{t("infoButtonText")}</Button>
          </DialogTrigger>
          <DialogContent className={cn("max-h-full", project.dialogClassName)}>
            <DialogHeader>
              <DialogTitle>{project.name}</DialogTitle>
              {description ? (
                <DialogDescription>{description}</DialogDescription>
              ) : null}
            </DialogHeader>
            <ScrollArea className="h-[200px] px-2 hsm:h-[300px] hmd:h-[500px] hxl:h-[700px]">
              <div className="flex w-full justify-center">
                <ProjectLogo project={project} size="dialog" />
              </div>

              {children}

              <DialogFooter className="mt-4">
                {project.repo && (
                  <Button asChild>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("viewCodeButton")}
                    </a>
                  </Button>
                )}
                <DialogClose asChild>
                  <Button variant="secondary" className="w-full">
                    {t("backButton")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

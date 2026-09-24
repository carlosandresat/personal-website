import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Eyebrow } from "@/components/design/eyebrow";
import { SectionShell } from "@/components/design/section-shell";
import HomeNodeGraph from "@/components/home-node-graph";
import { ContributionCounter } from "@/components/contribution-counter";
import { getGithubContributions } from "@/lib/github";
import { PROFILES } from "@/lib/seo";

const GITHUB_USERNAME = "carlosandresat";

const SOCIALS = [
  { href: PROFILES.github, label: "Github", Icon: Github },
  { href: PROFILES.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:carlosarevalodev@gmail.com", label: "Mail", Icon: Mail },
];

export default async function HomeSection() {
  const t = await getTranslations("HomePage");
  const contributions = await getGithubContributions(GITHUB_USERNAME);

  return (
    <SectionShell id="home" pad="hero" divider={false} grid innerClassName="gap-14">
      <div className="flex w-full flex-col gap-6">
        <Eyebrow>{t("kicker")}</Eyebrow>

        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-[3.4rem] xl:leading-tight">
          Carlos Arévalo
        </h1>

        <p className="max-w-2xl text-muted-foreground md:text-xl">
          {t.rich("lead", {
            emphasis: (chunks) => (
              <strong className="font-semibold text-foreground">{chunks}</strong>
            ),
          })}
        </p>

        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-semibold text-brand">+3</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("statsYearsLabel")}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <ContributionCounter
              value={contributions}
              className="text-3xl font-semibold text-brand"
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("statsContributionsLabel")}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          {SOCIALS.map(({ href, label, Icon }) => (
            <Button
              key={label}
              variant="brand"
              size="icon"
              aria-label={`Link to ${label}`}
              asChild
            >
              <a href={href} target="_blank" rel="me noopener noreferrer">
                <Icon />
              </a>
            </Button>
          ))}
        </div>
      </div>

      <HomeNodeGraph />
    </SectionShell>
  );
}

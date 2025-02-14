import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhaseTabContent from "@/components/phase-tab-content";

export default function Page() {
  const t = useTranslations("Development");

  const tabsData = [
    {
      code: "requirements",
      title: t("requirements.title"),
      phases: [
        {
          title: t("requirements.phases.1.title"),
          description: t("requirements.phases.1.description"),
          clientActions: [
            t("requirements.phases.1.clientActions.1"),
            t("requirements.phases.1.clientActions.2"),
            t("requirements.phases.1.clientActions.3"),
          ],
          developerActions: [
            t("requirements.phases.1.developerActions.1"),
            t("requirements.phases.1.developerActions.2"),
            t("requirements.phases.1.developerActions.3"),
          ],
        },
      ],
    },
    {
      code: "planning",
      title: t("planning.title"),
      phases: [
        {
          title: t("planning.phases.1.title"),
          description: t("planning.phases.1.description"),
          clientActions: [
            t("planning.phases.1.clientActions.1"),
            t("planning.phases.1.clientActions.2"),
          ],
          developerActions: [
            t("planning.phases.1.developerActions.1"),
            t("planning.phases.1.developerActions.2"),
          ],
        },
        {
          title: t("planning.phases.2.title"),
          description: t("planning.phases.2.description"),
          clientActions: [
            t("planning.phases.2.clientActions.1"),
            t("planning.phases.2.clientActions.2"),
          ],
          developerActions: [
            t("planning.phases.2.developerActions.1"),
            t("planning.phases.2.developerActions.2"),
          ],
        },
      ],
    },
    {
      code: "development",
      title: t("development.title"),
      phases: [
        {
          title: t("development.phases.1.title"),
          description: t("development.phases.1.description"),
          clientActions: [
            t("development.phases.1.clientActions.1"),
            t("development.phases.1.clientActions.2"),
          ],
          developerActions: [
            t("development.phases.1.developerActions.1"),
            t("development.phases.1.developerActions.2"),
          ],
        },
        {
          title: t("development.phases.2.title"),
          description: t("development.phases.2.description"),
          clientActions: [
            t("development.phases.2.clientActions.1"),
            t("development.phases.2.clientActions.2"),
          ],
          developerActions: [
            t("development.phases.2.developerActions.1"),
            t("development.phases.2.developerActions.2"),
          ],
        },
        {
          title: t("development.phases.3.title"),
          description: t("development.phases.3.description"),
          clientActions: [
            t("development.phases.3.clientActions.1"),
            t("development.phases.3.clientActions.2"),
          ],
          developerActions: [
            t("development.phases.3.developerActions.1"),
            t("development.phases.3.developerActions.2"),
          ],
        },
      ],
    },
    {
      code: "deployment",
      title: t("deployment.title"),
      phases: [
        {
          title: t("deployment.phases.1.title"),
          description: t("deployment.phases.1.description"),
          clientActions: [t("deployment.phases.1.clientActions.1")],
          developerActions: [
            t("deployment.phases.1.developerActions.1"),
            t("deployment.phases.1.developerActions.2"),
          ],
        },
        {
          title: t("deployment.phases.2.title"),
          description: t("deployment.phases.2.description"),
          clientActions: [
            t("deployment.phases.2.clientActions.1"),
            t("deployment.phases.2.clientActions.2"),
          ],
          developerActions: [
            t("deployment.phases.2.developerActions.1"),
            t("deployment.phases.2.developerActions.2"),
          ],
        },
      ],
    },
    {
      code: "maintenance",
      title: t("maintenance.title"),
      phases: [
        {
          title: t("maintenance.phases.1.title"),
          description: t("maintenance.phases.1.description"),
          clientActions: [
            t("maintenance.phases.1.clientActions.1"),
            t("maintenance.phases.1.clientActions.2"),
          ],
          developerActions: [
            t("maintenance.phases.1.developerActions.1"),
            t("maintenance.phases.1.developerActions.2"),
          ],
        },
        {
          title: t("maintenance.phases.2.title"),
          description: t("maintenance.phases.2.description"),
          clientActions: [
            t("maintenance.phases.2.clientActions.1"),
            t("maintenance.phases.2.clientActions.2"),
          ],
          developerActions: [
            t("maintenance.phases.2.developerActions.1"),
            t("maintenance.phases.2.developerActions.2"),
          ],
        },
      ],
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-24 lg:pt-32 px-8 text-center">
        {t("title")}
      </h1>
      <Tabs defaultValue="requirements" className="w-full max-w-screen-xl p-8">
        <TabsList className="flex w-full  py-2 h-full flex-wrap justify-center">
          {tabsData.map((tab, index) => (
            <TabsTrigger value={tab.code} key={tab.code} className="text-wrap data-[state=active]:bg-green-500">
              {`${index + 1}. ` + tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsData.map((tab) => (
          <TabsContent value={tab.code} key={tab.code} className="space-y-2">
            {tab.phases.map((data, index) => (
              <PhaseTabContent
                key={index}
                title={data.title}
                description={data.description}
                clientActions={data.clientActions}
                developerActions={data.developerActions}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

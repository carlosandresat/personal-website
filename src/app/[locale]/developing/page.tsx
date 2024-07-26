import { useTranslations } from "next-intl";

export default function Courses() {
  const t = useTranslations("Developing");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-24 lg:pt-32 px-8 text-center">
        {t("title")}
      </h1>
      <p className="text-xl text-muted-foreground mt-6">{t("message")}</p>
    </main>
  );
}

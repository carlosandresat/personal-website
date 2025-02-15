import { useTranslations } from "next-intl";
import StudentCard from "@/components/student-card";
import { studentsData } from "@/data/students-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Students() {
  const t = useTranslations("Students");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="pt-24 lg:pt-32 px-8 w-full max-w-screen-xl flex justify-start">
        <Alert className="w-[500px]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-green-500">{t("alertTitle")}</AlertTitle>
          <AlertDescription>{t("alertDescription")}</AlertDescription>
        </Alert>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-6 px-8 text-center">
        {t("title")}
      </h1>
      <p className="text-base text-muted-foreground px-8 pt-4 max-w-screen-xl">
        {t("message")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-screen-xl p-8 gap-8">
        {studentsData.map((student) => (
          <StudentCard
            key={student.code}
            code={student.code}
            name={student.name}
            photoUrl={student.photoUrl}
          />
        ))}
      </div>
    </main>
  );
}

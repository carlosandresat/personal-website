import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { studentsData } from "@/data/students-data";
import { useTranslations } from "next-intl";

export default function Page({ params }: { params: { id: string } }) {
  const t = useTranslations("Students");
  const student = studentsData.find((s) => s.code === params.id);

  if (!student) {
    return null;
  }

  return (
    <main className="w-full flex flex-col justify-center items-center py-12 md:py-24 lg:py-28 min-h-[93vh]">
      <div className="max-w-screen-lg px-8 pt-12 lg:pt-0 w-full">
        <Card className="w-full">
          <CardHeader className="flex flex-col sm:flex-row items-center  gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={student.photoUrl} alt={`${student.name} pic`} />
              <AvatarFallback>
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-bold">
                {student.name}
              </CardTitle>
              <p className="text-muted-foreground">{student.email}</p>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <h3 className="text-xl font-semibold mb-6">{t("about")}</h3>
            <p className="text-muted-foreground mb-8 leading-7">
              {t(params.id)}
            </p>
            <h3 className="text-xl font-semibold mb-4">{t("completedCourse")}</h3>
            <div className="space-y-4 mt-6">
              {student.courses.map((course) => (
                <Card key={course.code} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">
                        {t(`courses.${course.code}`)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t("completed")}: {course.completed}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={course.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("viewProject")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

//StudentCard with name as string and photoUrl as optional string
export default function StudentCard({
  code,
  name,
  photoUrl,
}: {
  code: string;
  name: string;
  photoUrl?: string;
}) {
  const t = useTranslations("Students");

  return (
    <Card className="flex flex-row items-center justify-between gap-4 sm:gap-8 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={photoUrl ? photoUrl : ""} alt={`${name} Photo`} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{name}</CardTitle>
      </div>
      <Button asChild>
        <Link href={`/students/${code}`}>{t("viewProfile")}</Link>
      </Button>
    </Card>
  );
}

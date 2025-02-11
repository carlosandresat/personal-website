import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function StudentCard() {
  const t = useTranslations("Students");

  return (
    <Card className="flex items-center h-full p-6">
      <Avatar className="w-16 h-16">
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback>CA</AvatarFallback>
      </Avatar>
      <div>
        <CardHeader>
          <CardTitle>Carlos Arévalo</CardTitle>
        </CardHeader>
      </div>
      <Button className="ml-auto">{t("viewProfile")}</Button>
    </Card>
  );
}

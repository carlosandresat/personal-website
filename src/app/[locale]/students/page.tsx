import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Students() {
  const t = useTranslations("Students");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-24 lg:pt-32 px-8 text-center">
        {t("title")}
      </h1>
      <p className="text-base text-muted-foreground px-8 pt-4 max-w-screen-xl">
        {t("message")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-screen-xl p-8 gap-8">
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
        <Card className="flex items-center h-full p-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <div>
            <CardHeader>
              <CardTitle>Estudiante 1</CardTitle>
            </CardHeader>
          </div>
          <Button className="ml-auto">{t("viewProfile")}</Button>
        </Card>
        <Card className="flex items-center h-full p-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <div>
            <CardHeader>
              <CardTitle>Estudiante 2</CardTitle>
            </CardHeader>
          </div>
          <Button className="ml-auto">{t("viewProfile")}</Button>
        </Card>
        <Card className="flex items-center h-full p-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <div>
            <CardHeader>
              <CardTitle>Estudiante 3</CardTitle>
            </CardHeader>
          </div>
          <Button className="ml-auto">{t("viewProfile")}</Button>
        </Card>
      </div>
    </main>
  );
}

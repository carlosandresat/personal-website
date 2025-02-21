import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface PhaseTabContentProps {
  title: string;
  description: string;
  clientActions: string[];
  developerActions: string[];
}

export default function PhaseTabContent({
  title,
  description,
  clientActions,
  developerActions,
}: PhaseTabContentProps) {
  const t = useTranslations("Development");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row w-full gap-4">
        <Card className="bg-secondary flex-1">
          <CardHeader>
            <CardTitle>{t("clientActions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="ml-6 list-disc [&>li]:mt-2">
              {clientActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-secondary flex-1">
          <CardHeader>
            <CardTitle>{t("developerActions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="ml-6 list-disc [&>li]:mt-2">
              {developerActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

export function ComingSoonDialog() {
  const t = useTranslations("Courses");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("viewMore")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("comingSoon")}</DialogTitle>
          <DialogDescription>{t("comingSoonDescription")}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

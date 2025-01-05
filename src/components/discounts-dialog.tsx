import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgePercent } from "lucide-react";
import { useTranslations } from "next-intl";

export function DiscountsDialog() {
  const t = useTranslations("Courses.Scratch");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <BadgePercent className="mr-2" />
          {t("discounts")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("discounts")}</DialogTitle>
          <DialogDescription>{t("discountsDescription")}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="leading-7">2 {t("students")}</p>
            <p className="leading-7">-20%</p>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              $80
            </h4>
          </div>
          <div className="flex justify-between">
            <p className="leading-7">3 {t("students")}</p>
            <p className="leading-7">-30%</p>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              $70
            </h4>
          </div>
          <div className="flex justify-between">
            <p className="leading-7">4 {t("students")}</p>
            <p className="leading-7">-40%</p>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              $60
            </h4>
          </div>
        </div>
        <DialogFooter>
          <p className="text-sm text-muted-foreground">{t("discountsNote")}</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

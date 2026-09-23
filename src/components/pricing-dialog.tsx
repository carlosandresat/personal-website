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
import { CircleDollarSign } from "lucide-react";
import { useTranslations } from "next-intl";

const TIERS: { students: string; discountPct: number }[] = [
  { students: "1",     discountPct: 0  },
  { students: "2",     discountPct: 20 },
  { students: "3",     discountPct: 30 },
  { students: "4",     discountPct: 40 },
  { students: "5-9",   discountPct: 45 },
  { students: "10-14", discountPct: 50 },
  { students: "15-19", discountPct: 55 },
  { students: "20+",   discountPct: 60 },
];

interface PricingDialogProps {
  /** Base (1-student) price in USD. Defaults to 100. */
  basePrice?: number;
  /** Override the trigger button variant. Defaults to "default". */
  variant?: "default" | "brand";
}

export function PricingDialog({ basePrice = 100, variant = "default" }: PricingDialogProps) {
  const t = useTranslations("Courses.pricing");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className="w-full">
          <CircleDollarSign className="mr-2" />
          {t("viewPrices")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("prices")}</DialogTitle>
          <DialogDescription>{t("discountsDescription")}</DialogDescription>
        </DialogHeader>
        <div className="w-full overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  {t("students")}
                </th>
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  {t("discount")}
                </th>
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  {t("pricePerStudent")}
                </th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map(({ students, discountPct }) => {
                const price = Math.round(basePrice * (1 - discountPct / 100));
                return (
                  <tr key={students} className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {students}
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {discountPct > 0 ? `${discountPct}%` : "-"}
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      ${price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <p className="text-sm text-muted-foreground text-center md:text-left">{t("pricingNote")}</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

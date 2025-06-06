"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 sm:gap-6">
      <Link
        className={cn(
          "text-sm font-medium hover:underline hover:text-green-500 underline-offset-4",
          pathname === "/es" || pathname === "/en" ? "text-green-500" : ""
        )}
        href="/"
      >
        {t("home")}
      </Link>
      <Link
        className={cn(
          "text-sm font-medium hover:underline hover:text-green-500 underline-offset-4",
          pathname.endsWith("/development") ? "text-green-500" : ""
        )}
        href="/development"
      >
        {t("development")}
      </Link>
      <Link
        className={cn(
          "text-sm font-medium hover:underline hover:text-green-500 underline-offset-4",
          pathname.endsWith("/courses") ? "text-green-500" : ""
        )}
        href="/courses"
      >
        {t("courses")}
      </Link>
      <Link
        className={cn(
          "text-sm font-medium hover:underline hover:text-green-500 underline-offset-4",
          pathname.endsWith("/students") ? "text-green-500" : ""
        )}
        href="/students"
      >
        {t("students")}
      </Link>
    </nav>
  );
}

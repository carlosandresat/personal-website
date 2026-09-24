import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { PROFILES } from "@/lib/seo";

const LINK = "hover:text-brand hover:underline underline-offset-4";

export default function Footer() {
  const t = useTranslations("Navbar");
  const year = new Date().getFullYear();

  return (
    <footer className="flex w-full shrink-0 flex-col gap-3 border-t px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6">
      <p>
        © {year} Developed by{" "}
        <span className="font-bold text-foreground">Carlos Arévalo</span>.
      </p>
      <nav className="flex flex-wrap gap-4">
        <Link className={LINK} href="/development">
          {t("development")}
        </Link>
        <Link className={LINK} href="/courses">
          {t("courses")}
        </Link>
        <a
          className={LINK}
          href={PROFILES.github}
          target="_blank"
          rel="me noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className={LINK}
          href={PROFILES.linkedin}
          target="_blank"
          rel="me noopener noreferrer"
        >
          LinkedIn
        </a>
      </nav>
    </footer>
  );
}

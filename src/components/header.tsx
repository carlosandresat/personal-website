import { Link } from "@/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { LanguageSelect } from "@/components/language-select";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 py-3 md:py-0 md:h-16 flex flex-col gap-2 md:flex-row md:items-center border-b fixed top-0 w-full bg-background justify-between z-20">
      <div className="flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Image alt="Logo" height="42" src="/logo.png" width="42" />
        </Link>
        <div className="flex gap-2 md:hidden">
          <LanguageSelect />
          <ModeToggle />
        </div>
      </div>
      <div className="md:fixed w-full left-0 flex justify-center">
        <Navbar />
      </div>
      <div className="hidden md:flex gap-2">
        <LanguageSelect />
        <ModeToggle />
      </div>
    </header>
  );
}

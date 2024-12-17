import { Link } from "@/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { LanguageSelect } from "@/components/language-select";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b fixed top-0 w-full bg-background z-10 justify-between">
      <Link className="flex items-center justify-center" href="/">
        <Image
          alt="Logo"
          height="42"
          src="/logo.png"
          width="42"
        />
      </Link>
      <div className="md:fixed w-full left-0 flex justify-end md:justify-center">
        <Navbar />
      </div>
      <div className="md:flex space-x-2 hidden">
        <LanguageSelect></LanguageSelect>
        <ModeToggle />      
      </div>
    </header>
  );
}

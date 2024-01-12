import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b fixed top-0 w-full bg-background z-10">
      <Link className="flex items-center justify-center" href="#">
        <Image
          alt="Logo"
          height="42"
          src="/logo.png"
          width="42"
        />
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#home"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#projects"
        >
          Projects
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#tech-stack"
        >
          Tech Stack
        </Link>
        
      </nav>
    </header>
  );
}

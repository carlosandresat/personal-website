import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b fixed top-0 w-full">
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
          href="#"
        >
          Projects
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Tech Stack
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

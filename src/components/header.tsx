import { Link } from "@/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b fixed top-0 w-full bg-background z-10">
      <Link className="flex items-center justify-center" href="/">
        <Image
          alt="Logo"
          height="42"
          src="/logo.png"
          width="42"
        />
      </Link>
      <Navbar />
    </header>
  );
}

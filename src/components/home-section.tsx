import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin } from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function HomeSection() {
  return (
    <section
      className="w-full pt-16 md:pt-24 lg:pt-32 bg-secondary pb-12 md:pb-24 lg:pb-32"
      id="home"
    >
      <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
        <div className="absolute top-20 right-2 mt-4 mr-4">
          <ModeToggle />
        </div>
        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16 items-center">
          <div>
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Hi, I&apos;m{" "}
              <span className=" text-green-500">Carlos Arévalo</span>
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl mt-6">
              +3 years of experience as{" "}
              <span className=" text-green-500">Software Developer</span>. +300{" "}
              <span className=" text-green-500">GitHub contributions</span> last
              year. Passion for creating innovative solutions with cutting-edge
              technologies. As a freelancer, I have successfully delivered
              front-end and full-stack projects, consistently meeting
              clients&apos; requirements and deadlines. Staying abreast of the
              latest technology trends ensures that my skills remain updated.
              Eager to contribute to impactful projects and collaborate with
              dynamic teams. I look forward to connecting and exploring how we
              can create something exceptional together. Let&apos;s start!
            </p>
            <div className="space-x-4 mt-6">
              <a href="https://github.com/carlosandresat" target="_blank">
                <Button className="bg-green-500 hover:bg-green-600">
                  <Github />
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/carlosandresat/"
                target="_blank"
              >
                <Button className="bg-green-500 hover:bg-green-600">
                  <Linkedin />
                </Button>
              </a>
              <a href="mailto:carlosandresat@hotmail.com" target="_blank">
                <Button className="bg-green-500 hover:bg-green-600">
                  <Mail />
                </Button>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <Image
              alt="profile picture"
              className="mx-auto aspect-[1/1] overflow-hidden rounded-full object-cover"
              height="450"
              src="/carlos.arevalo.jpg"
              width="450"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin } from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import {useTranslations} from 'next-intl';
import { LanguageSelect } from "@/components/language-select";


export default function HomeSection() {

  const t = useTranslations('HomePage');

  return (
    <section
      className="w-full pt-24 bg-secondary pb-12 md:pb-24 lg:pb-32"
      id="home"
    >
      <div className="w-full flex justify-between px-8">
        <LanguageSelect></LanguageSelect>
        <ModeToggle />

      </div>
      <div className="px-8 space-y-10 xl:space-y-16 mt-6">
        <div className="grid max-w-[1300px] mx-auto gap-4 md:grid-cols-2 md:gap-16 items-center">
          <div>
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              {t('title')}{" "}
              <span className=" text-green-500">Carlos Arévalo</span>
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl mt-6">
              {t('description1')}
              <span className=" text-green-500">{t('description2')}</span>{t('description3')}{" "}
              <span className=" text-green-500">{t('description4')}</span> {t('description5')}
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
          <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
            <Image
              alt="profile picture"
              className="mx-auto aspect-[1/1] overflow-hidden rounded-full object-cover w-52 md:w-[450px] shadow-xl"
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

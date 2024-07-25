"use client";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import {useTranslations} from 'next-intl';


export default function TechStackSection() {
  const t = useTranslations('TechStack');

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const plugin2 = useRef(Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const plugin3 = useRef(Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <section className="w-full bg-secondary flex flex-col justify-center items-center py-12 md:py-24 lg:py-28" id="tech-stack">
      <h2
        className="scroll-m-20 border-b border-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      >
         {t('title')}
      </h2>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight w-full px-8 mt-8 max-w-screen-xl">
        🥇 {t('tier1')}
      </h3>
      <p className="text-lg w-full px-8 max-w-screen-xl text-green-500">
        {t('tier1description')}
      </p>

      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-screen-xl px-28 mt-6"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem
            key="react"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1 h-full">
              <Card className="transition-all">
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="React"
                    height="64"
                    src="/stack-react.png"
                    width="64"
                    className="dark:invert"
                  />
                  <span className="pt-4 font-semibold text-2xl">React</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem
            key="nextjs"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Next.js"
                    height="80"
                    src="/Next.js.png"
                    width="80"
                    className="dark:invert"
                  />
                  <span className="pt-4 font-semibold text-2xl">Next.js</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem
            key="typescript"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="TypeScript"
                    height="60"
                    src="/Typescrip.png"
                    width="60"
                  />
                  <span className="pt-4 font-semibold text-2xl">
                    TypeScript
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="tailwindcss"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Tailwindcss"
                    height="64"
                    src="/tailwind.png"
                    width="64"
                  />
                  <span className="pt-8 font-semibold text-2xl">
                    TailwindCSS
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="prisma"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="prisma"
                    height="50"
                    src="/prisma.png"
                    width="50"
                  />
                  <span className="pt-4 font-semibold text-2xl">Prisma</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="trpc"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image alt="tRPC" height="64" src="/trpc.svg" width="64" />
                  <span className="pt-4 font-semibold text-2xl">tRPC</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="postgresql"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="postresql"
                    height="64"
                    src="/postgres.png"
                    width="64"
                  />
                  <span className="pt-4 font-semibold text-2xl">
                    PostgreSQL
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="mysql"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image alt="mysql" height="80" src="/mysql.png" width="80" />
                  <span className="pt-8 font-semibold text-2xl">MySQL</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="gcs"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Google Cloud Storage"
                    height="64"
                    src="/google-cloud-storage.png"
                    width="64"
                  />
                  <span className="pt-4 font-semibold text-sm md:text-sm lg:text-base xl:text-lg text-center">
                    Google Cloud Storage
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="vercel"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="vercel"
                    height="64"
                    src="/vercel.svg"
                    width="64"
                    className="dark:invert"
                  />
                  <span className="pt-4 font-semibold text-2xl">Vercel</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="jest"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Jest"
                    height="64"
                    src="/jest.png"
                    width="64"
                  />
                  <span className="pt-4 font-semibold text-2xl">Jest</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-12 2xl:-left-12 hover:bg-green-500" />
        <CarouselNext className="right-12 2xl:-right-12 hover:bg-green-500" />
      </Carousel>

      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight w-full px-8 max-w-screen-xl mt-8">
        📚 {t('tier2')}
      </h3>
      <p className="text-lg w-full px-8 max-w-screen-xl text-green-500">
        {t('tier2description')}
      </p>

      <Carousel
        plugins={[plugin2.current]}
        className="w-full max-w-screen-xl px-28 mt-6"
        onMouseEnter={plugin2.current.stop}
        onMouseLeave={plugin2.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem
            key="python"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1 h-full">
              <Card className="transition-all">
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Python"
                    height="64"
                    src="/Python.png"
                    width="64"
                  />
                  <span className="pt-4 font-semibold text-2xl">Python</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem
            key="Matplotlib"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Matplotlib"
                    height="70"
                    src="/matplotlib.png"
                    width="70"
                  />
                  <span className="pt-4 font-semibold text-2xl">
                    Matplotlib
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem
            key="scikitlearn"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="ScikitLearn"
                    height="90"
                    src="/scikitlearn.png"
                    width="90"
                  />
                  <span className="pt-6 font-semibold text-2xl">
                    Scikit-learn
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="tensorflow"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Tensorflow"
                    height="64"
                    src="/tensorflow.png"
                    width="64"
                  />
                  <span className="pt-4 font-semibold text-2xl">
                    Tensorflow
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="jupyter"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Jupyter"
                    height="60"
                    src="/jupyter.png"
                    width="60"
                  />
                  <span className="pt-4 font-semibold text-2xl">Jupyter</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="numpy"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image alt="numpy" height="70" src="/numpy.svg" width="70" />
                  <span className="pt-4 font-semibold text-2xl">Numpy</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="opencv"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="OpenCV"
                    height="64"
                    src="/OpenCV.png"
                    width="64"
                  />
                  <span className="pt-6 font-semibold text-2xl">OpenCV</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="express"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Expressjs"
                    height="90"
                    src="/express.png"
                    width="90"
                    className="dark:invert"
                  />
                  <span className="pt-4 font-semibold text-2xl">Express</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="jquery"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="jquery"
                    height="70"
                    src="/jquery.png"
                    width="70"
                  />
                  <span className="pt-4 font-semibold text-2xl">jQuery</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="bootstrap"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Bootstrap"
                    height="80"
                    src="/Bootstrap.png"
                    width="80"
                  />
                  <span className="pt-4 font-semibold text-2xl">Bootstrap</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-12 2xl:-left-12 hover:bg-green-500" />
        <CarouselNext className="right-12 2xl:-right-12 hover:bg-green-500" />
      </Carousel>

      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight w-full px-8 mt-8 max-w-screen-xl">
        🔎 {t('tier3')}
      </h3>
      <p className="text-lg w-full px-8 max-w-screen-xl text-green-500">
        {t('tier3description')}
      </p>

      <Carousel
        plugins={[plugin3.current]}
        className="w-full max-w-screen-xl px-28 mt-6"
        onMouseEnter={plugin3.current.stop}
        onMouseLeave={plugin3.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem
            key="playwright"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1 h-full">
              <Card className="transition-all">
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Playwright"
                    height="80"
                    src="/playwright.png"
                    width="80"
                  />
                  <span className="pt-2 font-semibold text-2xl">Playwright</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          
          <CarouselItem
            key="bun"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image alt="bun" height="70" src="/bun.svg" width="70" />
                  <span className="pt-4 font-semibold text-2xl">Bun</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>


          <CarouselItem
            key="nestjs"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="NestJS"
                    height="80"
                    src="/nestjs.svg"
                    width="80"
                  />
                  <span className="pt-4 font-semibold text-2xl">
                    NestJS
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="tanstack"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Tanstack"
                    height="80"
                    src="/tanstack.png"
                    width="80"
                  />
                  <span className="pt-4 font-semibold text-2xl">TanStack</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem
            key="zustand"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image alt="Zustand" height="120" src="/zustand.png" width="120" />
                  <span className="pt-4 font-semibold text-2xl">Zustand</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>


          <CarouselItem
            key="php"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="PHP"
                    height="100"
                    src="/php.png"
                    width="100"
                  />
                  <span className="pt-6 font-semibold text-2xl">
                    PHP
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem
            key="laravel"
            className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <Image
                    alt="Laravel"
                    height="75"
                    src="/laravel.png"
                    width="75"
                  />
                  <span className="pt-2 font-semibold text-2xl">
                    Laravel
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

        </CarouselContent>
        <CarouselPrevious className="left-12 2xl:-left-12 hover:bg-green-500" />
        <CarouselNext className="right-12 2xl:-right-12 hover:bg-green-500" />
      </Carousel>


    </section>
  );
}

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

export default function TechStackSection() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <section className="w-full bg-secondary flex flex-col justify-center items-center py-12 md:py-24 lg:py-28">
      <h2
        className="scroll-m-20 border-b border-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        id="projects"
      >
        Tech Stack
      </h2>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight w-full p-8 max-w-screen-xl">
        🥇 Main Stack
      </h3>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-screen-xl px-28"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
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
            key="Tech2"
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
                    alt="tailwindcss"
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
                  <Image alt="prisma" height="50" src="/prisma.png" width="50" />
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
                  <Image alt="React" height="64" src="/trpc.svg" width="64" />
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
                  <span className="pt-4 font-semibold text-2xl">PostgreSQL</span>
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
                  <Image
                    alt="mysql"
                    height="80"
                    src="/mysql.png"
                    width="80"
                  />
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
                    alt="gcs"
                    height="64"
                    src="/google-cloud-storage.png"
                    width="64"
                  />
                  <span className="pt-4 font-semibold text-sm md:text-sm lg:text-base xl:text-lg text-center">Google Cloud Storage</span>
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

        </CarouselContent>
        <CarouselPrevious className="left-12 2xl:-left-12" />
        <CarouselNext className="right-12 2xl:-right-12" />
      </Carousel>
    </section>
  );
}

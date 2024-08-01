import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { coursesData } from "@/data/python-basics";
import { Award, BookOpen, Lightbulb, MapPin, Timer } from "lucide-react";
import ContentTimeline from "@/components/content-timeline";



export default function BasicsPython() {
  const course = coursesData.find(s => s.id === 1);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex pt-24 lg:pt-32 w-full p-8 gap-6 md:gap-12 items-center flex-col-reverse md:flex-row max-w-screen-xl">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
            Basic Programming with Python
          </h1>
          <p className="mt-4">
            This course introduces the fundamentals of programming using Python,
            one of the most popular and versatile programming languages.
            Participants will learn basic concepts such as variables, control
            structures, functions, and data types. By the end of the course,
            students will be able to write simple programs, solve problems
            algorithmically, and understand the core principles of coding. Ideal
            for beginners with no prior programming experience.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-4 gap-2">
            <div className="flex items-center gap-2">
              <Timer /> <p>30 hours</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin /> <p>Online</p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen /> <p>Beginner</p>
            </div>
            <div className="flex items-center gap-2">
              <Award /> <p>Includes certificate</p>
            </div>

          </div>
        </div>
        <div className="w-40 md:w-64 shrink-0 bg-secondary mx-auto rounded-xl shadow-lg aspect-square flex items-center justify-center p-8">
          <Image
            src="/Python.png"
            height={500}
            width={500}
            alt="Python"
          ></Image>
        </div>
      </div>
      <div className="w-full bg-secondary flex items-center justify-center">
        <div className="flex flex-col md:flex-row  w-full max-w-screen-xl">
          <div className="border-b w-full md:border-r border-background md:border-b-0 md:w-1/2 flex flex-col p-8">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Learning Objectives:
            </h4>

            <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
              <li>Understand and implement basic programming concepts
              </li>
              <li>Write and debug Python programs
              </li>
              <li>Develop problem-solving skills through practical experiences
              </li>
              <li>Gain familiarity with Python’s standard and popular libraries</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:border-r border-background">
            <div className="w-full flex items-center grow h-full">
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-background h-full p-4 aspect-square md:aspect-auto">

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  18
                </h4>
                <p className="leading-4 text-center">
                  theoretical<br></br>classes
                </p>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-background h-full p-4 aspect-square md:aspect-auto">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  10
                </h4>
                <p className="leading-4 text-center">
                  workshops
                </p>
              </div>

              <div className="w-1/2 flex flex-col items-center justify-center p-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  10
                </h4>
                <p className="leading-4 text-center">assessments</p>
              </div>
            </div>
            <div className="w-full flex justify-center border-t border-background grow  h-full">
              <div className="w-1/3 flex flex-col items-center justify-center p-4 border-r border-background aspect-square md:aspect-auto">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  1
                </h4>
                <p className="leading-4 text-center">project</p>
              </div>

              <div className="w-2/3 flex flex-col items-center justify-center p-4 ">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  $80
                </h4>
                <p className="leading-4 text-center">investment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  w-full p-8 items-start max-w-screen-xl">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Pre-requisitos:
        </h4>

        <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
          <li>Ninguno</li>
        </ul>
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-secondary">
        <div className="w-full flex flex-col items-center justify-center max-w-screen-xl p-8">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight self-start">
            Content:
          </h4>
          <ContentTimeline />
        </div>
      </div>
    </main>
  );
}

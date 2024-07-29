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
import { Lightbulb } from "lucide-react";



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
        </div>
        <div className="w-64 shrink-0 bg-secondary mx-auto rounded-xl shadow-lg aspect-square flex items-center justify-center p-8">
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
            <div className="w-full flex justify-center border-t border-background grow aspect-[5/2] md:aspect-auto h-full">
              <div className="w-1/3 flex flex-col items-center justify-center p-4 border-r border-background">
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
          <li>Creo xd</li>
        </ul>
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-secondary">
        <div className="w-full flex flex-col items-center justify-center max-w-screen-xl p-8">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight self-start">
            Content:
          </h4>
          <div className="flex flex-col w-full md:w-fit max-w-screen-md mt-6">
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #1
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Introduction to Programming              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #2
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Setting Up Python Environment              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #1
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Writing Your First Python Program              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #1
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #3
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Variables and Data Types              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #4
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Basic Operations              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #2
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Working with Variables and Data Types              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #2
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #5
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Conditional Statements (if, elif, else)
                </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #6
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Loops (for, while)
                </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #3
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Implementing Control Structures              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #3
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #7
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Defining and Calling Functions            </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #8
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Function Parameters and Return Values              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #4
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Creating and Using Functions              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #4
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #9
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Lists and Tuples              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #10
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Dictionaries and Sets              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #5
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Manipulating Data Structures              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #5
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #11
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Working with Strings              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #12
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  String Methods and Formatting
                </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #6
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Practical String Manipulation              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #6
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #13
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Reading from Files              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #14
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Writing to Files

                </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #7
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  File Input and Output Operations              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #7
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #15
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Exception Handling              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #16
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Debugging Techniques
                </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #8
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Writing Robust Programs with Error Handling              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #8
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #17
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Using Standard Libraries              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            {/* Versión 1.4 */}
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/theoretical.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Class #18
              </h4>

              <p className="text-md text-muted-foreground ml-auto">
                15 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
                <p className="leading-7">
                  Exploring Popular Libraries (e.g., math, datetime)
                </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>


            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #9
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Implementing Libraries in Projects              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #9
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>




            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/workshop.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Workshop #10
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-max">

                <p className="leading-7">
                  Project Planning              </p>
              </div>
            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex  justify-start items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/assessment.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Assessment #10: Final Project
              </h4>
              <p className="text-md text-muted-foreground ml-auto whitespace-nowrap">
                2 hours
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/idea.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Final Project Revision
              </h4>
              <p className="text-md text-muted-foreground ml-auto">
                30 min
              </p>

            </div>
            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="w-1 bg-foreground"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
            </div>
            <div className="w-full flex items-center">
              <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
                <Image src="/certificate.png" width={200} height={200} alt="Workshop #1" className="invert dark:invert-0" />
              </div>

              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">
                Obtain Certificate
              </h4>
            </div>



            <div className="w-full flex">
              <div className="flex justify-center relative w-16">
                <div className="flex justify-center h-full w-16">
                  <div className="border-foreground border-l-4 border-dashed"></div>
                </div>
              </div>
              <div className="flex flex-col pl-4 w-auto space-y-2 h-16"></div>
            </div>
          </div>
        </div></div>
    </main>
  );
}

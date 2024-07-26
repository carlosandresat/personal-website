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
          <div className="border-b w-full md:border-r border-background md:w-1/2 flex flex-col p-8">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Learning Objectives:
            </h4>

            <ul className="mt-6 ml-6 list-disc [&>li]:mt-2">
              <li>1st level of puns: 5 gold coins</li>
              <li>2nd level of jokes: 10 gold coins</li>
              <li>3rd level of one-liners : 20 gold coins</li>
              <li>1st level of puns: 5 gold coins</li>
              <li>2nd level of jokes: 10 gold coins</li>
              <li>3rd level of one-liners : 20 gold coins</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:border-r border-background">
            <div className="w-full flex items-center grow">
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-background h-full p-4 aspect-square md:aspect-auto">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  8
                </h4>
                <p className="leading-4 text-center">
                  talleres<br></br>online
                </p>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center p-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  1
                </h4>
                <p className="leading-4 text-center">proyecto</p>
              </div>
            </div>
            <div className="w-full flex justify-center border-t border-background grow">
              <div className="w-1/2 flex flex-col items-center justify-center p-4 aspect-video md:aspect-auto">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  $80
                </h4>
                <p className="leading-4 text-center">inversión</p>
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
              <li>1st level of puns: 5 gold coins</li>
              <li>2nd level of jokes: 10 gold coins</li>
              <li>3rd level of one-liners : 20 gold coins</li>
              <li>1st level of puns: 5 gold coins</li>
              <li>2nd level of jokes: 10 gold coins</li>
              <li>3rd level of one-liners : 20 gold coins</li>
            </ul>
        </div>
        <div className="w-full flex flex-col items-center justify-center p-8 bg-secondary">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight self-start">
            Contenidos:
          </h4>

        <Accordion type="single" collapsible className="w-full mt-8 max-w-screen-xl">
            {course?.units.map((unit, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="border rounded-md px-4 bg-background">
                  <div className="flex items-center gap-4 justify-start w-full">
                    <div className="flex items-center">
                      <div className="-rotate-90 text-primary font-medium whitespace-nowrap text-sm">
                        U.C. {index + 1}
                      </div>
                    </div>
                    <div className="self-center w-full">
                      <h3 className="text-lg font-medium">{unit.name}</h3>
                      
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-secondary border rounded border-background">
                  <div className="space-y-4 p-8">
                    {unit.topics.map((topic, topicIndex) => (
                      <div key={topicIndex}>
                        <h4 className="font-semibold">{topic.name}</h4>
                        <p>{topic.description}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>
    </main>
  );
}

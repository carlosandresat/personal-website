import Image from "next/image";

import { Award, BookOpen, Lightbulb, MapPin, Timer } from "lucide-react";
import ContentTimeline from "@/components/content-timeline";



export default function BasicsPython() {

  const timelineItems:{
    title: string;
    duration: string;
    description: string;
    image: string;
}[] = [
    {
      title: 'Lecture 1',
      duration: '20 min',
      description: 'Introduction to Programming & Python',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop 1',
      duration: '40 min',
      description: 'Writing Your First Python Program',
      image: '/workshop.png'
    },
    {
      title: 'Assessment 1',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Lecture 2',
      duration: '20 min',
      description: 'Variables and Data Types',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop 2',
      duration: '40 min',
      description: 'Working with Variables and Data Types',
      image: '/workshop.png'
    },
    {
      title: 'Assessment 2',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Lecture 3',
      duration: '20 min',
      description: 'Control structures: conditionals & loops',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop 3',
      duration: '40 min',
      description: 'Implementing control structures',
      image: '/workshop.png'
    },
    {
      title: 'Assessment 3',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Lecture 4',
      duration: '20 min',
      description: 'Introduction to functions',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop 4',
      duration: '40 min',
      description: 'Creating and Using Functions',
      image: '/workshop.png'
    },
    {
      title: 'Assessment 4',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Lecture 5',
      duration: '20 min',
      description: 'Lists',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop 5',
      duration: '40 min',
      description: 'Creating arrays and matrices',
      image: '/workshop.png'
    },
    {
      title: 'Assessment 5',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Lecture 6',
      duration: '20 min',
      description: 'Working with Strings',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop 6',
      duration: '40 min',
      description: 'Practical String Manipulation',
      image: '/workshop.png'
    },
    {
      title: 'Assessment 6',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Lecture 7',
      duration: '20 min',
      description: 'Reading/Writting Files',
      image: '/theoretical.png'
    },

    {
      title: 'Workshop 7',
      duration: '40 min',
      description: 'File Input and Output Operations',
      image: '/workshop.png'
    },
    {
      title: 'Assessment 7',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Lecture 8',
      duration: '20 min',
      description: 'Error Handling',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop 8',
      duration: '40 min',
      description: 'Writing Robust Programs with Error Handling',
      image: '/workshop.png'
    },
    {
      title: 'Assessment 8',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
   
    {
      title: 'Final Project',
      duration: '6 hours',
      description: '',
      image: '/idea.png'
    },
    {
      title: 'Obtain Certificate',
      duration: '',
      description: '',
      image: '/certificate.png'
    }
  ];

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
              <MapPin /> <p>Online (Live)</p>
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

            <ul className="mt-4 ml-6 list-disc [&>li]:mt-2">
              <li>Understand and implement basic programming concepts
              </li>
              <li>Write and debug Python programs
              </li>
              <li>Develop problem-solving skills through practical experiences
              </li>
              <li>Create robust and maintainable code</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:border-r border-background">
            <div className="w-full flex items-center grow h-full">
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-background h-full p-4 aspect-square md:aspect-auto">

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  8
                </h4>
                <p className="leading-4 text-center">
                  lectures
                </p>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center border-r border-background h-full p-4 aspect-square md:aspect-auto">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  8
                </h4>
                <p className="leading-4 text-center">
                  workshops
                </p>
              </div>

              <div className="w-1/2 flex flex-col items-center justify-center p-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  8
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
                  $100
                </h4>
                <p className="leading-4 text-center">investment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  w-full p-8 items-start max-w-screen-xl">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Prerequisites:
        </h4>

        <ul className="mt-4 ml-6 list-disc [&>li]:mt-2">
          <li>None</li>
        </ul>
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-secondary">
        <div className="w-full flex flex-col items-center justify-center max-w-screen-xl p-8">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight self-start">
            Content:
          </h4>
          <ContentTimeline timelineItems={timelineItems}/>
        </div>
      </div>
    </main>
  );
}

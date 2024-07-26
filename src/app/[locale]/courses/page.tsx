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

export default function Courses() {
  return (
      <main className="flex min-h-screen flex-col items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-24 lg:pt-32">
          My Courses
        </h1>
        <div className="flex flex-col w-full max-w-screen-lg space-y-6 p-8">
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-2 ml-5">
              <Image
                src="/Python.png"
                height={60}
                width={60}
                alt="Python"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Basic Programming with Python</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This course introduces the fundamentals of programming using Python, one of the most popular and versatile programming languages. Participants will learn basic concepts such as variables, control structures, functions, and data types. By the end of the course, students will be able to write simple programs, solve problems algorithmically, and understand the core principles of coding. Ideal for beginners with no prior programming experience.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-2 md:p-5 ml-5">
              <Image
                src="/scratch.png"
                height={200}
                width={200}
                alt="Scratch Image"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Programming for kids with Scratch</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>Designed for young learners, this course uses Scratch, a visual programming language that makes coding fun and interactive. Children will learn the basics of programming through creating their own games, animations, and interactive stories. This course encourages creativity, logical thinking, and problem-solving skills in an engaging and supportive environment. Perfect for kids aged 8-14.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-2 md:p-5 ml-5">
              <Image
                src="/matplotlib.png"
                height={200}
                width={200}
                alt="Matplotlib Image"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Data Visualization with Matplotlib</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This course focuses on the art of data visualization using Matplotlib, a powerful Python library. Students will learn how to create a wide range of static, animated, and interactive visualizations. Topics include plotting basic graphs, customizing plots, working with multiple figures and subplots, and integrating with other data analysis libraries. Ideal for those who want to transform data into meaningful insights through compelling visual representations.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-1 md:p-4 ml-5">
              <Image
                src="/front1.png"
                height={200}
                width={200}
                alt="Front (I) Image"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Front-End (I): HTML, CSS & JavaScript</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This foundational course covers the essential technologies for building web pages. Participants will learn HTML for structure, CSS for styling, and JavaScript for interactivity. By the end of the course, students will be able to create responsive and dynamic web pages from scratch. This course is perfect for beginners who want to start their journey in web development.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-2 md:p-4 ml-5">
              <Image
                src="/React-icon.png"
                height={200}
                width={200}
                alt="React Image"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Front-End (II): React, TypeScript & TailwindCSS</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>Building on basic web development skills, this course dives into modern front-end development with React, TypeScript, and TailwindCSS. Participants will learn to create complex and scalable user interfaces with React, ensure code quality and type safety with TypeScript, and style applications efficiently with TailwindCSS. Ideal for those looking to advance their front-end development skills and work on professional-grade web applications.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-0 ml-5">
              <Image
                src="/Next.js.png"
                height={200}
                width={200}
                alt="Next.js Image"
                className="dark:invert"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Front-End (III): Next.js</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This advanced course delves into Next.js, a powerful React framework for building high-performance front-end applications. Participants will learn about key features such as server-side rendering, and dynamic routing. The course also covers advanced topics like API integration, optimized loading, and deploying Next.js applications. By the end of the course, students will be proficient in building sophisticated and scalable front-end applications using Next.js. Suitable for developers with React experience looking to enhance their skills in modern front-end development.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-2 md:p-5 ml-5">
              <Image
                src="/postgres.png"
                height={200}
                width={200}
                alt="PostgreSQL Image"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Databases with PostgreSQL</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This course provides a comprehensive introduction to PostgreSQL, a powerful and open-source relational database system. Participants will learn how to design, implement, and manage databases. Topics include SQL queries and database design. By the end of the course, students will be able to handle data efficiently using PostgreSQL. Perfect for those interested in data management and back-end development.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover ml-5">
              <Image
                src="/express.png"
                height={200}
                width={200}
                alt="Express Image"
                className="dark:invert"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Back-End with Express</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This course introduces back-end web development using Express, a minimal and flexible Node.js framework. Participants will learn to create RESTful APIs, handle middleware, manage sessions, and connect to databases. By the end of the course, students will be able to build and deploy robust back-end services. Suitable for those with basic JavaScript knowledge looking to delve into server-side development.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover ml-5">
              <Image
                src="/Next.js.png"
                height={200}
                width={200}
                alt="Next.js Image"
                className="dark:invert"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Back-End with Next.js</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This advanced course explores the back-end capabilities of Next.js. Participants will learn about server actions, API routes, and integrating with databases. The course also covers best practices for building scalable and maintainable back-end systems. Ideal for developers who have completed the Front-End (III): Next.js course and want to leverage Next.js for full-stack development.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-3 md:p-5 ml-5">
              <Image
                src="/arduino-logo.png"
                height={200}
                width={200}
                alt="Arduino Image"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Internet of Things (IoT) Fundamentals with Arduino</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This course introduces the fundamentals of IoT using Arduino, an open-source electronics platform. Participants will learn to create connected devices, read sensors, control actuators, and communicate with other devices. By the end of the course, students will have built several IoT projects and gained a solid understanding of the principles of embedded systems. Perfect for beginners interested in electronics and IoT.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-2 ml-5">
              <Image
                src="/nodemcu.png"
                height={200}
                width={200}
                alt="ESP8266 Image"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Internet of Things (IoT) Fundamentals with ESP8266</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden md:block">
                <p>This course focuses on IoT development using the ESP8266, a low-cost Wi-Fi microchip. Participants will learn to program the ESP8266, connect to the internet, and build web-connected devices. The course covers various communication protocols and cloud integration. By the end of the course, students will be able to create sophisticated IoT projects with the ESP8266. Ideal for those with some experience in electronics and programming, looking to explore IoT further.</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      </main>
  );
}

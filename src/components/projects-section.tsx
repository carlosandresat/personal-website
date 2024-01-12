import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  BookOpenIcon,
  GithubIcon,
  HomeIcon,
  LayoutPanelLeftIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectsSection() {
  return (
    <section className="w-full flex flex-col justify-center items-center py-12 md:py-24 lg:py-28">
      <h2
        className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        id="projects"
      >
        My Projects
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl w-full mx-auto p-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-muted bg-secondary">
              <Image
                alt="EDF Academy"
                src="/logoEDF.png"
                width={52}
                height={52}
              />
            </div>
            <div className="grid gap-1">
              <CardTitle>EDF Academy Website</CardTitle>
              <CardDescription>
                <a
                  href="https://edfacademy.com/"
                  target="_blank"
                  className="hover:border-b text-green-500"
                >
                  edfacademy.com
                </a>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">
                  React, Next.js, Tailwind CSS, TypeScript, Prisma, MySQL, GCP
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row justify-between gap-4">
            <a href="https://edfacademy.com/" target="_blank">
              <Button variant="link" className="hover:text-green-500">
                View live
              </Button>
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="hover:bg-green-500">
                  More info...
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[525px] md:max-w-xl xl:max-w-3xl max-h-full">
                <DialogHeader>
                  <DialogTitle>EDF Academy Website</DialogTitle>
                </DialogHeader>
                <ScrollArea className=" h-[200px] hsm:h-[300px] hmd:h-[500px] hxl:h-[700px] px-2">
                  <div className="w-full flex justify-center">
                    <div className=" w-52 h-52 rounded-full border border-muted bg-secondary center">
                      <Image
                        alt="EDF Academy"
                        src="/logoEDF.png"
                        width={500}
                        height={500}
                      />
                    </div>
                  </div>

                  <p className="leading-7 mt-4">
                    A web platform for EDF Academy, an innovative institution
                    dedicated to preparing high school students for higher
                    education through cutting-edge tools like Virtual Reality.
                  </p>
                  <p className="leading-7 mt-4">
                    🛠️{" "}
                    <span className=" font-semibold">Tech Stack Mastery: </span>
                    This project was an incredible journey in modern web
                    development, where I leveraged a robust tech stack:
                  </p>
                  <ul className="ml-6 list-disc [&>li]:mt-2">
                    <li>
                      <span className=" font-semibold">
                        React & Typescript{" "}
                      </span>
                      for dynamic and efficient frontend development.
                    </li>
                    <li>
                      <span className=" font-semibold">TailwindCSS </span>for
                      sleek, responsive design.
                    </li>
                    <li>
                      <span className=" font-semibold">Next.js 14 </span>
                      framework & Vercel for optimal performance and seamless
                      deployment.
                    </li>
                    <li>
                      <span className=" font-semibold">Shadcn, </span>a
                      versatile collection of React components based on Radix
                      primitives for enhanced UI/UX.
                    </li>
                    <li>
                      <span className=" font-semibold">Prisma & MySQL </span>
                      for robust database management.
                    </li>
                    <li>
                      <span className=" font-semibold">
                        Google Cloud Platform (GCP){" "}
                      </span>
                      for reliable storage of images and videos.
                    </li>
                  </ul>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    🔍 From Concept to Reality:
                  </h4>
                  <p className="leading-7 mt-2">
                    My role spanned the entire development lifecycle - from
                    initial meetings with EDF Academy&apos;s founders to
                    understand their vision, through to deploying and
                    integrating new features tailored to the academy&apos;s
                    evolving needs.
                  </p>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    🌐 Creating Impact:
                  </h4>

                  <p className="leading-7 mt-2">
                    This website is more than just a project; it&apos;s a
                    gateway for students to access innovative educational tools.
                    It represents a fusion of technology and education, paving
                    the way for future learning experiences.
                  </p>

                  <DialogFooter className="mt-4">
                  
                      <Button className="hover:bg-green-500"><a
                      href="https://github.com/carlosandresat/educacion-del-futuro-web"
                      target="_blank"
                    >
                        View code</a>
                      </Button>
                    
                    <DialogClose>
                      <Button variant="secondary" className="w-full">
                        Back
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-muted bg-secondary">
              <Image
                alt="Tuto-U logo"
                src="/Tuto-U-logo.png"
                width={52}
                height={52}
              />
            </div>
            <div className="grid gap-1">
              <CardTitle>Tuto-U</CardTitle>
              <CardDescription className="text-green-500">
                Peer Tutoring Platform
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">
                  React, Next.js, Tailwind CSS, TypeScript, Prisma, tRCP,
                  PostgreSQL, GCP
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row justify-between gap-4">
            <a href="https://tuto-u.vercel.app/" target="_blank">
              <Button variant="link" className="hover:text-green-500">
                View live
              </Button>
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="hover:bg-green-500">
                  More info...
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[525px] md:max-w-2xl xl:max-w-3xl max-h-full">
                <DialogHeader>
                  <DialogTitle>Tuto-U</DialogTitle>
                  <DialogDescription>Peer Tutoring Platform</DialogDescription>
                </DialogHeader>
                <ScrollArea className=" h-[200px] hsm:h-[300px] hmd:h-[500px] hxl:h-[700px] px-2">
                  <div className="w-full flex justify-center">
                    <div className=" w-52 h-52 rounded-full border border-muted bg-secondary center">
                      <Image
                        alt="OrientaYT logo dark"
                        src="/Tuto-U-logo.png"
                        width={400}
                        height={400}
                        className="p-4"
                      />
                    </div>
                  </div>

                  <p className="leading-7 mt-8">
                    Tuto-U is the evolution of OrientaYT currently in
                    development, an innovative peer-tutoring web application
                    designed to revolutionize the way students learn and
                    interact. Here&apos;s a breakdown of its key features and
                    goals:
                  </p>
                  <ul className="ml-6 list-disc [&>li]:mt-2">
                    <li>
                      <span className=" font-semibold">
                        Peer-Tutoring Platform:{" "}
                      </span>
                      At its core, Tuto-U is a platform where students can
                      connect with their peers for tutoring purposes. It creates
                      a community where knowledge is shared, promoting
                      collaborative learning.
                    </li>
                    <li>
                      <span className=" font-semibold">
                        Institution and Student Registration:{" "}
                      </span>
                      Educational institutions and students can register on the
                      platform. This ensures a broad and diverse user base,
                      providing a rich learning environment.
                    </li>
                    <li>
                      <span className=" font-semibold">Student Tutors: </span>A
                      unique aspect of Tuto-U is that students themselves act as
                      tutors. This not only facilitates peer-to-peer learning
                      but also empowers students by giving them the opportunity
                      to teach and reinforce their own understanding.
                    </li>
                    <li>
                      <span className=" font-semibold">Technology Stack: </span>
                      The platform is built using cutting-edge technologies like
                      React, TypeScript, and Next.js. This ensures a robust,
                      scalable, and user-friendly application. Focus on user
                      experience and accessibility is paramount, making the app
                      inclusive and easy to navigate.
                    </li>
                    <li>
                      <span className=" font-semibold">
                        Hult Prize Competition:{" "}
                      </span>
                      Tuto-U is not just a business venture but also a
                      participant in the Hult Prize competition, aiming to
                      address pressing social issues through entrepreneurship.
                    </li>
                    <li>
                      <span className=" font-semibold">
                        Collaborative Learning Communities:
                      </span>
                      The ultimate goal of Tuto-U is to foster communities of
                      learners and educators, breaking down barriers and
                      creating a more connected and educated world.
                    </li>
                  </ul>

                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4 text-center">
                    ⚙️ Currently in Development
                  </h4>

                  <DialogFooter className="mt-4">
                    
                      <Button className="hover:bg-green-500"><a
                      href="https://github.com/carlosandresat/tuto-u"
                      target="_blank"
                    >
                        View code</a>
                      </Button>
                    
                    <DialogClose>
                      <Button variant="secondary" className="w-full">
                        Back
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-muted bg-secondary">
              <Image
                alt="EDF Academy"
                src="/logoTutoYT.png"
                width={52}
                height={52}
                className="hidden dark:block p-1"
              />
              <Image
                alt="EDF Academy"
                src="/logoTutoYTwhite.png"
                width={52}
                height={52}
                className="dark:hidden p-1"
              />
            </div>
            <div className="grid gap-1">
              <CardTitle>OrientaYT</CardTitle>
              <CardDescription className="text-green-500">
                Old Peer Tutoring Platform
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">
                  React, CSS, JavaScript, Node.js, MySQL, Express, Windows
                  Server
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row justify-end gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="hover:bg-green-500">
                  More info...
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[525px] md:max-w-2xl xl:max-w-5xl max-h-full">
                <DialogHeader>
                  <DialogTitle>OrientaYT</DialogTitle>
                  <DialogDescription>Peer Tutoring Platform</DialogDescription>
                </DialogHeader>
                <ScrollArea className=" h-[200px] hsm:h-[300px] hmd:h-[500px] hxl:h-[700px] px-2">
                  <div className="w-full flex justify-center">
                    <div className=" w-52 h-52 rounded-full border border-muted bg-secondary center">
                      <Image
                        alt="OrientaYT logo dark"
                        src="/logoTutoYT.png"
                        width={400}
                        height={400}
                        className="hidden dark:block p-2"
                      />
                      <Image
                        alt="OrientaYT logo light"
                        src="/logoTutoYTwhite.png"
                        width={400}
                        height={400}
                        className="dark:hidden p-2"
                      />
                    </div>
                  </div>

                  <p className="leading-7 mt-4">
                    OrientaYT created an educational ecosystem all about mutual
                    support. It was a peer tutoring platform designed for
                    students, by students. Its mission was to provide Yachay
                    Tech students with an online community where they could find
                    personalized academic help and collaborate in their
                    educational development.
                  </p>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    ⚙️ How it Worked:
                  </h4>

                  <p className="leading-7 mt-4">
                    OrientaYT was easy to use. If a student needed assistance,
                    they simply logged in to the platform and searched for
                    available tutors. They could explore tutor profiles, view
                    their areas of expertise, and check their availability
                    schedules. Then, they selected a tutor that suited their
                    needs and scheduled a tutoring session.
                  </p>
                  <p className="leading-7 mt-4">
                    If a student was looking to share their knowledge, they
                    could join the team of volunteer tutors. By becoming a
                    tutor, they had the opportunity to help their peers, build
                    their expertise, and earn achievements for their
                    contribution.
                  </p>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    ✨ Screenshots:
                  </h4>
                  <div className="w-full flex flex-col justify-center items-center gap-2 mt-4">
                    <Image
                      alt="OrientaYT4"
                      src="/TutoYT4.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                    <Image
                      alt="OrientaYT5"
                      src="/TutoYT5.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                    <Image
                      alt="OrientaYT6"
                      src="/TutoYT6.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                    <Image
                      alt="OrientaYT1"
                      src="/TutoYT1.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                    <Image
                      alt="OrientaYT2"
                      src="/TutoYT2.png"
                      width={600}
                      height={600}
                      className="border-4"
                    />
                    <Image
                      alt="OrientaYT3"
                      src="/TutoYT3.png"
                      width={600}
                      height={600}
                      className="border-4"
                    />
                    <Image
                      alt="OrientaYT7"
                      src="/TutoYT7.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                  </div>

                  <p className="leading-7 mt-2">
                    In summary, OrientaYT was an online learning companion,
                    where the community came together to help each other achieve
                    academic success. It was an exciting educational journey.
                    Welcome to the legacy of OrientaYT! 📚🚀
                  </p>

                  <DialogFooter className="mt-4">
                    <DialogClose>
                      <Button variant="secondary" >
                        Back
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <LayoutPanelLeftIcon className="w-8 h-8" />
            <div className="grid gap-1">
              <CardTitle>Kidney App</CardTitle>
              <CardDescription className="text-green-500">
                Dialysis Sessions Control
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">
                  React, Next.js, Tailwind CSS, TypeScript, Recharts, Prisma,
                  SQLite
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row justify-end gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="hover:bg-green-500">
                  More info...
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[525px] md:max-w-2xl xl:max-w-3xl max-h-full">
                <DialogHeader>
                  <DialogTitle>Kidney App</DialogTitle>
                  <DialogDescription>
                    Dialysis Sessions Control
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className=" h-[200px] hsm:h-[300px] hmd:h-[500px] hxl:h-[700px] px-2">
                  <div className="w-full flex justify-center">
                    <div className=" w-52 h-52 rounded-full border border-muted bg-secondary center">
                      <LayoutPanelLeftIcon className="w-full h-full p-8" />
                    </div>
                  </div>

                  <p className="leading-7 mt-4">
                    Kidney app is a web application that allows the control of
                    dialysis sessions for patients with kidney failure. It was
                    developed for a Nephrology Department of a hospital. The
                    main features are:
                  </p>
                  <ul className="ml-6 list-disc [&>li]:mt-2">
                    <li>
                      <span className=" font-semibold">
                        Patient Registration:{" "}
                      </span>
                      The app allows the registration of patients with their
                      personal information and medical history.
                    </li>
                    <li>
                      <span className=" font-semibold">
                        Dialysis Sessions Control:{" "}
                      </span>
                      The app allows the registration of dialysis sessions for
                      each patient, including the date, time, clinical
                      parameters, and additional symptoms.
                    </li>
                    <li>
                      <span className=" font-semibold">Charts: </span>
                      The app allows the visualization of charts with data of
                      the dialysis sessions for each patient in a timeline with
                      clinical parameters.
                    </li>
                    <li>
                      <span className=" font-semibold">Technology Stack: </span>
                      The platform is built using cutting-edge technologies like
                      React, TypeScript, and Next.js. This ensures a robust,
                      scalable, and user-friendly application. Focus on user
                      experience and accessibility is paramount, making the app
                      inclusive and easy to navigate.
                    </li>
                  </ul>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    👨‍💻 Screenshots:
                  </h4>
                  <div className="w-full flex flex-col justify-center items-center gap-2 mt-4">
                    <Image
                      alt="Kidney1"
                      src="/Kidney1.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                    <Image
                      alt="Kidney2"
                      src="/Kidney2.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                    <Image
                      alt="Kidney3"
                      src="/Kidney3.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                    <Image
                      alt="Kidney4"
                      src="/Kidney4.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                    <Image
                      alt="Kidney5"
                      src="/Kidney5.png"
                      width={800}
                      height={800}
                      className="border-4"
                    />
                  </div>

                  <p className="leading-7 mt-2">
                    Obviously this is dummy data, respecting the patient&apos;s
                    privacy. The retrieved data is stored in a local SQLite
                    database so it can be used in future for analysis and
                    research purposes by the Nephrology Department using
                    Artificial Intelligence and Machine Learning algorithms to
                    improve the quality of life of patients with kidney failure
                    and to prevent a fully kidney failure.
                  </p>
                  <p className="leading-7 mt-2">
                    Anyways, I upload a functional version of the app in GitHub,
                    so you can check it out and play with it. I hope you like
                    it!
                  </p>

                  <DialogFooter className="mt-4">
                    <Button className="hover:bg-green-500">
                      <a
                        href="https://github.com/carlosandresat/kidney-app"
                        target="_blank"
                      >
                        View code
                      </a>
                    </Button>
                    <DialogClose>
                      <Button variant="secondary" className="w-full">Back</Button>
                    </DialogClose>
                  </DialogFooter>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

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
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-24 lg:pt-32">
          Mis Cursos
        </h1>
        <div className="flex flex-col w-full max-w-screen-lg space-y-6 p-8">
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:m-6 shrink-0 object-cover p-2 ml-5">
              <Image
                src="/Python.png"
                height={60}
                width={60}
                alt="Python"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Programación Básica con Python</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>En este curso desarrollarás habilidades bla bla bla</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:m-6 shrink-0 object-cover p-2 ml-5">
              <Image
                src="/python.png"
                height={60}
                width={60}
                alt="Python"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Programación Básica con Python</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>En este curso desarrollarás habilidades bla bla bla</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
          <Card className="flex items-center h-full">
            <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:m-6 shrink-0 object-cover p-2 ml-5">
              <Image
                src="/python.png"
                height={60}
                width={60}
                alt="Python"
              ></Image>
            </div>
            <div>
              <CardHeader>
                <CardTitle>Programación Básica con Python</CardTitle>
                <CardDescription>
                  6 clases prácticas + 1 proyecto final
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>En este curso desarrollarás habilidades bla bla bla</p>
              </CardContent>
              <CardFooter>
                <Button>Ver más</Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

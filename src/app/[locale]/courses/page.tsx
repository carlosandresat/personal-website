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
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Courses() {
  const t = useTranslations("Courses");
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-24 lg:pt-32">
        {t("title")}
      </h1>
      <div className="flex flex-col w-full max-w-screen-lg space-y-6 p-8">
        <Card className="flex items-center h-full">
          <div className="flex w-16 md:w-28 aspect-square justify-center items-center bg-secondary shadow rounded-xl md:ml-10 md:mr-4 shrink-0 object-cover p-2 ml-5">
            <Image
              src="/Python.png"
              height={200}
              width={200}
              alt="Python"
            ></Image>
          </div>
          <div>
            <CardHeader>
              <CardTitle>{t("BasicsPython.title")}</CardTitle>
              <CardDescription>
                8 {t("BasicsPython.lectures")} + 8 {t("BasicsPython.workshops")}{" "}
                + 8 {t("BasicsPython.assessments")} + 1{" "}
                {t("BasicsPython.project")}
              </CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("BasicsPython.description")}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/courses/basics-python">Ver más</Link>
              </Button>
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
              <CardTitle>{t("Scratch.title")}</CardTitle>
              <CardDescription>
                6 {t("BasicsPython.lectures")} + 6 {t("BasicsPython.workshops")}{" "}
                + 3 {t("Scratch.projects")}
              </CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("Scratch.description")}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/courses/scratch-kids">Ver más</Link>
              </Button>
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
              <CardTitle>{t("Matplotlib.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("Matplotlib.description")}</p>
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
              <CardTitle>{t("FrontI.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("FrontI.description")}</p>
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
              <CardTitle>{t("FrontII.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("FrontII.description")}</p>
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
              <CardTitle>{t("FrontIII.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("FrontIII.description")}</p>
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
              <CardTitle>{t("Databases.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("Databases.description")}</p>
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
              <CardTitle>{t("BackExpress.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("BackExpress.description")}</p>
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
              <CardTitle>{t("BackNext.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("BackNext.description")}</p>
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
              <CardTitle>{t("IoTArduino.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("IoTArduino.description")}</p>
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
              <CardTitle>{t("IoTESP8266.title")}</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="hidden md:block">
              <p>{t("IoTESP8266.description")}</p>
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

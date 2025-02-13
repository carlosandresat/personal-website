import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { LayoutPanelLeftIcon } from "lucide-react";
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
import { useTranslations } from "next-intl";

export default function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section
      className="w-full flex flex-col justify-center items-center py-12 md:py-24 lg:py-28"
      id="projects"
    >
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t("title")}
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
            <Button variant="link" className="hover:text-green-500" asChild>
              <a href="https://edfacademy.com/" target="_blank">
                {t("liveButtonText")}
              </a>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="hover:bg-green-500">
                  {t("infoButtonText")}
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
                    {t("projects.edf.content.introduction")}
                  </p>
                  <p className="leading-7 mt-4">
                    🛠️{" "}
                    <span className=" font-semibold">
                      {t("projects.edf.content.title1")}{" "}
                    </span>
                    {t("projects.edf.content.p1")}
                  </p>
                  <ul className="ml-6 list-disc [&>li]:mt-2">
                    <li>
                      <span className=" font-semibold">
                        React & Typescript{" "}
                      </span>
                      {t("projects.edf.content.item1description")}
                    </li>
                    <li>
                      <span className=" font-semibold">TailwindCSS </span>
                      {t("projects.edf.content.item2description")}
                    </li>
                    <li>
                      <span className=" font-semibold">Next.js 14 </span>
                      {t("projects.edf.content.item3description")}
                    </li>
                    <li>
                      <span className=" font-semibold">Shadcn, </span>
                      {t("projects.edf.content.item4description")}
                    </li>
                    <li>
                      <span className=" font-semibold">Prisma & MySQL </span>
                      {t("projects.edf.content.item5description")}
                    </li>
                    <li>
                      <span className=" font-semibold">
                        Google Cloud Platform (GCP){" "}
                      </span>
                      {t("projects.edf.content.item6description")}
                    </li>
                  </ul>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    🔍 {t("projects.edf.content.title2")}
                  </h4>
                  <p className="leading-7 mt-2">
                    {t("projects.edf.content.p2")}
                  </p>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    🌐 {t("projects.edf.content.title3")}
                  </h4>

                  <p className="leading-7 mt-2">
                    {t("projects.edf.content.p3")}
                  </p>

                  <DialogFooter className="mt-4">
                    <Button className="hover:bg-green-500">
                      <a
                        href="https://github.com/carlosandresat/educacion-del-futuro-web"
                        target="_blank"
                      >
                        {t("viewCodeButton")}
                      </a>
                    </Button>

                    <DialogClose>
                      <Button variant="secondary" className="w-full">
                        {t("backButton")}
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
                {t("projects.tutou.description")}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">
                  React, Next.js, Tailwind CSS, TypeScript, Prisma,
                  PostgreSQL, GCP
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row justify-between gap-4">
            <Button variant="link" className="hover:text-green-500" asChild>
              <a href="https://tutou.app/" target="_blank">
                {t("liveButtonText")}
              </a>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="hover:bg-green-500">
                  {t("infoButtonText")}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[525px] md:max-w-2xl xl:max-w-3xl max-h-full">
                <DialogHeader>
                  <DialogTitle>Tuto-U</DialogTitle>
                  <DialogDescription>
                    {t("projects.tutou.description")}
                  </DialogDescription>
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
                    {t("projects.tutou.content.introduction")}
                  </p>
                  <ul className="ml-6 list-disc [&>li]:mt-2">
                    <li>
                      <span className=" font-semibold">
                        {t("projects.tutou.content.item1")}{" "}
                      </span>
                      {t("projects.tutou.content.item1desc")}
                    </li>
                    <li>
                      <span className=" font-semibold">
                        {t("projects.tutou.content.item2")}{" "}
                      </span>
                      {t("projects.tutou.content.item2desc")}
                    </li>
                    <li>
                      <span className=" font-semibold">
                        {t("projects.tutou.content.item3")}{" "}
                      </span>
                      {t("projects.tutou.content.item3desc")}
                    </li>
                    <li>
                      <span className=" font-semibold">
                        {t("projects.tutou.content.item4")}{" "}
                      </span>
                      {t("projects.tutou.content.item4desc")}
                    </li>
                    <li>
                      <span className=" font-semibold">
                        {t("projects.tutou.content.item5")}{" "}
                      </span>
                      {t("projects.tutou.content.item5desc")}
                    </li>
                    <li>
                      <span className=" font-semibold">
                        {t("projects.tutou.content.item6")}{" "}
                      </span>
                      {t("projects.tutou.content.item6desc")}
                    </li>
                  </ul>

                  <p className="leading-7 mt-4">
                    {t("projects.tutou.content.p2")}
                  </p>

                  <DialogFooter className="mt-4">
                    <Button className="hover:bg-green-500">
                      <a
                        href="https://github.com/carlosandresat/tuto-u"
                        target="_blank"
                      >
                        {t("viewCodeButton")}
                      </a>
                    </Button>

                    <DialogClose>
                      <Button variant="secondary" className="w-full">
                        {t("backButton")}
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
                alt="OrientaYT logo"
                src="/logoTutoYT.png"
                width={52}
                height={52}
                className="hidden dark:block p-1"
              />
              <Image
                alt="OrientaYT logo"
                src="/logoTutoYTwhite.png"
                width={52}
                height={52}
                className="dark:hidden p-1"
              />
            </div>
            <div className="grid gap-1">
              <CardTitle>OrientaYT</CardTitle>
              <CardDescription className="text-green-500">
                {t("projects.orientayt.description")}
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
                  {t("infoButtonText")}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[525px] md:max-w-2xl xl:max-w-5xl max-h-full">
                <DialogHeader>
                  <DialogTitle>OrientaYT</DialogTitle>
                  <DialogDescription>
                    {" "}
                    {t("projects.orientayt.description")}
                  </DialogDescription>
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
                    {t("projects.orientayt.content.introduction")}
                  </p>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4">
                    ⚙️ {t("projects.orientayt.content.title1")}
                  </h4>

                  <p className="leading-7 mt-4">
                    {t("projects.orientayt.content.p1")}
                  </p>
                  <p className="leading-7 mt-4">
                    {t("projects.orientayt.content.p2")}{" "}
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
                    {t("projects.orientayt.content.p3")}{" "}
                  </p>

                  <DialogFooter className="mt-4">
                    <DialogClose>
                      <Button variant="secondary">{t("backButton")}</Button>
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
                {t("projects.kidneyapp.description")}
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
                  {t("infoButtonText")}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[525px] md:max-w-2xl xl:max-w-3xl max-h-full">
                <DialogHeader>
                  <DialogTitle>Kidney App</DialogTitle>
                  <DialogDescription>
                    {t("projects.kidneyapp.description")}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className=" h-[200px] hsm:h-[300px] hmd:h-[500px] hxl:h-[700px] px-2">
                  <div className="w-full flex justify-center">
                    <div className=" w-52 h-52 rounded-full border border-muted bg-secondary center">
                      <LayoutPanelLeftIcon className="w-full h-full p-8" />
                    </div>
                  </div>

                  <p className="leading-7 mt-4">
                    {t("projects.kidneyapp.content.introduction")}
                  </p>
                  <ul className="ml-6 list-disc [&>li]:mt-2">
                    <li>
                      <span className=" font-semibold">
                        {t("projects.kidneyapp.content.item1")}{" "}
                      </span>
                      {t("projects.kidneyapp.content.item1desc")}
                    </li>
                    <li>
                      <span className="font-semibold">
                        {t("projects.kidneyapp.content.item2")}{" "}
                      </span>
                      {t("projects.kidneyapp.content.item2desc")}
                    </li>
                    <li>
                      <span className=" font-semibold">
                        {t("projects.kidneyapp.content.item3")}{" "}
                      </span>
                      {t("projects.kidneyapp.content.item3desc")}
                    </li>
                    <li>
                      <span className=" font-semibold">
                        {t("projects.kidneyapp.content.item4")}{" "}
                      </span>
                      {t("projects.kidneyapp.content.item4desc")}
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
                    {t("projects.kidneyapp.content.p1")}
                  </p>
                  <p className="leading-7 mt-2">
                    {t("projects.kidneyapp.content.p2")}
                  </p>

                  <DialogFooter className="mt-4">
                    <Button className="hover:bg-green-500">
                      <a
                        href="https://github.com/carlosandresat/kidney-app"
                        target="_blank"
                      >
                        {t("viewCodeButton")}
                      </a>
                    </Button>
                    <DialogClose>
                      <Button variant="secondary" className="w-full">
                        {t("backButton")}
                      </Button>
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

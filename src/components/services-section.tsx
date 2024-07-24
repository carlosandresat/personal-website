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

export default function ServicesSection() {
  return (
    <section
      className="w-full flex flex-col justify-center items-center py-12 md:py-24 lg:py-28"
      id="projects"
    >
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        My Services
      </h2>
      <div className="flex flex-col space-y-8 p-8 max-w-screen-xl  justify-center items-center">
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row space-x-12 items-center justify-center">
          <div className="flex space-x-8 md:space-x-12 items-center">
            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Desarrollo Web
              </h4>
              <p className="leading-7 text-right">
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax.
              </p>
            </div>
            <div className="flex-shrink-0 w-24 h-24 bg-green-500 rounded-md"></div>
          </div>
          <div className="flex space-x-8 md:space-x-12 items-center">
            <div className="flex-shrink-0 w-24 h-24 bg-secondary rounded-md"></div>

            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Desarrollo Web
              </h4>
              <p className="leading-7 mt-2 text-right">
              The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row space-x-12 items-center justify-center">
          <div className="flex space-x-8 md:space-x-12 items-center">
            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Desarrollo Web
              </h4>
              <p className="leading-7 text-right">
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax.
              </p>
            </div>
            <div className="flex-shrink-0 w-24 h-24 bg-secondary rounded-md"></div>
          </div>
          <div className="flex space-x-8 md:space-x-12 items-center">
            <div className="flex-shrink-0 w-24 h-24 bg-green-500 rounded-md"></div>

            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Desarrollo Web
              </h4>
              <p className="leading-7 mt-2 text-right">
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row space-x-12 items-center justify-center">
          <div className="flex space-x-8 md:space-x-12 items-center">
            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Desarrollo Web
              </h4>
              <p className="leading-7 text-right">
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax.
              </p>
            </div>
            <div className="flex-shrink-0 w-24 h-24 bg-green-500 rounded-md"></div>
          </div>
          <div className="flex space-x-8 md:space-x-12 items-center">
            <div className="flex-shrink-0 w-24 h-24 bg-secondary rounded-md"></div>

            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Desarrollo Web
              </h4>
              <p className="leading-7 mt-2 text-right">
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

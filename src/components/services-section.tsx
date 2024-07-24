import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
    Award,
  BookOpenIcon,
  Code2,
  GithubIcon,
  HomeIcon,
  LayoutPanelLeftIcon,
  Server,
  UserCheck,
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
      id="services"
    >
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        My Services
      </h2>
      <div className="flex flex-col space-y-8 p-8 max-w-screen-xl  justify-center items-center">
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row space-x-12 items-center justify-center">
          <div className="flex space-x-8 md:space-x-12 items-center">
            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Tutorías Personalizadas
              </h4>
              <p className="leading-7 text-right">
                Ofrezco sesiones de tutoría personalizadas en desarrollo web,
                adaptadas a tus necesidades específicas. Desde principiantes
                hasta desarrolladores medianamente avanzados, aseguro un
                aprendizaje dirigido y eficaz para cada estudiante.
              </p>
            </div>
            <div className="flex-shrink-0 w-24 h-24 flex justify-center items-center bg-green-500 rounded-md">
              <UserCheck className="w-8 h-8" />
            </div>
          </div>
          <div className="flex space-x-8 md:space-x-12 items-center">
          <div className="flex-shrink-0 w-24 h-24 flex justify-center items-center bg-secondary rounded-md">
              <Award className="w-8 h-8" />
            </div>

            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Cursos
              </h4>
              <p className="leading-7 mt-2">
                Imparto cursos completos sobre tecnologías de front-end,
                back-end y full-stack. Estos cursos están diseñados para
                proporcionar una base sólida y habilidades prácticas necesarias
                para sobresalir en el campo del desarrollo web.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row space-x-12 items-center justify-center">
          <div className="flex space-x-8 md:space-x-12 items-center">
            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Desarrollo de Aplicaciones Web a Medida
              </h4>
              <p className="leading-7 text-right">
                Como desarrollador experimentado, ofrezco servicios de diseño y
                desarrollo de aplicaciones web a medida. Desde la
                conceptualización hasta el lanzamiento, manejo todos los
                aspectos técnicos para crear aplicaciones robustas y eficientes.
              </p>
            </div>
            <div className="flex-shrink-0 w-24 h-24 flex justify-center items-center bg-green-500 md:bg-secondary rounded-md">
              <Code2 className="w-8 h-8" />
            </div>
          </div>
          <div className="flex space-x-8 md:space-x-12 items-center">
          <div className="flex-shrink-0 w-24 h-24 flex justify-center items-center bg-secondary md:bg-green-500 rounded-md">
              <Server className="w-8 h-8" />
            </div>

            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-right">
                Desarrollo y Gestión de Bases de Datos
              </h4>
              <p className="leading-7 mt-2 text-right">
                Especializado en el diseño y manejo de bases de datos, ofrezco
                soluciones que garantizan la integridad, el rendimiento y la
                escalabilidad de los datos. Perfecto para negocios que requieren
                almacenamiento de datos avanzado y análisis en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

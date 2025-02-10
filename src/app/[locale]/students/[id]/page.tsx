import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Page() {
  return (
    <main className="w-full flex flex-col justify-center items-center py-12 md:py-24 lg:py-28 min-h-[93vh]">
      <div className="max-w-screen-lg px-8 pt-12 lg:pt-0">
        <Card className="w-full">
          <CardHeader className="flex flex-col sm:flex-row items-center  gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" alt="Student Name" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-bold">
                Carlos Arévalo
              </CardTitle>
              <p className="text-muted-foreground">
                carlosandresat@hotmail.com
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <h3 className="text-xl font-semibold mb-6">Acerca</h3>
            <p className="text-muted-foreground mb-8 leading-7">
              Esta es una descripción genérica de un estudiante. Aquí se puede
              hablar de sus intereses, habilidades y metas. También se puede
              mencionar cualquier información relevante sobre su experiencia
              profesional o educativa. Esta sección puede ser tan larga como sea
              necesario.
            </p>
            <h3 className="text-xl font-semibold mb-4">Cursos Completados</h3>
            <div className="space-y-4 mt-6">
              <Card className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Curso 1</h4>
                    <p className="text-sm text-muted-foreground">
                      Completed: 20-12-2024
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://github.com/carlosandresat/personal-website"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Final Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Curso 1</h4>
                    <p className="text-sm text-muted-foreground">
                      Completed: 20-12-2024
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://github.com/carlosandresat/personal-website"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Final Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Curso 1</h4>
                    <p className="text-sm text-muted-foreground">
                      Completed: 20-12-2024
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://github.com/carlosandresat/personal-website"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Final Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

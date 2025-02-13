import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const t = useTranslations("Developing");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-24 lg:pt-32 px-8 text-center">
        {t("title")}
      </h1>
      <Tabs defaultValue="requirements" className="w-full max-w-screen-xl p-8">
        <TabsList className="flex w-full  py-2 h-full flex-wrap justify-center">
          <TabsTrigger value="requirements" className="text-wrap">
            1. Requerimientos
          </TabsTrigger>
          <TabsTrigger value="planning" className="text-wrap">
            2. Planificación
          </TabsTrigger>
          <TabsTrigger value="development" className="text-wrap">
            3. Desarrollo
          </TabsTrigger>
          <TabsTrigger value="deployment" className="text-wrap">
            4. Despliegue
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="text-wrap">
            5. Mantenimiento
          </TabsTrigger>
        </TabsList>
        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="development">
          <Card>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
            <CardHeader>
              <CardTitle>Título Subsección</CardTitle>
              <CardDescription>Objetivo de la subsección</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="leading-7">
                Texto de relleno. Este es un párrafo de prueba. Solo busca
                llenar el espacio para verificar cómo se ve. No sé qué más
                poner.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

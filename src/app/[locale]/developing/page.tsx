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
              <CardTitle>Primera Reunión: Análisis de Requerimientos</CardTitle>
              <CardDescription>
                Definir qué necesita el cliente y establecer una visión clara
                del proyecto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Describir la idea general del proyecto y sus objetivos.</li>
                <li>
                  Mencionar funcionalidades esenciales y necesidades
                  específicas.
                </li>
                <li>
                  Proporcionar información sobre presupuesto y tiempo estimado.
                </li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Realizar preguntas para clarificar requerimientos.</li>
                <li>
                  Tomar notas detalladas y sugerir posibles tecnologías o
                  enfoques.
                </li>
                <li>Establecer la base para la documentación futura.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>
                Documento de Especificaciones y Propuesta Técnica
              </CardTitle>
              <CardDescription>
                Formalizar los requerimientos y establecer una hoja de ruta
                inicial del proyecto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Revisar el documento para confirmar que todos los
                  requerimientos están contemplados.
                </li>
                <li>Proveer retroalimentación y sugerir ajustes necesarios.</li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Redactar un documento que incluya descripción del sistema,
                  funcionalidades, cronograma y estimación de costos.
                </li>
                <li>
                  Proponer metodologías de trabajo y herramientas de
                  seguimiento.
                </li>
              </ul>
            </CardContent>
            <CardHeader>
              <CardTitle>Firma de Contrato y Definición del Alcance</CardTitle>
              <CardDescription>
                Alinear expectativas, costos y plazos mediante un acuerdo
                formal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Leer, entender y firmar el contrato.</li>
                <li>Realizar el primer pago o adelanto si aplica.</li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Establecer claramente los entregables y los tiempos de
                  entrega.
                </li>
                <li>
                  Definir canales y herramientas de comunicación y seguimiento.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="development">
          <Card>
            <CardHeader>
              <CardTitle>Diseño y Prototipado</CardTitle>
              <CardDescription>
                Crear y validar la interfaz de usuario (UI) y la experiencia de
                usuario (UX) del proyecto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Revisar bocetos y wireframes presentados.</li>
                <li>Proporcionar feedback para refinar el diseño.</li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Desarrollar wireframes.</li>
                <li>
                  Ajustar el diseño de acuerdo a los comentarios del cliente.
                </li>
              </ul>
            </CardContent>
            <CardHeader>
              <CardTitle>Codificación y Construcción del Sistema</CardTitle>
              <CardDescription>
                Implementar las funcionalidades definidas y estructurar la base
                del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Revisar entregas parciales o demos del sistema.</li>
                <li>
                  Validar que las funcionalidades se ajusten a lo esperado y
                  reportar observaciones.
                </li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Escribir el código, crear la arquitectura del software y
                  configurar la base de datos.
                </li>
                <li>
                  Integrar módulos y realizar pruebas unitarias durante el
                  desarrollo.
                </li>
              </ul>
            </CardContent>
            <CardHeader>
              <CardTitle>Pruebas y Ajustes</CardTitle>
              <CardDescription>
                Garantizar que el sistema funcione correctamente y esté libre de
                errores antes de su despliegue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Ejecutar pruebas de usuario en el entorno de desarrollo.
                </li>
                <li>Reportar incidencias o mejoras necesarias.</li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Realizar pruebas de integración, compatibilidad y seguridad.
                </li>
                <li>
                  Corregir errores y optimizar el rendimiento del sistema.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Entorno de Producción</CardTitle>
              <CardDescription>
                Preparar la infraestructura necesaria para alojar y ejecutar la
                aplicación en vivo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Definir el dominio para la aplicación</li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Configurar servidores, dominios y bases de datos en el entorno
                  de producción.
                </li>
                <li>
                  Realizar pruebas finales para garantizar la correcta
                  migración.
                </li>
              </ul>
            </CardContent>
            <CardHeader>
              <CardTitle>Lanzamiento y Capacitación</CardTitle>
              <CardDescription>
                Poner la aplicación en línea y capacitar al cliente para su uso
                correcto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Verificar el correcto funcionamiento del sistema en
                  producción.
                </li>
                <li>
                  Participar en sesiones de capacitación y revisión de manuales
                  de uso.
                </li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Realizar el despliegue final y monitorear la estabilidad
                  inicial del sistema.
                </li>
                <li>
                  Proveer documentación, manuales y soporte para la capacitación
                  del equipo.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Soporte y Monitoreo Continuo</CardTitle>
              <CardDescription>
                Asegurar la operación estable del sistema y resolver incidencias
                que puedan surgir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Reportar problemas o incidencias en el uso diario.</li>
                <li>
                  Sugerir mejoras o nuevas funcionalidades conforme se utilice
                  el sistema.
                </li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Monitorear el rendimiento y la seguridad del sistema de manera
                  continua.
                </li>
                <li>
                  Proveer soporte técnico y solucionar errores o fallos
                  detectados.
                </li>
              </ul>
            </CardContent>
            <CardHeader>
              <CardTitle>Actualizaciones y Mejoras</CardTitle>
              <CardDescription>
                Mantener el software actualizado y adaptarlo a cambios o nuevas
                necesidades del negocio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Cliente
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Evaluar y proponer nuevas funcionalidades o mejoras
                  periódicas.
                </li>
                <li>Planificar en conjunto futuros ciclos de actualización.</li>
              </ul>
              <h4 className="font-semibold leading-none tracking-tight">
                Acciones del Desarrollador
              </h4>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                  Desarrollar e implementar actualizaciones de seguridad,
                  rendimiento y nuevas funcionalidades.
                </li>
                <li>
                  Realizar pruebas posteriores a cada actualización para
                  garantizar la estabilidad del sistema.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

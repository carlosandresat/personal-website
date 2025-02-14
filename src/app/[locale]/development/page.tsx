import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhaseTabContent from "@/components/phase-tab-content";

export default function Page() {
  const t = useTranslations("Development");

  const tabsData = [
    {
      code: "requirements",
      title: "Requerimientos",
      phases: [
        {
          title: "Primera Reunión: Análisis de Requerimientos",
          description:
            "Definir qué necesita el cliente y establecer una visión clara del proyecto.",
          clientActions: [
            "Describir la idea general del proyecto y sus objetivos.",
            "Mencionar funcionalidades esenciales y necesidades específicas.",
            "Proporcionar información sobre presupuesto y tiempo estimado.",
          ],
          developerActions: [
            "Realizar preguntas para clarificar requerimientos.",
            "Tomar notas detalladas y sugerir posibles tecnologías o enfoques.",
            "Establecer la base para la documentación futura.",
          ],
        },
      ],
    },
    {
      code: "planning",
      title: "Planificación",
      phases: [
        {
          title: "Documento de Especificaciones y Propuesta Técnica",
          description:
            "Formalizar los requerimientos y establecer una hoja de ruta inicial del proyecto.",
          clientActions: [
            "Revisar el documento para confirmar que todos los requerimientos están contemplados.",
            "Proveer retroalimentación y sugerir ajustes necesarios.",
          ],
          developerActions: [
            "Redactar un documento que incluya descripción del sistema, funcionalidades, cronograma y estimación de costos.",
            "Proponer metodologías de trabajo y herramientas de seguimiento.",
          ],
        },
        {
          title: "Firma de Contrato y Definición del Alcance",
          description:
            "Alinear expectativas, costos y plazos mediante un acuerdo formal.",
          clientActions: [
            "Leer, entender y firmar el contrato.",
            "Realizar el primer pago o adelanto si aplica.",
          ],
          developerActions: [
            "Establecer claramente los entregables y los tiempos de entrega.",
            "Definir canales y herramientas de comunicación y seguimiento.",
          ],
        },
      ],
    },
    {
      code: "development",
      title: "Desarrollo",
      phases: [
        {
          title: "Diseño y Prototipado",
          description:
            "Crear y validar la interfaz de usuario (UI) y la experiencia de usuario (UX) del proyecto.",
          clientActions: [
            "Revisar bocetos y wireframes presentados.",
            "Proporcionar feedback para refinar el diseño.",
          ],
          developerActions: [
            "Desarrollar wireframes.",
            "Ajustar el diseño de acuerdo a los comentarios del cliente.",
          ],
        },
        {
          title: "Codificación y Construcción del Sistema",
          description:
            "Implementar las funcionalidades definidas y estructurar la base del sistema.",
          clientActions: [
            "Revisar entregas parciales o demos del sistema.",
            "Validar que las funcionalidades se ajusten a lo esperado y reportar observaciones.",
          ],
          developerActions: [
            "Escribir el código, crear la arquitectura del software y configurar la base de datos.",
            "Integrar módulos y realizar pruebas unitarias durante el desarrollo.",
          ],
        },
        {
          title: "Pruebas y Ajustes",
          description:
            "Garantizar que el sistema funcione correctamente y esté libre de errores antes de su despliegue.",
          clientActions: [
            "Ejecutar pruebas de usuario en el entorno de desarrollo.",
            "Reportar incidencias o mejoras necesarias.",
          ],
          developerActions: [
            "Realizar pruebas de integración, compatibilidad y seguridad.",
            "Corregir errores y optimizar el rendimiento del sistema.",
          ],
        },
      ],
    },
    {
      code: "deployment",
      title: "Despliegue",
      phases: [
        {
          title: "Configuración del Entorno de Producción",
          description:
            "Preparar la infraestructura necesaria para alojar y ejecutar la aplicación en vivo.",
          clientActions: ["Definir el dominio para la aplicación"],
          developerActions: [
            "Configurar servidores, dominios y bases de datos en el entorno de producción.",
            "Realizar pruebas finales para garantizar la correcta migración.",
          ],
        },
        {
          title: "Lanzamiento y Capacitación",
          description:
            "Poner la aplicación en línea y capacitar al cliente para su uso correcto.",
          clientActions: [
            "Verificar el correcto funcionamiento del sistema en producción.",
            "Participar en sesiones de capacitación y revisión de manuales de uso.",
          ],
          developerActions: [
            "Realizar el despliegue final y monitorear la estabilidad inicial del sistema.",
            "Proveer documentación, manuales y soporte para la capacitación del equipo.",
          ],
        },
      ],
    },
    {
      code: "maintenance",
      title: "Mantenimiento",
      phases: [
        {
          title: "Soporte y Monitoreo Continuo",
          description:
            "Asegurar la operación estable del sistema y resolver incidencias que puedan surgir.",
          clientActions: [
            "Reportar problemas o incidencias en el uso diario.",
            "Sugerir mejoras o nuevas funcionalidades conforme se utilice el sistema.",
          ],
          developerActions: [
            "Monitorear el rendimiento y la seguridad del sistema de manera continua.",
            "Proveer soporte técnico y solucionar errores o fallos detectados.",
          ],
        },
        {
          title: "Actualizaciones y Mejoras",
          description:
            "Mantener el software actualizado y adaptarlo a cambios o nuevas necesidades del negocio.",
          clientActions: [
            "Evaluar y proponer nuevas funcionalidades o mejoras periódicas.",
            "Planificar en conjunto futuros ciclos de actualización.",
          ],
          developerActions: [
            "Desarrollar e implementar actualizaciones de seguridad, rendimiento y nuevas funcionalidades.",
            "Realizar pruebas posteriores a cada actualización para garantizar la estabilidad del sistema.",
          ],
        },
      ],
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-24 lg:pt-32 px-8 text-center">
        {t("title")}
      </h1>
      <Tabs defaultValue="requirements" className="w-full max-w-screen-xl p-8">
        <TabsList className="flex w-full  py-2 h-full flex-wrap justify-center">
          {tabsData.map((tab, index) => (
            <TabsTrigger value={tab.code} key={tab.code} className="text-wrap">
              {`${index + 1}. ` + tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsData.map((tab) => (
          <TabsContent value={tab.code} key={tab.code}>
            {tab.phases.map((data, index) => (
              <PhaseTabContent
                key={index}
                title={data.title}
                description={data.description}
                clientActions={data.clientActions}
                developerActions={data.developerActions}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

import { BinaryGrowth } from "@/components/explora/binary-growth";
import { BinaryGuessGame } from "@/components/explora/binary-guess-game";
import { Code, Homework, InlineCode, List, P, Section } from "@/components/explora/prose";

const CODE = `def buscar(lista, objetivo):
    izq, der = 0, len(lista) - 1
    while izq <= der:
        medio = (izq + der) // 2
        if lista[medio] == objetivo:
            return medio
        if lista[medio] < objetivo:
            izq = medio + 1
        else:
            der = medio - 1
    return -1`;

/** With k guesses you can tell apart up to 2^k − 1 numbers. */
const COVERAGE = Array.from({ length: 7 }, (_, i) => ({ guesses: i + 1, numbers: 2 ** (i + 1) - 1 }));

export function BusquedaBinaria() {
  return (
    <div className="flex flex-col gap-12">
      <Section title="Juega primero">
        <P>
          Piensa un número del 1 al 100 y responde con honestidad. La página siempre pregunta por el número del
          medio de lo que queda, y nunca necesita más de 7 intentos.
        </P>
        <BinaryGuessGame />
      </Section>

      <Section title="El truco: descartar la mitad">
        <P>
          Si pregunto por el 50 y me dices &ldquo;es mayor&rdquo;, de un solo golpe descarto del 1 al 50. Con cada
          respuesta, lo que queda por revisar se parte a la mitad: 100, 50, 25, 12, 6, 3, 1. Revisar uno por uno, en
          cambio, solo descarta un número por intento.
        </P>
        <P>
          Esto solo funciona si los datos están <strong>ordenados</strong>. En una lista desordenada, saber que el 50
          &ldquo;no es&rdquo; no te dice nada sobre dónde buscar después.
        </P>
      </Section>

      <Section title="¿Por qué 7 intentos?">
        <P>
          Con cada intento, la cantidad de números que puedes cubrir se duplica (más uno, el que preguntas). Con{" "}
          <InlineCode>k</InlineCode> intentos distingues hasta <InlineCode>2^k − 1</InlineCode> números:
        </P>
        <div className="overflow-x-auto">
          <table className="w-full max-w-md border-collapse text-sm">
            <thead>
              <tr className="border-b border-foreground text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Intentos</th>
                <th className="py-2 font-medium">Números que cubres</th>
              </tr>
            </thead>
            <tbody>
              {COVERAGE.map(({ guesses, numbers }) => (
                <tr key={guesses} className="border-b">
                  <td className="py-2 pr-4 font-mono">{guesses}</td>
                  <td className={numbers >= 100 ? "py-2 font-semibold text-brand" : "py-2"}>{numbers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>
          Con 6 intentos llegas a 63, que no alcanza para 100; con 7 llegas a 127, que sí. La operación que responde
          &ldquo;¿cuántas veces tengo que duplicar para llegar a tanto?&rdquo; es el logaritmo en base 2: los
          intentos que necesitas son <InlineCode>⌈log₂(n + 1)⌉</InlineCode>. Esa es la matemática del colegio
          trabajando.
        </P>
      </Section>

      <Section title="Lo que de verdad importa: cómo crece">
        <P>
          Mueve el control. Revisar uno por uno crece igual que la lista; partir a la mitad solo suma un intento cada
          vez que la lista se duplica. Con un millón de datos, la diferencia es entre un millón de intentos y 20.
        </P>
        <BinaryGrowth />
      </Section>

      <Section title="En código">
        <Code code={CODE} />
        <List>
          <li>
            <InlineCode>izq</InlineCode> y <InlineCode>der</InlineCode> marcan el rango que todavía puede tener el
            objetivo; al empezar, la lista entera.
          </li>
          <li>
            <InlineCode>medio</InlineCode> es el elemento del centro (<InlineCode>{"//"}</InlineCode> divide y descarta
            los decimales).
          </li>
          <li>
            Si el del medio es menor que el objetivo, todo lo de su izquierda también lo es: el rango empieza después
            de él. Si es mayor, termina antes.
          </li>
          <li>
            Si el rango se queda vacío (<InlineCode>izq &gt; der</InlineCode>), el objetivo no está y se devuelve{" "}
            <InlineCode>-1</InlineCode>.
          </li>
        </List>
        <P>
          Para comprobar que lo entendiste, explícalo con tus palabras: ¿qué pasaría si la condición fuera{" "}
          <InlineCode>izq &lt; der</InlineCode> en lugar de <InlineCode>izq &lt;= der</InlineCode>? Pruébalo con
          una lista de un solo elemento.
        </P>
      </Section>

      <Section title="¿Dónde se usa?">
        <List>
          <li>
            <strong>Bases de datos:</strong> sus índices son árboles que mantienen los datos ordenados y descartan
            partes enteras en cada paso. En vez de partir en dos, parten en cientos de ramas, pero la idea es la misma.
          </li>
          <li>
            <strong>Encontrar el cambio que rompió un programa:</strong> <InlineCode>git bisect</InlineCode> prueba la
            versión del medio de la historia y descarta la mitad buena o la mala, hasta dar con el cambio culpable.
          </li>
          <li>
            <strong>Un diccionario de papel:</strong> nadie lo lee página por página; lo abres por la mitad y decides
            hacia qué lado ir.
          </li>
        </List>
      </Section>

      <Section title="Cuidado con">
        <List>
          <li>Usarla en datos desordenados: no da error, simplemente responde mal.</li>
          <li>
            Los bordes: un <InlineCode>+ 1</InlineCode> o un <InlineCode>- 1</InlineCode> de menos y el programa se
            queda en un bucle infinito o se salta el objetivo. Es el error más común al escribirla.
          </li>
          <li>
            En lenguajes con enteros de tamaño fijo (Java, C), <InlineCode>(izq + der) / 2</InlineCode> puede
            desbordarse con listas enormes; por eso se escribe <InlineCode>izq + (der - izq) / 2</InlineCode>. En
            Python no pasa, porque sus enteros crecen lo que haga falta.
          </li>
        </List>
      </Section>

      <Homework
        task="Adivina el día del año en que nació alguien (del 1 al 366). ¿Cuántos intentos necesitas, como máximo?"
        answer={
          <>
            9 intentos. Con 8 cubres 2⁸ − 1 = 255 días, que no alcanza; con 9 cubres 2⁹ − 1 = 511, que sí.
          </>
        }
      />
    </div>
  );
}

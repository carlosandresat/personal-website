import { NextResponse } from "next/server";

// Printed QR codes and the site's WhatsApp button point at /wa/<source>; this
// opens WhatsApp with a message naming where the person came from. Kept on our
// domain so the destination can change without a reprint, and so the number
// stays out of the HTML. It lives in the WHATSAPP_NUMBER env var (country
// code, no "+") rather than in this public repo.
const messages: Record<string, string> = {
  local: "Hola Carlos, vi tu afiche en un local y quiero más información.",
  poste: "Hola Carlos, vi tu afiche en la calle y quiero información sobre las clases.",
  volante: "Hola Carlos, vi tu volante y quiero información sobre las clases y cursos.",
  negocios: "Hola Carlos, vi tu volante para negocios y quiero información sobre una página web o sistema.",
  web: "Hola Carlos, vi tu página web y quiero más información.",
  "web-en": "Hi Carlos, I saw your website and would like more information.",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ source: string }> },
) {
  const { source } = await params;
  const number = process.env.WHATSAPP_NUMBER;
  const text = messages[source];
  if (!number || !text) {
    return NextResponse.redirect(new URL("/es", request.url));
  }

  // Shows up in the Vercel logs, which is how contacts per source are counted.
  console.log(`wa-click source=${source}`);
  return NextResponse.redirect(
    `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
  );
}

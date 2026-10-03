import { NextResponse } from "next/server";

// Printed QR codes point at /wa/<source>; this opens WhatsApp with a message
// naming where the person saw the ad. Kept on our domain so the destination can
// change without a reprint. The number lives in the WHATSAPP_NUMBER env var
// (country code, no "+") rather than in this public repo.
const seenAt: Record<string, string> = {
  local: "vi tu afiche en un local",
  poste: "vi tu afiche en la calle",
  volante: "vi tu volante",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ source: string }> },
) {
  const { source } = await params;
  const number = process.env.WHATSAPP_NUMBER;
  const seen = seenAt[source];
  if (!number || !seen) {
    return NextResponse.redirect(new URL("/es", request.url));
  }

  // Shows up in the Vercel logs, which is how scans per piece are counted.
  console.log(`qr-scan source=${source}`);
  const text = `Hola Carlos, ${seen} y quiero información sobre las clases.`;
  return NextResponse.redirect(
    `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
  );
}

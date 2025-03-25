import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Chakra_Petch({ subsets: ["latin"], weight: "500" });

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.locale == "es") {
    return {
      title: "Carlos Arévalo | Software Developer & AI Researcher",
      description:
        "Desarrollador de software e investigador en inteligencia artificial con experiencia en tecnologías web modernas como TypeScript, Next.js y React. Apasionado por la innovación, el aprendizaje continuo y la construcción de soluciones tecnológicas impactantes.",
      metadataBase: new URL("https://carlosarevalo.dev"),
      alternates: {
        canonical: "/",
        languages: {
          en: "/en",
          es: "/es",
        },
      },
    };
  }
  if (params.locale == "en") {
    return {
      title: "Carlos Arévalo | Software Developer & AI Researcher",
      description:
        "Software developer and artificial intelligence researcher with experience in modern web technologies such as TypeScript, Next.js and React. Passionate about innovation, continuous learning and building impactful technology solutions.",
      metadataBase: new URL("https://carlosarevalo.dev"),
      alternates: {
        canonical: "/",
        languages: {
          en: "/en",
          es: "/es",
        },
      },
    };
  }
  return {
    title: "Carlos Arévalo | Software Developer & AI Researcher",
    description:
      "Desarrollador de software e investigador en inteligencia artificial con experiencia en tecnologías web modernas como TypeScript, Next.js y React. Apasionado por la innovación, el aprendizaje continuo y la construcción de soluciones tecnológicas impactantes.",
    metadataBase: new URL("https://carlosarevalo.dev"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        es: "/es",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
          <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

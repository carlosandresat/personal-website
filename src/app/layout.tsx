import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Chakra_Petch({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Carlos Arévalo Website",
  description: "Personal website of Carlos Arévalo - Software Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

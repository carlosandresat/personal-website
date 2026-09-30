import { loadFont as loadChakraPetch } from "@remotion/google-fonts/ChakraPetch";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

// Same pair the site loads in src/app/[locale]/layout.tsx.
export const display = loadChakraPetch("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
}).fontFamily;

export const mono = loadJetBrainsMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
}).fontFamily;

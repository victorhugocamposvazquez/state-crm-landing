import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

/** Única familia de marca: Space Grotesk (Brand Guidelines v1.0). */
const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "statecrm — CRM inmobiliario a medida",
  description:
    "Captá particulares antes que nadie. Catastro integrado, seguimiento de operaciones, tareas de equipo y obra. Construido a la medida de tu agencia.",
  openGraph: {
    title: "statecrm — CRM inmobiliario a medida",
    description: "Captación, Catastro, equipo y obra. Un día en la vida de un piso, contado por el propio CRM.",
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={space.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

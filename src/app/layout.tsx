import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

/**
 * Dos familias:
 *  - Inter (variable, con eje óptico) para todo el texto de la web: titulares, cuerpo y la interfaz del CRM.
 *    Es la tipografía de referencia (tryprofound.com) y en pantalla es más suave que la geométrica de marca.
 *  - Space Grotesk 700 solo para el wordmark «statecrm», como en el lockup de marca.
 */
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
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
    <html lang="es" className={`${inter.variable} ${space.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

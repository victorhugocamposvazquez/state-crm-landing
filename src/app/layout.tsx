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

const title = "REHABINCO Gestión Inmobiliaria y Reformas";
const description = "REHABINCO Gestión Inmobiliaria y Reformas";

export const metadata: Metadata = {
  metadataBase: new URL("https://rehabinco.com"),
  title,
  description,
  applicationName: "REHABINCO",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  verification: { google: "SXYCLdM0X1mYCXiEi9NIBKgpdPmJB8IEfdLTUklF69Q" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "REHABINCO",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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

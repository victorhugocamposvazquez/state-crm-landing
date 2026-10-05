import { Nav } from "@/components/shell/Nav";
import { Slate } from "@/components/shell/Slate";
import { StageClient } from "@/components/canvas/StageClient";
import { Prologo } from "@/components/chapters/00-Prologo";
import { Radar } from "@/components/chapters/01-Radar";
import { Ciudad } from "@/components/chapters/02-Ciudad";
import { Bandeja } from "@/components/chapters/02-Bandeja";
import { Catastro } from "@/components/chapters/03-Catastro";
import { Seguimiento } from "@/components/chapters/04-Seguimiento";
import { Equipo } from "@/components/chapters/05-Equipo";
import { Obra } from "@/components/chapters/06-Obra";
import { Producto } from "@/components/chapters/07-Producto";
import { Manana } from "@/components/chapters/08-Manana";
import { ModuleText } from "@/components/sections/ModuleText";
import { Planes } from "@/components/sections/Planes";
import { Proceso } from "@/components/sections/Proceso";

/**
 * La landing es un único scroll: diez capítulos en orden, el canvas 3D detrás
 * y dos capas fijas (cabecera y pizarra). Las notificaciones viven dentro de cada capítulo.
 * Tras el hero, el proceso completo de un vistazo (Proceso); tras la pantalla animada de cada
 * módulo entra su texto (ModuleText), y antes de la demo, los planes.
 */
export default function Page() {
  return (
    <>
      <StageClient />
      <Nav />
      <Slate />
      <main className="relative z-[1]">
        <Prologo />
        <Radar />
        <Proceso />
        <Ciudad />
        <Bandeja />
        <ModuleText id="captacion" />
        <Catastro />
        <ModuleText id="catastro" />
        <Seguimiento />
        <ModuleText id="seguimiento" />
        <Equipo />
        <ModuleText id="equipo" />
        <Obra />
        <ModuleText id="obra" />
        <Producto />
        <ModuleText id="plataforma" />
        <Planes />
        <Manana />
      </main>
    </>
  );
}

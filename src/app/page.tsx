import { Nav } from "@/components/shell/Nav";
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
import { TextReveal } from "@/components/sections/TextReveal";

/**
 * La landing es un único scroll: diez capítulos en orden, el canvas 3D detrás
 * y una sola capa fija (la cabecera). Dónde estás lo dice el kicker de cada sección (número y
 * módulo), una sola vez; las notificaciones viven dentro de cada capítulo.
 * Tras el hero, una frase de transición (TextReveal) y el camino de captación paso a paso, frotado
 * por el scroll (Proceso; el Catastro va por libre y se cuenta en su propio capítulo);
 * tras la pantalla animada de cada módulo entra su texto (ModuleText); otra frase cierra los módulos
 * antes del producto, y antes de la demo, los planes.
 */
export default function Page() {
  return (
    <>
      <StageClient />
      <Nav />
      <main className="relative z-[1]">
        <Prologo />
        <Radar />
        <TextReveal id="saber" />
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
        <TextReveal id="cerrar" />
        <Producto />
        <ModuleText id="plataforma" />
        <Planes />
        <Manana />
      </main>
    </>
  );
}

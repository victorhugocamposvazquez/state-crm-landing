import { Nav } from "@/components/shell/Nav";
import { StageClient } from "@/components/canvas/StageClient";
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

/** A direct product introduction, the skyline sequence and the connected agency workflow.
 * Supporting explanations, module index, pricing and a configured demo destination follow.
 */
export default function Page() {
  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <StageClient />
      <Nav />
      <main id="contenido" tabIndex={-1} className="relative z-[1]">
        <Radar />
        <Ciudad />
        <Bandeja />
        <ModuleText id="captacion" />
        <Proceso />
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

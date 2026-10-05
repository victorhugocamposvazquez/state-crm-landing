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

/**
 * La landing es un único scroll: diez capítulos en orden, el canvas 3D detrás
 * y dos capas fijas (cabecera y pizarra). Las notificaciones viven dentro de cada capítulo.
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
        <Ciudad />
        <Bandeja />
        <Catastro />
        <Seguimiento />
        <Equipo />
        <Obra />
        <Producto />
        <Manana />
      </main>
    </>
  );
}

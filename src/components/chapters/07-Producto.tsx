import { Kicker } from "@/components/ui/atoms";

const modules = [
  { name: "Captación", n: "02", line: "Nuevos anuncios en tus zonas, con fotos y los datos de contacto disponibles." },
  { name: "Catastro", n: "03", line: "Fincas por calle, código postal o localidad, con y sin división horizontal." },
  { name: "Inmuebles", n: "04", line: "El stock de la agencia con referencia, estado y comercial." },
  { name: "Demandas", n: "04", line: "Lo que busca cada cliente, cruzado con tu cartera." },
  { name: "Seguimiento", n: "04", line: "Etapas configurables; llamadas, visitas y documentos." },
  { name: "Clientes", n: "04", line: "Compradores y propietarios en un mismo hilo." },
  { name: "Tareas", n: "05", line: "Personales y del equipo, con responsable, prioridad y hora." },
  { name: "Calendario", n: "05", line: "Visitas, firmas y llamadas; varias oficinas." },
  { name: "Herramientas", n: "07", line: "Las utilidades de la agencia, a medida." },
  { name: "Presupuestos", n: "06", line: "Por partidas, con estados y tasa de aceptación." },
  { name: "Facturas", n: "06", line: "Enlazadas al inmueble y al cliente; estado de cobro." },
  { name: "Informes", n: "06", line: "Captación, seguimiento y obra por oficina." },
];

const destinations: Record<string, string> = { Captación: "ciudad", Catastro: "catastro", Inmuebles: "seguimiento", Demandas: "seguimiento", Seguimiento: "seguimiento", Clientes: "seguimiento", Tareas: "equipo", Calendario: "equipo", Herramientas: "plataforma-texto", Presupuestos: "obra", Facturas: "obra", Informes: "obra" };

export function Producto() {
  return (
    <section id="producto" className="relative z-[2] border-t border-grey3 bg-black0 py-16 md:py-24" aria-labelledby="producto-h">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--gutter)]">
        <Kicker n="06" module="Todos los módulos" what="Una plataforma que crece contigo" />
        <div className="mb-10 mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="producto-h" className="t-h1 m-0 max-w-[650px] text-white8">Cada parte de tu agencia.<br /><span className="text-grey6">En el mismo lugar.</span></h2>
          <p className="t-body m-0 max-w-[340px] text-grey6">Elige los módulos que necesitas. Configuramos las etapas, los campos y los informes para tu forma de trabajar.</p>
        </div>
        <div className="module-catalog">
          {modules.map((module, index) => (
            <a key={module.name} href={`#${destinations[module.name]}`}>
              <div className="catalog-index"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">↗</span></div>
              <h3>{module.name}</h3><p>{module.line}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

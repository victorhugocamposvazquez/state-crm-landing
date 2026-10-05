import { Kicker } from "@/components/ui/atoms";

const steps = [
  { label: "Un particular publica", text: "Un nuevo anuncio aparece en uno de los portales de tu zona." },
  { label: "STATECRM lo detecta", text: "El rastreo diario identifica la novedad y reúne los datos del anuncio." },
  { label: "Llega a tu bandeja", text: "La oportunidad queda organizada, con prioridad y una persona responsable." },
  { label: "Tu equipo contacta", text: "El comercial llama cuando hay teléfono disponible y registra el siguiente paso." },
  { label: "La visita se coordina", text: "La cita queda en el calendario, con el inmueble, el cliente y su comercial." },
  { label: "La operación avanza", text: "El equipo registra ofertas, reservas y el cierre, con todo el historial a mano." },
];

export function Proceso() {
  return (
    <section id="proceso" className="relative z-[2] border-t border-grey3 bg-black0 py-16 md:py-24" aria-labelledby="proceso-h">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--gutter)]">
        <Kicker module="Del anuncio al cierre" what="Seis pasos, un mismo hilo de trabajo" />
        <h2 id="proceso-h" className="t-h1 mb-5 mt-6 max-w-[750px] text-white8">STATECRM detecta y organiza.<br /><span className="text-grey6">Tu equipo da el siguiente paso.</span></h2>
        <p className="t-body max-w-[600px] text-grey6">Una oportunidad no termina en una notificación. Cada llamada, visita y acuerdo continúa en la misma ficha.</p>
        <ol className="process-list">{steps.map((step, index) => <li key={step.label}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><strong>{step.label}</strong><p>{step.text}</p></li>)}</ol>
      </div>
    </section>
  );
}

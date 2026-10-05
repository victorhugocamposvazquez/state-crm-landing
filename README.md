# statecrm — landing v1

Landing de **statecrm** (CRM inmobiliario a medida). Un solo scroll que cuenta *un día en la vida de un piso*: cada capítulo es una hora del día y un módulo del CRM.

Stack: **Next.js 16 · TypeScript · Tailwind 4 · GSAP ScrollTrigger · Lenis · React Three Fiber · Zustand**.

Branding: paleta acromática + Space Grotesk (Brand Guidelines v1.0). Assets en `public/brand/`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Ver `README` técnico del prototipo en el historial del repo / comentarios de `src/lib/script.ts` para la mecánica de scroll.


## Destinos de la demo

La landing no dispone de un backend de formularios. Configura en `.env.local` una de estas opciones y reinicia el servidor:

- `NEXT_PUBLIC_DEMO_URL`: enlace HTTPS al calendario de reservas (tiene prioridad).
- `NEXT_PUBLIC_DEMO_EMAIL`: correo de la agencia. El formulario prepara un email; el visitante revisa y envía desde su aplicación de correo. No se confirma una recepción desde la web.
- `NEXT_PUBLIC_PRIVACY_URL` y `NEXT_PUBLIC_LEGAL_URL`: destinos de los documentos legales publicados.

Sin destino de demo, los campos están deshabilitados y se informa de que las solicitudes online aún no están disponibles. Los enlaces legales solo aparecen si tienen un destino.

## Recorrido y movimiento

Captación usa la fotografía existente `public/city/captacion-reference-v1.jpg`. Las cuatro fachadas y los tiempos viven en `src/lib/script.ts`: el último edificio termina de iluminarse antes de que aparezca una única notificación. La foto y las máscaras comparten coordenadas SVG; no necesitan WebGL.

En móvil y ventanas bajas, las pantallas de producto pasan al flujo normal para que el contenido se pueda leer completo. Con movimiento reducido, la ciudad muestra su resultado final, los módulos se muestran sin animación y el radar decorativo queda desactivado.

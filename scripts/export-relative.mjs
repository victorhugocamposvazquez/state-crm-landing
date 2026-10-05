/**
 * Convierte el export estático (`STATIC_EXPORT=1 next build` → out/) en un sitio con rutas RELATIVAS,
 * para poder servirlo desde una subcarpeta o una vista previa. En Vercel no hace falta.
 */
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
const html = path.join(out, "index.html");
let h = fs.readFileSync(html, "utf8");
h = h.replaceAll('"/_next/', '"./_next/').replaceAll("'/_next/", "'./_next/").replaceAll('"/city/', '"./city/');
h = h.replace("<head>", '<head><script>window.TURBOPACK_CHUNK_BASE_PATH="./_next/";</script>');
fs.writeFileSync(html, h);

const cssDir = path.join(out, "_next/static/chunks");
for (const f of fs.readdirSync(cssDir)) {
  if (!f.endsWith(".css")) continue;
  const p = path.join(cssDir, f);
  fs.writeFileSync(p, fs.readFileSync(p, "utf8").replaceAll("/_next/static/media/", "../media/"));
}
console.log("export relativo listo:", out);

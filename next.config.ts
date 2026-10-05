import type { NextConfig } from "next";

/**
 * En Vercel no hace falta nada. `STATIC_EXPORT=1 npm run build` genera `out/` como sitio estático
 * (sirve para previsualizar en cualquier hosting; la landing no usa rutas de servidor).
 */
const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;

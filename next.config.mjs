import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  // El ícono de la app lee la letra del tema desde public/.
  outputFileTracingIncludes: {
    "/pwa/icono/*": ["./public/assets/fonts/Ovo-Regular.ttf"],
  },
  async headers() {
    return [
      {
        // El service worker siempre se revisa en la red, para que las actualizaciones lleguen.
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          // Solo su propio código; puede descargar por https las librerías y fotos que guarda para sin señal.
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'; connect-src 'self' https:" },
        ],
      },
    ];
  },
};

export default nextConfig;

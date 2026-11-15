import { COLORES, nombresApp, slugValido } from "../datos";

/**
 * GET /pwa/manifest?invitado=slug
 * Manifest de la app instalable. Cada invitado tiene el suyo: al abrir la app instalada
 * entra directo a su invitación (`start_url`) y cuenta como una app aparte (`id`).
 */
export async function GET(request) {
  const slug = request.nextUrl.searchParams.get("invitado");
  const inicio = slugValido(slug) ? `/${slug}` : "/";
  const { nombre, corto } = await nombresApp();

  const manifest = {
    id: inicio,
    name: nombre,
    short_name: corto,
    description: "Nuestra invitación de boda: fecha, lugares, itinerario y tu pase.",
    lang: "es",
    start_url: inicio,
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: COLORES.fondo,
    theme_color: COLORES.fondo,
    icons: [
      { src: "/pwa/icono/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icono/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/icono/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };

  return Response.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

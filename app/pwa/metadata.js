import { nombresApp } from "./datos";

/** Metadatos de la app instalable: manifest de este invitado, íconos y modo app en iPhone. */
export async function metadataApp(slug) {
  const { corto } = await nombresApp();
  return {
    manifest: slug ? `/pwa/manifest?invitado=${encodeURIComponent(slug)}` : "/pwa/manifest",
    icons: {
      icon: [{ url: "/pwa/icono/192", sizes: "192x192", type: "image/png" }],
      apple: [{ url: "/pwa/icono/180", sizes: "180x180", type: "image/png" }],
    },
    appleWebApp: { capable: true, title: corto, statusBarStyle: "black-translucent" },
  };
}

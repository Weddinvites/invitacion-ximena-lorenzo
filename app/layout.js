import "./globals.css";

// Cambia en cada deploy: así el service worker no sirve una copia vieja de styles.css.
const VERSION_CSS = (process.env.VERCEL_GIT_COMMIT_SHA ?? "").slice(0, 8);
const ESTILOS = VERSION_CSS ? `/css/styles.css?v=${VERSION_CSS}` : "/css/styles.css";

export const metadata = {
  title: "Invitación de boda",
  description: "Invitación de nuestra boda",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E201E",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
        />
        <link rel="stylesheet" href={ESTILOS} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

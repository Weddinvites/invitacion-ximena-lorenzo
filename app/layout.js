import "./globals.css";

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
        <link rel="stylesheet" href="/css/styles.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

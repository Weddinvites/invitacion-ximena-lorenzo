"use client";

import { useEffect } from "react";
import "./pwa.css";

/** Pide al service worker guardar la página y lo que ya se cargó (la primera visita no pasa por él). */
async function guardarParaSinRed() {
  const reg = await navigator.serviceWorker.ready;
  const archivos = performance
    .getEntriesByType("resource")
    .map((r) => r.name)
    .filter((u) => u.startsWith("http") && !/\.(mp3|m4a|aac|mp4)(\?|$)/i.test(u) && !u.includes("_rsc="));
  reg.active?.postMessage({ tipo: "guardar", pagina: location.pathname, archivos });
}

/**
 * Registra el service worker (invitación sin señal). Ofrecer la instalación ya no va aquí:
 * se sugiere en el cuadro de avisos, debajo de la confirmación (Avisos.js).
 */
export default function InstalarApp() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") return;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then(() => {
        // Cuando ya cargó todo (imágenes, librerías), se guarda una copia.
        if (document.readyState === "complete") setTimeout(guardarParaSinRed, 3000);
        else window.addEventListener("load", () => setTimeout(guardarParaSinRed, 3000), { once: true });
      })
      .catch((e) => console.warn("[pwa] service worker:", e.message));
  }, []);

  return null;
}

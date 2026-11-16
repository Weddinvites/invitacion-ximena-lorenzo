"use client";

import { useEffect, useState } from "react";
import GuiaInstalar from "./GuiaInstalar";
import { instalarNativo, useInstalacion } from "./instalacion";
import "./pwa.css";

const CLAVE_CERRADO = "pwa-instalar-cerrado";
const DIAS_SIN_INSISTIR = 14;

const cerradoHace = () => {
  const t = Number(localStorage.getItem(CLAVE_CERRADO));
  return t ? (Date.now() - t) / 86400000 : Infinity;
};
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
 * Registra el service worker (invitación sin señal) y, en invitaciones personales,
 * ofrece instalarla: botón nativo en Android/Chrome y la guía ilustrada en iPhone/iPad.
 * Aparece después de que el invitado avanzó un poco en la invitación, nunca sobre el sobre.
 */
export default function InstalarApp({ conInstalar = true }) {
  const { listo, instalada, plataforma, puedeNativo } = useInstalacion();
  const [visible, setVisible] = useState(false);
  const [guia, setGuia] = useState(false);
  const ofrecible = listo && !instalada && (puedeNativo || plataforma === "ios");

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

  // Se muestra cuando el invitado ya recorrió parte de la invitación. iPhone no avisa que se puede
  // instalar, así que ahí se ofrece la guía.
  useEffect(() => {
    if (!conInstalar || visible || !ofrecible) return;
    const revisar = () => {
      if (window.scrollY > window.innerHeight * 1.5 && cerradoHace() >= DIAS_SIN_INSISTIR) setVisible(true);
    };
    window.addEventListener("scroll", revisar, { passive: true });
    return () => window.removeEventListener("scroll", revisar);
  }, [visible, conInstalar, ofrecible]);

  const cerrar = () => {
    localStorage.setItem(CLAVE_CERRADO, String(Date.now()));
    setVisible(false);
  };

  const instalar = async () => {
    setVisible(false);
    const r = puedeNativo ? await instalarNativo() : null;
    if (r === "dismissed") localStorage.setItem(CLAVE_CERRADO, String(Date.now()));
    if (r === null) setGuia(true);
  };

  return (
    <>
      {visible && ofrecible && (
        <aside className="pwa-hoja" aria-labelledby="pwa-hoja-titulo">
          <button type="button" className="pwa-hoja__cerrar" onClick={cerrar} aria-label="Ahora no">×</button>
          <div className="pwa-hoja__cabeza">
            {/* eslint-disable-next-line @next/next/no-img-element -- ícono generado, ya del tamaño justo */}
            <img src="/pwa/icono/192" alt="" width="56" height="56" className="pwa-hoja__icono" />
            <div>
              <p id="pwa-hoja-titulo" className="pwa-hoja__titulo">Lleva la invitación contigo</p>
              <p className="pwa-hoja__texto">Instálala en tu celular para abrirla al instante el día de la boda, incluso sin señal.</p>
            </div>
          </div>
          <div className="pwa-hoja__acciones">
            <button type="button" className="pwa-hoja__boton pwa-hoja__boton--claro" onClick={cerrar}>Ahora no</button>
            <button type="button" className="pwa-hoja__boton" onClick={instalar}>
              {puedeNativo ? "Instalar" : "Cómo instalarla"}
            </button>
          </div>
        </aside>
      )}
      <GuiaInstalar abierta={guia} onCerrar={() => setGuia(false)} />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import "./pwa.css";

const CLAVE_CERRADO = "pwa-instalar-cerrado";
const DIAS_SIN_INSISTIR = 14;

const yaInstalada = () =>
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const esIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
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
 * ofrece instalarla: botón nativo en Android/Chrome y pasos en iPhone/iPad.
 * Aparece después de que el invitado avanzó un poco en la invitación, nunca sobre el sobre.
 */
export default function InstalarApp({ conInstalar = true }) {
  const [aviso, setAviso] = useState(null); // { tipo: 'prompt', evento } | { tipo: 'ios' }
  const [visible, setVisible] = useState(false);
  const [pasos, setPasos] = useState(false);

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

  useEffect(() => {
    if (!conInstalar || yaInstalada() || cerradoHace() < DIAS_SIN_INSISTIR) return;
    const alPrompt = (e) => {
      e.preventDefault();
      setAviso({ tipo: "prompt", evento: e });
    };
    const alInstalar = () => {
      setVisible(false);
      setAviso(null);
    };
    window.addEventListener("beforeinstallprompt", alPrompt);
    window.addEventListener("appinstalled", alInstalar);
    return () => {
      window.removeEventListener("beforeinstallprompt", alPrompt);
      window.removeEventListener("appinstalled", alInstalar);
    };
  }, [conInstalar]);

  // Se muestra cuando el invitado ya recorrió parte de la invitación. iPhone no avisa que se puede
  // instalar, así que ahí se ofrecen los pasos.
  useEffect(() => {
    if (!conInstalar || visible) return;
    const revisar = () => {
      if (window.scrollY <= window.innerHeight * 1.5 || yaInstalada() || cerradoHace() < DIAS_SIN_INSISTIR) return;
      if (aviso) setVisible(true);
      else if (esIOS()) {
        setAviso({ tipo: "ios" });
        setVisible(true);
      }
    };
    window.addEventListener("scroll", revisar, { passive: true });
    return () => window.removeEventListener("scroll", revisar);
  }, [aviso, visible, conInstalar]);

  const cerrar = () => {
    localStorage.setItem(CLAVE_CERRADO, String(Date.now()));
    setVisible(false);
  };

  const instalar = async () => {
    if (aviso?.tipo === "ios") return setPasos(true);
    aviso.evento.prompt();
    const { outcome } = await aviso.evento.userChoice;
    if (outcome === "accepted") setAviso(null);
    else localStorage.setItem(CLAVE_CERRADO, String(Date.now()));
    setVisible(false);
  };

  if (!aviso || !visible) return null;

  return (
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

      {pasos ? (
        <ol className="pwa-hoja__pasos">
          <li>
            Toca <strong>Compartir</strong>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-label="(ícono de compartir)" role="img">
              <path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 11v9h14v-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            en la barra del navegador.
          </li>
          <li>Elige <strong>Agregar a inicio</strong>.</li>
          <li>Toca <strong>Agregar</strong>.</li>
          <li className="pwa-hoja__nota">Si la abriste desde WhatsApp, primero toca <strong>Abrir en Safari</strong>.</li>
        </ol>
      ) : (
        <div className="pwa-hoja__acciones">
          <button type="button" className="pwa-hoja__boton pwa-hoja__boton--claro" onClick={cerrar}>Ahora no</button>
          <button type="button" className="pwa-hoja__boton" onClick={instalar}>
            {aviso.tipo === "ios" ? "Cómo instalarla" : "Instalar"}
          </button>
        </div>
      )}
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import { clavePush, activarAvisos, desactivarAvisos } from "../actions";
import "./pwa.css";

const CLAVE_CERRADO = "pwa-avisos-cerrado";

const instalada = () =>
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
const esIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const soportaPush = () => "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;

/** Llave VAPID (base64url) → bytes, como la pide pushManager.subscribe. */
const aBytes = (b64) => {
  const s = atob((b64 + "=".repeat((4 - (b64.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
};

async function suscripcionActual() {
  const reg = await navigator.serviceWorker.getRegistration();
  return reg ? reg.pushManager.getSubscription() : undefined;
}

/**
 * Tarjeta para recibir avisos de la boda en este dispositivo (cuenta regresiva, cambios, tu mesa…).
 * El permiso solo se pide al tocar "Activar". En iPhone los avisos solo llegan con la invitación
 * instalada, así que fuera de ella se sugiere instalarla.
 * `soloInstalada`: mostrarla únicamente dentro de la app instalada.
 */
export default function Avisos({ slug, soloInstalada = false }) {
  // oculto | ios | ofrecer | trabajando | activo | bloqueado | error
  const [estado, setEstado] = useState("oculto");

  useEffect(() => {
    let vivo = true;
    (async () => {
      if (soloInstalada && !instalada()) return;
      if (!soportaPush()) {
        if (esIOS() && !instalada() && vivo) setEstado("ios");
        return;
      }
      const sub = await suscripcionActual().catch(() => undefined);
      if (!vivo || sub === undefined) return; // sin service worker (p. ej. en desarrollo)
      if (sub) return setEstado("activo");
      if (Notification.permission === "denied") return setEstado("bloqueado");
      if (!localStorage.getItem(CLAVE_CERRADO)) setEstado("ofrecer");
    })();
    return () => {
      vivo = false;
    };
  }, [soloInstalada]);

  const activar = async () => {
    setEstado("trabajando");
    try {
      // Primero el permiso: Safari exige pedirlo directo del toque.
      const permiso = await Notification.requestPermission();
      if (permiso !== "granted") return setEstado(permiso === "denied" ? "bloqueado" : "ofrecer");
      const clave = await clavePush();
      if (!clave) return setEstado("error");
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: aBytes(clave) });
      const r = await activarAvisos(slug, sub.toJSON());
      if (!r.ok) {
        await sub.unsubscribe().catch(() => {});
        return setEstado("error");
      }
      setEstado("activo");
    } catch (e) {
      console.warn("[avisos]", e.message);
      setEstado("error");
    }
  };

  const desactivar = async () => {
    setEstado("trabajando");
    const sub = await suscripcionActual().catch(() => null);
    if (sub) {
      await desactivarAvisos(slug, sub.endpoint);
      await sub.unsubscribe().catch(() => {});
    }
    setEstado("ofrecer");
  };

  const cerrar = () => {
    localStorage.setItem(CLAVE_CERRADO, String(Date.now()));
    setEstado("oculto");
  };

  if (estado === "oculto") return null;

  return (
    <div className="pwa-avisos" role="region" aria-label="Avisos de la boda">
      <svg className="pwa-avisos__icono" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
      {estado === "activo" ? (
        <>
          <p className="pwa-avisos__texto">Te avisaremos aquí de las novedades de la boda.</p>
          <button type="button" className="pwa-avisos__enlace" onClick={desactivar}>
            Desactivar avisos
          </button>
        </>
      ) : estado === "ios" ? (
        <p className="pwa-avisos__texto">
          ¿Quieres recibir avisos de la boda? En iPhone, agrega primero la invitación a tu pantalla de inicio
          (Compartir → Agregar a inicio) y ábrela desde ahí.
        </p>
      ) : estado === "bloqueado" ? (
        <p className="pwa-avisos__texto">
          Los avisos están bloqueados para esta página. Puedes permitirlos en los ajustes de tu navegador.
        </p>
      ) : (
        <>
          <p className="pwa-avisos__texto">
            {estado === "error"
              ? "No pudimos activar los avisos. Intenta de nuevo en un momento."
              : "¿Quieres que te avisemos de la cuenta regresiva, cambios y tu mesa?"}
          </p>
          <div className="pwa-avisos__acciones">
            <button type="button" className="pwa-hoja__boton" onClick={activar} disabled={estado === "trabajando"}>
              {estado === "trabajando" ? "Activando…" : "Activar avisos"}
            </button>
            <button type="button" className="pwa-avisos__enlace" onClick={cerrar}>
              Ahora no
            </button>
          </div>
        </>
      )}
    </div>
  );
}

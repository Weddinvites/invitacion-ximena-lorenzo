"use client";

import { useEffect, useState } from "react";

/*
 * Estado compartido de "instalar la invitación".
 * Chrome/Android avisa una sola vez (beforeinstallprompt) que se puede instalar: aquí se guarda ese
 * evento para que cualquier botón lo use. iPhone nunca avisa: ahí solo se puede mostrar la guía.
 */

export const yaInstalada = () =>
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
export const esIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const esAndroid = () => /Android/i.test(navigator.userAgent);

let eventoNativo = null;
let instaladaAhora = false;
const oyentes = new Set();
const avisar = () => oyentes.forEach((fn) => fn());

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventoNativo = e;
    avisar();
  });
  window.addEventListener("appinstalled", () => {
    eventoNativo = null;
    instaladaAhora = true;
    avisar();
  });
}

const leer = () => ({
  listo: true,
  instalada: instaladaAhora || yaInstalada(),
  plataforma: esIOS() ? "ios" : esAndroid() ? "android" : "otro",
  puedeNativo: Boolean(eventoNativo),
});

/** Abre el diálogo nativo (Android/Chrome). Devuelve 'accepted' | 'dismissed' | null si no hay. */
export async function instalarNativo() {
  const e = eventoNativo;
  if (!e) return null;
  e.prompt();
  const { outcome } = await e.userChoice;
  eventoNativo = null; // el evento solo se puede usar una vez
  avisar();
  return outcome;
}

/** { listo, instalada, plataforma: 'ios'|'android'|'otro', puedeNativo } */
export function useInstalacion() {
  const [estado, setEstado] = useState({ listo: false, instalada: true, plataforma: "otro", puedeNativo: false });
  useEffect(() => {
    const actualizar = () => setEstado(leer());
    actualizar();
    oyentes.add(actualizar);
    return () => oyentes.delete(actualizar);
  }, []);
  return estado;
}

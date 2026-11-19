"use client";

import { useEffect, useState } from "react";
import GuiaInstalar from "./GuiaInstalar";
import { useInstalacion } from "./instalacion";

const clave = (slug) => `pwa-instalada:${slug}`;
const ESPERA_AL_CONFIRMAR = 1500; // después del confeti

/**
 * Después de confirmar asistencia: pide guardar la invitación en el celular para recibir los avisos.
 * No se puede cerrar hasta instalarla (Android lo detecta) o tocar «Ya la instalé» (iPhone no deja
 * saberlo). Solo en celulares, nunca dentro de la app instalada. Si el invitado vuelve a abrir el
 * enlace sin haberla instalado, aparece de nuevo cuando ya pasó el sobre de bienvenida.
 */
export default function AvisoInstalar({ slug, activo, recienConfirmado = false }) {
  const { listo, instalada, plataforma } = useInstalacion();
  const [abierta, setAbierta] = useState(false);
  const aplica = activo && listo && !instalada && plataforma !== "otro";

  useEffect(() => {
    if (!aplica || abierta) return;
    try {
      if (localStorage.getItem(clave(slug))) return;
    } catch {}
    if (recienConfirmado) {
      const t = setTimeout(() => setAbierta(true), ESPERA_AL_CONFIRMAR);
      return () => clearTimeout(t);
    }
    // Visita posterior: cuando ya recorrió un poco la invitación (el sobre no deja desplazarse).
    const revisar = () => window.scrollY > window.innerHeight * 1.5 && setAbierta(true);
    window.addEventListener("scroll", revisar, { passive: true });
    return () => window.removeEventListener("scroll", revisar);
  }, [aplica, abierta, recienConfirmado, slug]);

  const lista = () => {
    try {
      localStorage.setItem(clave(slug), String(Date.now()));
    } catch {}
    setAbierta(false);
  };

  if (!aplica && !abierta) return null;
  return <GuiaInstalar abierta={abierta} obligatoria onLista={lista} />;
}

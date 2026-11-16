"use client";

import { useState } from "react";
import GuiaInstalar from "./GuiaInstalar";
import { instalarNativo, useInstalacion } from "./instalacion";
import "./pwa.css";

/**
 * "Instalar la invitación": en Android/Chrome abre el diálogo del sistema; en iPhone (que no
 * permite instalar desde la página) abre la guía con los pasos. No aparece si ya está instalada.
 */
export default function BotonInstalar() {
  const { listo, instalada, puedeNativo } = useInstalacion();
  const [guia, setGuia] = useState(false);

  if (!listo || instalada) return null;

  const tocar = async () => {
    if (puedeNativo && (await instalarNativo()) !== null) return;
    setGuia(true);
  };

  return (
    <>
      <button type="button" className="pwa-instalar" onClick={tocar}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M12 7.5v7M9 11.5l3 3 3-3" />
        </svg>
        Instalar la invitación
      </button>
      <GuiaInstalar abierta={guia} onCerrar={() => setGuia(false)} />
    </>
  );
}

"use client";

import { useEffect, useId, useRef } from "react";
import IlustracionPaso from "./IlustracionPaso";
import { instalarNativo, useInstalacion } from "./instalacion";
import "./pwa.css";

const COLORES = {
  marco: "var(--blueText-color, #1D344B)",
  pantalla: "var(--bg-surface, #fff)",
  tenue: "var(--border-light, #E8E2DF)",
  texto: "var(--text-muted, #5C7083)",
  acento: "var(--color-accent, #B89965)",
};
const ICONO = "/pwa/icono/192";
const NOMBRE = "Boda"; // etiqueta del ícono en el dibujo

const PASOS = {
  ios: [
    {
      paso: "ios-compartir",
      texto: (
        <>
          Abajo, toca <strong>Compartir</strong>. Si no lo ves, está dentro del botón <strong>···</strong>.
        </>
      ),
    },
    { paso: "ios-agregar", texto: <>Desliza y elige <strong>Agregar a inicio</strong>.</> },
    { paso: "ios-confirmar", texto: <>Toca <strong>Agregar</strong>, arriba a la derecha.</> },
    { paso: "inicio", texto: <>Listo: abre la invitación desde su ícono.</> },
  ],
  android: [
    { paso: "android-menu", texto: <>Toca el menú <strong>⋮</strong> del navegador.</> },
    {
      paso: "android-instalar",
      texto: (
        <>
          Elige <strong>Instalar app</strong> (o <strong>Agregar a pantalla principal</strong>).
        </>
      ),
    },
    { paso: "inicio", texto: <>Listo: abre la invitación desde su ícono.</> },
  ],
};

const BENEFICIOS = [
  "Ábrela al instante el día de la boda, aunque no haya señal.",
  "Recibe avisos: cuenta regresiva, cambios de último momento y tu mesa.",
  "Sin buscar el mensaje: queda como una app en tu pantalla de inicio.",
];

/** Guía para instalar la invitación, con pasos ilustrados para iPhone o Android. */
export default function GuiaInstalar({ abierta, onCerrar }) {
  const ref = useRef(null);
  const tituloId = useId();
  const { plataforma, puedeNativo, instalada } = useInstalacion();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierta && !d.open) d.showModal();
    if (!abierta && d.open) d.close();
  }, [abierta]);

  const pasos = PASOS[plataforma === "android" ? "android" : "ios"];

  const instalar = async () => {
    const r = await instalarNativo();
    if (r === "accepted") onCerrar();
  };

  return (
    <dialog
      ref={ref}
      className="pwa-guia"
      aria-labelledby={tituloId}
      onClose={onCerrar}
      onClick={(e) => e.target === ref.current && onCerrar()}
    >
      <div className="pwa-guia__caja">
        <button type="button" className="pwa-hoja__cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
        <div className="pwa-hoja__cabeza">
          {/* eslint-disable-next-line @next/next/no-img-element -- ícono generado, ya del tamaño justo */}
          <img src={ICONO} alt="" width="52" height="52" className="pwa-hoja__icono" />
          <p id={tituloId} className="pwa-hoja__titulo">Instala la invitación</p>
        </div>

        <ul className="pwa-guia__beneficios">
          {BENEFICIOS.map((b) => <li key={b}>{b}</li>)}
        </ul>

        {instalada ? (
          <p className="pwa-guia__listo">Ya la tienes instalada. Ábrela desde el ícono de tu pantalla de inicio.</p>
        ) : puedeNativo ? (
          <div className="pwa-hoja__acciones">
            <button type="button" className="pwa-hoja__boton" onClick={instalar}>Instalar ahora</button>
          </div>
        ) : (
          <>
            <ol className="pwa-guia__pasos">
              {pasos.map(({ paso, texto }, i) => (
                <li key={paso} className="pwa-guia__paso">
                  <div className="pwa-guia__dibujo">
                    <IlustracionPaso paso={paso} icono={ICONO} nombre={NOMBRE} colores={COLORES} />
                  </div>
                  <p>
                    <span className="pwa-guia__numero">{i + 1}</span>
                    {texto}
                  </p>
                </li>
              ))}
            </ol>
            <p className="pwa-guia__nota">
              {plataforma === "ios"
                ? "Si la abriste desde WhatsApp o Instagram, primero toca ··· o Compartir y elige Abrir en Safari."
                : "Si la abriste desde WhatsApp o Instagram, primero toca ⋮ y elige Abrir en Chrome."}
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}

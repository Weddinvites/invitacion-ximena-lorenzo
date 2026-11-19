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
  "Avisos de los novios: cambios de horario, tu mesa o algún detalle de último momento.",
  "Tu mesa y tus pases siempre a la mano, sin buscar el mensaje.",
  "Se abre al instante el día de la boda, aunque no haya señal.",
];

/**
 * Guía para guardar la invitación en el celular, con pasos ilustrados para iPhone o Android.
 * `obligatoria` (después de confirmar): sin ×, no se cierra con Esc ni tocando afuera; solo con
 * `onLista`, al instalarla o al tocar «Ya la instalé» (iPhone no deja saber si se instaló).
 */
export default function GuiaInstalar({ abierta, onCerrar, obligatoria = false, onLista }) {
  const ref = useRef(null);
  const tituloId = useId();
  const { plataforma, puedeNativo, instalada } = useInstalacion();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierta && !d.open) d.showModal();
    if (!abierta && d.open) d.close();
    if (!abierta || !obligatoria) return;
    // Mientras sea obligatoria, la página de atrás no se desplaza.
    const html = document.documentElement;
    const antes = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = antes;
    };
  }, [abierta, obligatoria]);

  const pasos = PASOS[plataforma === "android" ? "android" : "ios"];
  const terminar = () => (obligatoria ? onLista?.() : onCerrar?.());

  const instalar = async () => {
    const r = await instalarNativo();
    if (r === "accepted") terminar();
  };

  // Esc: la obligatoria no se cierra; si el navegador la cierra de todos modos, se vuelve a abrir.
  const alCancelar = (e) => {
    if (obligatoria) e.preventDefault();
  };
  const alCerrar = () => {
    if (obligatoria && abierta) ref.current?.showModal();
    else onCerrar?.();
  };

  return (
    <dialog
      ref={ref}
      className="pwa-guia"
      aria-labelledby={tituloId}
      onCancel={alCancelar}
      onClose={alCerrar}
      onClick={(e) => !obligatoria && e.target === ref.current && onCerrar?.()}
    >
      <div className="pwa-guia__caja">
        {!obligatoria && (
          <button type="button" className="pwa-hoja__cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
        )}
        <div className="pwa-hoja__cabeza">
          {/* eslint-disable-next-line @next/next/no-img-element -- ícono generado, ya del tamaño justo */}
          <img src={ICONO} alt="" width="52" height="52" className="pwa-hoja__icono" />
          <p id={tituloId} className="pwa-hoja__titulo">
            {obligatoria ? "¡Gracias por confirmar! Queremos mantenerte al tanto" : "Recibe las noticias de nuestra boda"}
          </p>
        </div>

        <p className="pwa-guia__intro">
          Antes de la boda podríamos compartirte avisos importantes. Para que te lleguen, guarda nuestra
          invitación en tu celular: solo toma un minuto y nos ayudas a darte la mejor experiencia.
        </p>

        <ul className="pwa-guia__beneficios">
          {BENEFICIOS.map((b) => <li key={b}>{b}</li>)}
        </ul>

        {instalada ? (
          <>
            <p className="pwa-guia__listo">¡Listo! Ya la tienes en tu celular. Ábrela desde su ícono para recibir los avisos.</p>
            {obligatoria && (
              <div className="pwa-hoja__acciones pwa-guia__final">
                <button type="button" className="pwa-hoja__boton" onClick={terminar}>Continuar</button>
              </div>
            )}
          </>
        ) : puedeNativo ? (
          <div className="pwa-hoja__acciones pwa-guia__final">
            <button type="button" className="pwa-hoja__boton" onClick={instalar}>Guardar en mi celular</button>
          </div>
        ) : (
          <>
            <p className="pwa-guia__nota pwa-guia__nota--antes">
              {plataforma === "ios"
                ? "Si la abriste desde WhatsApp o Instagram, primero toca ··· o Compartir y elige «Abrir en Safari»."
                : "Si la abriste desde WhatsApp o Instagram, primero toca ⋮ y elige «Abrir en Chrome»."}
            </p>
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
            {obligatoria && (
              <div className="pwa-hoja__acciones pwa-guia__final">
                <button type="button" className="pwa-hoja__boton" onClick={terminar}>Ya la instalé</button>
              </div>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}

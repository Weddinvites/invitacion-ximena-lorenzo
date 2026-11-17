"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { preguntarAsistente } from "../actions";
import "./chat.css";

const SUGERENCIAS = [
  "¿A qué hora empieza?",
  "¿Cuál es el código de vestimenta?",
  "¿Dónde es la recepción?",
  "¿Cuántos pases tengo?",
];
const MAX_GUARDADOS = 40;
const clave = (slug) => `chat-asistente:${slug}`;

/** Texto con enlaces tocables (el asistente responde en texto simple). */
function ConEnlaces({ texto }) {
  return texto.split(/(https?:\/\/[^\s)]+)/g).map((parte, i) =>
    /^https?:\/\//.test(parte) ? (
      <a key={i} href={parte} target="_blank" rel="noopener noreferrer">
        {parte.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
      </a>
    ) : (
      <Fragment key={i}>{parte}</Fragment>
    )
  );
}

const IconoChat = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    <path
      d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5z"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
    />
    <path d="M12 6.6l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" fill="currentColor" />
  </svg>
);

/**
 * Asistente con IA de la invitación (solo en enlaces personales).
 * La conversación se guarda en este dispositivo; la API recibe los últimos mensajes y responde
 * con la ficha del evento, los datos de este invitado y las notas de los novios.
 */
export default function ChatAsistente({ slug, nombre, novios }) {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajesEstado] = useState([]);
  const [texto, setTexto] = useState("");
  const [pensando, setPensando] = useState(false);
  const [error, setError] = useState("");
  const leido = useRef(false);
  const ultimaPregunta = useRef("");
  const lista = useRef(null);
  const entrada = useRef(null);
  const boton = useRef(null);

  useEffect(() => {
    lista.current?.scrollTo({ top: lista.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, pensando, abierto]);

  useEffect(() => {
    if (!abierto) return;
    entrada.current?.focus({ preventScroll: true });
    const alTecla = (e) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", alTecla);
    return () => window.removeEventListener("keydown", alTecla);
  }, [abierto]);

  // La conversación vive en este dispositivo: se lee al abrir y se guarda en cada cambio.
  function setMensajes(lista) {
    setMensajesEstado(lista);
    try {
      localStorage.setItem(clave(slug), JSON.stringify(lista.slice(-MAX_GUARDADOS)));
    } catch {}
  }

  function abrir() {
    if (!leido.current) {
      leido.current = true;
      try {
        const guardados = JSON.parse(localStorage.getItem(clave(slug)) ?? "[]");
        if (Array.isArray(guardados)) setMensajesEstado(guardados);
      } catch {}
    }
    setAbierto(true);
  }

  function cerrar() {
    setAbierto(false);
    boton.current?.focus({ preventScroll: true });
  }

  async function enviar(pregunta) {
    const contenido = pregunta.trim();
    if (!contenido || pensando) return;
    const nuevos = [...mensajes, { role: "user", content: contenido }];
    ultimaPregunta.current = contenido;
    setMensajes(nuevos);
    setTexto("");
    setError("");
    setPensando(true);
    try {
      const r = await preguntarAsistente(slug, nuevos);
      if (r.ok) return setMensajes([...nuevos, { role: "assistant", content: r.respuesta }]);
      fallo(r.message);
    } catch {
      fallo("No hay conexión con el asistente. Inténtalo en un momento.");
    } finally {
      setPensando(false);
    }
  }

  // Sin respuesta: la pregunta regresa al cuadro de texto para reintentar.
  function fallo(mensaje) {
    setMensajes(mensajes); // la conversación como estaba antes de preguntar
    setTexto((t) => t || ultimaPregunta.current);
    setError(mensaje);
  }

  const alEnviar = (e) => {
    e.preventDefault();
    enviar(texto);
  };
  const alTeclaEntrada = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      enviar(texto);
    }
  };

  return (
    <>
      <button
        ref={boton}
        type="button"
        className={`chat-burbuja${abierto ? " chat-burbuja--oculta" : ""}`}
        onClick={abrir}
        aria-label="Abrir el asistente de la boda"
        aria-expanded={abierto}
        aria-controls="chat-asistente"
      >
        <IconoChat />
        <span className="chat-burbuja__texto">¿Dudas?</span>
      </button>

      {abierto && (
        <div className="chat-fondo" onClick={cerrar}>
          <section
            id="chat-asistente"
            className="chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-titulo"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="chat-panel__cabeza">
              <span className="chat-panel__icono"><IconoChat /></span>
              <div>
                <h2 id="chat-titulo" className="chat-panel__titulo">Asistente de la boda</h2>
                <p className="chat-panel__subtitulo">Pregúntame sobre el evento o tu invitación</p>
              </div>
              <button type="button" className="chat-panel__cerrar" onClick={cerrar} aria-label="Cerrar el asistente">
                ×
              </button>
            </header>

            <div className="chat-panel__mensajes" ref={lista} aria-live="polite">
              <p className="chat-msg chat-msg--asistente">
                ¡Hola, {nombre}! Soy el asistente de la boda{novios ? ` de ${novios}` : ""}. Puedo ayudarte con horarios,
                lugares, vestimenta, regalos, hospedaje o tu invitación.
              </p>
              {mensajes.length === 0 && (
                <div className="chat-sugerencias">
                  {SUGERENCIAS.map((s) => (
                    <button key={s} type="button" className="chat-sugerencia" onClick={() => enviar(s)} disabled={pensando}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {mensajes.map((m, i) => (
                <p key={i} className={`chat-msg chat-msg--${m.role === "user" ? "invitado" : "asistente"}`}>
                  {m.role === "user" ? m.content : <ConEnlaces texto={m.content} />}
                </p>
              ))}
              {pensando && (
                <p className="chat-msg chat-msg--asistente chat-msg--pensando" aria-label="El asistente está escribiendo">
                  <span></span><span></span><span></span>
                </p>
              )}
              {error && <p className="chat-error" role="alert">{error}</p>}
            </div>

            <form className="chat-panel__entrada" onSubmit={alEnviar}>
              <textarea
                ref={entrada}
                rows={1}
                maxLength={500}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={alTeclaEntrada}
                placeholder="Escribe tu pregunta…"
                aria-label="Tu pregunta"
              />
              <button type="submit" disabled={!texto.trim() || pensando} aria-label="Enviar">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M4 12l16-8-6 16-2.5-6.5z" fill="currentColor" />
                </svg>
              </button>
            </form>
            <p className="chat-panel__nota">Responde una IA con la información de la invitación; puede equivocarse.</p>
          </section>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useTransition } from "react";
import { responderInvitacion } from "../actions";

// Igual que la API: 0 = pendiente, 1 = asiste, 2 = declina.
const RSVP = { PENDIENTE: 0, ASISTE: 1, DECLINA: 2 };
const lugares = (n) => (n === 1 ? "lugar" : "lugares");

const UNIDADES = ["Cero", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez"];

const pasesTexto = (n) => {
  const palabra = UNIDADES[n] ?? String(n);
  return n === 1 ? `${palabra} lugar para ti` : `${palabra} lugares para ustedes`;
};

/** "Familia Pérez López" / "Juan Pérez & María Gómez" (mismo formato que Vale). */
export const nombreInvitado = (guest) => {
  const base = [guest.primer_nombre, guest.apellido_paterno, guest.apellido_materno]
    .filter((v) => typeof v === "string" && v.trim() !== "")
    .join(" ");
  if (!guest.pareja?.nombre) return base;
  const pareja = [guest.pareja.nombre, guest.pareja.apellido].filter(Boolean).join(" ");
  return `${base} & ${pareja}`;
};

export function PaseInvitado({ guest }) {
  const pases = Number(guest.pases) || 0;

  return (
    <section className="desfase-one active">
      <section className="pasesBoda__section" id="paseinvitado">
        <div className="pases__section-container">
          <div className="title-micancion sr-top">
            <div
              className="stitle "
              style={{ "--w": "250px", "--ar": "1012 / 360", "--s": 13.15, "--sy": 7.46, "--c": 9.64, "--cy": 22.04 }}
              role="heading"
              aria-level={2}
            >
              <span className="stitle__serif">Es un placer</span>
              <span className="stitle__script">Invitarlos</span>
            </div>
          </div>
          <div className="pasesBoda-container">
            <p className="family-name sr-bottom" id="names-general">
              {nombreInvitado(guest)}, hemos reservado con mucho cariño...
            </p>
            {pases >= 1 && pases <= 10 && (
              <img
                src={`/assets/images/pase/${pases}.png`}
                width="100px"
                className="imgNumbers sr-bottom"
                alt={`${pases} ${pases === 1 ? "pase" : "pases"}`}
              />
            )}
            {pases > 0 && (
              <p className="title sr-bottom" id="title-paseBoda">
                <span id="numberId">{pasesTexto(pases)}</span>
              </p>
            )}
            <img
              src="/assets/images/alejandra-carrasco/sep2.svg"
              width="200px"
              className="sep2 sr-bottom"
              alt=""
            />
          </div>
        </div>
      </section>
    </section>
  );
}

/**
 * RSVP: el invitado elige cuántos de sus pases usará y acepta, o declina con
 * "Una disculpa, no podré asistir". Solo se responde una vez; para cambiarla,
 * los novios la regresan a pendiente desde el admin.
 */
export function ConfirmacionInvitado({ guest }) {
  const pases = Math.max(Number(guest.pases) || 1, 1);
  const [respuesta, setRespuesta] = useState({
    confirmado: Number(guest.confirmado) || RSVP.PENDIENTE,
    asistentes: guest.asistentes ?? null,
  });
  const [cantidad, setCantidad] = useState(pases);
  const varios = pases > 1; // "ustedes" vs "tú"
  const [declinando, setDeclinando] = useState(false);
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  const responder = (asistentes) => {
    setError(null);
    startTransition(async () => {
      const r = await responderInvitacion(guest.slug, asistentes);
      if (!r.ok) {
        setError("No pudimos registrar tu respuesta. Intenta de nuevo en un momento.");
        return;
      }
      setRespuesta({ confirmado: r.confirmado, asistentes: r.asistentes });
      if (r.confirmado === RSVP.ASISTE && typeof window !== "undefined" && typeof window.confetti === "function") {
        window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
      }
    });
  };

  const handleAceptar = (e) => {
    e.preventDefault();
    responder(cantidad);
  };

  return (
    <section className="confirmacion__section paperWhite" id="confirmacion">
      <div className="title-micancion sr-left">
        <div
          className="stitle "
          style={{ "--w": "270px", "--ar": "1060 / 340", "--s": 11.74, "--sy": 7.12, "--c": 9.94, "--cy": 20.28, "--mb": "2rem" }}
          role="heading"
          aria-level={2}
        >
          <span className="stitle__serif">Confirmación</span>
          <span className="stitle__script">De Asistencia</span>
        </div>
      </div>
      <div className="confirmacion__section-container">
        <div className="confirmacion-description">
          <p>{nombreInvitado(guest)}</p>
        </div>
        {respuesta.confirmado === RSVP.ASISTE && (
          <div className="text-confirmacion rsvp__respuesta" role="status">
            <p>¡Gracias por tu confirmación!</p>
            <p className="rsvp__resumen">
              Confirmamos {respuesta.asistentes} de {pases} {lugares(pases)}
            </p>
          </div>
        )}

        {respuesta.confirmado === RSVP.DECLINA && (
          <div className="text-confirmacion rsvp__respuesta" role="status">
            <p>Gracias por avisarnos</p>
            <p className="rsvp__resumen">
              {varios
                ? "Lamentamos que no puedan acompañarnos; los tendremos muy presentes en este día tan especial."
                : "Lamentamos que no puedas acompañarnos; te tendremos muy presente en este día tan especial."}
            </p>
          </div>
        )}

        {respuesta.confirmado === RSVP.PENDIENTE && (
          <div className="form__container">
            <div className="confirmacion-description">
              <p>Por favor confirma tu asistencia a nuestra boda</p>
            </div>

            {!declinando ? (
              <form id="form" className="container" onSubmit={handleAceptar}>
                {pases > 1 && (
                  <div className="rsvp__cantidad">
                    <p className="rsvp__pregunta" id="rsvp-cantidad-label">¿Cuántos lugares ocuparán?</p>
                    <div className="rsvp__stepper" role="group" aria-labelledby="rsvp-cantidad-label">
                      <button
                        type="button"
                        className="rsvp__step"
                        onClick={() => setCantidad((n) => Math.max(1, n - 1))}
                        disabled={pending || cantidad <= 1}
                        aria-label="Un lugar menos"
                      >
                        −
                      </button>
                      <output className="rsvp__numero" aria-live="polite">
                        {cantidad}
                        <small> de {pases}</small>
                      </output>
                      <button
                        type="button"
                        className="rsvp__step"
                        onClick={() => setCantidad((n) => Math.min(pases, n + 1))}
                        disabled={pending || cantidad >= pases}
                        aria-label="Un lugar más"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <div className="btns-WhatsApp">
                  <button className="btn1 btns" type="submit" disabled={pending} id="submit-button">
                    <span>{pending ? "Enviando..." : "Aceptar"}</span>
                  </button>
                </div>

                <p className="rsvp__leyenda">
                  Sabemos que no siempre es posible acompañarnos, y lo entendemos de corazón. Si no{" "}
                  {varios ? "podrán venir, les" : "podrás venir, te"} pedimos la cortesía de hacérnoslo saber aquí, con
                  toda confianza y sin ninguna pena: nos ayudará a preparar cada detalle con mucho cariño.
                </p>

                <button type="button" className="rsvp__declinar" onClick={() => setDeclinando(true)} disabled={pending}>
                  Una disculpa, no podré asistir
                </button>
              </form>
            ) : (
              <div className="rsvp__confirmar-declinar" role="alertdialog" aria-labelledby="rsvp-declinar-titulo">
                <p id="rsvp-declinar-titulo">¿Nos confirmas que no {varios ? "podrán" : "podrás"} acompañarnos?</p>
                <div className="rsvp__acciones">
                  <button type="button" className="btn1 btns" onClick={() => responder(0)} disabled={pending}>
                    <span>{pending ? "Enviando..." : "Sí, no podré asistir"}</span>
                  </button>
                  <button type="button" className="rsvp__declinar" onClick={() => setDeclinando(false)} disabled={pending}>
                    Volver
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="text-confirmacion" role="alert" style={{ color: "#a33", fontSize: "1.8rem", textAlign: "center" }}>
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

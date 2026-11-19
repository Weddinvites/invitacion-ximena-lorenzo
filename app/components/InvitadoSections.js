"use client";

import { useState, useTransition } from "react";
import { responderInvitacion } from "../actions";
import Avisos from "../pwa/Avisos";
import TuMesa from "../pwa/TuMesa";
import AvisoInstalar from "../pwa/AvisoInstalar";

// Igual que la API: 0 = pendiente, 1 = asiste, 2 = declina.
const RSVP = { PENDIENTE: 0, ASISTE: 1, DECLINA: 2 };
const lugares = (n) => (n === 1 ? "lugar" : "lugares");

const UNIDADES = ["Cero", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez"];

const pasesTexto = (n) => {
  const palabra = UNIDADES[n] ?? String(n);
  return n === 1 ? `${palabra} lugar para ti` : `${palabra} lugares para ustedes`;
};

/** "Héctor, Adriana y Sofía" */
const listaNombres = (nombres) =>
  nombres.length > 1 ? `${nombres.slice(0, -1).join(", ")} y ${nombres.at(-1)}` : nombres[0] ?? "";

const esFamilia = (guest) => Number(guest.tipo) === 1;

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
              {esFamilia(guest) && guest.personas?.length > 0 ? (
                <>
                  {nombreInvitado(guest)}
                  <span className="family-name__integrantes">
                    {listaNombres(guest.personas.map((p) => p.primer_nombre || p.nombre))}
                  </span>
                  <span className="family-name__frase">hemos reservado con mucho cariño...</span>
                </>
              ) : (
                <>{nombreInvitado(guest)}, hemos reservado con mucho cariño...</>
              )}
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
            <TuMesa mesa={guest.mesa} />
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
export function ConfirmacionInvitado({ guest, fechaLimite = "" }) {
  const pases = Math.max(Number(guest.pases) || 1, 1);
  const personas = guest.personas ?? [];
  // Con un nombre por pase se elige persona por persona; si no, cuántos lugares.
  const casillas = Boolean(guest.por_persona) && personas.length > 1;
  const [respuesta, setRespuesta] = useState({
    confirmado: Number(guest.confirmado) || RSVP.PENDIENTE,
    asistentes: guest.asistentes ?? null,
    lugares: guest.lugares ?? null,
  });
  const [cantidad, setCantidad] = useState(pases);
  const [elegidos, setElegidos] = useState(() => personas.map((p) => p.lugar));
  const [recienConfirmado, setRecienConfirmado] = useState(false);
  const alternar = (lugar) =>
    setElegidos((l) => (l.includes(lugar) ? l.filter((x) => x !== lugar) : [...l, lugar].sort((a, b) => a - b)));
  const quienes = (lugares) => listaNombres(personas.filter((p) => lugares.includes(p.lugar)).map((p) => p.nombre));
  const varios = pases > 1; // "ustedes" vs "tú"
  const [declinando, setDeclinando] = useState(false);
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  // `eleccion`: número de lugares (0 = declina) o { lugares } persona por persona.
  const responder = (eleccion) => {
    setError(null);
    startTransition(async () => {
      const r = await responderInvitacion(guest.slug, eleccion);
      if (!r.ok) {
        setError("No pudimos registrar tu respuesta. Intenta de nuevo en un momento.");
        return;
      }
      setRespuesta({ confirmado: r.confirmado, asistentes: r.asistentes, lugares: r.lugares });
      if (r.confirmado === RSVP.ASISTE) {
        setRecienConfirmado(true);
        if (typeof window !== "undefined" && typeof window.confetti === "function") {
          window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
        }
      }
    });
  };

  const handleAceptar = (e) => {
    e.preventDefault();
    if (!casillas) return responder(cantidad);
    if (!elegidos.length) {
      setError("Marca al menos a una persona, o elige «Una disculpa, no podré asistir».");
      return;
    }
    responder({ lugares: elegidos });
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
              {casillas && respuesta.lugares?.length
                ? `Confirmamos a ${quienes(respuesta.lugares)}`
                : `Confirmamos ${respuesta.asistentes} de ${pases} ${lugares(pases)}`}
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
              {fechaLimite && <p className="rsvp__limite">antes del {fechaLimite}</p>}
            </div>

            {!declinando ? (
              <form id="form" className="container" onSubmit={handleAceptar}>
                {casillas && (
                  <div className="rsvp__cantidad">
                    <p className="rsvp__pregunta" id="rsvp-personas-label">¿Quiénes nos acompañarán?</p>
                    <div className="rsvp__personas" role="group" aria-labelledby="rsvp-personas-label">
                      {personas.map((p) => (
                        <label
                          key={p.lugar}
                          className={`rsvp__persona${elegidos.includes(p.lugar) ? " rsvp__persona--si" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={elegidos.includes(p.lugar)}
                            onChange={() => alternar(p.lugar)}
                            disabled={pending}
                          />
                          <span>{p.nombre}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {!casillas && pases > 1 && (
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

        {/* Avisos: al confirmar que asiste, o dentro de la app instalada mientras no decline. */}
        {respuesta.confirmado !== RSVP.DECLINA && (
          <Avisos slug={guest.slug} soloInstalada={respuesta.confirmado !== RSVP.ASISTE} />
        )}

        {/* Después de confirmar: guardar la invitación en el celular para recibir los avisos. */}
        <AvisoInstalar slug={guest.slug} activo={respuesta.confirmado === RSVP.ASISTE} recienConfirmado={recienConfirmado} />
      </div>
    </section>
  );
}

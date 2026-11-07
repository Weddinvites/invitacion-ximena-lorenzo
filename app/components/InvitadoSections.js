"use client";

import { useState, useTransition } from "react";
import { confirmarAsistencia } from "../actions";

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

/** Confirmación igual que Vale: botón "Aceptar" → PUT /api/eventos/:evento/invitados/:slug/confirmar. */
export function ConfirmacionInvitado({ guest }) {
  const [confirmed, setConfirmed] = useState(Boolean(guest.confirmado));
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  const handleConfirmacion = (e) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const r = await confirmarAsistencia(guest.slug);
      if (r.ok) {
        setConfirmed(true);
        if (typeof window !== "undefined" && typeof window.confetti === "function") {
          window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
        }
      } else {
        setError("No pudimos registrar tu confirmación. Intenta de nuevo en un momento.");
      }
    });
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
        {confirmed ? (
          <div className="text-confirmacion" style={{ paddingTop: "1rem" }}>
            <p>¡Gracias por tu confirmación!</p>
          </div>
        ) : (
          <div className="form__container">
            <div className="confirmacion-description">
              <p>Por favor confirma tu asistencia a nuestra boda</p>
            </div>
            <form id="form" className="container" onSubmit={handleConfirmacion}>
              <div className="btns-WhatsApp">
                <button className="btn1 btns" type="submit" disabled={pending} id="submit-button">
                  <span>{pending ? "Enviando..." : "Aceptar"}</span>
                </button>
              </div>
            </form>
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

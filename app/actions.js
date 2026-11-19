"use server";

import { responderRsvp, getClavePush, suscripcionPush, chatAsistente } from "./lib/api";

/**
 * Respuesta de la invitación (PUT /api/eventos/:EVENTO_ID/invitados/:slug/rsvp).
 * `eleccion`: número (0 = "No podré asistir"; 1..pases = asiste con esos lugares)
 * o { lugares: [0, 2] } = asisten esas personas.
 */
export async function responderInvitacion(slug, eleccion) {
  let cuerpo;
  if (Array.isArray(eleccion?.lugares)) {
    const l = eleccion.lugares.map(Number);
    if (l.length > 50 || !l.every((n) => Number.isInteger(n) && n >= 0 && n <= 50)) return { ok: false };
    cuerpo = { lugares: l };
  } else {
    const n = Number(eleccion);
    if (!Number.isInteger(n) || n < 0) return { ok: false };
    cuerpo = { asistentes: n };
  }
  const r = await responderRsvp(String(slug ?? ""), cuerpo);
  if (!r.ok || !r.guest) return { ok: false };
  return {
    ok: true,
    confirmado: Number(r.guest.confirmado),
    asistentes: Number(r.guest.asistentes ?? 0),
    lugares: Array.isArray(r.guest.lugares) ? r.guest.lugares : null,
  };
}

/** Llave pública para suscribir el dispositivo a los avisos. */
export async function clavePush() {
  return getClavePush();
}

const esTexto = (v, max) => typeof v === "string" && v.length > 0 && v.length <= max;

/** Activa los avisos en este dispositivo: `sub` es PushSubscription.toJSON(). */
export async function activarAvisos(slug, sub) {
  const { endpoint, keys } = sub ?? {};
  if (!esTexto(endpoint, 600) || !esTexto(keys?.p256dh, 200) || !esTexto(keys?.auth, 100)) return { ok: false };
  return { ok: await suscripcionPush(String(slug ?? ""), "POST", { endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth } }) };
}

export async function desactivarAvisos(slug, endpoint) {
  if (!esTexto(endpoint, 600)) return { ok: false };
  return { ok: await suscripcionPush(String(slug ?? ""), "DELETE", { endpoint }) };
}

/** Pregunta al asistente con IA. Solo pasa a la API mensajes con la forma esperada. */
export async function preguntarAsistente(slug, mensajes) {
  if (!Array.isArray(mensajes) || !mensajes.length) return { ok: false, message: "Escribe tu pregunta." };
  const limpios = mensajes
    .slice(-12)
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && esTexto(m.content?.trim(), 1500))
    .map((m) => ({ role: m.role, content: m.content.trim() }));
  if (limpios.at(-1)?.role !== "user") return { ok: false, message: "Escribe tu pregunta." };
  return chatAsistente(String(slug ?? ""), limpios);
}

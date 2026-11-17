"use server";

import { responderRsvp, getClavePush, suscripcionPush, chatAsistente } from "./lib/api";

/**
 * Respuesta de la invitación (PUT /api/eventos/:EVENTO_ID/invitados/:slug/rsvp).
 * asistentes = 0 → "No podré asistir"; 1..pases → asiste con esos lugares.
 */
export async function responderInvitacion(slug, asistentes) {
  const n = Number(asistentes);
  if (!Number.isInteger(n) || n < 0) return { ok: false };
  const r = await responderRsvp(String(slug ?? ""), n);
  if (!r.ok || !r.guest) return { ok: false };
  return { ok: true, confirmado: Number(r.guest.confirmado), asistentes: Number(r.guest.asistentes ?? 0) };
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

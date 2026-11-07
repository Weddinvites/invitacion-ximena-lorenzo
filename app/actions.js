"use server";

import { responderRsvp } from "./lib/api";

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

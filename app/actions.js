"use server";

import { confirmarInvitado } from "./lib/api";

/** Botón "Aceptar" de la invitación (PUT /api/eventos/:EVENTO_ID/invitados/:slug/confirmar). */
export async function confirmarAsistencia(slug) {
  return { ok: await confirmarInvitado(String(slug ?? "")) };
}

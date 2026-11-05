"use server";

import { apiUrl, getInvitadoDelEvento } from "./lib/api";

/**
 * Botón "Aceptar" de la invitación.
 * Recibe el slug (no el id) y vuelve a validar en el servidor que el invitado
 * pertenezca a este evento antes de llamar a PUT /api/invitados/confirmar.
 */
export async function confirmarAsistencia(slug) {
  const guest = await getInvitadoDelEvento(String(slug ?? ""));
  if (!guest) return { ok: false };

  try {
    const res = await fetch(apiUrl("/invitados/confirmar"), {
      method: "PUT",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: guest.id_invitado }),
      cache: "no-store",
    });
    return { ok: res.ok };
  } catch (error) {
    console.error("[confirmarAsistencia]", error.message);
    return { ok: false };
  }
}

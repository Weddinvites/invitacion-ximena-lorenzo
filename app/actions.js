"use server";

import { apiUrl } from "./lib/api";

/** Botón "Aceptar" de la invitación (endpoint público de boda-restapi). */
export async function confirmarAsistencia(idInvitado) {
  const id = Number(idInvitado);
  if (!Number.isInteger(id) || id <= 0) return { ok: false };

  try {
    const res = await fetch(apiUrl("/invitados/confirmar"), {
      method: "PUT",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      cache: "no-store",
    });
    return { ok: res.ok };
  } catch (error) {
    console.error("[confirmarAsistencia]", error.message);
    return { ok: false };
  }
}

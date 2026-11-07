import "server-only";
import { cache } from "react";

const API_URL = process.env.API_URL?.replace(/\/+$/, "");
// Evento de esta invitación en boda-restapi: la API solo responde invitados de este evento.
const EVENTO_ID = Number(process.env.EVENTO_ID);

if (!Number.isInteger(EVENTO_ID) || EVENTO_ID <= 0) {
  console.error("⚠️  EVENTO_ID no está definido o es inválido (ver .env.example): ninguna invitación personalizada se mostrará.");
}

const eventoValido = () => Number.isInteger(EVENTO_ID) && EVENTO_ID > 0;

const invitadoPath = (slug) => {
  if (!API_URL) throw new Error("API_URL no está definido (ver .env.example)");
  return `${API_URL}/api/eventos/${EVENTO_ID}/invitados/${encodeURIComponent(slug)}`;
};

/**
 * Invitado por slug dentro del evento (o null si no existe en este evento).
 * Incluye `pareja: { nombre, apellido } | null`. Se memoiza por request (metadata + página).
 */
export const getInvitado = cache(async (slug) => {
  if (!slug || !eventoValido()) return null;
  try {
    const res = await fetch(invitadoPath(slug), { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`[api] GET invitado ${slug}:`, error.message);
    return null;
  }
});

/** Botón "Aceptar": la API confirma solo si el slug pertenece a este evento. */
export async function confirmarInvitado(slug) {
  if (!slug || !eventoValido()) return false;
  try {
    const res = await fetch(`${invitadoPath(slug)}/confirmar`, {
      method: "PUT",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    return res.ok;
  } catch (error) {
    console.error(`[api] PUT confirmar ${slug}:`, error.message);
    return false;
  }
}

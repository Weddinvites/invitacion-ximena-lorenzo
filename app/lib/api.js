import "server-only";

const API_URL = process.env.API_URL?.replace(/\/+$/, "");
// Evento de esta invitación en boda-restapi. El slug es global en la API, así que
// se filtra aquí para no mostrar ni confirmar invitados de otras bodas.
const EVENTO_ID = Number(process.env.EVENTO_ID);

if (!Number.isInteger(EVENTO_ID) || EVENTO_ID <= 0) {
  console.error("⚠️  EVENTO_ID no está definido o es inválido (ver .env.example): ninguna invitación personalizada se mostrará.");
}

export const apiUrl = (path) => {
  if (!API_URL) throw new Error("API_URL no está definido (ver .env.example)");
  return `${API_URL}/api${path}`;
};

async function getJson(path) {
  try {
    const res = await fetch(apiUrl(path), { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`[api] GET ${path}:`, error.message);
    return null;
  }
}

/** Invitado por slug, solo si pertenece al evento de esta invitación (si no, null). */
export async function getInvitadoDelEvento(slug) {
  if (!slug) return null;
  const guest = await getJson(`/invitados/info/${encodeURIComponent(slug)}`);
  if (!guest || Number(guest.evento) !== EVENTO_ID) return null;
  return guest;
}

/** Invitado + acompañante (si es pareja), igual que Vale-NicolyBernardo/invitacion/src/app/[slug]/page.js */
export async function getInvitado(slug) {
  const guest = await getInvitadoDelEvento(slug);
  if (!guest) return { guest: null, companion: null };
  const companion = Number(guest.tipo) === 2 ? await getJson(`/acompanantes/${guest.id_invitado}`) : null;
  return { guest, companion };
}

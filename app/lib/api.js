import "server-only";

const API_URL = process.env.API_URL?.replace(/\/+$/, "");

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

/** Invitado + acompañante (si es pareja), igual que Vale-NicolyBernardo/invitacion/src/app/[slug]/page.js */
export async function getInvitado(slug) {
  const guest = await getJson(`/invitados/info/${encodeURIComponent(slug)}`);
  if (!guest) return { guest: null, companion: null };
  const companion = Number(guest.tipo) === 2 ? await getJson(`/acompanantes/${guest.id_invitado}`) : null;
  return { guest, companion };
}

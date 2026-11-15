import "server-only";
import { getFicha } from "../lib/api";

// Colores del tema para el ícono y la app instalada (los mismos de public/css/styles.css).
export const COLORES = { fondo: "#1D344B", dorado: "#B89965", claro: "#FCFAFB" };
export const TAMANOS_ICONO = [180, 192, 512];

/** Slug con forma válida (lo demás no se usa para armar URLs). */
export const slugValido = (slug) => typeof slug === "string" && /^[\w-]{1,100}$/.test(slug);

/** Nombres de los novios para el nombre de la app y el monograma. */
export async function nombresApp() {
  let novia = "";
  let novio = "";
  let titulo = "";
  try {
    const { evento, secciones } = await getFicha();
    novia = secciones.novios?.novia?.nombre?.trim() ?? "";
    novio = secciones.novios?.novio?.nombre?.trim() ?? "";
    titulo = secciones.novios?.titulo ?? evento.titulo ?? "";
  } catch {
    // Sin API: la app se instala con nombres genéricos.
  }
  const pareja = novia && novio ? `${novia} & ${novio}` : titulo || "Nuestra boda";
  const iniciales = novia && novio ? [novia[0], novio[0]] : null;
  return {
    nombre: `Boda ${pareja}`,
    corto: pareja.length <= 15 ? pareja : iniciales ? `${iniciales[0]} & ${iniciales[1]}` : "Boda",
    iniciales,
  };
}

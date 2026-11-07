import Invitacion from "./components/Invitacion";
import { getFicha } from "./lib/api";

export async function generateMetadata() {
  const ficha = await getFicha();
  const titulo = ficha.secciones.novios?.titulo ?? ficha.evento.titulo;
  return { title: `${titulo} | Home` };
}

// Sin invitado: invitación general (sin sección de pases ni confirmación).
export default async function Home() {
  const ficha = await getFicha();
  return <Invitacion ficha={ficha} />;
}

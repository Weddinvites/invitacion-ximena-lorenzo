import { notFound } from "next/navigation";
import Invitacion from "../components/Invitacion";
import { getFicha, getInvitado } from "../lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [guest, ficha] = await Promise.all([getInvitado(slug), getFicha(slug)]);
  const titulo = ficha.secciones.novios?.titulo ?? ficha.evento.titulo;
  return {
    title: guest ? `${titulo} | Invitación para ${guest.primer_nombre} ${guest.apellido_paterno}` : titulo,
    robots: { index: false, follow: false },
  };
}

export default async function InvitacionPage({ params }) {
  const { slug } = await params;
  const [guest, ficha] = await Promise.all([getInvitado(slug), getFicha(slug)]);

  if (!guest) notFound();

  return <Invitacion ficha={ficha} guest={guest} />;
}

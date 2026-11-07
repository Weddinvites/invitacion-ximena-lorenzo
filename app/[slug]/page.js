import { notFound } from "next/navigation";
import Invitacion from "../components/Invitacion";
import { getInvitado } from "../lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guest = await getInvitado(slug);
  return {
    title: guest ? `Ximena & Lorenzo | Invitación para ${guest.primer_nombre} ${guest.apellido_paterno}` : "Ximena & Lorenzo",
    robots: { index: false, follow: false },
  };
}

export default async function InvitacionPage({ params }) {
  const { slug } = await params;
  const guest = await getInvitado(slug);

  if (!guest) notFound();

  return <Invitacion guest={guest} />;
}

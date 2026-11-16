import "./pwa.css";

const sillasTexto = (s) =>
  s.length === 1 ? `Silla ${s[0]}` : `Sillas ${s.slice(0, -1).join(", ")} y ${s.at(-1)}`;

/** Mesa del invitado (la API solo la envía si los novios encendieron el aviso "Ya tienes mesa"). */
export default function TuMesa({ mesa }) {
  if (!mesa?.nombre) return null;
  return (
    <div className="pwa-mesa sr-bottom">
      <p className="pwa-mesa__etiqueta">Tu mesa</p>
      <p className="pwa-mesa__nombre">{mesa.nombre}</p>
      {mesa.sillas?.length > 0 && <p className="pwa-mesa__sillas">{sillasTexto(mesa.sillas)}</p>}
    </div>
  );
}

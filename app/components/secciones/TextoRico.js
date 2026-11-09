/** Texto con formato de la ficha. La API entrega este HTML ya limpio (ver boda-restapi/src/ficha/secciones.js). */
export default function TextoRico({ html, className }) {
  if (!html) return null;
  return <div className={`texto-rico ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

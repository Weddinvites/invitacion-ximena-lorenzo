/** Texto con formato de la ficha. La API entrega este HTML ya limpio (ver boda-restapi/src/ficha/secciones.js). */
export default function TextoRico({ html, className }) {
  if (!html) return null;
  // El navegador ignora un <br> al final de un párrafo, pero en el editor sí se ve como renglón.
  const conSaltos = html.replace(/<br\s*\/?>(?=<\/p>)/g, "<br /><br />");
  return <div className={`texto-rico ${className}`} dangerouslySetInnerHTML={{ __html: conSaltos }} />;
}

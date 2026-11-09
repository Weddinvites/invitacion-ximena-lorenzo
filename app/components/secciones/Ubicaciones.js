import TextoRico from "./TextoRico";

export function BotonEnlace({ href, children, style }) {
  return (
    <div className="btn__map btnPulses" style={style}>
      <a className="ancla-btns" href={href} target="_blank" rel="noreferrer">
        <div className="textMap">
          <div className="mapText">
            <p>{children}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

/** Un lugar del evento (ceremonia o recepción) con su enlace a Google Maps. */
export default function Lugar({ datos, contenedorStyle }) {
  if (!datos?.lugar) return null;

  return (
    <section className="events__section paperWhite" id="ubicacion">
      <div className="events__section-container" style={contenedorStyle}>
        {datos.titulo && <p className="title-event bounceInpx">{datos.titulo}</p>}
        {datos.foto?.url && (
          <img
            src={datos.foto.url}
            width="260px"
            className="imgIglesia boxprx"
            data-animation="zoomIn"
            alt={`Imagen de ${datos.lugar}`}
            style={{ objectPosition: `${datos.foto.x}% ${datos.foto.y}%` }}
          />
        )}
        <p className="name-event bounceInpx">{datos.lugar}</p>
        <TextoRico html={datos.direccion} className="adress bounceInpx" />
        {datos.hora && <p className="hour bounceInpx">{datos.hora} hrs</p>}
        {datos.maps_url && <BotonEnlace href={datos.maps_url}>Ver mapa</BotonEnlace>}
      </div>
    </section>
  );
}

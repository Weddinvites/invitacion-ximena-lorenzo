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
export default function Lugar({ datos, imagen, contenedorStyle }) {
  if (!datos?.lugar) return null;

  return (
    <section className="events__section paperWhite" id="ubicacion">
      <div className="events__section-container" style={contenedorStyle}>
        {datos.titulo && <p className="title-event bounceInpx">{datos.titulo}</p>}
        <img
          src={imagen}
          width="260px"
          className="imgIglesia boxprx"
          data-animation="zoomIn"
          alt={`Imagen de ${datos.lugar}`}
        />
        <p className="name-event bounceInpx">{datos.lugar}</p>
        {datos.direccion && <p className="adress bounceInpx">{datos.direccion}</p>}
        {datos.hora && <p className="hour bounceInpx">{datos.hora} hrs</p>}
        {datos.maps_url && <BotonEnlace href={datos.maps_url}>Ver mapa</BotonEnlace>}
      </div>
    </section>
  );
}

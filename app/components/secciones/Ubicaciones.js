// Imagen por posición (las imágenes siguen siendo assets de esta invitación).
const IMAGENES = ["/assets/images/isabel-samuel/iglesia.jpeg", "/assets/images/isabel-samuel/recepcion.png"];

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

/** Ceremonia, recepción (y cualquier otro lugar de la ficha), cada uno con su enlace a Google Maps. */
export default function Ubicaciones({ ubicaciones }) {
  const items = ubicaciones?.items ?? [];
  return items.map((u, i) => (
    <section className="events__section paperWhite" id="ubicacion" key={i}>
      <div className="events__section-container" style={i === 0 ? { height: "60rem" } : undefined}>
        <p className="title-event bounceInpx">{u.titulo}</p>
        <img
          src={IMAGENES[Math.min(i, IMAGENES.length - 1)]}
          width="260px"
          className="imgIglesia boxprx"
          data-animation="zoomIn"
          alt={`Imagen de ${u.lugar}`}
        />
        <p className="name-event bounceInpx">{u.lugar}</p>
        <p className="adress bounceInpx">{u.direccion}</p>
        <p className="hour bounceInpx">{u.hora} hrs</p>
        <BotonEnlace href={u.maps_url}>Ver mapa</BotonEnlace>
      </div>
    </section>
  ));
}

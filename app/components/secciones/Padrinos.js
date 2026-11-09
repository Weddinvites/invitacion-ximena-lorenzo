import { Fragment } from "react";

/** Padrinos por rol, con el mismo estilo que la sección de Padres. */
export default function Padrinos({ padrinos }) {
  const lista = padrinos?.lista ?? [];
  if (lista.length === 0) return null;

  return (
    <section className="dedicatoria__section paperWhite" id="padrinos">
      <div className="dedicatoria__section-container">
        <p className="textB sr-bottom">Nuestros Padrinos</p>

        {lista.map((p, i) => (
          <Fragment key={i}>
            <p className={`titleNames ${i === 0 ? "mainTitleNames " : ""}sr-bottom`}>{p.rol}</p>
            {p.nombres.map((nombre, j) => (
              <p className="names texto-rico sr-bottom" key={j} dangerouslySetInnerHTML={{ __html: nombre }} />
            ))}
            <img
              src="/assets/images/alejandra-carrasco/sep1.svg"
              width="180px"
              className="separadorGold sr-bottom"
              alt=""
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

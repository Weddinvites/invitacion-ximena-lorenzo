import { Fragment } from "react";

/** "Con la Bendición de Dios y nuestros Padres" — padres del novio y de la novia (con cruz si es finado). */
export default function Padres({ padres }) {
  const grupos = [
    { titulo: "Padres del Novio", personas: padres?.novio ?? [] },
    { titulo: "Padres de la Novia", personas: padres?.novia ?? [] },
  ].filter((g) => g.personas.length > 0);

  if (grupos.length === 0) return null;

  return (
    <section className="dedicatoria__section paperWhite" id="acompañame">
      <div className="dedicatoria__section-container">
        <p className="textB sr-bottom">Con la Bendición de Dios y nuestros Padres</p>

        {grupos.map((g, i) => (
          <Fragment key={g.titulo}>
            <p className={`titleNames ${i === 0 ? "mainTitleNames " : ""}sr-bottom`}>{g.titulo}</p>
            {g.personas.map((p, j) => (
              <p className="names sr-bottom" key={j}>
                {p.nombre}
                {p.finado && (
                  <span>
                    <img src="/assets/images/cruz.png" width="15px" alt="" />
                  </span>
                )}
              </p>
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

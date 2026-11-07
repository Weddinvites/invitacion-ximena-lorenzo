import { Fragment } from "react";

const DORADO = "primary:#B89965,secondary:#B89965";

// Clave de ícono de la ficha → animación de lordicon de esta invitación.
const ICONOS = {
  ceremonia: { src: "https://cdn.lordicon.com/fshosubk.json", colors: DORADO },
  recepcion: { src: "https://cdn.lordicon.com/rrbmabsx.json", colors: DORADO },
  entrada: { src: "https://cdn.lordicon.com/nvsfzbop.json", colors: DORADO },
  cena: { src: "https://cdn.lordicon.com/hihfsmas.json", colors: DORADO },
  vals: { src: "https://cdn.lordicon.com/dedkryhs.json", colors: "primary:#B89965" },
  fin: { src: "https://cdn.lordicon.com/ilhuppkd.json", colors: DORADO },
};

function Icono({ icono }) {
  const { src, colors } = ICONOS[icono] ?? ICONOS.ceremonia;
  return (
    <lord-icon
      src={src}
      trigger="loop"
      delay="2000"
      colors={colors}
      style={{ width: "80px", height: "80px" }}
    ></lord-icon>
  );
}

function Corazon() {
  return (
    <div className="circle__timeline">
      <ion-icon name="heart"></ion-icon>
    </div>
  );
}

/** Línea del tiempo: los momentos alternan ícono/texto a cada lado. */
export default function Itinerario({ itinerario }) {
  const items = itinerario?.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="desfase-one active2">
      <section className="dinamicItinerario__section" id="itinerario">
        <div className="title-micancion sr-left">
          <div
            className="stitle "
            style={{ "--w": "200px", "--ar": "760 / 164", "--s": 16.95, "--sy": 9.93 }}
            role="heading"
            aria-level={2}
          >
            <span className="stitle__serif">Itinerario</span>
          </div>
        </div>
        <div className="dinamicItinerario__section-container">
          {items.map((item, i) => {
            const texto = (clase) => (
              <p className={`${clase} sr-bottom`}>
                <span>{item.titulo}</span>
                <br />
                {item.hora} hrs
              </p>
            );
            const par = i % 2 === 0;
            return (
              <Fragment key={i}>
                <div className="icons__timeline sr-bottom">
                  {par ? <Icono icono={item.icono} /> : texto("info2")}
                </div>
                {i === 0 && (
                  <div className="timeline__line">
                    <div className="timeline__line__inner"></div>
                  </div>
                )}
                <div className="timeline__horario">
                  <Corazon />
                  {par ? texto("info") : <Icono icono={item.icono} />}
                </div>
              </Fragment>
            );
          })}
        </div>
      </section>
    </section>
  );
}

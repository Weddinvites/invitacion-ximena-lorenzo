import { Fragment } from "react";
import { BotonEnlace } from "./Ubicaciones";
import TextoRico from "./TextoRico";

const LOGOS = {
  liverpool: { src: "/assets/images/liverpool-es-parte-de-mi-vida-seeklogo.svg", width: "220px", className: "liverpoolImg", alt: "Liverpool" },
  amazon: { src: "/assets/images/Amazon_logo.svg", width: "195px", className: "searsImg", alt: "Amazon" },
};

function Mesa({ mesa, ultima }) {
  const logo = LOGOS[mesa.tienda];
  return (
    <>
      {logo ? (
        <img src={logo.src} width={logo.width} className={`${logo.className} sr-bottom`} alt={logo.alt} />
      ) : (
        mesa.nombre && <p className="textF sr-bottom">{mesa.nombre}</p>
      )}
      {mesa.numero && <p className="text3 sr-bottom">Mesa: {mesa.numero}</p>}
      <BotonEnlace href={mesa.url} style={ultima ? { marginBottom: "2rem" } : undefined}>
        Ver mesa
      </BotonEnlace>
    </>
  );
}

/** Sugerencias de regalos + código de vestimenta (comparten sección en esta invitación). */
export default function RegalosVestimenta({ regalos, vestimenta }) {
  const mesas = regalos?.mesas ?? [];
  const hayRegalos = Boolean(regalos) && (mesas.length > 0 || regalos.texto);
  const hayVestimenta = Boolean(vestimenta?.codigo);
  if (!hayRegalos && !hayVestimenta) return null;

  return (
    <section className="gift__section paperWhite" id="gifts">
      <div className="gift__section-container">
        {hayRegalos && (
          <>
            <div className="title-micancion sr-left">
              <div
                className="stitle "
                style={{ "--w": "265px", "--ar": "1060 / 340", "--s": 12.26, "--sy": 7.12, "--c": 10.11, "--cy": 21.23, "--mb": "2rem" }}
                role="heading"
                aria-level={2}
              >
                <span className="stitle__serif">Sugerencias</span>
                <span className="stitle__script">De Regalos</span>
              </div>
            </div>
            <TextoRico html={regalos.texto} className="description sr-bottom" />
            {mesas.map((m, i) => (
              <Fragment key={i}>
                <Mesa mesa={m} ultima={i === mesas.length - 1} />
              </Fragment>
            ))}
          </>
        )}

        {hayRegalos && hayVestimenta && (
          <img src="/assets/images/alejandra-carrasco/sep2.svg" width="200px" className="sep2 sr-bottom" alt="" />
        )}

        {hayVestimenta && (
          <>
            <div className="title-micancion sr-left" style={{ paddingTop: hayRegalos ? "2rem" : undefined }}>
              <div
                className="stitle "
                style={{ "--w": "265px", "--ar": "1060 / 336", "--s": 11.4, "--sy": 7.55, "--c": 10.11, "--cy": 19.62, "--mb": "2rem" }}
                role="heading"
                aria-level={2}
              >
                <span className="stitle__serif">Código</span>
                <span className="stitle__script">De Vestimenta</span>
              </div>
            </div>
            <p className="textF sr-bottom">{vestimenta.codigo}</p>
            <TextoRico html={vestimenta.descripcion} className="description sr-bottom" />
            <img src="/assets/images/dresscode.png" width="96px" className="sr-bottom" alt="" />
          </>
        )}
      </div>
    </section>
  );
}

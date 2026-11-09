import { BotonEnlace } from "./Ubicaciones";
import TextoRico from "./TextoRico";

/** Carrusel de hoteles sugeridos (Swiper lo inicializa script.js sobre .mySwiperDedicatoria). */
export default function Hoteles({ hospedaje }) {
  const hoteles = hospedaje?.hoteles ?? [];
  if (hoteles.length === 0) return null;

  return (
    <section className="sugerenciaHotel__section paperWhite" id="hotel">
      <div className="sugerenciaHotel__section-container">
        <div className="title-micancion sr-left">
          <div
            className="stitle "
            style={{ "--w": "245px", "--ar": "1060 / 340", "--s": 12.26, "--sy": 7.12, "--c": 10.76, "--cy": 19.43, "--mb": "2rem" }}
            role="heading"
            aria-level={2}
          >
            <span className="stitle__serif">Sugerencias</span>
            <span className="stitle__script">De Hotel</span>
          </div>
        </div>
        <section className="swiperss-section sr-bottom">
          <div className="swiper mySwiperDedicatoria">
            <div className="swiper-wrapper">
              {hoteles.map((hotel, idx) => (
                <div className="swiper-slide" key={idx}>
                  <div className="containerdelcontainer">
                    <div className="hotel-container">
                      <img src="/assets/images/hotel.png" width="97px" className="hotelImg" alt="" />
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className={`star${n} stars`}>
                          <lord-icon
                            src="https://cdn.lordicon.com/vcuhguff.json"
                            trigger="loop"
                            delay="2000"
                            colors="primary:#B89965,secondary:#B89965"
                            style={{ width: "33px", height: "33px" }}
                          ></lord-icon>
                        </div>
                      ))}
                    </div>
                    <p className="name">{hotel.nombre}</p>
                    {hotel.direccion && <p className="adress">{hotel.direccion}</p>}
                    {/* Los hoteles sin volver a guardar conservan un arreglo de renglones. */}
                    <TextoRico
                      html={Array.isArray(hotel.descripcion) ? hotel.descripcion.join("<br />") : hotel.descripcion}
                      className="adress"
                    />
                    {hotel.telefono && <p className="phone">Tel: {hotel.telefono}</p>}
                    {hotel.url && <BotonEnlace href={hotel.url}>Ver Hotel</BotonEnlace>}
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </section>
      </div>
    </section>
  );
}

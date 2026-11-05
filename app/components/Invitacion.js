"use client";

import Script from "next/script";
import { PaseInvitado, ConfirmacionInvitado } from "./InvitadoSections";

/**
 * Invitación de Ximena & Lorenzo.
 * `guest` / `companion` vienen de boda-restapi (ver app/[slug]/page.js).
 * Sin invitado (ruta "/") se ocultan las secciones de pase y confirmación, igual que en Vale.
 */
export default function Invitacion({ guest = null, companion = null }) {
  return (
    <>
      <div className="loader-section">
        <div className="heart"></div>
        <div className="heart2"></div>
        <div className="heart3"></div>
      </div>

      <div className="card__container" id="cardWaiting">
        <div className="whiteCard"></div>
        <img
          src="/assets/images/Blanco_SobreParte2.png"
          className="imgCardLeft"
          alt="Imagen de la carta del lado izquierdo"
        />
        <img
          src="/assets/images/Blanco_SobreParte1.png"
          className="imgCardRight"
          alt="Imagen de la carta del lado derecho"
        />
        <button className="btn_sello" id="btbSello">
          <span>
            <img src="/assets/images/sello.png" width="120px" alt="" />
          </span>
        </button>
      </div>

      <main>
        <section className="main__section" id="home">
          <div className="transparent-to-black"></div>
          <div className="mainImg mainText sr-bottom">
            <p className="mainText__kicker">Nuestra Boda</p>
            <h1 className="mainText__names">Ximena &amp; Lorenzo</h1>
            <p className="mainText__date">
              <span>15</span>
              <span>05</span>
              <span>27</span>
            </p>
          </div>
          <div className="background-main" id="back-main"></div>
        </section>

        <section className="section__separadorGreene">
          <div className="container boxprx" data-animation="flipInX">
            <p>“El día más importante de nuestras vidas ha llegado”</p>
          </div>
        </section>

        <section className="music__section" id="music">
          <div className="transparent-to-black"></div>
          <div className="music__section-container">
            <div className="audio-container sr-bottom">
              <div
              className="stitle stitle--light nstracancion sr-bottom"
              style={{ "--w": "180px", "--ar": "704 / 324", "--s": 19.03, "--sy": 11.36, "--c": 14.32, "--cy": 26.99 }}
              role="heading"
              aria-level={2}
            >
              <span className="stitle__serif">Nuestra</span>
              <span className="stitle__script">Canción</span>
            </div>
              <p className="titleName sr-bottom">
                “Falling Like The Stars - James Arthur”
              </p>
              <audio id="mi-audio" loop>
                <source
                  src="/assets/audio/JamesArthurFallingLikeTheStars.mp3"
                  type="audio/mpeg"
                />
                Tu navegador no admite la reproducción de audio.
              </audio>
            </div>
          </div>
        </section>

        {guest && <PaseInvitado guest={guest} companion={companion} />}

        <section className="dedicatoria__section paperWhite" id="acompañame">
          <div className="dedicatoria__section-container">
            <p className="textB sr-bottom">
              Con la Bendición de Dios y nuestros Padres
            </p>

            <p className="titleNames mainTitleNames sr-bottom">
              Padres del Novio
            </p>
            <p className="names sr-bottom">Sonia Espinosa Limón</p>
            <p className="names sr-bottom">José Martín Castillo Álvarez</p>
            <img
              src="/assets/images/alejandra-carrasco/sep1.svg"
              width="180px"
              className="separadorGold sr-bottom"
              alt=""
            />
            <p className="titleNames sr-bottom">Padres de la Novia</p>
            <p className="names sr-bottom">Meiwor Martínez Nava</p>
            <p className="names sr-bottom">
              Cruz Mani Huitzil
              <span>
                <img src="/assets/images/cruz.png" width="15px" alt="" />
              </span>
            </p>
            <img
              src="/assets/images/alejandra-carrasco/sep1.svg"
              width="180px"
              className="separadorGold sr-bottom"
              alt=""
            />
          </div>
        </section>

        <section className="timmer__section" id="music">
          <div className="transparent-to-black"></div>
          <div className="timmer__section-container">
            <div
              className="stitle stitle--light titleFaltan sr-bottom"
              style={{ "--ar": "1248 / 320", "--s": 7.4, "--sy": 3.73, "--c": 6.89, "--cy": 17.19 }}
              role="heading"
              aria-level={2}
            >
              <span className="stitle__serif">Sábado 15 de Mayo</span>
              <span className="stitle__script">Solo Faltan</span>
            </div>
            <div className="time-part">
              <div className="square-container sr-bottom" id="contador">
                <div className="circular">
                  <p id="dias"></p>
                  <p className="flash">Días</p>
                </div>
                <div className="circular">
                  <p id="horas"></p>
                  <p className="flash">Horas</p>
                </div>
                <div className="circular">
                  <p id="minutos"></p>
                  <p className="flash">Minutos</p>
                </div>
                <div className="circular">
                  <p id="segundos"></p>
                  <p className="flash">Segundos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              <div className="icons__timeline sr-bottom">
                <lord-icon
                  src="https://cdn.lordicon.com/fshosubk.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#B89965,secondary:#B89965"
                  style={{ width: "80px", height: "80px" }}
                ></lord-icon>
              </div>
              <div className="timeline__line">
                <div className="timeline__line__inner"></div>
              </div>
              <div className="timeline__horario">
                <div className="circle__timeline">
                  <ion-icon name="heart"></ion-icon>
                </div>
                <p className="info sr-bottom">
                  <span>Ceremonia Religiosa</span>
                  <br />
                  18:00 hrs
                </p>
              </div>

              <div className="icons__timeline sr-bottom">
                <p className="info2 sr-bottom">
                  <span>Recepción</span>
                  <br />
                  19:00 hrs
                </p>
              </div>
              <div className="timeline__horario">
                <div className="circle__timeline">
                  <ion-icon name="heart"></ion-icon>
                </div>
                <lord-icon
                  src="https://cdn.lordicon.com/rrbmabsx.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#B89965,secondary:#B89965"
                  style={{ width: "80px", height: "80px" }}
                ></lord-icon>
              </div>

              <div className="icons__timeline sr-bottom">
                <lord-icon
                  src="https://cdn.lordicon.com/nvsfzbop.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#B89965,secondary:#B89965"
                  style={{ width: "80px", height: "80px" }}
                ></lord-icon>
              </div>
              <div className="timeline__horario">
                <div className="circle__timeline">
                  <ion-icon name="heart"></ion-icon>
                </div>
                <p className="info sr-bottom">
                  <span>Entrada de los Novios</span>
                  <br />
                  20:00 hrs
                </p>
              </div>

              <div className="icons__timeline sr-bottom">
                <p className="info2 sr-bottom">
                  <span>Cena</span>
                  <br />
                  20:15 hrs
                </p>
              </div>
              <div className="timeline__horario">
                <div className="circle__timeline">
                  <ion-icon name="heart"></ion-icon>
                </div>
                <lord-icon
                  src="https://cdn.lordicon.com/hihfsmas.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#B89965,secondary:#B89965"
                  style={{ width: "80px", height: "80px" }}
                ></lord-icon>
              </div>

              <div className="icons__timeline sr-bottom">
                <lord-icon
                  src="https://cdn.lordicon.com/dedkryhs.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#B89965"
                  style={{ width: "80px", height: "80px" }}
                ></lord-icon>
              </div>
              <div className="timeline__horario">
                <div className="circle__timeline">
                  <ion-icon name="heart"></ion-icon>
                </div>
                <p className="info sr-bottom">
                  <span>Vals</span>
                  <br />
                  21:30 hrs
                </p>
              </div>

              <div className="icons__timeline sr-bottom">
                <p className="info2 sr-bottom">
                  <span>Fin del Evento</span>
                  <br />
                  03:00 hrs
                </p>
              </div>
              <div className="timeline__horario">
                <div className="circle__timeline">
                  <ion-icon name="heart"></ion-icon>
                </div>
                <lord-icon
                  src="https://cdn.lordicon.com/ilhuppkd.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#B89965,secondary:#B89965"
                  style={{ width: "80px", height: "80px" }}
                ></lord-icon>
              </div>
            </div>
          </section>
        </section>

        <section className="section__separadorGreene">
          <div className="container boxprx" data-animation="flipInX">
            <p>“Esperamos verlos y compartir juntos este día especial”</p>
          </div>
        </section>

        <section className="events__section paperWhite" id="ubicacion">
          <div className="events__section-container" style={{ height: "60rem" }}>
            <p className="title-event bounceInpx">Ceremonia Religiosa</p>
            <img
              src="/assets/images/isabel-samuel/iglesia.jpeg"
              width="260px"
              className="imgIglesia boxprx"
              data-animation="zoomIn"
              alt="Imagen de la iglesia"
            />
            <p className="name-event bounceInpx">
              Catedral Metropolitana de San Luis Potosí
            </p>
            <p className="adress bounceInpx">
              José María Morelos y Pavón 620, Centro Historico, 78000 San
              Luis Potosí, S.L.P.
            </p>
            <p className="hour bounceInpx">18:00 hrs</p>
            <div className="btn__map btnPulses">
              <a
                className="ancla-btns"
                href="https://maps.app.goo.gl/TpzCmASMu8ArUxG16"
                target="_blank"
                rel="noreferrer"
              >
                <div className="textMap">
                  <div className="mapText">
                    <p>Ver mapa</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="events__section paperWhite" id="ubicacion">
          <div className="events__section-container">
            <p className="title-event bounceInpx">Recepción</p>
            <img
              src="/assets/images/isabel-samuel/recepcion.png"
              width="260px"
              className="imgIglesia boxprx"
              data-animation="zoomIn"
              alt="Imagen de la iglesia"
            />
            <p className="name-event bounceInpx">Casa Galera</p>
            <p className="adress bounceInpx">
              Blvrd Río Santiago, El Morro, 78430 Soledad de Graciano
              Sánchez, S.L.P.
            </p>
            <p className="hour bounceInpx">19:00 hrs</p>
            <div className="btn__map btnPulses">
              <a
                className="ancla-btns"
                href="https://maps.app.goo.gl/4mpZZd8GE7FW7cx36"
                target="_blank"
                rel="noreferrer"
              >
                <div className="textMap">
                  <div className="mapText">
                    <p>Ver mapa</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="comparteredes__section" id="">
          <div className="comparteredes__section-container">
            <div className="comparteTitle sr-bottom">
              <div
              className="stitle stitle--light comparte sr-bottom"
              style={{ "--w": "200px", "--ar": "800 / 324", "--s": 16.1, "--sy": 10.25, "--c": 14.75, "--cy": 24.12 }}
              role="heading"
              aria-level={2}
            >
              <span className="stitle__serif">Comparte</span>
              <span className="stitle__script">En redes</span>
            </div>
            </div>
            <div className="black-bg boxprx" data-animation="zoomIn">
              <lord-icon
                src="https://cdn.lordicon.com/wsaaegar.json"
                trigger="loop"
                delay="2000"
                colors="primary:#ffffff,secondary:#ffffff"
                style={{ width: "105px", height: "105px" }}
              ></lord-icon>
              <p translate="no">#XimenaYLorenzo</p>
            </div>
          </div>
        </section>

        <section className="gift__section paperWhite" id="gifts">
          <div className="gift__section-container">
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
            <p className="description sr-bottom">
              Tu presencia es el mayor regalo que podemos recibir, pero si
              deseas darnos un obsequio, cualquier detalle será apreciado
              con todo nuestro corazón.
            </p>
            <img
              src="/assets/images/liverpool-es-parte-de-mi-vida-seeklogo.svg"
              width="220px"
              className="liverpoolImg sr-bottom"
              alt=""
            />
            <p className="text3 sr-bottom">Mesa: 51690392</p>
            <div className="btn__map btnPulses">
              <a
                className="ancla-btns"
                href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51690392"
                target="_blank"
                rel="noreferrer"
              >
                <div className="textMap">
                  <div className="mapText">
                    <p>Ver mesa</p>
                  </div>
                </div>
              </a>
            </div>

            <img
              src="/assets/images/Amazon_logo.svg"
              width="195px"
              className="searsImg sr-bottom"
              alt=""
            />

            <div className="btn__map btnPulses" style={{ marginBottom: "2rem" }}>
              <a
                className="ancla-btns"
                href="https://www.amazon.com.mx/wedding/registry/2EN44W3H8WKM5"
                target="_blank"
                rel="noreferrer"
              >
                <div className="textMap">
                  <div className="mapText">
                    <p>Ver mesa</p>
                  </div>
                </div>
              </a>
            </div>
            <img
              src="/assets/images/alejandra-carrasco/sep2.svg"
              width="200px"
              className="sep2 sr-bottom"
              alt=""
            />
            <div className="title-micancion sr-left" style={{ paddingTop: "2rem" }}>
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
            <p className="textF sr-bottom">Formal</p>
            <img
              src="/assets/images/dresscode.png"
              width="96px"
              className="sr-bottom"
              alt=""
            />
          </div>
        </section>

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
                  {[
                    {
                      name: "Hotel Real Plaza",
                      adress: [
                        "Av. Venustiano Carranza 890, Centro Histórico.",
                      ],
                      adress2: [
                        "Cómodo, céntrico y elegante.",
                        "A 5 minutos caminando de la Catedral.",
                      ],
                      phone: "Tel: (444) 814 6969",
                      url: "https://www.realplaza.com.mx/",
                    },
                    {
                      name: "City Centro San Luis Potosí by Marriott",
                      adress: ["Ignacio Aldama 405, Centro Histórico"],
                      adress2: [
                        "Diseño moderno en un edificio histórico.",
                        "A 2 cuadras de la Catedral.",
                      ],
                      phone: "Tel: (444) 804 2280",
                      url: "https://www.marriott.com/",
                    },
                    {
                      name: "Hotel Panorama",
                      adress: [
                        "Av. Venustiano Carranza 315, Centro Histórico",
                      ],
                      adress2: [
                        "Excelente ubicación y servicio.",
                        "A 3 minutos de la Catedral.",
                      ],
                      phone: "Tel: (444) 812 1777",
                      url: "https://www.hotelpanorama.com.mx/",
                    },
                    {
                      name: "Gran Hotel Concordia",
                      adress: ["Morelos 705, Centro Histórico"],
                      adress2: [
                        "Ideal para una estancia tranquila cerca de todo.",
                      ],
                      phone: "Tel: (444) 274 0870",
                      url: "https://www.granhotelconcordia.com.mx/",
                    },
                  ].map((hotel, idx) => (
                    <div className="swiper-slide" key={idx}>
                      <div className="containerdelcontainer">
                        <div className="hotel-container">
                          <img
                            src="/assets/images/hotel.png"
                            width="97px"
                            className="hotelImg"
                            alt=""
                          />
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
                        <p className="name">{hotel.name}</p>
                        {hotel.adress.map((line, i) => (
                          <p className="adress" key={`a1-${i}`}>
                            {line}
                          </p>
                        ))}
                        <p className="adress">
                          {hotel.adress2.map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < hotel.adress2.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                        <p className="phone">{hotel.phone}</p>
                        <div className="btn__map btnPulses">
                          <a
                            className="ancla-btns"
                            href={hotel.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className="textMap">
                              <div className="mapText">
                                <p>Ver Hotel</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </section>
          </div>
        </section>

        <section className="collage__section">
          <div className="collage__section-container">
            <div className="sr-just">
              <div
                className="stitle stitle--navy stitle--cormorant img1"
                style={{ "--ar": "424 / 344", "--s": 48.1, "--sy": 22, "--c": 33.7, "--cy": 76 }}
                role="img"
                aria-label="15 de mayo"
              >
                <span className="stitle__serif">15</span>
                <span className="stitle__serif stitle__serif2">Mayo</span>
              </div>
            </div>
            <div className="img2 sr-just"></div>
            <div className="img3 sr-just"></div>
            <div className="img4 sr-just"></div>
            <div className="sr-just">
              <div
                className="stitle stitle--navy img5"
                style={{ "--ar": "484 / 184", "--s": 15.7, "--sy": 9.1, "--c": 14.7, "--cy": 26.4 }}
                role="img"
                aria-label="The Wedding"
              >
                <span className="stitle__serif">The</span>
                <span className="stitle__script">Wedding</span>
              </div>
            </div>
            <div className="img6 sr-just"></div>
            <div className="img7 sr-just"></div>
            <div className="img8 sr-just"></div>
            <div className="sr-just">
              <div
                className="stitle stitle--navy stitle--cormorant img9"
                style={{ "--ar": "244 / 407", "--s": 117, "--sy": 25.4, "--c": 120, "--cy": 118.9 }}
                role="img"
                aria-label="2027"
              >
                <span className="stitle__serif">20</span>
                <span className="stitle__serif stitle__serif2">27</span>
              </div>
            </div>
          </div>
        </section>

        {guest && <ConfirmacionInvitado guest={guest} companion={companion} />}
      </main>

      <footer>
        <section className="footer__section"></section>
      </footer>

      <a href="#home" className="scrollup" id="scroll-up" aria-label="Volver arriba">
        <ion-icon name="arrow-up-outline"></ion-icon>
      </a>
      <div
        className="sendwhatsapp show-whats"
        id="send-whatsapp"
        aria-label="Reproducir música"
      >
        <div className="audio__container">
          <audio id="mi-audio">
            <source
              src="/assets/audio/JamesArthurFallingLikeTheStars.mp3"
              type="audio/mpeg"
            />
            Tu navegador no admite la reproducción de audio.
          </audio>
          <button id="play-button">
            <ion-icon name="play"></ion-icon>
          </button>
        </div>
      </div>

      {/* Third-party libraries, loaded in dependency order so every global
          (ScrollReveal, Swiper, gsap, ScrollTrigger, lord-icon) exists
          before our own script.js runs last. */}
      <Script src="https://unpkg.com/scrollreveal" strategy="afterInteractive" />
      <Script src="/assets/js/Gmap.js" type="module" strategy="afterInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"
        strategy="afterInteractive"
      />
      <Script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        strategy="afterInteractive"
      />
      <Script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        strategy="afterInteractive"
      />
      <Script src="https://cdn.jsdelivr.net/npm/toastify-js" strategy="afterInteractive" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="afterInteractive"
      />
      <Script src="https://cdn.lordicon.com/lordicon-1.1.0.js" strategy="afterInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.12.0/tsparticles.confetti.bundle.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/js/script.js" strategy="afterInteractive" />
    </>
  );
}

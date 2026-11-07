"use client";

import Script from "next/script";
import { PaseInvitado, ConfirmacionInvitado } from "./InvitadoSections";
import Padres from "./secciones/Padres";
import Itinerario from "./secciones/Itinerario";
import Ubicaciones from "./secciones/Ubicaciones";
import RegalosVestimenta from "./secciones/RegalosVestimenta";
import Hoteles from "./secciones/Hoteles";
import { partesFecha } from "../lib/fecha";

/**
 * Invitación de Ximena & Lorenzo.
 * `ficha` viene de boda-restapi (GET /eventos/:id/ficha): solo trae las secciones visibles
 * (y lo VIP solo si el invitado es VIP), así que cada sección se muestra solo si viene.
 * `guest` viene de boda-restapi (ver app/[slug]/page.js).
 * Sin invitado (ruta "/") se ocultan las secciones de pase y confirmación, igual que en Vale.
 */
export default function Invitacion({ ficha, guest = null }) {
  const { evento = {}, secciones = {} } = ficha ?? {};
  const { novios, padres, itinerario, ubicaciones, regalos, vestimenta, hospedaje } = secciones;
  const fecha = partesFecha(evento.fecha_evento, evento.zona_horaria);
  const titulo = novios?.titulo ?? evento.titulo ?? "";
  const hashtag = novios ? `#${novios.novia.nombre}Y${novios.novio.nombre}`.replace(/\s+/g, "") : null;

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
            <h1 className="mainText__names">{titulo}</h1>
            {fecha && (
              <p className="mainText__date">
                <span>{fecha.dia}</span>
                <span>{fecha.mes}</span>
                <span>{fecha.anioCorto}</span>
              </p>
            )}
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

        {guest && <PaseInvitado guest={guest} />}

        <Padres padres={padres} />

        {fecha && (
        <section className="timmer__section" id="music">
          <div className="transparent-to-black"></div>
          <div className="timmer__section-container">
            <div
              className="stitle stitle--light titleFaltan sr-bottom"
              style={{ "--ar": "1248 / 320", "--s": 7.4, "--sy": 3.73, "--c": 6.89, "--cy": 17.19 }}
              role="heading"
              aria-level={2}
            >
              <span className="stitle__serif">{fecha.diaSemana} {fecha.dia.replace(/^0/, "")} de {fecha.mesNombre}</span>
              <span className="stitle__script">Solo Faltan</span>
            </div>
            <div className="time-part">
              <div className="square-container sr-bottom" id="contador" data-fecha={evento.fecha_evento}>
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
        )}

        <Itinerario itinerario={itinerario} />

        <section className="section__separadorGreene">
          <div className="container boxprx" data-animation="flipInX">
            <p>“Esperamos verlos y compartir juntos este día especial”</p>
          </div>
        </section>

        <Ubicaciones ubicaciones={ubicaciones} />

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
              <p translate="no">{hashtag}</p>
            </div>
          </div>
        </section>

        <RegalosVestimenta regalos={regalos} vestimenta={vestimenta} />

        <Hoteles hospedaje={hospedaje} />

        <section className="collage__section">
          <div className="collage__section-container">
            <div className="sr-just">
              <div
                className="stitle stitle--navy stitle--cormorant img1"
                style={{ "--ar": "424 / 344", "--s": 48.1, "--sy": 22, "--c": 33.7, "--cy": 76 }}
                role="img"
                aria-label={fecha ? `${fecha.dia} de ${fecha.mesNombre.toLowerCase()}` : undefined}
              >
                <span className="stitle__serif">{fecha?.dia}</span>
                <span className="stitle__serif stitle__serif2">{fecha?.mesNombre}</span>
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
                aria-label={fecha?.anio}
              >
                <span className="stitle__serif">{fecha?.anio.slice(0, 2)}</span>
                <span className="stitle__serif stitle__serif2">{fecha?.anio.slice(2)}</span>
              </div>
            </div>
          </div>
        </section>

        {guest && <ConfirmacionInvitado guest={guest} />}
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

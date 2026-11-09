
/* const menuToggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');

menuToggle.onclick = function() {
    if(window.innerWidth > 0) {
        menuToggle.classList.toggle('active');
        navigation.classList.toggle('active');
    }
}

const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
    if(window.innerWidth > 0) {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
    }
}
navLink.forEach((item) => item.addEventListener("click", linkAction)); */


gsap.registerPlugin(ScrollTrigger);

/*   const audio = document.getElementById('mi-audio');
  const playButton = document.getElementById('play-button');
  const homeSection = document.getElementById('home');

  ScrollTrigger.create({
    trigger: homeSection,
    start: 'top top',
    end: 'bottom top',
    onEnter: () => {
        playMusicTimer = setTimeout(() => {
            audio.play();
          }, 500);
    },
  }); */

/* gsap.to("#back-main",{
    scrollTrigger:{
        scrub:1
    },
    scale:1.5
}) */


/*================== Swiper dedicatoria =======================*/

var swiper2 = new Swiper(".mySwiperDedicatoria", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});



  /* Audio de fondo */
// Obtén una referencia al elemento de audio, al botón y al icono dentro del botón
const audio = document.getElementById('mi-audio');
const playButton = document.getElementById('play-button');
//const icon = playButton.querySelector('ion-icon');
const noAnimation = document.getElementById('send-whatsapp');


// La canción se puede apagar desde el admin: sin ella no hay audio ni botón.
if (audio && playButton && noAnimation) {
audio.addEventListener('play', function() {
    /* playButton.innerHTML = '<ion-icon name="pause"></ion-icon>'; // Cambia el ícono a pausa cuando se reproduce */
    playButton.innerHTML = '<img src="./assets/images/musica-on-4.gif" alt="">';
    noAnimation.classList.add('no-animation');
});

audio.addEventListener('pause', function() {
    playButton.innerHTML = '<ion-icon name="play"></ion-icon>'; // Cambia el ícono a reproducir cuando se pausa
    /* playButton.innerHTML = '<img src="./assets/images/musica-on-4.gif" alt="">'; */
    noAnimation.classList.remove('no-animation');
});

playButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
audio.addEventListener('volumechange', function() {
    if (audio.volume > 0 && audio.paused) {
        audio.play();
    }
});
}

/* CountDown */
function formatearNumero(numero) {
    return numero < 10 ? '0' + numero : numero.toString();
}

// La fecha viene de la ficha del evento (BD): data-fecha="2027-05-15T18:00:00-06:00" en #contador.
// Al llevar el desfase de la zona del evento, la cuenta es correcta desde cualquier zona horaria.
const contador = document.getElementById("contador");
const fechaFutura = contador?.dataset.fecha ? new Date(contador.dataset.fecha) : null;
const intervalo = fechaFutura ? setInterval(actualizarContador, 1000) : null;

function actualizarContador() {
    if (!fechaFutura) return;
    const fechaActual = new Date();
    const diferencia = Math.floor((fechaFutura - fechaActual) / 1000);
    if (diferencia <= 0) {
        clearInterval(intervalo);
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";
    } else {
        const dias = Math.floor(diferencia / (60 * 60 * 24));
        const horas = Math.floor((diferencia % (60 * 60 * 24)) / (60 * 60));
        const minutos = Math.floor((diferencia % (60 * 60)) / 60);
        const segundos = diferencia % 60;

        document.getElementById("dias").textContent = formatearNumero(dias);
        document.getElementById("horas").textContent = formatearNumero(horas);
        document.getElementById("minutos").textContent = formatearNumero(minutos);
        document.getElementById("segundos").textContent = formatearNumero(segundos);
    }
}
actualizarContador();

/* ================== Swiper Normal ====================== */
/* Swipper */
const swiper = new Swiper('.swiperNormal', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    /* spaceBetween: 30, */
    /* effect: "fade", */
    centeredSlides: true,
    autoplay: {
        delay: 6500,
        disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
    },
});

/* SCROLL UP */
function scrollUp(){
    const scrollUp = document.getElementById("scroll-up");
    if(this.scrollY>=70) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp)

/* //BOTON WHATSAPP
function sendWhats(){
    const showWhats = document.getElementById("send-whatsapp");
    if(this.scrollY>=70) showWhats.classList.add("show-whats");
    else showWhats.classList.remove("show-whats");
  }
  window.addEventListener("scroll", sendWhats) */

  
/* Scroll Reveal */
ScrollReveal().reveal('.sr-bottom', { distance: '50px', origin: 'bottom', duration: 2000})
ScrollReveal().reveal('.sr-top', { distance: '50px', origin: 'top', duration: 2000})
ScrollReveal().reveal('.sr-left', { distance: '50px', origin: 'left', duration: 2000})
/* ScrollReveal().reveal('.sr-right', { distance: '50px', origin: 'right', duration: 2000}) */
ScrollReveal().reveal('.widget', { interval: 350 });
ScrollReveal().reveal('.widget-wait', { interval: 450 });
ScrollReveal().reveal('.widget-itinerario', { interval: 450 });
ScrollReveal().reveal('.widget-mesaRegalo', { interval: 450 });
ScrollReveal().reveal('.sr-just', { interval: 350})

document.addEventListener("DOMContentLoaded", () => {
    const bounceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('bounceInUp');
            observer.unobserve(entry.target);
        }
        });
    }, { threshold: 0.1 });

const pulseObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('elementor-animation-pulse');
            observer.unobserve(entry.target);
        }
        });
    }, { threshold: 0.1 });

const bounceElements = document.querySelectorAll('.who, .dateBounceIn, .bounceInpx');
bounceElements.forEach(el => {
    el.classList.add('hidden');
    bounceObserver.observe(el);
});

const pulseButtons = document.querySelectorAll('.btnPulses');
    pulseButtons.forEach(btn => {
        pulseObserver.observe(btn);
    });
});


const btnSello = document.querySelector('.btn_sello');
btnSello.addEventListener('click', function() {
    const whiteCard = document.querySelector('.whiteCard');
    const imgCardLeft = document.querySelector('.imgCardLeft');
    const imgCardRight = document.querySelector('.imgCardRight');
    const cardContainer = document.querySelector('.card__container');
    whiteCard.classList.add('fadingOut');
    imgCardLeft.style.transform = 'translateX(-100%)';
    imgCardRight.style.transform = 'translateX(100%)';
    btnSello.remove();
    setTimeout(()=> {
        whiteCard.remove();
    }, 1500);
    setTimeout(()=> {
        cardContainer.remove();
        audio?.play();
    }, 2500);

    setTimeout(()=> {
        enableScroll();
        confetti({
            ...defaults,
            particleCount: 50,
            scalar: 2,
            });
            
            confetti({
            ...defaults,
            particleCount: 25,
            scalar: 3,
            });
            
            confetti({
            ...defaults,
            particleCount: 10,
            scalar: 4,
            });
    }, 200);
    setTimeout(()=> {
        const animation_ltl = document.getElementById('lefttoleft');
        const animation_mainDate = document.getElementById('main-date');
        /* animation_ltl.classList.add('fadeInTopLeft'); */
        /* animation_mainDate.classList.add('fadeInUp'); */
    }, 200);
});

function enableScroll() {
    /* document.body.style.overflow = ''; */
    document.body.style.overflow = 'visible';

}

const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["CCD5AE", "E0E5B6", "E0E5B6", "FEFAE0"],
};

/* document.addEventListener("DOMContentLoaded", () => {
    const lineElement = document.querySelector('.timeline__line');
    const lineInnerElement = document.querySelector('.timeline__line__inner');
    const timelineHorarioElements = document.querySelectorAll('.timeline__horario');

    const updateHeightOnScroll = () => {
        const windowHeight = window.innerHeight;
        const lineRect = lineElement.getBoundingClientRect();
        const lineTopPosition = lineRect.top + window.pageYOffset;
        const startFillingPoint = lineTopPosition - windowHeight / 2;
        let heightToSet = Math.max(window.pageYOffset - startFillingPoint, 0); // Asegúrate de que esta variable esté definida en este ámbito

        heightToSet = Math.min(heightToSet, lineElement.offsetHeight);
        lineInnerElement.style.height = `${heightToSet}px`;

        timelineHorarioElements.forEach(element => {
            const circle = element.querySelector('.circle__timeline');
            const circleRect = circle.getBoundingClientRect();
            const circleTopPosition = circleRect.top + window.pageYOffset;
            const circleCenterToDocumentTop = circleTopPosition + circle.offsetHeight / 2;

            if (lineTopPosition + heightToSet >= circleCenterToDocumentTop) {
                circle.classList.add('refill');
            } else {
                circle.classList.remove('refill');
            }
        });
    };

    window.addEventListener('scroll', updateHeightOnScroll);
}); */

/* document.addEventListener("DOMContentLoaded", () => {
    const lineElement = document.querySelector('.timeline__line');
    const lineInnerElement = document.querySelector('.timeline__line__inner');
    const timelineHorarioElements = document.querySelectorAll('.timeline__horario');

    let ticking = false; // Para optimizar el rendimiento con requestAnimationFrame

    const updateHeightOnScroll = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                const windowHeight = window.innerHeight;
                const lineRect = lineElement.getBoundingClientRect();
                const lineTopPosition = lineRect.top + window.scrollY;
                const startFillingPoint = lineTopPosition - windowHeight / 2;
                let heightToSet = Math.max(window.scrollY - startFillingPoint, 0);

                heightToSet = Math.min(heightToSet, lineElement.offsetHeight);
                console.log(heightToSet)
                lineInnerElement.style.height = `${heightToSet}px`;

                timelineHorarioElements.forEach(element => {
                    const circle = element.querySelector('.circle__timeline');
                    const circleTopPosition = circle.getBoundingClientRect().top + window.scrollY;
                    const circleCenterToDocumentTop = circleTopPosition + circle.offsetHeight / 2;

                    if (lineTopPosition + heightToSet >= circleCenterToDocumentTop) {
                        circle.classList.add('refill');
                    } else {
                        circle.classList.remove('refill');
                    }
                });

                ticking = false;
            });
        }
    };

    window.addEventListener('scroll', updateHeightOnScroll);
}); */

/* document.addEventListener("DOMContentLoaded", () => {
    // Cache de elementos para mejor rendimiento
    const lineElement = document.querySelector('.timeline__line');
    const lineInnerElement = document.querySelector('.timeline__line__inner');
    const timelineHorarioElements = Array.from(document.querySelectorAll('.timeline__horario'));

    const getOffsetTop = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + window.pageYOffset;
    };

    const updateTimeline = () => {
        // Evitamos múltiples cálculos independientes usando variables claras
        const windowHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;
        const lineTopPosition = getOffsetTop(lineElement);
        const startFillingPoint = lineTopPosition - (windowHeight / 2);

        // Calculamos la altura válida del llenado, limitando valores negativos o mayores al tamaño máximo.
        const heightToSet = Math.min(
            Math.max(scrollPosition - startFillingPoint, 0),
            lineElement.offsetHeight
        );
        
        lineInnerElement.style.height = `${heightToSet}px`;

        timelineHorarioElements.forEach(horario => {
            const circle = horario.querySelector('.circle__timeline');
            const circleCenter = getOffsetTop(circle) + circle.offsetHeight / 2;
            circle.classList.toggle('refill', (lineTopPosition + heightToSet) >= circleCenter);
        });
    };

    // Gestiona el rendimiento del evento scroll
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateTimeline();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    //Actualizar timeline al cargar la página
    updateTimeline();
}); */

document.addEventListener("DOMContentLoaded", () => {
    const lineElement = document.querySelector('.timeline__line');
    const lineInnerElement = document.querySelector('.timeline__line__inner');
    const timelineHorarioElements = Array.from(document.querySelectorAll('.timeline__horario'));

    if (!lineElement || !lineInnerElement) return; // Itinerario apagado o sin momentos

    const getOffsetTop = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + window.pageYOffset;
    };

    const updateTimeline = () => {
        const windowHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;
        const lineTopPosition = getOffsetTop(lineElement);
        const startFillingPoint = lineTopPosition - windowHeight / 2;

        const heightToSet = Math.min(
            Math.max(scrollPosition - startFillingPoint, 0),
            lineElement.offsetHeight
        );

        lineInnerElement.style.height = `${heightToSet}px`;

        timelineHorarioElements.forEach(horario => {
            const circle = horario.querySelector('.circle__timeline');
            const circleCenter = getOffsetTop(circle) + circle.offsetHeight / 2;
            circle.classList.toggle('refill', lineTopPosition + heightToSet >= circleCenter);
        });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateTimeline();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Inicia la línea al cargar.
    updateTimeline();
});


// Pases y confirmación: ahora vienen de boda-restapi (ver app/components/InvitadoSections.js).
// Se eliminó la integración con Google Apps Script y el formulario de WhatsApp.

function pageLoaded() {
    let loaderSection = document.querySelector('.loader-section');
    loaderSection.classList.add('loaded');
}

// Quita el loader al cargar (antes lo hacía getPaseData).
window.addEventListener("load", pageLoaded);
if (document.readyState === "complete") pageLoaded();
/* window.onload = pageLoaded(); */
// Ejemplo de uso: obtener datos para un "Pase"



/* Profffff =========================== */
const boxes = document.querySelectorAll('.boxprx')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 1;

    boxes.forEach(box => {
        /* const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add('fadeInUp')
        } else {
            box.classList.remove('fadeInUp')
        } */
        const boxTop = box.getBoundingClientRect().top
        const boxBottom = box.getBoundingClientRect().bottom

       /*  if (boxTop < triggerBottom && boxBottom > 0) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        } */
        if (boxTop < triggerBottom && boxBottom > 0) {
            const animationName = box.getAttribute('data-animation');
            box.style.animation = `${animationName} 1.5s ease forwards`;
            box.classList.add('show');
        }
        else {
            // Resetear animación cuando el elemento sale de la vista
            box.style.animation = 'none';
            box.offsetHeight; // Forzar un reflow para que la animación pueda reiniciarse
            box.classList.remove('show')
        }
    })
}
document.addEventListener("scroll", function () {
    const parallax = document.querySelector(".background-main");
    if (!parallax) return; // Portada apagada
    const scrollPosition = window.scrollY;

    // Aplica el movimiento parallax al fondo con transform
    parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});


/* const section = document.querySelector(".pasesBoda__section");

if (section) {
    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            console.log("Nueva altura:", entry.contentRect.height + "px");
        }
    });

    observer.observe(section);
} */

const sectionPase = document.querySelector(".pasesBoda__section");

if (sectionPase) {
    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            const sectionHeight = entry.contentRect.height;
            const newMinHeight = sectionHeight + 20; // Sumar 40px a la altura

            // Establecer el min-height de la clase .active
            const activeSection = document.querySelector(".active");
            if (activeSection) {
                activeSection.style.minHeight = `${newMinHeight}px`;
            }

            //console.log("Nueva altura:", sectionHeight + "px");
        }
    });

    observer.observe(sectionPase);
} else {
    console.log("No se encontró el elemento.");
}

/* const sectionDinamic = document.querySelector(".dinamicItinerario__section");

if (sectionDinamic) {
    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            const sectionHeight = entry.contentRect.height;
            const newMinHeight = sectionHeight + 40; // Sumar 40px a la altura

            // Establecer el min-height de la clase .active
            const activeSection = document.querySelector(".active2");
            if (activeSection) {
                activeSection.style.minHeight = `${newMinHeight}px`;
            }

            //console.log("Nueva altura Dinamico:", sectionHeight + "px");
        }
    });

    observer.observe(sectionDinamic);
} else {
    console.log("No se encontró el elemento.");
} */
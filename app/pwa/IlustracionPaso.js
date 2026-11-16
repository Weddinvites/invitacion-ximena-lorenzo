/*
 * Ilustraciones (SVG) de los pasos para instalar la app. Son dibujos simplificados del teléfono,
 * no capturas: se ven nítidos, pesan poco y toman los colores que se les pasen.
 * Pasos: ios-compartir | ios-agregar | ios-confirmar | android-menu | android-instalar | inicio
 */

import { useId } from "react";

const COLORES = {
  marco: "#1D344B",
  pantalla: "#FFFFFF",
  tenue: "#E6E2DE",
  texto: "#5C7083",
  acento: "#B89965",
};

const TIPO = "-apple-system, 'Segoe UI', Roboto, sans-serif";

/** Contenido "de página" genérico (líneas grises) para el fondo de la pantalla. */
function Pagina({ c, y = 30, alto = 120 }) {
  const filas = [];
  for (let i = 0; y + 14 + i * 14 < y + alto; i++) {
    filas.push(<rect key={i} x="28" y={y + 14 + i * 14} width={i % 3 === 2 ? 60 : 104} height="6" rx="3" style={{ fill: c.tenue }} />);
  }
  return (
    <>
      <rect x="28" y={y} width="70" height="8" rx="4" style={{ fill: c.tenue }} />
      {filas}
    </>
  );
}

/** Círculo que marca dónde tocar. */
function Toque({ c, x, y, r = 11 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 5} style={{ fill: c.acento, opacity: 0.18 }} />
      <circle cx={x} cy={y} r={r} style={{ fill: "none", stroke: c.acento, strokeWidth: 2.2 }} />
    </g>
  );
}

const IconoCompartir = ({ x, y, color }) => (
  <path
    d={`M${x} ${y - 7}v9M${x - 3.5} ${y - 3.5}L${x} ${y - 7}l3.5 3.5M${x - 5} ${y - 1}v7h10v-7`}
    style={{ fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }}
  />
);

export default function IlustracionPaso({ paso, icono, nombre = "App", direccion = "invitacion…", colores = {} }) {
  const c = { ...COLORES, ...colores };
  const id = "il" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const clip = (n) => `url(#${id}-${n})`;
  const t = (props) => ({ fontFamily: TIPO, ...props });

  let contenido;
  switch (paso) {
    case "ios-compartir":
      contenido = (
        <>
          <Pagina c={c} y={34} alto={140} />
          {/* barra inferior de Safari */}
          <rect x="16" y="190" width="128" height="34" style={{ fill: c.tenue, opacity: 0.6 }} />
          <rect x="26" y="168" width="108" height="16" rx="8" style={{ fill: c.pantalla, stroke: c.tenue }} />
          <text x="80" y="179" textAnchor="middle" style={t({ fontSize: 7, fill: c.texto })}>{direccion}</text>
          <path d="M34 206l-5-5 5-5M54 196l5 5-5 5" style={{ fill: "none", stroke: c.texto, strokeWidth: 1.5, strokeLinecap: "round" }} />
          <IconoCompartir x={80} y={204} color={c.marco} />
          <text x="108" y="208" textAnchor="middle" style={t({ fontSize: 11, fill: c.texto })}>···</text>
          <Toque c={c} x={80} y={202} />
        </>
      );
      break;
    case "ios-agregar": {
      const filas = ["Copiar", "Agregar a favoritos", "Agregar a inicio", "Buscar en la página"];
      contenido = (
        <>
          <Pagina c={c} y={34} alto={40} />
          <rect x="16" y="78" width="128" height="160" rx="12" style={{ fill: c.pantalla, stroke: c.tenue }} />
          <rect x="68" y="84" width="24" height="3" rx="1.5" style={{ fill: c.tenue }} />
          {filas.map((f, i) => {
            const y = 98 + i * 26;
            const activa = f === "Agregar a inicio";
            return (
              <g key={f}>
                <rect x="24" y={y} width="112" height="22" rx="6" style={{ fill: activa ? c.acento : c.tenue, opacity: activa ? 0.16 : 0.45 }} />
                <text x="32" y={y + 14} style={t({ fontSize: 8, fill: activa ? c.marco : c.texto, fontWeight: activa ? 700 : 400 })}>{f}</text>
                {activa && (
                  <g style={{ fill: "none", stroke: c.marco, strokeWidth: 1.3 }}>
                    <rect x="117" y={y + 5} width="12" height="12" rx="3" />
                    <path d={`M123 ${y + 8}v6M120 ${y + 11}h6`} />
                  </g>
                )}
              </g>
            );
          })}
          <Toque c={c} x={123} y={161} r={10} />
        </>
      );
      break;
    }
    case "ios-confirmar":
      contenido = (
        <>
          <text x="26" y="40" style={t({ fontSize: 8, fill: c.texto })}>Cancelar</text>
          <Toque c={c} x={119} y={37} r={14} />
          <text x="132" y="40" textAnchor="end" style={t({ fontSize: 8, fill: c.acento, fontWeight: 700 })}>Agregar</text>
          <text x="80" y="62" textAnchor="middle" style={t({ fontSize: 8.5, fill: c.marco, fontWeight: 700 })}>Agregar a inicio</text>
          <rect x="24" y="72" width="112" height="44" rx="8" style={{ fill: c.tenue, opacity: 0.45 }} />
          {icono && <image href={icono} x="32" y="78" width="32" height="32" clipPath={clip("redondo")} />}
          <text x="72" y="94" style={t({ fontSize: 9, fill: c.marco })}>{nombre}</text>
          <rect x="72" y="100" width="52" height="4" rx="2" style={{ fill: c.tenue }} />
        </>
      );
      break;
    case "android-menu":
      contenido = (
        <>
          <rect x="16" y="20" width="128" height="28" style={{ fill: c.tenue, opacity: 0.6 }} />
          <rect x="24" y="27" width="96" height="15" rx="7.5" style={{ fill: c.pantalla }} />
          <text x="34" y="37.5" style={t({ fontSize: 7, fill: c.texto })}>{direccion}</text>
          {[29, 34, 39].map((y) => <circle key={y} cx="132" cy={y} r="1.6" style={{ fill: c.marco }} />)}
          <Toque c={c} x={132} y={34} r={9} />
          <Pagina c={c} y={62} alto={150} />
        </>
      );
      break;
    case "android-instalar": {
      const filas = ["Nueva pestaña", "Historial", "Compartir…", "Instalar app", "Configuración"];
      contenido = (
        <>
          <rect x="16" y="20" width="128" height="28" style={{ fill: c.tenue, opacity: 0.6 }} />
          <Pagina c={c} y={62} alto={150} />
          <rect x="58" y="26" width="82" height="134" rx="8" style={{ fill: c.pantalla, stroke: c.tenue }} />
          {filas.map((f, i) => {
            const y = 34 + i * 24;
            const activa = f === "Instalar app";
            return (
              <g key={f}>
                {activa && <rect x="62" y={y} width="74" height="20" rx="5" style={{ fill: c.acento, opacity: 0.16 }} />}
                <text x="68" y={y + 13} style={t({ fontSize: 7.5, fill: activa ? c.marco : c.texto, fontWeight: activa ? 700 : 400 })}>{f}</text>
              </g>
            );
          })}
          <Toque c={c} x={99} y={116} r={12} />
        </>
      );
      break;
    }
    default: // "inicio": la app ya en la pantalla de inicio
      contenido = (
        <>
          {Array.from({ length: 12 }, (_, i) => {
            const x = 28 + (i % 4) * 28;
            const y = 34 + Math.floor(i / 4) * 34;
            return i === 5 ? null : <rect key={i} x={x} y={y} width="20" height="20" rx="5" style={{ fill: c.tenue }} />;
          })}
          {icono ? (
            <image href={icono} x="56" y="68" width="20" height="20" clipPath={clip("redondo-chico")} />
          ) : (
            <rect x="56" y="68" width="20" height="20" rx="5" style={{ fill: c.acento }} />
          )}
          <text x="66" y="96" textAnchor="middle" style={t({ fontSize: 5.5, fill: c.marco })}>{nombre}</text>
          <Toque c={c} x={66} y={78} r={14} />
        </>
      );
  }

  return (
    <svg viewBox="0 0 160 250" role="img" aria-hidden="true" focusable="false" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <clipPath id={`${id}-redondo`}><rect x="32" y="78" width="32" height="32" rx="8" /></clipPath>
        <clipPath id={`${id}-redondo-chico`}><rect x="56" y="68" width="20" height="20" rx="5" /></clipPath>
        <clipPath id={`${id}-pantalla`}><rect x="16" y="12" width="128" height="226" rx="16" /></clipPath>
      </defs>
      <rect x="10" y="6" width="140" height="238" rx="22" style={{ fill: c.pantalla, stroke: c.marco, strokeWidth: 2 }} />
      <g clipPath={clip("pantalla")}>{contenido}</g>
    </svg>
  );
}

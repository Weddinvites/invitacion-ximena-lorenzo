import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { COLORES, TAMANOS_ICONO, nombresApp } from "../../datos";

// Se regeneran cada hora: si cambian los nombres en la ficha, el ícono los toma.
export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() {
  return TAMANOS_ICONO.map((tam) => ({ tam: String(tam) }));
}

/**
 * GET /pwa/icono/:tam  → PNG cuadrado con el monograma de los novios ("X & L").
 * Fondo completo y el monograma dentro del 70% central, así sirve también como ícono "maskable".
 */
export async function GET(_request, { params }) {
  const tam = Number((await params).tam);
  const [{ iniciales }, ovo] = await Promise.all([
    nombresApp(),
    readFile(join(process.cwd(), "public/assets/fonts/Ovo-Regular.ttf")),
  ]);
  const u = tam / 100; // 1% del lado

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORES.fondo,
          fontFamily: "Ovo",
        }}
      >
        <div
          style={{
            width: 68 * u,
            height: 68 * u,
            borderRadius: "50%",
            border: `${Math.max(1, 0.9 * u)}px solid ${COLORES.dorado}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORES.claro,
            fontSize: (iniciales ? 24 : 30) * u,
            letterSpacing: 0.5 * u,
          }}
        >
          {iniciales ? (
            <>
              <span>{iniciales[0]}</span>
              <span style={{ color: COLORES.dorado, fontSize: 17 * u, margin: `0 ${2.5 * u}px` }}>&</span>
              <span>{iniciales[1]}</span>
            </>
          ) : (
            <span style={{ color: COLORES.dorado }}>♥</span>
          )}
        </div>
      </div>
    ),
    {
      width: tam,
      height: tam,
      fonts: [{ name: "Ovo", data: ovo, weight: 400, style: "normal" }],
    }
  );
}

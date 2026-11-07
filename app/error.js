"use client";

// Si no se pudo cargar la información del evento (API caída y sin copia previa).
export default function Error({ retry }) {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center", fontFamily: "serif" }}>
      <div>
        <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>No pudimos cargar la invitación</p>
        <p style={{ opacity: 0.7, marginBottom: "1.5rem" }}>Por favor intenta de nuevo en unos momentos.</p>
        <button onClick={() => retry()} style={{ padding: "0.6rem 1.4rem", border: "1px solid currentColor", borderRadius: "999px", background: "none", cursor: "pointer" }}>
          Reintentar
        </button>
      </div>
    </main>
  );
}

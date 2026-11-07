// Textos de fecha de la invitación a partir de la ficha (fecha ISO con desfase + zona horaria del evento).

const capitalizar = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

/**
 * '2027-05-15T18:00:00-06:00', 'America/Mexico_City' →
 * { dia: '15', mes: '05', anio: '2027', anioCorto: '27', diaSemana: 'Sábado', mesNombre: 'Mayo' }
 */
export function partesFecha(iso, timeZone = "America/Mexico_City") {
  if (!iso) return null;
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return null;
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("es-MX", {
      timeZone,
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
      .formatToParts(fecha)
      .map((x) => [x.type, x.value])
  );
  const mesNombre = new Intl.DateTimeFormat("es-MX", { timeZone, month: "long" }).format(fecha);
  return {
    dia: p.day,
    mes: p.month,
    anio: p.year,
    anioCorto: p.year.slice(-2),
    diaSemana: capitalizar(p.weekday),
    mesNombre: capitalizar(mesNombre),
  };
}

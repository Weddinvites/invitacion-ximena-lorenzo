// Service worker de la invitación: la deja abrir sin señal (el día de la boda, en el salón).
// - Páginas: primero la red (para ver lo más nuevo); sin red, la última copia guardada.
// - Archivos (CSS, JS, imágenes, letras, librerías de CDN): copia guardada al instante y se actualiza por detrás.
// - No guarda audio (va por partes), ni peticiones que no sean GET (confirmar asistencia).
// Al cambiar VERSION se borran las copias de versiones anteriores.

const VERSION = "v1";
const PAGINAS = `paginas-${VERSION}`;
const ARCHIVOS = `archivos-${VERSION}`;
const SIN_RED = "/offline.html";
const MAX_ARCHIVOS = 150;
const ESPERA_RED_MS = 4000;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PAGINAS).then((c) => c.add(SIN_RED)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => !k.endsWith(`-${VERSION}`)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const esPagina = (req) => req.mode === "navigate";
const esRsc = (req, url) => req.headers.get("RSC") || url.searchParams.has("_rsc");
const esAudio = (req) => req.headers.has("range") || req.destination === "audio" || req.destination === "video";

async function recortar(cache) {
  const claves = await cache.keys();
  for (const k of claves.slice(0, Math.max(0, claves.length - MAX_ARCHIVOS))) await cache.delete(k);
}

async function pagina(req) {
  const cache = await caches.open(PAGINAS);
  const red = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  red.catch(() => {});
  const copia = await cache.match(req, { ignoreSearch: true });
  try {
    if (!copia) return await red;
    // Con copia guardada no se espera a una red lenta.
    return await Promise.race([red, new Promise((_, no) => setTimeout(() => no(new Error("lenta")), ESPERA_RED_MS))]);
  } catch {
    return copia ?? (await cache.match(SIN_RED)) ?? Response.error();
  }
}

async function archivo(req, event) {
  const cache = await caches.open(ARCHIVOS);
  let copia = await cache.match(req);
  // Una copia opaca (guardada por un preload) no sirve a quien pide con CORS, como un módulo JS.
  if (copia?.type === "opaque" && req.mode === "cors") copia = undefined;
  const red = fetch(req).then(async (res) => {
    // Las respuestas de otros dominios sin CORS llegan "opacas" (status 0): también sirven.
    if (res.ok || res.type === "opaque") {
      await cache.put(req, res.clone());
      recortar(cache);
    }
    return res;
  });
  if (copia) {
    event.waitUntil(red.catch(() => {}));
    return copia;
  }
  return red;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (!url.protocol.startsWith("http") || esAudio(req) || esRsc(req, url)) return;
  if (url.origin === self.location.origin && url.pathname.startsWith("/_next/webpack-hmr")) return;

  if (esPagina(req)) {
    if (url.origin === self.location.origin) event.respondWith(pagina(req));
    return;
  }
  event.respondWith(archivo(req, event).catch(() => caches.match(req).then((r) => r ?? Response.error())));
});

// La primera visita ocurre antes de que este service worker controle la página,
// así que la invitación le pide guardar lo que ya cargó.
self.addEventListener("message", (event) => {
  const { tipo, pagina: url, archivos = [] } = event.data ?? {};
  if (tipo !== "guardar") return;
  event.waitUntil((async () => {
    if (url) {
      const res = await fetch(url).catch(() => null);
      if (res?.ok) await (await caches.open(PAGINAS)).put(url, res);
    }
    const cache = await caches.open(ARCHIVOS);
    for (const a of archivos.slice(0, MAX_ARCHIVOS)) {
      try {
        const previa = await cache.match(a);
        if (previa && previa.type !== "opaque") continue;
        // Primero con CORS (letras y módulos lo exigen); si el servidor no lo permite, opaca.
        const res = await fetch(a, { mode: "cors" }).catch(() => fetch(a, { mode: "no-cors" }));
        if (res.ok || res.type === "opaque") await cache.put(a, res);
      } catch {
        // Si uno falla, se guarda el resto.
      }
    }
  })());
});

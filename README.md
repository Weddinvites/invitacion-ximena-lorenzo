# Invitación · Ximena & Lorenzo

Invitación de boda (15 · 05 · 27) en Next.js 16. Los datos de cada invitado vienen de
[boda-restapi](https://github.com/HectorCavilla/boda-restapi). Los invitados se gestionan desde el
admin central: https://admin.weddinvites.com

## Rutas

| Ruta | Qué muestra |
|---|---|
| `/` | Invitación general, sin pase ni confirmación |
| `/[slug]` | Invitación personalizada: nombre, pases y botón **Aceptar** para confirmar. Si el slug no existe, responde 404 |

`/[slug]` consulta `GET /api/invitados/info/:slug` y, si el invitado es tipo pareja, también `GET /api/acompanantes/:id`.
**Aceptar** llama a `PUT /api/invitados/confirmar` desde un Server Action (`app/actions.js`).

## Desarrollo

```bash
cp .env.example .env.local
npm install
npm run dev    # http://localhost:3000
```

| Variable | Descripción |
|---|---|
| `API_URL` | URL base de boda-restapi, sin `/api`. Solo se usa en el servidor. |

## Estructura

- `app/components/Invitacion.js`: el markup completo de la invitación.
- `app/components/InvitadoSections.js`: las secciones de pase y confirmación.
- `app/lib/api.js`: las llamadas a la API.
- `public/assets/js/script.js`: animaciones, sobre, música y countdown. Es JS legado; ya no incluye pases ni formularios.
- `public/css/styles.css`: los estilos de la plantilla.

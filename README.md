# Venta de webs

Proyecto de sitio comercial para servicios de diseño y desarrollo web. La planificación y el brief están en `docs/plan.md`; seguir siempre la metodología de `docs/buenas-practicas.md` y tratar `docs/contexto.md` como el brief vivo.

## Reservas y panel privado

El formulario está en `/#reserva` y el panel privado en `/gestion`. Ejecuta `neon deploy` para aplicar `neon.ts` y rellenar `.env.local`. Usa la cadena agrupada `DATABASE_URL` de Neon para el servidor. Las tablas se crean al primer acceso. Los archivos SQLite locales y las bases Turso previas se conservan como copias separadas.

Para acceder con contraseña, configura `ADMIN_PASSWORD` (16 caracteres como mínimo) y `ADMIN_SESSION_SECRET` (32 como mínimo). Para usar Neon Auth, crea al propietario en Neon Console → Auth → Users, copia su ID a `NEON_ADMIN_USER_ID` y añade `NEON_AUTH_BASE_URL` y un `NEON_AUTH_COOKIE_SECRET` aleatorio independiente de al menos 32 caracteres. Cuando el ID está configurado, el acceso exige una sesión de ese usuario. El identificador se compara en servidor en cada acceso y mutación.

Los pedidos se pueden mover desde el tablero o su ficha. Registra los cobros y el presupuesto acordado para alimentar el resumen. Para entregar un prototipo, guarda el enlace HTTPS en la ficha y usa «Enviar enlace guardado al cliente». Con las variables de Realtime, el panel se actualiza cuando llega una reserva. El resumen incluye una comprobación privada del bucket `assets`, la función `hello` y el catálogo AI Gateway.

Configura `RESEND_API_KEY` y `RESERVATIONS_EMAIL_FROM` con un remitente de un dominio verificado en Resend. El propietario recibe una notificación en su Outlook y el cliente recibe el correo HTML de bienvenida. Las reservas quedan guardadas si un envío falla. La ficha muestra los correos pendientes y permite reintentarlos.

## Despliegue en Vercel

Importa `jotalessmes/jesuslesmes` en Vercel, selecciona Next.js y usa `main` como rama de producción. La raíz del proyecto es la raíz del repositorio. Vercel ejecuta la compilación de Next.js.

En **Settings → Environment Variables**, configura **Production** con las variables documentadas en `.env.example`. Sustituye las dos variables de Turso por `DATABASE_URL`. Si el valor empieza por `postgresql+asyncpg://`, obtén la URL para Node.js con `neon connection-string production --pooled --project-id lucky-lake-13722524`. Conserva Resend para los correos. Copia desde `.env.local` las variables de Neon de los servicios que vayas a activar y guarda las claves y contraseñas como sensibles. Para Preview, usa otra rama y credenciales diferentes.

Vuelve a desplegar desde **Deployments** después de cambiar las variables. Envía una reserva con un correo que controles, comprueba ambos mensajes y abre la solicitud en `/gestion`.

## Graphify

Graphify CLI está instalado mediante `uv tool` y la integración Codex del proyecto está en `AGENTS.md` y `.codex/hooks.json`. La extracción semántica del brief aún no se ha ejecutado: Graphify requiere una clave de proveedor LLM, que no está configurada. Cuando se habilite una, desde esta carpeta ejecutar `graphify .` para construir `graphify-out/`; después, mantenerla con `graphify update .`. No crear una clave en archivos del proyecto.

# Venta de webs

Proyecto de sitio comercial para servicios de diseño y desarrollo web. La planificación y el brief están en `docs/plan.md`; seguir siempre la metodología de `docs/buenas-practicas.md` y tratar `docs/contexto.md` como el brief vivo.

## Reservas y panel privado

El formulario está en `/#reserva` y el panel privado en `/gestion`. Copia `.env.example` a `.env.local` y configura las variables del servidor. En local, `RESERVATIONS_DB_URL=file:./reservas.db` guarda las solicitudes en un archivo local. En Vercel, configura una base persistente de Turso con `RESERVATIONS_DB_URL` y `RESERVATIONS_DB_TOKEN`. Las tablas se crean al primer acceso.

Configura una contraseña privada de al menos 16 caracteres en `ADMIN_PASSWORD` y un secreto independiente de al menos 32 en `ADMIN_SESSION_SECRET`. Los pedidos se pueden mover desde el tablero o su ficha. Registra los cobros confirmados y el presupuesto acordado para alimentar el resumen. Para entregar un prototipo, guarda el enlace HTTPS en la ficha y usa «Enviar enlace guardado al cliente».

Configura `RESEND_API_KEY` y `RESERVATIONS_EMAIL_FROM` con un remitente de un dominio verificado en Resend. El propietario recibe una notificación en su Outlook y el cliente recibe el correo HTML de bienvenida. Las reservas quedan guardadas si un envío falla. La ficha muestra los correos pendientes y permite reintentarlos.

## Despliegue en Vercel

Importa `jotalessmes/jesuslesmes` en Vercel, selecciona Next.js y usa `main` como rama de producción. La raíz del proyecto es la raíz del repositorio. Vercel ejecuta la compilación de Next.js.

Antes del primer despliegue, añade las seis variables de `.env.example` en **Settings → Environment Variables**, en el entorno **Production**. Usa la URL remota de Turso y su token, una contraseña privada y un secreto de sesión independiente, y las credenciales del remitente de Resend. Para comprobar el despliegue, envía una reserva desde `/#reserva` con un correo que controles, comprueba ambos mensajes y abre la solicitud en `/gestion`.

## Graphify

Graphify CLI está instalado mediante `uv tool` y la integración Codex del proyecto está en `AGENTS.md` y `.codex/hooks.json`. La extracción semántica del brief aún no se ha ejecutado: Graphify requiere una clave de proveedor LLM, que no está configurada. Cuando se habilite una, desde esta carpeta ejecutar `graphify .` para construir `graphify-out/`; después, mantenerla con `graphify update .`. No crear una clave en archivos del proyecto.

# Venta de webs

Proyecto de sitio comercial para servicios de diseño y desarrollo web. La planificación y el brief están en `docs/plan.md`; seguir siempre la metodología de `docs/buenas-practicas.md` y tratar `docs/contexto.md` como el brief vivo.

## Reservas y panel privado

El formulario está en `/#reserva` y el panel privado en `/gestion`. Ejecuta `neon deploy` para aplicar `neon.ts` y rellenar `.env.local`. Usa la cadena agrupada `DATABASE_URL` de Neon para el servidor. Las tablas se crean al primer acceso. Los archivos SQLite locales y las bases Turso previas se conservan como copias separadas.

Para acceder con contraseña, configura `ADMIN_PASSWORD` (16 caracteres como mínimo) y `ADMIN_SESSION_SECRET` (32 como mínimo). Para usar Neon Auth, crea al propietario en Neon Console → Auth → Users, copia su ID a `NEON_ADMIN_USER_ID` y añade `NEON_AUTH_BASE_URL` y un `NEON_AUTH_COOKIE_SECRET` aleatorio independiente de al menos 32 caracteres. Cuando el ID está configurado, el acceso exige una sesión de ese usuario. El identificador se compara en servidor en cada acceso y mutación.

Los pedidos se pueden mover desde el tablero o su ficha. Registra los cobros y el presupuesto acordado para alimentar el resumen. Puedes guardar el enlace HTTPS del prototipo en la ficha. Con las variables de Realtime, el panel se actualiza cuando llega una reserva. El resumen incluye una comprobación privada del bucket `assets`, la función `hello` y el catálogo AI Gateway.

Las reservas se guardan en Neon y se consultan desde el panel. El envío de correos se gestionará mediante una automatización independiente.

## Despliegue en Vercel

Importa `jotalessmes/jesuslesmes` en Vercel, selecciona Next.js y usa `main` como rama de producción. La raíz del proyecto es la raíz del repositorio. Vercel ejecuta la compilación de Next.js.

En **Settings → Environment Variables → Production**, el formulario y el acceso por contraseña requieren `DATABASE_URL`, `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET`. Si la conexión empieza por `postgresql+asyncpg://`, obtén la URL para Node.js con `neon connection-string production --pooled --project-id lucky-lake-13722524`. Las variables de los otros servicios aparecen en `.env.example`.

Vuelve a desplegar desde **Deployments** después de cambiar las variables. Envía una reserva de prueba y abre la solicitud en `/gestion`. Con `NEON_REALTIME_URL` y `NEON_REALTIME_SECRET` el panel se actualiza automáticamente. Con las tres variables básicas basta con recargarlo para ver los nuevos pedidos.

## Graphify

Graphify CLI está instalado mediante `uv tool` y la integración Codex del proyecto está en `AGENTS.md` y `.codex/hooks.json`. La extracción semántica del brief aún no se ha ejecutado: Graphify requiere una clave de proveedor LLM, que no está configurada. Cuando se habilite una, desde esta carpeta ejecutar `graphify .` para construir `graphify-out/`; después, mantenerla con `graphify update .`. No crear una clave en archivos del proyecto.

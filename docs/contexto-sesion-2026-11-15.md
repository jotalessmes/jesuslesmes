# Contexto de la web — 15 de noviembre de 2026

## Objetivo y marca
Web comercial y portfolio de Jesús Lesmes para ofrecer landing pages para negocios y soluciones software personalizadas. Estética editorial en blanco y negro, tipografía contundente e interacciones cuidadas. El correo de contacto previsto es jesus.lesmes@outlook.com; la agenda de llamadas y el correo no deben integrarse todavía: el botón es solo visual.

## Estado actual
- Inicio con animación de entrada, portátil y móvil, efecto de estela con el ratón y menú lateral. La estela se desactiva mientras se hace scroll.
- Sobre mí: recorrido horizontal mediante scroll vertical, con perfil, ingeniería e IA, balonmano y diseño y software. Incluye imágenes personales, visual de IA y código animado.
- Servicios: sección posterior a Sobre mí, accesible desde el menú. Presenta primero landing pages con una demo animada dentro de un ordenador; al seguir desplazándose, una tarjeta de soluciones software entra desde la derecha y se superpone. Su demo representa una aplicación de reservas. Se usa Framer Motion y hay una alternativa para movimiento reducido.
- Menú actual: Inicio, Sobre mí y Servicios.
- La última modificación de Servicios pasó la comprobación de TypeScript; falta una revisión visual en navegador, incluyendo móvil, transición y demos.

## Próximas decisiones y límites
El usuario planteó inicialmente un portfolio indexable y tres tarifas claras; desarrollarlos cuando se retome esa parte. Evitar inventar proyectos o resultados comerciales. Mantener el botón de reserva sin conexión hasta que el usuario indique lo contrario. El servidor local fue cerrado al finalizar esta sesión.

## Archivos principales
- app/page.tsx: composición de la página.
- app/device-hero.tsx y app/opening-sequence.tsx: inicio.
- app/site-menu.tsx: navegación.
- app/about-chapters.tsx y app/about-visuals.tsx: Sobre mí.
- app/services-section.tsx y app/services-section.css: Servicios y sus demostraciones.
- app/negative-trail.tsx: estela del cursor.

Existe una copia anterior en la carpeta hermana `Backup Venta de webs - hero 20261115-210555`, con instrucciones en RESTAURAR.md. Consultar AGENTS.md y Graphify antes de investigar el código; actualizar el grafo tras editarlo.

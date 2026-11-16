# Plan del proyecto — Venta de webs

**Tipo de proyecto:** sitio de servicios (estudio/desarrollador independiente que vende diseño y desarrollo web). **Objetivo:** convertir visitas cualificadas en solicitudes de presupuesto o llamadas, mientras presenta quién eres, el portfolio y tres tarifas fáciles de comparar.

## Decisiones de producto

- Idioma inicial: español. Considerar versión inglesa solo si hay demanda real.
- Audiencia provisional: autónomos y pequeñas empresas que necesitan una web profesional, rápida y que puedan mantener.
- CTA principal: «Cuéntame tu proyecto»; secundario: «Ver trabajos».
- Tono: claro, competente, humano y concreto; nada de promesas de ventas garantizadas.
- No inventar biografía, clientes, resultados, testimonios ni tarifas. Marcar cada dato pendiente como `[POR DEFINIR]` hasta confirmarlo.

## Tecnología recomendada

**Next.js App Router + React + TypeScript + Tailwind CSS + shadcn/ui**, con prerenderizado estático donde sea posible y componentes de cliente solo para interacciones concretas. Es la recomendación principal porque Skiper40 se instala desde el registro shadcn y declara dependencias React/Framer Motion; Next.js encaja directamente y ofrece renderizado de servidor/estático, metadatos, sitemap y robots. Mantiene portfolio y páginas de tarifas rastreables en HTML y permite incorporar animaciones en secciones aisladas.

Astro + React es una alternativa válida si se prioriza aún más un sitio editorial estático y se acepta integrar/islar React. Para este proyecto, elegir Next reduce fricción al combinar Skiper40 y shadcn. No añadir WebGL ni animación continua por defecto: que cada movimiento ayude a entender la oferta, la navegación o el trabajo.

## Arquitectura de información y conversión

1. **Inicio** (`/`): promesa específica, CTA, una pieza de portfolio destacada y resumen de proceso/precios.
2. **Trabajos** (`/proyectos`): índice HTML rastreable con filtros opcionales y una URL por caso (`/proyectos/[slug]`). Cada caso: cliente/sector, problema, alcance, decisiones, capturas reales, resultado verificable y créditos.
3. **Servicios y tarifas** (`/precios`): tres planes; para quién es cada uno, entregables, límites, plazo orientativo, precio o «desde», extras y CTA. Señalar con transparencia IVA, dominio, hosting y mantenimiento.
4. **Sobre mí** (`/sobre-mi`): nombre, foto real, experiencia verificable, forma de trabajar y valores relevantes para contratar.
5. **Contacto** (`/contacto`): formulario corto, canal alternativo real, expectativas de respuesta y privacidad.
6. **Legales** (`/privacidad`, cookies si aplica, aviso legal): completar con datos reales y asesoría aplicable al negocio.

Nav persistente y sencilla. Footer con enlaces de contacto, servicios, portfolio y legales. Cada página debe poder entenderse y funcionar como entrada desde búsqueda o enlace compartido.

## Tres tarifas: estructura inicial, importes por decidir

- **Esencial** — web de presentación para validar presencia online: alcance/páginas `[POR DEFINIR]`, formulario y SEO técnico básico.
- **Negocio** — web multipágina orientada a captar contactos: estructura ampliada, CMS/blog o portfolio editable si procede, analítica consentida y optimización básica.
- **A medida** — necesidades especiales, integraciones o alcance personalizado: diagnóstico y propuesta cerrada.

Los nombres, límites y precios son hipótesis de trabajo, no una oferta publicable. Antes de fijarlos, estimar horas, costes recurrentes, margen, impuestos y perfil de cliente; delimitar revisiones, contenido, soporte, pagos y exclusiones. Si los precios son fijos, explicar claramente qué queda fuera. No ocultar todo tras «contactar» si el objetivo es comparar con facilidad.

## Dirección visual e interacción

Usar Skiper40 como componente candidato, no como identidad visual. Estudiar Vengeance UI por interacciones de marketing (hover, tooltips y scroll-driven layouts) y Animmaster por ejemplos variados de motion. Elegir un único motivo visual propio y una paleta/tipografía coherentes con tu trabajo. Dejar que capturas y proyectos reales sean protagonistas. Evitar una galería de efectos inconexos, scroll obligatorio, animación que bloquee lectura o controles que solo funcionen con hover.

Movimiento: entrada breve y discreta, estados de foco/hover, transición de filtros y microinteracciones con propósito. Respetar `prefers-reduced-motion`; mantener navegación por teclado y contenido comprensible sin JS.

## SEO, contenido y descubrimiento

- HTML semántico con un H1 específico por página y títulos/descripciones únicos.
- Una página indexable por servicio/caso con contenido original y valor real; no generar páginas vacías para palabras clave.
- Generar sitemap.xml y robots.txt, canonical y Open Graph; enlazado interno entre casos, servicios y contacto.
- Datos estructurados solo con hechos comprobables (Person/ProfessionalService, BreadcrumbList y CreativeWork si corresponde).
- Alt descriptivo para imágenes informativas; optimizar formatos, dimensiones y carga diferida bajo el pliegue.
- Search Console y analítica respetuosa con privacidad después de configurar consentimiento/legales según jurisdicción.
- Consultas objetivo iniciales a validar: «diseño web para [sector/ciudad]», «diseñador web freelance», «desarrollo web para pequeñas empresas». No afirmar posicionamiento asegurado.

## Fases

1. **Descubrimiento:** validar nombre, público, ubicación/mercado, credenciales, portfolio, proceso, capacidad, contacto y precios.
2. **Oferta y contenido:** cerrar alcance de los tres planes, criterios de cualificación, copy, pruebas reales y materiales.
3. **Sistema visual y prototipo:** definir voz, identidad, jerarquía, responsive y movimiento; aprobar páginas clave.
4. **Implementación:** inicializar Next.js, incorporar Skiper40 y ajustar código/licencias/dependencias; construir componentes propios mínimos y colección de proyectos.
5. **SEO y accesibilidad:** metadatos, sitemap, robots, schema factual, teclado, contraste, reduced motion y rendimiento.
6. **Revisión previa a publicar:** comprobar móvil/escritorio, enlaces, formulario, indexabilidad, textos legales, analítica y medición de CTA.
7. **Mejora continua:** medir consultas, clics a contacto, páginas de entrada y conversión; cambiar una hipótesis cada vez y documentarla.

## Criterios de éxito

- Un visitante entiende qué haces, para quién y cómo empezar sin buscarlo.
- Puede inspeccionar trabajos con URLs compartibles e indexables.
- Compara las tres tarifas y sus límites sin ambigüedad.
- El sitio funciona sin animación y en teclado/móvil.
- Rendimiento e indexación se revisan con datos reales tras el lanzamiento.

## Decisiones pendientes del propietario

Nombre/marca; nombre y biografía; ciudad/país y mercados; nichos; proyectos que pueden publicarse y permisos; resultados demostrables; precios e IVA; disponibilidad/plazos; servicios de mantenimiento/hosting; método de contacto; stack ofertado a clientes; dominios y política de privacidad.

## Fuentes consultadas

- Skiper UI, instalación y dependencias: https://skiper-ui.com/docs/quick-start
- Vengeance UI, interacciones enfocadas a marketing: https://www.vengenceui.com/
- Animmaster Lib, catálogo de componentes y movimiento: https://animmasterlib.dev/
- shadcn/ui, instalación con Astro: https://ui.shadcn.com/docs/installation/astro
- Astro, integración React: https://docs.astro.build/en/guides/integrations-guide/react/
- Next.js, optimización de producción, renderizado y SEO: https://nextjs.org/docs/app/guides/production-checklist
- Creative Bloq, análisis de portfolios y casos: https://www.creativebloq.com/portfolios/examples-712368
- Humans & Machines, servicios y rangos publicados por un estudio: https://www.humans-machines.com/downloads/humans-machines-capabilities.pdf

Investigación revisada el 15-11-2026. Los ejemplos son referencias cualitativas; sus resultados no prueban causalidad ni se trasladan automáticamente a este negocio.

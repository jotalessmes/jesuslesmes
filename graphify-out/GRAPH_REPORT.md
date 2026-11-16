# Graph Report - Venta de webs  (2026-11-16)

## Corpus Check
- 41 files · ~14,395 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 11, .example 1, (none) 1)

## Summary
- 313 nodes · 486 edges · 20 communities (17 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `858f681c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- compilerOptions
- Smoke
- Buenas prácticas — metodología de trabajo
- Contexto del sitio — venta de diseño y desarrollo web
- Plan del proyecto — Venta de webs
- react
- react
- Venta de webs
- AGENTS.md
- Estudio y sistema de color
- components.json
- postcss.config.mjs
- carousel.tsx
- reservation-actions.ts
- SectionTransition
- Contexto de la web — 15 de noviembre de 2026
- services-section.tsx
- Tarifas propuestas — 16 noviembre 2026

## God Nodes (most connected - your core abstractions)
1. `react` - 17 edges
2. `compilerOptions` - 16 edges
3. `manageReservation()` - 11 edges
4. `Buenas prácticas — metodología de trabajo` - 11 edges
5. `Contexto del sitio — venta de diseño y desarrollo web` - 11 edges
6. `Plan del proyecto — Venta de webs` - 11 edges
7. `SitePointerTrail()` - 10 edges
8. `Home()` - 10 edges
9. `AdminPanel()` - 9 edges
10. `reservationsDb()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ManagementPage()` --calls--> `adminAuthenticated()`  [EXTRACTED]
  app/gestion/page.tsx → lib/reservations-auth.ts
- `ManagementPage()` --calls--> `reservationsDb()`  [EXTRACTED]
  app/gestion/page.tsx → lib/reservations-db.ts
- `createReservation()` --calls--> `requestKey()`  [EXTRACTED]
  app/reservation-actions.ts → lib/reservations-auth.ts
- `createReservation()` --calls--> `allowRequest()`  [EXTRACTED]
  app/reservation-actions.ts → lib/reservations-db.ts
- `createReservation()` --calls--> `reservationsDb()`  [EXTRACTED]
  app/reservation-actions.ts → lib/reservations-db.ts

## Import Cycles
- None detected.

## Communities (20 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.05
Nodes (45): metadata, config, dependencies, @base-ui/react@^1.9.0, class-variance-authority@^0.7.1, embla-carousel-autoplay@^8.6.0, embla-carousel-react@^8.6.0, @fontsource-variable/bitcount-prop-single@^5.3.0 (+37 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "Smoke"
Cohesion: 0.29
Nodes (9): makeStamp(), mix(), Puff, random(), Smoke(), draw(), leave(), move() (+1 more)

### Community 3 - "Buenas prácticas — metodología de trabajo"
Cohesion: 0.17
Nodes (11): 1. Empezar por evidencia, 2. Oferta comprensible y honesta, 3. Contenido y arquitectura, 4. Diseño, accesibilidad y movimiento, 5. Desarrollo, 6. Conversión y medición, 7. Revisión antes de publicar, 8. Mantenimiento (+3 more)

### Community 4 - "Contexto del sitio — venta de diseño y desarrollo web"
Cohesion: 0.17
Nodes (11): Contexto del sitio — venta de diseño y desarrollo web, Criterios de voz, Estado del documento, Interacción, Oferta, Posicionamiento y contenido por completar, Producto, Propuesta provisional (+3 more)

### Community 5 - "Plan del proyecto — Venta de webs"
Cohesion: 0.17
Nodes (11): Arquitectura de información y conversión, Criterios de éxito, Decisiones de producto, Decisiones pendientes del propietario, Dirección visual e interacción, Fases, Fuentes consultadas, Plan del proyecto — Venta de webs (+3 more)

### Community 6 - "react"
Cohesion: 0.09
Nodes (25): DeviceHero(), ScreenDesign(), circle(), HeroTrailReveal(), Mark, Point, SitePointerTrail(), draw() (+17 more)

### Community 8 - "react"
Cohesion: 0.13
Nodes (18): AboutChapters(), draw(), goTo(), measure(), updateChapters(), chapters, chapterStep(), layoutRoute() (+10 more)

### Community 9 - "Venta de webs"
Cohesion: 0.40
Nodes (4): Despliegue en Vercel, Graphify, Reservas y panel privado, Venta de webs

### Community 11 - "Estudio y sistema de color"
Cohesion: 0.22
Nodes (8): Contraste calculado, Decisión, Estudio y sistema de color, Fuentes consultadas, Lectura de las cuatro referencias, Objetivo de marca, Paleta final, Reglas de uso

### Community 12 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 14 - "carousel.tsx"
Cohesion: 0.16
Nodes (16): Button(), buttonVariants, CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext() (+8 more)

### Community 15 - "reservation-actions.ts"
Cohesion: 0.12
Nodes (37): ManagementPage(), metadata, AdminLogin(), AdminPanel(), move(), Dashboard(), date(), dateFormat (+29 more)

### Community 16 - "SectionTransition"
Cohesion: 0.53
Nodes (5): clamp(), SectionTransition(), draw(), measure(), schedule()

### Community 17 - "Contexto de la web — 15 de noviembre de 2026"
Cohesion: 0.33
Nodes (5): Archivos principales, Contexto de la web — 15 de noviembre de 2026, Estado actual, Objetivo y marca, Próximas decisiones y límites

### Community 18 - "services-section.tsx"
Cohesion: 0.27
Nodes (7): LandingDemo(), ServicesSection(), SoftwareDemo(), TransitionStripe(), ServicePanel, framer-motion@^14.14.0, framer-motion

### Community 19 - "Tarifas propuestas — 16 noviembre 2026"
Cohesion: 0.33
Nodes (5): Actualización de precios, Antes de publicar, Criterios de presentación, Referencias, Tarifas propuestas — 16 noviembre 2026

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `Smoke`, `react`, `carousel.tsx`, `reservation-actions.ts`, `SectionTransition`, `services-section.tsx`?**
  _High betweenness centrality (0.255) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.054693877551020405 - nodes in this community are weakly interconnected._
- **Why does `next` connect `package.json` to `reservation-actions.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.08961593172119488 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.13043478260869565 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
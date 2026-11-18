# Graph Report - Venta de webs  (2026-11-16)

## Corpus Check
- 46 files · ~15,290 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 11, .example 1, (none) 1)

## Summary
- 339 nodes · 558 edges · 28 communities (20 shown, 8 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `999c47d6`
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
- framer-motion
- Tarifas propuestas — 16 noviembre 2026
- dependencies
- layout.tsx
- lucide-react
- scripts
- @neon/config
- @neon/auth
- react-dom@^19.3.1

## God Nodes (most connected - your core abstractions)
1. `react` - 18 edges
2. `compilerOptions` - 16 edges
3. `login()` - 11 edges
4. `manageReservation()` - 11 edges
5. `adminAuthenticated()` - 11 edges
6. `Buenas prácticas — metodología de trabajo` - 11 edges
7. `Contexto del sitio — venta de diseño y desarrollo web` - 11 edges
8. `Plan del proyecto — Venta de webs` - 11 edges
9. `SitePointerTrail()` - 10 edges
10. `Home()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ManagementPage()` --calls--> `neonAdminEnabled()`  [EXTRACTED]
  app/gestion/page.tsx → lib/neon-admin-auth.ts
- `ManagementPage()` --calls--> `reservationFeed()`  [EXTRACTED]
  app/gestion/page.tsx → lib/neon-services.ts
- `ManagementPage()` --calls--> `adminAuthenticated()`  [EXTRACTED]
  app/gestion/page.tsx → lib/reservations-auth.ts
- `ManagementPage()` --calls--> `reservationsDb()`  [EXTRACTED]
  app/gestion/page.tsx → lib/reservations-db.ts
- `createReservation()` --calls--> `requestKey()`  [EXTRACTED]
  app/reservation-actions.ts → lib/reservations-auth.ts

## Import Cycles
- None detected.

## Communities (28 total, 8 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.14
Nodes (19): description, devDependencies, postcss@^8.5.33, tailwindcss@^4.3.5, @tailwindcss/postcss@^4.3.5, @types/node@^26.6.6, @types/react@^19.3.0, @types/react-dom@^19.3.0 (+11 more)

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
Cohesion: 0.08
Nodes (29): DeviceHero(), ScreenDesign(), circle(), HeroTrailReveal(), Mark, Point, SitePointerTrail(), draw() (+21 more)

### Community 8 - "react"
Cohesion: 0.12
Nodes (17): AboutChapters(), draw(), goTo(), measure(), updateChapters(), chapters, chapterStep(), layoutRoute() (+9 more)

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
Cohesion: 0.09
Nodes (49): Feed, NeonFeed(), ManagementPage(), metadata, AdminLogin(), AdminPanel(), move(), Dashboard() (+41 more)

### Community 16 - "SectionTransition"
Cohesion: 0.53
Nodes (5): clamp(), SectionTransition(), draw(), measure(), schedule()

### Community 17 - "Contexto de la web — 15 de noviembre de 2026"
Cohesion: 0.33
Nodes (5): Archivos principales, Contexto de la web — 15 de noviembre de 2026, Estado actual, Objetivo y marca, Próximas decisiones y límites

### Community 19 - "Tarifas propuestas — 16 noviembre 2026"
Cohesion: 0.33
Nodes (5): Actualización de precios, Antes de publicar, Criterios de presentación, Referencias, Tarifas propuestas — 16 noviembre 2026

### Community 20 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, @aws-sdk/client-s3@^3.1169.0, class-variance-authority@^0.7.1, embla-carousel-autoplay@^8.6.0, embla-carousel-react@^8.6.0, @neon/env@^2.1.3, @neon/realtime@^0.2.1, @neondatabase/serverless@^1.2.1 (+9 more)

### Community 21 - "layout.tsx"
Cohesion: 0.25
Nodes (5): metadata, @fontsource-variable/bitcount-prop-single@^5.3.0, geist@^1.9.2, @fontsource-variable/bitcount-prop-single, geist

### Community 22 - "lucide-react"
Cohesion: 0.33
Nodes (4): @base-ui/react@^1.9.0, lucide-react@^1.73.0, @base-ui/react, lucide-react

### Community 23 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, start

## Knowledge Gaps
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `Smoke`, `react`, `carousel.tsx`, `reservation-actions.ts`, `SectionTransition`, `dependencies`?**
  _High betweenness centrality (0.257) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._
- **Why does `next` connect `reservation-actions.ts` to `package.json`, `dependencies`, `layout.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`, `carousel.tsx`, `framer-motion`, `layout.tsx`, `lucide-react`, `@neon/config`, `@neon/auth`, `react-dom@^19.3.1`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.08084163898117387 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.12318840579710146 - nodes in this community are weakly interconnected._
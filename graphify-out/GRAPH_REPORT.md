# Graph Report - Venta de webs  (2026-11-16)

## Corpus Check
- 41 files · ~16,030 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 17 file(s) not represented in the graph (top: .css 10, .log 6, (none) 1)

## Summary
- 259 nodes · 341 edges · 20 communities (17 shown, 3 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

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
- ui.tsx
- SectionTransition
- Contexto de la web — 15 de noviembre de 2026
- SitePointerTrail
- Tarifas propuestas — 16 noviembre 2026

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `react` - 15 edges
3. `Buenas prácticas — metodología de trabajo` - 11 edges
4. `Contexto del sitio — venta de diseño y desarrollo web` - 11 edges
5. `Plan del proyecto — Venta de webs` - 11 edges
6. `SitePointerTrail()` - 10 edges
7. `Home()` - 9 edges
8. `Estudio y sistema de color` - 8 edges
9. `Smoke()` - 7 edges
10. `SiteMenu()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Skiper54()` --calls--> `CornerLink()`  [EXTRACTED]
  components/ui/skiper-ui/skiper54.tsx → app/ui.tsx
- `Home()` --calls--> `SitePointerTrail()`  [EXTRACTED]
  app/page.tsx → app/negative-trail.tsx
- `Home()` --calls--> `AboutChapters()`  [EXTRACTED]
  app/page.tsx → app/about-chapters.tsx
- `Home()` --calls--> `PricingSection()`  [EXTRACTED]
  app/page.tsx → app/pricing-section.tsx
- `CarouselNext()` --calls--> `Button()`  [EXTRACTED]
  components/ui/carousel.tsx → components/ui/button.tsx

## Import Cycles
- None detected.

## Communities (20 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.06
Nodes (43): metadata, config, dependencies, @base-ui/react@^1.9.0, class-variance-authority@^0.7.1, embla-carousel-autoplay@^8.6.0, embla-carousel-react@^8.6.0, @fontsource-variable/bitcount-prop-single@^5.3.0 (+35 more)

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
Cohesion: 0.12
Nodes (20): DeviceHero(), ScreenDesign(), HeroTrailReveal(), Mark, Point, OpeningSequence(), Home(), plans (+12 more)

### Community 8 - "react"
Cohesion: 0.15
Nodes (15): AboutChapters(), draw(), goTo(), measure(), updateChapters(), chapters, chapterStep(), layoutRoute() (+7 more)

### Community 9 - "Venta de webs"
Cohesion: 0.50
Nodes (3): Estado, Graphify, Venta de webs

### Community 11 - "Estudio y sistema de color"
Cohesion: 0.22
Nodes (8): Contraste calculado, Decisión, Estudio y sistema de color, Fuentes consultadas, Lectura de las cuatro referencias, Objetivo de marca, Paleta final, Reglas de uso

### Community 12 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 14 - "carousel.tsx"
Cohesion: 0.16
Nodes (16): Button(), buttonVariants, CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext() (+8 more)

### Community 15 - "ui.tsx"
Cohesion: 0.28
Nodes (6): CornerLink(), LinkProps, ServiceSlide, Skiper54(), lucide-react@^1.73.0, lucide-react

### Community 16 - "SectionTransition"
Cohesion: 0.53
Nodes (5): clamp(), SectionTransition(), draw(), measure(), schedule()

### Community 17 - "Contexto de la web — 15 de noviembre de 2026"
Cohesion: 0.33
Nodes (5): Archivos principales, Contexto de la web — 15 de noviembre de 2026, Estado actual, Objetivo y marca, Próximas decisiones y límites

### Community 18 - "SitePointerTrail"
Cohesion: 0.33
Nodes (7): circle(), SitePointerTrail(), draw(), markRadius(), move(), stamp(), updateDeviceMask()

### Community 19 - "Tarifas propuestas — 16 noviembre 2026"
Cohesion: 0.33
Nodes (5): Actualización de precios, Antes de publicar, Criterios de presentación, Referencias, Tarifas propuestas — 16 noviembre 2026

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `Smoke`, `react`, `carousel.tsx`, `ui.tsx`, `SectionTransition`?**
  _High betweenness centrality (0.216) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05673758865248227 - nodes in this community are weakly interconnected._
- **Why does `SitePointerTrail()` connect `SitePointerTrail` to `react`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `package.json` to `react`, `carousel.tsx`, `ui.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.1206896551724138 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
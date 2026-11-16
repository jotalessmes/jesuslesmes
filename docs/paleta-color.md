# Estudio y sistema de color

## Objetivo de marca

La web presenta a Jesús Lesmes como diseñador y desarrollador que ofrece landing pages y soluciones de software a profesionales y pequeños negocios. El color debe hacer que la propuesta se sienta digital y actual, conservar la personalidad oscura y tipográfica de la portada, dar confianza al leer la oferta y hacer visibles las llamadas a la acción.

## Lectura de las cuatro referencias

Los tonos de esta tabla son aproximaciones visuales tomadas de las capturas compartidas; no son muestras extraídas de los archivos originales de cada marca.

| Referencia de la captura | Colores aproximados | Efecto que produce en esa composición | Encaje con esta web |
|---|---|---|---|
| Analítica sobre fondo negro (1) | Carbón, blanco, naranja y rojo oscuro | La oscuridad recuerda una interfaz de datos; los destellos cálidos concentran la mirada y transmiten energía y urgencia. El naranja funciona bien como acento; si domina, puede acercar el tono a alertas o trading. | Buena dirección para software, aunque el rojo y el resplandor intenso restarían serenidad a la oferta y a la foto personal. |
| Portfolio con turquesas (2) | Verde azulado, menta, marfil y terracota | La pareja de verdes comunica frescura y actualidad; el retrato y el fondo claro hacen que la página resulte humana y ligera. Los tonos cercanos necesitan diferencias claras de luminosidad para conservar jerarquía. | La dirección más cercana a servicios digitales y portfolio. Conviene oscurecerla y reservar el menta para puntos de atención. |
| Campaña de tarjeta al atardecer (3) | Granate, magenta, rojo, naranja y oro | El degradado crea dramatismo, emoción y sensación de campaña premium. El rojo cálido concentra la atención, pero su uso continuo vuelve la experiencia intensa y ligada a promoción o urgencia. | El carácter cinematográfico compite con el mensaje de diseño y software; no la usaría como sistema base. |
| Editorial de producto reloj (4) | Azul noche, crema, arena, amarillo y marrón | El contraste oscuro-claro y el amarillo suave transmiten orden, cuidado y valor artesanal. La composición editorial eleva la percepción de producto premium. | Buen referente de sobriedad y legibilidad; la combinación arena y marrón haría que la marca tecnológica pareciera más editorial o de producto físico. |

## Decisión

Crear una paleta propia que combine el fondo técnico y profundo de la primera referencia, la frescura verde-azulada de la segunda y la lectura clara y cálida de la cuarta. La propuesta usa azul petróleo casi negro, marfil suave y menta como color principal de acción. Una terracota discreta queda como acento editorial opcional, nunca como segundo color de botón.

La asociación emocional del color no es universal ni garantiza compras. En experimentos de comercio electrónico se han observado efectos dependientes del contexto: el fondo azul o de baja luminosidad favoreció la intención de visita en una investigación sobre precios; otra investigación de banners encontró resultados favorables para una pareja análoga azul-verde. Son indicios útiles para elegir una dirección, no una promesa de conversión para este sitio. La jerarquía, el contenido, el público y la accesibilidad siguen siendo determinantes.

## Paleta final

| Token CSS | Hex | Uso |
|---|---|---|
| `--bg` | `#0B1518` | Fondo principal, header y escena de transición. |
| `--fg` | `#F3F5EE` | Texto principal en fondos oscuros. |
| `--muted` | `#B7C3BE` | Texto secundario sobre fondos oscuros. |
| `--line` | `#293A3A` | Divisores y bordes discretos. |
| `--accent` | `#45D6B4` | CTA, foco, detalles de interacción y humo. |
| `--accent-hover` | `#70E5C9` | Estado hover de CTA. |
| `--ink` | `#08201D` | Texto de botón sobre menta. |
| `--surface` | `#142321` | Superficie de tarjetas y miniaturas oscuras. |
| `--surface-raised` | `#1D302E` | Superficie elevada disponible para nuevas secciones. |
| `--paper` | `#EDF1EB` | Fondo claro de Servicios y bloques de lectura. |
| `--paper-ink` | `#142321` | Texto principal sobre superficies claras. |
| `--teal` | `#286D60` | Etiquetas y pequeños acentos sobre marfil. |
| `--warm` | `#D8A486` | Acento cálido ocasional para ilustración o detalles, no para párrafos pequeños. |

Los tokens viven en `app/globals.css`. La animación de entrada usa los mismos colores en `app/opening-sequence.css`; el rastro del cursor adopta un matiz verde grisáceo en `app/smoke.tsx`.

## Contraste calculado

Ratios calculados con la fórmula de luminancia relativa WCAG:

| Texto / fondo | Ratio | Lectura |
|---|---:|---|
| `#F3F5EE` / `#0B1518` | 16.84:1 | Pasa AA y AAA para texto normal. |
| `#B7C3BE` / `#0B1518` | 10.19:1 | Pasa AA y AAA para texto normal. |
| `#45D6B4` / `#0B1518` | 10.16:1 | Pasa AA y AAA para texto normal. |
| `#08201D` / `#45D6B4` | 9.34:1 | Pasa AA y AAA para texto normal en botones. |
| `#142321` / `#EDF1EB` | 14.23:1 | Pasa AA y AAA para texto normal en Servicios. |
| `#286D60` / `#EDF1EB` | 5.33:1 | Pasa AA para texto normal en etiquetas. |

La WCAG 2.2 establece un mínimo de 4.5:1 para texto normal y 3:1 para texto grande en nivel AA. Estos cálculos cubren los pares sólidos definidos aquí; cualquier texto encima de fotografía, humo, degradado u otro fondo variable necesita revisión visual adicional.

## Reglas de uso

1. Mantener los fondos oscuros para la portada, navegación y secciones de software.
2. Usar `--accent` en acciones principales y señales puntuales. No convertir toda la interfaz en menta.
3. Mantener `--paper` como descanso visual para Servicios, precios o explicación larga.
4. Usar `--warm` con moderación para dar calidez a detalles gráficos; no competir con el CTA.
5. No comunicar estados únicamente mediante color; acompañarlos con texto o iconos.
6. Al añadir colores, crear tokens aquí y reutilizarlos en lugar de introducir hexadecimales aislados.

## Fuentes consultadas

- Woodburn y Riebe, *Ecommerce interface colour and consumer decision making: Two routes of influence*, estudio experimental de interfaces azul y gris: https://onlinelibrary.wiley.com/doi/10.1002/col.20690
- Hsieh et al., *Do Colors Change Realities in Online Shopping?*, estudio de color de fondo, precio percibido e intención de visita: https://www.sciencedirect.com/science/article/pii/S1094996817300518
- *Color in web banner advertising: The influence of analogous and complementary colors on attitude and purchase intention*: https://www.sciencedirect.com/science/article/pii/S1567422321000727
- W3C WAI, criterio WCAG 2.2 de contraste mínimo: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum

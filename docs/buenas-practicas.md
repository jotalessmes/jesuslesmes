# Buenas prácticas — metodología de trabajo

Esta guía rige el trabajo de contenido, diseño, desarrollo y mantenimiento del sitio. Se revisa cuando cambien la oferta, el público o la tecnología.

## 1. Empezar por evidencia

- Acordar el objetivo de negocio, público, tarea principal y CTA antes de diseñar.
- Separar hechos confirmados, hipótesis y datos pendientes. No publicar datos inventados.
- Revisar preguntas reales de clientes, objeciones, lenguaje de búsqueda y competidores relevantes.
- Cada recomendación debe conectar con una necesidad del visitante o un objetivo medible.

## 2. Oferta comprensible y honesta

- Describir entregables, cantidad de páginas, revisiones, plazos y requisitos del cliente.
- Definir qué se cobra una vez y qué tiene coste recurrente (dominio, hosting, mantenimiento, licencias).
- Aclarar IVA, forma de pago, exclusiones y cómo se cotiza el trabajo a medida.
- Usar evidencia atribuible: casos, métricas con periodo/base, testimonios con permiso.
- No prometer primeras posiciones, ventas, resultados ni plazos que no controles.

## 3. Contenido y arquitectura

- Una página = una intención principal. Usar títulos descriptivos y jerarquía semántica correcta.
- Mantener portfolio en URLs propias y persistentes; cada caso responde qué problema hubo, qué hiciste y qué cambió.
- Escribir para personas primero; incluir términos relevantes con naturalidad y sin páginas puerta.
- Dar a cada página title, description, canonical y Open Graph propios.
- Mantener sitemap, robots, enlaces internos y redirecciones cuando se cambien slugs.
- Añadir schema solo cuando coincide con contenido visible y verificable.

## 4. Diseño, accesibilidad y movimiento

- Diseñar mobile-first y comprobar teclado, foco visible, contraste y zoom.
- No depender de color, hover, sonido o movimiento para comunicar información.
- Respetar `prefers-reduced-motion`; ofrecer alternativa funcional a componentes animados.
- Reservar animación para feedback y explicación; evitar efectos permanentes, scroll-jacking y movimiento ornamental pesado.
- Usar Skiper40/Vengeance/Animmaster como referencias o piezas selectivas; inspeccionar licencia, origen, dependencias y accesibilidad de cada componente.
- Optimizar imágenes con tamaños explícitos, formatos modernos y lazy loading cuando corresponda.

## 5. Desarrollo

- Preferir HTML semántico y contenido renderizado en servidor/estático; aislar el JavaScript interactivo.
- TypeScript para contenido y componentes; definir esquema de proyectos para evitar campos incompletos.
- Centralizar tokens, navegación, CTA, datos de tarifas y proyectos; evitar duplicar textos.
- Mantener dependencias necesarias y registrar el motivo de incorporar librerías pesadas.
- Nunca guardar secretos en cliente o repositorio. Proteger formularios contra spam y validar en servidor.
- Confirmar que enlaces, formularios, errores y estados vacíos sean claros.

## 6. Conversión y medición

- Mantener un CTA principal por contexto; el CTA debe describir lo que ocurre después.
- Mostrar prueba relevante cerca de la afirmación (caso, proceso, testimonio autorizado).
- Reducir campos del formulario a lo necesario; indicar privacidad y expectativas de respuesta.
- Medir eventos útiles (clic contacto, envío válido, selección de plan) con consentimiento conforme a la normativa aplicable.
- Registrar hipótesis y línea base; cambiar una variable relevante cada vez y observar suficiente tráfico antes de concluir.

## 7. Revisión antes de publicar

- Revisar contenido en móvil y escritorio, rutas y enlaces internos/externos.
- Confirmar que las páginas clave responden con HTML legible e indexable.
- Comprobar títulos, descripciones, canonical, sitemap, robots, imágenes sociales y datos estructurados.
- Comprobar navegación de teclado, foco, contraste, errores de formulario y reduced motion.
- Revisar tamaño de imágenes y scripts de terceros; evitar dependencias que no aporten valor.
- Confirmar permisos de portfolio, licencias de imágenes/componentes, privacidad y textos legales.
- Guardar fecha, versión y decisiones abiertas en el registro del proyecto.

## 8. Mantenimiento

- Actualizar proyectos, disponibilidad y tarifas al cambiar la oferta.
- Revisar Search Console, formularios y analítica periódicamente.
- Mantener framework y librerías con cambios controlados y verificar licencias.
- Revisar links rotos, páginas sin tráfico útil, consultas de búsqueda y conversiones.
- No modificar URL publicada sin redirección permanente y actualización de enlaces.

## Registro de decisiones

Por cambio: fecha, necesidad observada, hipótesis, páginas afectadas, decisión, evidencia y resultado posterior. Las hipótesis que no se validan se corrigen sin maquillarlas como resultados.

## Uso de Graphify

Graphify está instalado a nivel de usuario y su guía Codex está integrada en la raíz del proyecto. Después de configurar una clave de proveedor LLM fuera del repositorio, ejecutar `graphify .` desde esta carpeta para indexar los documentos; actualizar con `graphify update .`. No almacenar credenciales en el proyecto. El primer intento se detuvo antes de extraer contenido por ausencia de clave; no hay todavía un grafo que consultar.

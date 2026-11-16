# Venta de webs

Proyecto de sitio comercial para servicios de diseño y desarrollo web. La planificación y el brief están en `docs/plan.md`; seguir siempre la metodología de `docs/buenas-practicas.md` y tratar `docs/contexto.md` como el brief vivo.

## Estado

Fase de planificación. Datos del propietario, casos publicables, mercado y tres precios siguen pendientes. No inventar ni publicar detalles sin verificarlos.

## Graphify

Graphify CLI está instalado mediante `uv tool` y la integración Codex del proyecto está en `AGENTS.md` y `.codex/hooks.json`. La extracción semántica del brief aún no se ha ejecutado: Graphify requiere una clave de proveedor LLM, que no está configurada. Cuando se habilite una, desde esta carpeta ejecutar `graphify .` para construir `graphify-out/`; después, mantenerla con `graphify update .`. No crear una clave en archivos del proyecto.

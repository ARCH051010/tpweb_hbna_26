# Lectura del documento de GeoUCI

Fuente: **ISW1 GeoUci 4to año**, pestaña `t.0`, documento proporcionado por el usuario. Se leyó el texto completo de los cinco capítulos, los 37 requisitos funcionales, los 12 casos de uso, los flujos alternos, las reglas, las matrices de trazabilidad y la descripción de clases. También se inspeccionaron las 43 capturas de interfaz incrustadas en los casos de uso.

## Objetivo y actores

GeoUCI centraliza la información geográfica del campus de la Universidad de las Ciencias Informáticas. El mapa es la interfaz principal, con localizaciones permanentes y eventos temporales.

**Usuario de la comunidad:** explora y busca puntos, consulta detalles, obtiene recorridos, crea y gestiona sus eventos, valida información, comenta, denuncia y propone nuevas localizaciones.

**Gestor:** consulta estadísticas; administra categorías, localizaciones y tipos oficiales; revisa denuncias y destaca/elimina eventos; suspende/desbloquea usuarios y los promueve; aprueba o rechaza solicitudes de localizaciones.

## Tecnología solicitada

La sección 1.4.3 selecciona Vite y React. La sección 1.4.5 permite JavaScript/TypeScript y el RNF de implementación exige React 19 o posterior. El análisis de homólogos menciona Leaflet/OpenLayers y OpenStreetMap; el usuario eligió expresamente Leaflet con OpenStreetMap.

Nest.js, Prisma y PostgreSQL pertenecen al sistema futuro. El usuario excluyó expresamente backend y base de datos del prototipo.

## Traducción de los casos de uso

| Caso                          | Recorrido del prototipo                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| CU1 · Estadísticas            | Resumen de cantidades, filtros por categoría, ordenación y listados de visitas                                             |
| CU2 · Navegar                 | Menú con búsqueda conjunta; listados, filtros, estados vacíos y detalles                                                   |
| CU3 · Interactuar con eventos | Validación positiva/negativa, comentarios y denuncia con motivo; edición y eliminación de comentarios propios o por gestor |
| CU4 · Gestionar eventos       | Listado propio, formulario de creación/edición y confirmación al eliminar                                                  |
| CU5 · Solicitar localización  | Nombre, categoría, descripción, punto y razón; estado pendiente y seguimiento                                              |
| CU6 · Autenticar              | Formulario y perfiles demo; error, suspensión y recuperación informativa                                                   |
| CU7 · Mapa                    | Arrastre, zoom, selección de marcadores, ficha básica y recorrido ilustrativo                                              |
| CU8 · Categorías              | Listado, creación, edición y eliminación; bloqueo si existen asociaciones                                                  |
| CU9 · Localizaciones          | CRUD, selección múltiple, selección del punto y tipo oficial/comunitario                                                   |
| CU10 · Control de eventos     | Filtro de denunciados, motivos privados, descarte, destacado y eliminación                                                 |
| CU11 · Usuarios               | Búsqueda por nombre/correo/solapín, suspensión con motivo, desbloqueo y promoción confirmados                              |
| CU12 · Solicitudes            | Revisión con mapa, aprobación confirmada y rechazo con motivo; respuesta visible al solicitante                            |

## Reglas conservadas

- Los eventos requieren sesión y pertenecen a su creador. El usuario solo modifica sus propios eventos; el gestor puede eliminar cualquiera.
- Los eventos tienen inicio y finalización; el final debe ser posterior al inicio.
- Los puntos deben quedar dentro de los límites aproximados del campus utilizados en esta demo.
- Solo el gestor crea directamente o aprueba localizaciones y define su tipo oficial.
- Una solicitud pendiente no aparece como localización hasta su aprobación.
- La validación mantiene una única elección vigente por usuario y evento, positiva o negativa. Puede cambiarse o retirarse.
- El creador no puede validar ni denunciar su propio evento. Las denuncias solo aparecen en la administración.
- Los comentarios son públicos. La edición/eliminación corresponde al autor o a un gestor.
- Las categorías asociadas a eventos, localizaciones o solicitudes pendientes no pueden eliminarse.
- La eliminación de elementos, la suspensión, la promoción y la aprobación se confirman en la interfaz.
- No se permite bloquearse ni promoverse a uno mismo. No se permite bloquear al último gestor activo ni degradar gestores.
- El rechazo de una solicitud requiere motivo, que después puede consultar su autor.

## Ambigüedades y decisiones explícitas

1. **Comentarios en eventos propios.** CU3 contiene una excepción que permite comentar el propio evento y, después, un asunto pendiente que lo prohíbe. Se preguntó al usuario. Mientras no exista otra indicación, se aplica la excepción del flujo: se permite comentar y se impide validar/denunciar el propio evento.
2. **Campos del evento.** El formulario abreviado de CU4 omite organizador y fecha, presentes en RF1. Se incluyen organizador, inicio y finalización para respetar tanto RF1 como la duración definida en el modelo conceptual.
3. **Ubicaciones externas.** El modelo conceptual admite locales externos, pero RN6 limita los puntos al campus. Se prioriza RN6 y se explicita que la validación geográfica es aproximada.
4. **Eliminar usuarios.** El objetivo de CU11 menciona eliminar, pero los flujos detallan suspensión/desbloqueo/promoción y los RF no incluyen eliminación. Se implementan los flujos detallados.
5. **Proveedor de identidad.** Se representa la pantalla de acceso y sus estados con cuentas ficticias; no se integra un proveedor real.
6. **Ruta óptima.** Se representa su experiencia con una línea y estimaciones identificadas como ilustrativas. No se implementa un motor de rutas.
7. **Rendimiento.** La frase «cargar en un mínimo de 300 ms» es ambigua para un objetivo de rendimiento. No se transforma en una garantía de tiempos ni se retrasa la carga artificialmente.
8. **Rotación.** El texto de CU7 menciona rotación, pero RF23–24 especifican zoom y desplazamiento. Esta versión implementa estos dos requisitos y no incorpora un complemento de rotación.
9. **Notificaciones.** Los avisos de éxito y error son locales. Las respuestas a solicitudes se reflejan al cambiar de perfil. No hay envío real de notificaciones a organizadores ni suscriptores.

## Dirección visual confirmada

El usuario eligió seguir lo más posible los prototipos del documento. Se conservaron el blanco y negro, las acciones de eliminación rojas, los bordes suaves, las tarjetas de estadísticas, el menú lateral sobre el mapa y las ventanas de detalle y confirmación. Se adaptaron las tablas a móvil y se añadieron etiquetas, foco de teclado, cierre con Escape y mensajes de validación.

# Cobertura y verificación

## Cobertura de los 37 requisitos funcionales

Todos se representan como flujos o estados locales de interfaz. El acceso, la persistencia de negocio y el cálculo de rutas son simulaciones explícitas.

| Requisitos                    | Implementación                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------- |
| RF1–4 · Eventos               | Crear, listar, modificar los propios y eliminar con confirmación                 |
| RF5 · Autenticar              | Acceso de ejemplo para usuario/gestor, error de credenciales y cuenta suspendida |
| RF6 · Solicitar localización  | Formulario, validación, confirmación y seguimiento del estado                    |
| RF7 · Listar localizaciones   | Menú, catálogo y administración                                                  |
| RF8–11 · Categorías           | Listar, crear, modificar y eliminar con bloqueo de asociaciones                  |
| RF12 · Denunciar              | Motivo obligatorio; revisión privada del gestor                                  |
| RF13 · Reaccionar             | Validación binaria y única selección vigente; bloqueo en evento propio           |
| RF14–17 · Comentarios         | Crear, listar, editar y eliminar según autor/rol                                 |
| RF18 · Mapa                   | OpenStreetMap con Leaflet, marcadores diferenciados y esquema alternativo        |
| RF19–20 · Detalles            | Ventanas de localización y evento sobre el mapa                                  |
| RF21–22 · Rutas               | Experiencia ilustrativa hacia lugar/evento con origen seleccionable              |
| RF23–24 · Navegación del mapa | Zoom, arrastre y gestos de Leaflet                                               |
| RF25–27 · Localizaciones      | Crear, eliminar una/varias y modificar                                           |
| RF28–29 · Usuarios            | Listar, buscar y suspender/desbloquear con confirmación                          |
| RF30 · Destacados             | Destacar y retirar destacado; prioridad en el catálogo                           |
| RF31–33 · Solicitudes         | Listar, aprobar con incorporación al mapa y rechazar con motivo                  |
| RF34 · Estadísticas           | Cantidades, categoría, ordenación y listados de visitas de ejemplo               |
| RF35–36 · Búsqueda            | Nombre/descripción en mapa, eventos y lugares, con estado vacío                  |
| RF37 · Tipo de localización   | Oficial o comunitaria desde la gestión o aprobación                              |

## Comprobaciones realizadas

- Compilación de TypeScript y Vite para producción.
- Respuesta HTTP 200 del servidor local.
- Revisión visual en navegador de escritorio y viewport móvil de 390 × 844.
- Carga de las teselas reales de OpenStreetMap y marcadores de Leaflet.
- Menú lateral con búsqueda válida y búsqueda sin resultados.
- Detalle de evento, incremento de validación y bloqueo de validación/denuncia en evento propio.
- Comentario vacío rechazado y publicación de comentario válido.
- Denuncia vacía rechazada y envío de denuncia con motivo.
- Formulario de evento incompleto rechazado; creación con campos válidos y fechas; edición; eliminación confirmada.
- Rechazo de coordenadas fuera del límite aproximado y envío de solicitud válida.
- Acceso demo del gestor y representación de estadísticas.
- Aprobación confirmada de solicitud con creación de localización.
- Rechazo de solicitud con motivo obligatorio.
- Categoría en uso protegida; nueva categoría con errores; creación, edición y eliminación de categoría libre.
- Protección contra bloqueo propio, promoción confirmada y suspensión con motivo obligatorio.
- Creación, edición del nombre y tipo oficial, y eliminación confirmada de localizaciones.
- Visualización del recorrido e inicio/finalización simulados.
- Respuestas de aprobación/rechazo visibles al volver al perfil solicitante.

## Capturas

- [Mapa en móvil](capturas/mapa-movil.jpg)
- [Mapa en escritorio](capturas/prototipo.jpg)

Las pruebas usan únicamente los datos locales y perfiles ficticios del prototipo. Los datos iniciales se restauran al terminar la revisión.

## Límites

No se prueban integraciones con backend, proveedor de identidad, PostgreSQL, notificaciones externas o motores geográficos porque no forman parte del alcance solicitado. Las coordenadas, el perímetro, las rutas y las cifras de visitas son ilustrativos.

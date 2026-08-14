# Erika · Actualizar Apps Script para crear alumnos

Hola Erika,

El panel de FlashMate ya fue actualizado para crear nuevos alumnos desde la web.

Ahora el formulario usa el campo **Plan** con estas opciones:

- `3ero`
- `4to - Egresado`

Para que el botón **Guardar alumno** funcione y grabe en la planilla, falta actualizar el Apps Script de tu Google Sheet.

Importante: para evitar errores de pegado, usa el archivo completo y reemplaza el código actual del Apps Script por ese archivo completo.

## Qué hay que hacer

1. Abrir la planilla **Flash Mate — Registro**.
2. Ir a **Extensiones → Apps Script**.
3. Borrar el código actual del editor de Apps Script.
4. Pegar el contenido completo del archivo `FlashMate_AppsScript_COMPLETO_Erika.gs`.
5. Guardar.
6. Volver a desplegar la Web App:
   - **Implementar → Administrar implementaciones**
   - Editar la implementación actual
   - Elegir nueva versión
   - Guardar / Implementar

## Archivo con el código

El archivo completo listo para compartir/abrir y pegar está en:

`FlashMate_AppsScript_COMPLETO_Erika.gs`

## Qué debe pasar después

Cuando esté publicado el Apps Script actualizado, desde el panel docente se podrá crear un alumno y se agregará a la hoja **Estudiantes** con esta estructura:

`A correo · B nombre · C plan · D fecha_inicio · E fecha_vencimiento · F activo · G guias_extra · H curso`

Con eso el alumno quedará disponible para asignarle guías y ensayos.

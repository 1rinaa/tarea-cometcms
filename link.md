# The Oscar Awards

## Tarea 3 - Uso de un CMS Headless (Comet CMS)

**Universidad Nacional de Costa Rica**  
**Escuela de Informática**  
**EIF-511 Arquitectura de Información**  
**Tarea 3**

---

### Estudiante
**Irina Rivera Chavarría**

---

## 🌐 Sitio web

🔗 [https://oscarsawards.netlify.app/]

**CMS:** [https://cms-una.gt.tc]
**Workspace:** `default`

---

## Descripción del proyecto

The Oscar Awards es una aplicación web interactiva que permite explorar de manera ágil y visual las nominaciones y ganadores de los Premios Óscar. 

Para esta tarea, el sitio fue **adaptado para consumir su contenido desde Comet CMS**, un CMS headless basado en PHP que expone el contenido a través de una API REST. Toda la información (películas, personas, categorías y nominaciones) ahora se administra desde el panel de Comet CMS y se incorpora al sitio Nuxt durante el proceso de build.

---

## Objetivo

Adaptar el sitio web elaborado en el Proyecto 1 al uso de un CMS headless (Comet CMS), cumpliendo con:

- **Modelar** las entidades del dominio (películas, personas, categorías y nominaciones) como *content types* en el CMS, incluyendo relaciones (llaves foráneas) entre ellas.
- **Poblar** el CMS con registros reales del dominio de los Premios Óscar.
- **Integrar** la API REST de Comet CMS con el frontend Nuxt 3.
- **Mantener** todas las funcionalidades del proyecto original (filtros, búsquedas, colecciones, páginas de detalle).

---

## 📊 Alcance de los datos

El contenido del CMS corresponde a un subconjunto representativo del dataset original de los Premios Óscar, administrado directamente en Comet CMS:

- **Content types creados:**
  - `categorias` — Categorías de premios (Mejor Actor, Mejor Película, etc.)
  - `personas` — Actores, actrices y directores nominados
  - `peliculas` — Películas nominadas
  - `nominaciones` — Tabla intermedia que relaciona película + categoría + persona + estado (ganador/nominado)
- **Relaciones (llaves foráneas):**
  - `nominaciones.pel_cula` → `peliculas`
  - `nominaciones.categoria` → `categorias`
  - `nominaciones.persona` → `personas`
- **Categorías incluidas (8):**
  - Mejor Actor
  - Mejor Actriz
  - Mejor Actor de Reparto
  - Mejor Actriz de Reparto
  - Mejor Película
  - Mejor Director
  - Mejor Película de Animación
  - Mejor Película Internacional

---

## 🚀 Instalación y despliegue local

### Requisitos previos
- Node.js 
- npm 

### Pasos

1. **Clonar el repositorio**

  git clone https://github.com/1rinaa/tarea-cometcms.git
  cd tarea-cometcms
  npm install

   //Generar el archivo de datos
   node scripts/filter-oscar-data.cjs

   npm run dev


2. **Configurar las variables de entorno**

Crear un archivo .env en la raíz:

NUXT_COMET_URL=https://cms-una.gt.tc
NUXT_COMET_WORKSPACE=default

3. **Levantar el servidor de desarrollo**

npm run dev


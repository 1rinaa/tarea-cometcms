# The Oscar Awards

## Proyecto de Arquitectura de Información

**Universidad Nacional de Costa Rica**  
**Escuela de Informática**  
**EIF-511 Arquitectura de Información**  
**Proyecto 1**

---

### Estudiante
**Irina Rivera Chavarría**

---

## 🌐 Sitio web

🔗 [https://oscarawards.netlify.app/]

---

## Descripción del proyecto

The Oscar Awards es una aplicación web interactiva que permite explorar de manera ágil y visual las nominaciones y ganadores de los Premios Óscar desde el año 2000 hasta la actualidad. El sitio está diseñado para ofrecer una experiencia de usuario enfocada, rápida y educativa, utilizando un conjunto de datos reducido pero representativo de las principales categorías del cine. (Más información en pagina "Acerca de")

---

## Objetivo

Desarrollar un sistema de información que, a partir de un conjunto de datos estructurado (CSV), permita:

- Visualizar y filtrar nominaciones y ganadores por **año**, **categoría**, **país** y **estado** (ganador/nominado).
- Explorar colecciones temáticas como **"Más Ganadores"**, **"Películas Legendarias"** y **"Países"**.
- Consultar el detalle de **películas**, **personas** y **categorías** con sus respectivos datos.
- Ordenar los resultados de búsqueda según diferentes criterios (año, título, etc.).

---

## 📊 Alcance de los datos

Por razones de rendimiento y enfoque académico, el proyecto utiliza un subconjunto del dataset completo de los Óscar:

- **Período:** ceremonias desde el año **2000 hasta la actualidad** (incluye proyecciones hasta 2026).
- **Categorías incluidas (8):**
  - Mejor Actor
  - Mejor Actriz
  - Mejor Actor de Reparto
  - Mejor Actriz de Reparto
  - Mejor Película
  - Mejor Director
  - Mejor Película de Animación
  - Mejor Película Internacional

> **Nota:** El dataset original contiene más de **13,000 registros** desde 1927. Esta selección permite mantener un rendimiento óptimo, facilitar el mantenimiento del código y ofrecer una experiencia de usuario más limpia y enfocada. Puedes consultar más detalles en la página [Acerca de](/about) del sitio.

---

## ⚙️ Procesamiento de datos

El archivo CSV original (`the_oscar_award.csv`) fue procesado mediante un script en Node.js (`scripts/generateOscarData.js`) que realiza las siguientes transformaciones:

1. **Filtrado:** se conservan únicamente los registros del año 2000 en adelante y de las categorías seleccionadas.
2. **Traducción:** las categorías se normalizan al español.
3. **Agrupación:** los registros se agrupan por **película + categoría + año**, consolidando múltiples nominados en un único objeto con un array de personas (`people`).
4. **Asignación de país:** cada película y persona tiene un país de origen normalizado (en español).
5. **Expansión de productores:** se incluyen productores clave (como Toshio Suzuki) que comparten nominaciones con directores.
6. **Generación de JSON:** el resultado se guarda en `public/data/oscar-data.json`, que es consumido por la aplicación.

---

## Funcionalidades principales

### Búsqueda y filtros
- Búsqueda por texto (película, persona, categoría, año).
- Filtros combinados por:
  - Año
  - Categoría
  - País
  - Estado (Ganador / Nominado)
- Ordenamiento de resultados:
  - Año (más reciente / más antiguo)
  - Título (A-Z / Z-A)

### Colecciones temáticas
- **Más Ganadores:** actores, actrices y directores con mayor número de premios Óscar.
- **Películas Legendarias:** películas con más nominaciones y premios.
- **Países:** exploración de películas y personas por país de origen.
- **Décadas:** exploración de películas y personas por décadas.

### Páginas de detalle
- **Película:** información general, nominaciones y ganadores asociados.
- **Persona:** historial de nominaciones y premios, categorías y películas destacadas.

### 🧭 Navegación
- Breadcrumbs contextuales que facilitan la navegación.
- Enlaces cruzados entre elementos (personas, películas, categorías, años).

---

## 🛠️ Tecnologías utilizadas

- **Framework:** Nuxt 3 (Vue 3)
- **Estilos:** Tailwind CSS
- **Lenguaje:** JavaScript (ESM)
- **Gestión de datos:** JSON generado desde CSV
- **Despliegue:** Netlify
- **Control de versiones:** Git + GitHub

---

## 🚀 Instalación y despliegue local

### Requisitos previos
- Node.js (versión 18 o superior)
- npm 

### Pasos

1. **Clonar el repositorio**

   git clone https://github.com/tu-usuario/oscar-awards.git
   cd oscar-awards
   npm install

   //Generar el archivo de datos
   node scripts/filter-oscar-data.cjs

   npm run dev


# Fuentes

Los datos originales provienen del conjunto público disponible en Kaggle:
[The Oscar Award Dataset](https://www.kaggle.com/datasets/unanimad/the-oscar-award)


# Notas
Este proyecto tiene fines académicos y de demostración.
La selección de datos y categorías responde a criterios de usabilidad y rendimiento.
Se priorizó una experiencia de usuario limpia, visualmente atractiva y coherente con la temática de los premios Óscar.
Para información completa de todas las categorías y años históricos, se recomienda consultar el sitio oficial de la Academia.
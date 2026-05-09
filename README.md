# La Revista — Mini revista digital

Portal de noticias de demostración con **dos vistas**: portada y detalle de artículo por slug. Los contenidos se cargan desde un JSON local. Proyecto alineado con una prueba técnica frontend (Next.js App Router, TypeScript, Tailwind CSS).

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- React 19
- TypeScript (modo strict)
- Tailwind CSS 4
- Iconos: [lucide-react](https://lucide.dev/)

## Funcionalidades principales

- **Portada (`/`)**: cabecera con nombre del medio y navegación por categorías, artículo destacado, grid de artículos y pie de página.
- **Detalle (`/articulo/[slug]`)**: cabecera, imagen de portada, cuerpo con bloques (párrafos, títulos, citas, imágenes, listas), compartir en redes y artículos relacionados.
- **404** personalizado si el slug no existe.
- Diseño **responsive** (mobile-first).

## Requisitos

- Node.js 18+ (recomendado la versión LTS actual)

## Puesta en marcha

```bash
npm install
npm run dev
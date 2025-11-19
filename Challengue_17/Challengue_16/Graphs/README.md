# Design concept - Advanced SASS + CSS Modules

Este reto ahora incluye una capa visual mucho más cuidada que expone los conceptos avanzados de SASS solicitados (tokens, mixins, funciones, herencia, maps y `@forward`). Toda la interfaz mantiene la paleta original pero suma glassmorphism, tarjetas elevadas, formularios con feedback y transiciones suaves.

## Lo que se añadió
- Carpeta `src/styles/sass/` con parciales modulares:
  - `_variables.scss` → paleta original, escalas de espaciado/tipografía, radios, breakpoints, sombras, variants para botones y badges.
  - `_functions.scss` → cálculos de espaciado, gradientes y escalas de color para refinar fondos o acentos.
  - `_mixins.scss` → sombras suaves, botones con ripple, glass effect, focus ring y helper responsivo.
  - `_placeholders.scss` → herencia (`%panel`, `%text-muted`, `%inline-pill`) para reutilizar estructuras.
  - `_base.scss` y `_components.scss` → layout global, formularios renovados, tarjetas glass y utilitarios como badges o listas. Variantes de botones/badges se generan con `@each` partiendo de maps.
  - `_tokens.scss` → re-exporta variables/funciones con `@forward` para que los CSS Modules solo hagan `@use` una vez.
- Componentes (`DesignHero`, `FeatureCard`, `Gallery`, formularios en `App.jsx` y `GraphViz`) renovados con los mixins y funciones nuevas para tener jerarquía más clara, mejor contraste en la visualización y estados hover/active consistentes.

## Cómo correr el proyecto
1. Instala dependencias (incluye `sass` y `sass-embedded` que ya están en `devDependencies`):
   ```bash
   npm install --legacy-peer-deps
   ```
2. Servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Build de producción:
   ```bash
   npm run build
   ```

> Tip: puedes extender los maps dentro de `src/styles/sass/_variables.scss` para crear nuevos temas o variantes de botones sin tocar los componentes.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

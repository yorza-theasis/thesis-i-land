# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (runs on http://localhost:3000)
- **Build:** `npm run build`
- **Production build (with clean):** `npm run build-prod`
- **Start production server:** `npm run start`
- **Lint:** `npm run lint`
- **Format:** `npm run format` (ESLint fix + Prettier for JSON/YAML)
- **Type check:** `npm run check-types`
- **Bundle analysis:** `npm run build-stats`

There is no test suite configured in this project.

## Architecture

This is a Next.js 14 landing page using the Pages Router (`src/pages/`), Tailwind CSS 3, and TypeScript.

### Component Layer System

The codebase follows a three-tier component architecture:

1. **Pages** (`src/pages/index.tsx`) — Entry point, renders the `Base` template
2. **Templates** (`src/templates/`) — Page-level composition blocks (Base, Hero, Banner, Footer, VerticalFeatures, Sponsors, Logo). `Base.tsx` is the main template that composes all sections.
3. **Atomic components** (`src/background/`, `src/button/`, `src/cta/`, `src/feature/`, `src/footer/`, `src/hero/`, `src/layout/`, `src/navigation/`) — Reusable UI primitives used by templates

### Key Files

- `src/utils/AppConfig.ts` — Global site configuration (site name, title, description, locale)
- `src/layout/Meta.tsx` — SEO metadata component using `next-seo`, handles Open Graph tags and favicons
- `next.config.js` — Enables React strict mode, trailing slashes, and optional bundle analyzer via `ANALYZE=true` env var

### Styling

- Tailwind CSS with PostCSS, integrated with `styled-jsx` via `styled-jsx-plugin-postcss`
- Custom `primary` color palette and `gray` scale defined in `tailwind.config.js`
- Custom `hero` line-height (`4.5rem`) in theme extensions
- Global styles in `src/styles/global.css`
- Uses `<img>` tags instead of `next/image` (SSG compatibility)

### Code Quality

- ESLint extends Airbnb + Next.js Core Web Vitals + Prettier
- TypeScript files additionally use: `simple-import-sort`, `unused-imports`, `tailwindcss` plugins
- `import type` is enforced via `@typescript-eslint/consistent-type-imports`
- Imports must be auto-sorted (`simple-import-sort/imports`)
- Single quotes, auto line endings (Prettier config in `.eslintrc`)
- Husky pre-commit hook runs lint-staged sequentially (ESLint fix, then type checking)

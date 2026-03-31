# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tax guide website for Kazakhstan sole proprietors (IP) on simplified taxation (USN). Built with **Astro 6**, deployed to **GitHub Pages** at `qazaqtaxcheatsheet.fyi`. Russian only. Content migrated from Notion.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview production build locally |

No test framework or linter configured. Run `npm install` before any command. Node >= 22.12.0 required.

## Architecture

- **Astro file-based routing**: pages in `src/pages/`
- **Layout**: `src/layouts/Layout.astro` — master HTML shell with CSS custom properties, dark/light theme via `data-theme`, JSON-LD, OG tags
- **Styling**: Pure CSS with custom properties (no Tailwind). Accent color: `#2d9cdb` (cerulean blue)
- **Theme system**: Dark/light mode via `data-theme` attribute on `<html>`, persisted to localStorage
- **Data**: `src/data/*.json` — structured tax data, bank BIK codes, regional rates, salary examples
- **Content**: All text is inline in Astro components (no i18n system). Edit page content directly in component files.

## Page Structure

Each page is a thin wrapper in `src/pages/` that imports Layout + a page component from `src/components/`. The page component contains the actual content and styling.

11 routes: `/`, `/taxes/`, `/faq-currency/`, `/faq/`, `/registration/`, `/tax-rates/`, `/invoice/`, `/unk/`, `/banks/`, `/georgia/`, `/links/`

## Data Files

- `taxes-2026.json` — tax payment types, rates, KNP codes, minimum amounts
- `banks.json` — 31 Kazakhstan banks with BIK codes
- `regions-2026.json` — tax rates by city (Almaty 3%, Astana 3%, Shymkent 2%)
- `salary-examples.json` — pre-calculated examples for 600k salary

When tax rates change yearly, update the JSON files and the content in page components.

## Gotchas

- **Custom domain**: `qazaqtaxcheatsheet.fyi` — configured via `public/CNAME` and `site` in `astro.config.mjs`
- **Scoped styles + child components**: Scoped `<style>` won't apply to child component elements. Use `<style is:global>` or `:global()` selectors
- **Footer is in Layout**: Rendered by `Layout.astro`, not individual pages

## Deployment

Pushes to `main` trigger GitHub Actions (`.github/workflows/deploy.yml`) which builds with Astro and deploys to GitHub Pages.

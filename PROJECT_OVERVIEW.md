# MH13 CAFÉ Website — Project Overview

## Summary
This repository contains a single-page **React + TypeScript** website for **MH13 CAFÉ** built with **Vite**. The UI is designed as a marketing site with multiple sections that behave like separate pages—**Home, Menu, Our Story, Gallery, Reservations, and Contact**—all rendered inside one React app and switched via component state.

## What the project does
- Presents a complete café website experience:
  - **Home**: hero video, brand messaging, featured items, gallery preview, rotating testimonials.
  - **Menu**: category tabs (Espresso, Pour Over, Pastries, Seasonal).
  - **Our Story**: timeline + team + brand values.
  - **Gallery**: category filtering + lightbox viewer.
  - **Reservations**: reservation form with client-side validation + confirmation UI.
  - **Contact**: contact form with validation + FAQ + embedded Google Map.
- Includes UI polish:
  - Scroll-reactive navigation bar.
  - Scroll reveal animations (IntersectionObserver).
  - Gallery lightbox supports mouse and keyboard (left/right/escape).

## Tech stack
- **Frontend**: React (TSX)
- **Build tool**: Vite
- **Styling**:
  - Tailwind is configured in the project.
  - The main visual system uses a mix of inline styles and an embedded CSS string for animations and utility classes.
- **UI libraries**: Radix UI + other component-oriented libraries are present in dependencies, though the current site UI is mostly custom/inlined.

## Key files
- `index.html` — Vite entry HTML
- `src/main.tsx` — mounts the React app into `#root`
- `vite.config.ts` — Vite configuration (React + Tailwind plugin, `@` alias)
- `src/app/App.tsx` — **core of the project**:
  - Defines all page components (Home/Menu/Story/Gallery/Reservations/Contact)
  - Defines shared layout components (Nav, Footer)
  - Holds content/data constants (menu items, gallery images, testimonials, timeline, FAQ)
  - Defines interactions (reveal-on-scroll, lightbox, forms)
- `src/styles/*` — global CSS, fonts, and theme-related files

## How navigation works
- The app keeps a `page` state (union type) like `"home" | "menu" | ...`.
- Clicking nav items swaps which page component is rendered.
- Each page is a React component defined in `App.tsx`, and the layout stays consistent (Nav + Footer).

## Forms and validation
- **Reservations** and **Contact** forms are client-side:
  - Validate required fields and email format.
  - Show error messages inline.
  - After successful submit, show a confirmation panel (no backend call shown in the provided code).

## Project scope
The project is focused on delivering a visually complete café website front-end. Most content is embedded directly in code (images use external URLs), and the behavior is primarily handled in `src/app/App.tsx`.


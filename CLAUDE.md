# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Gsitegy is a static one-page marketing site for a cloud & AI consulting business. There is no build system, package manager, or framework — it's plain HTML/CSS/JS served directly.

- `index.html` — the entire page, section by section (nav, hero, partners, services, why-us, process, testimonials, contact, footer). All sections live in this one file; there is no templating or componentization.
- `styles.css` — all styling, organized into `/* === SECTION === */` comment blocks that mirror the HTML sections (RESET & BASE, BUTTONS, BADGE, NAV, HERO, PARTNERS, SERVICES, WHY US, PROCESS, TESTIMONIALS, CONTACT, FOOTER). Design tokens (colors, radii, shadows) are defined once as CSS custom properties in `:root`.
- `main.js` — small vanilla-JS behaviors: hamburger menu toggle, nav scroll shadow, contact form submission via EmailJS, and an IntersectionObserver-driven fade-in for cards/steps.
- `arch.xml` — a draw.io/diagrams.net architecture diagram (unrelated to the site's own code; depicts an AWS multi-tenant AI document-processing system, likely used as sales/reference material).

## Running locally

There's no dev server or build step. Open `index.html` directly in a browser, or serve the directory with any static file server, e.g.:

```
python3 -m http.server 8000
```

## Contact form / EmailJS

The contact form in `index.html` (`#contactForm`) is wired to EmailJS via the CDN script tag in `<head>`. `main.js` currently uses placeholder credentials (`YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`) — the form will not actually send email until these are replaced with real EmailJS IDs. The expected template variables are `from_name`, `from_email`, `company`, `service`, `message`.

## Editing conventions

- Keep new CSS grouped under the relevant `/* === SECTION === */` header rather than appended at the end of the file.
- Reuse existing CSS custom properties (`--brand`, `--dark`, `--text`, `--radius`, etc.) instead of hardcoding new colors/spacing.
- Section anchors (`#services`, `#why-us`, `#partners`, `#testimonials`, `#contact`) are referenced by both the nav and footer links — keep IDs in sync if renaming a section.

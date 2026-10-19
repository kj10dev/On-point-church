# On-Point Church Website

Modern, warm, mobile-first church website — Next.js 14 + Tailwind CSS (JavaScript/React).

## Features
- **Hero** — full-bleed video loop, "You belong here", dual CTAs (Plan Your Visit / Watch Live)
- **Plan Your Visit modal** — local welcome guide (name → household/kids → parking) with a directions link
- **Media Hub** — livestream embed, live chat drawer, sermon archive filterable by series/speaker/topic, audio player, downloadable notes
- **Small Group Finder** — search + filter by neighborhood, day, life stage; call the church to ask about joining
- **Events Calendar** — month/list views, category tags, 1-click .ics "Add to Calendar", event details and phone contact
- **Giving widget** — one-time/recurring selection and fund/amount preview; call the church to arrange a gift
- **Prayer Wall** — anonymous/public demo requests & praises and a local "I'm praying for this" counter
- **Contact links** — section navigation, click-to-call, and map directions
- Accessibility: WCAG AA focus rings, keyboard-trapped modals, aria labels/live regions, skip link

## Live integrations

This is currently a front-end demo. Visit details and prayer posts are kept only in the current browser session; group requests, event registrations, and contact messages are not submitted to a server. Online payments, livestream, live chat, and sermon audio require the church's real provider URLs and configuration before they can work. The site now states these limitations instead of presenting demo interactions as completed submissions or payments.

## Run
```bash
npm install
npm run dev   # http://localhost:3000
```

> Mock data lives in `lib/data.js`. Swap video/chat/iframe URLs for your real streams (YouTube Live, etc.).

## Deploy to GitHub Pages

The site is exported as a static Next.js site and deployed by GitHub Actions when changes are pushed to `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** (the existing branch-based Pages source must be changed once). The workflow uses the Pages base path and publishes the generated `out/` directory.

To build the Pages version locally, run:

```bash
npm ci
npm run build:pages
```

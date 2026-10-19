# On-Point Church Website

Modern, warm, mobile-first church website — Next.js 14 + Tailwind CSS (JavaScript/React).

## Features
- **Hero** — full-bleed video loop, "You belong here", dual CTAs (Plan Your Visit / Watch Live)
- **Plan Your Visit modal** — 3-step form (name → email/kids → parking) → personalized welcome guide + embedded map
- **Media Hub** — livestream embed, live chat drawer, sermon archive filterable by series/speaker/topic, audio player, downloadable notes
- **Small Group Finder** — search + filter by neighborhood, day, life stage; "Request to Join" modal
- **Events Calendar** — month/list views, category tags, 1-click .ics "Add to Calendar", registration popup
- **Giving widget** — One-time/Recurring tabs, fund designation, wallet buttons (Apple/Google Pay, SnapScan styling)
- **Prayer Wall + Connect Card** — anonymous/public requests & praises, "I'm praying for this" live counter, connect form to leadership
- Accessibility: WCAG AA focus rings, keyboard-trapped modals, aria labels/live regions, skip link

## Run
```bash
npm install
npm run dev   # http://localhost:3000
```

> Mock data lives in `lib/data.js`. Swap video/chat/iframe URLs for your real streams (YouTube Live, etc.).

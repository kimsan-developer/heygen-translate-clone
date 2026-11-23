# HeyGen Translate — Page Clone

A pixel-faithful, fully interactive clone of the [HeyGen `/translate`](https://www.heygen.com/translate) landing page, built from scratch as an educational front-end demo.

> **Disclaimer** — This is a demo built for educational purposes only. It is **not affiliated with, endorsed by, or connected to HeyGen** in any way. All copy, layout and imagery here are recreated or AI-generated placeholders. Visit the real product at [heygen.com](https://www.heygen.com).

## What's inside

- **Sticky navbar** with four hover dropdown menus (Platform / Use cases / Developers / Resources) and a mobile hamburger menu
- **Hero + interactive translation widget** — drag-and-drop video upload (with type validation), YouTube link input (with URL validation), a 64-language picker, and a simulated 5-stage translation pipeline (upload → audio extraction → voice cloning → translation → lip-sync rendering) with animated progress, per-step status icons, a localized subtitle result card, and download/reset actions
- **Animated stats bar** (183M videos / 158M avatars / 27M videos translated) with scroll-triggered count-up, logo wall, and "Why Leading" section
- **"Why Use" section** with 11 language tabs driving localized caption previews + 6 feature cards
- **Dark avatars section** with 4-language tabs and 3 feature cards
- **How-to steps, Trivago case study, and animated metrics** (80% / 30 markets / 1 day)
- **Testimonials** with a 4.8 rating block and a 20-item SEO link cloud
- **FAQ accordion** (11 Q&As) and a gradient final CTA + multi-column footer

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, standalone output)
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) primitives (Radix UI)
- lucide-react icons

## Getting started

### Prerequisites

- Node.js 20+ (or [Bun](https://bun.sh) 1.1+)

### Install & run

```bash
# 1. install dependencies
bun install        # or: npm install

# 2. environment (Prisma uses SQLite locally)
cp .env.example .env

# 3. generate the Prisma client
cp .env.example .env
bunx prisma generate   # or: npx prisma generate

# 4. start the dev server
bun run dev           # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The landing page itself does not touch the database — Prisma is included only because the project template ships with a SQLite datasource. The translation pipeline in the hero widget is a front-end simulation (no real API calls).

## Image assets

The 7 PNG files under `public/assets/` (hero still, avatar demo, testimonial portraits, CTA still) are AI-generated originals. Binary files are not stored in this repository — the app builds and runs fine without them, but images will 404 until you provide your own.

Two options:

1. Drop any replacement images into `public/assets/` using the same file names:
   - `hero-still.png`, `feature-vlogger.png`, `avatar-demo.png` (16:9-ish, 1344×768)
   - `testimonial-1.png`, `testimonial-2.png`, `testimonial-3.png` (square headshots, 1024×1024)
   - `cta-still.png` (wide, 1344×768)
2. If you have the `z-ai` CLI installed, run the bundled generator:

   ```bash
   bash scripts/gen-images.sh
   ```

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # root layout, metadata, Toaster
│   ├── page.tsx              # assembles all page sections
│   ├── globals.css           # Tailwind 4 theme + waveform keyframes
│   └── api/route.ts          # sample API route
├── components/
│   ├── heygen/
│   │   ├── nav.tsx           # sticky navbar + dropdowns + mobile menu
│   │   ├── hero.tsx          # interactive translate widget
│   │   ├── stats.tsx         # count-up stats, logo strip, why-leading
│   │   ├── why-use.tsx       # language tabs + feature list
│   │   ├── avatars.tsx       # dark avatar section
│   │   ├── howto.tsx         # steps, case study, metrics
│   │   ├── testimonials.tsx  # quotes, rating, SEO links
│   │   ├── faq.tsx           # accordion
│   │   ├── footer.tsx        # final CTA + footer
│   │   └── hg-ui.tsx         # shared primitives (logo, buttons, waveform…)
│   └── ui/                   # shadcn/ui components actually used
├── hooks/                    # use-toast, use-mobile
└── lib/                      # cn() helper, prisma client
```

## Scripts

| Command | Description |
| --- | --- |
| `dev` | Start the dev server on port 3000 |
| `build` | Production build (standalone) |
| `start` | Run the standalone production server |
| `lint` | ESLint |
| `db:push` / `db:generate` / `db:migrate` | Prisma database helpers |

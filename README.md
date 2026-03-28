# Irregular Pearl

A piece-centric knowledge platform for classical music. Every musical work gets a living page with structured metadata, edition comparisons, community ratings, and threaded discussion from musicians working on the same piece.

## Stack

- **Astro** — islands architecture, near-zero JS for static content
- **React** — interactive islands (discussions, ratings, working-on button)
- **Supabase** — auth (Google OAuth), Postgres, Realtime subscriptions
- **Tailwind CSS v4**
- **Cloudflare Pages** — edge deployment

## Run locally

```bash
bun install
bun run dev
```

The app works without Supabase credentials using placeholder data. To enable auth, discussions, and ratings, add a `.env` file:

```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Enable Google OAuth in Authentication > Providers
4. Seed the database:

```bash
./seed.sh
```

Requires `SUPABASE_SERVICE_ROLE_KEY` in `.env` or as an env var.

## Deploy

Connected to Cloudflare Pages. Deploys on push to `main`.

Build command: `bun install && bun run build`
Output directory: `dist`

## Project structure

```
src/
  components/     # Astro components + React islands
  data/           # Seed data (15 pieces, expandable to 100)
  layouts/        # Base HTML layout
  lib/            # Supabase client, auth hook, types
  pages/          # Homepage + piece/[id] pages
  styles/         # Tailwind global styles
supabase/
  schema.sql      # Full database schema with RLS
  seed.ts         # Database seed script
```

## License

AGPL-3.0

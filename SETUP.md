# Nocturnal — Supabase Lead Capture Setup

## What was done automatically

A `leads` table was created in your Supabase project (`AbeeCodr's Project`) with:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Auto-generated primary key |
| `email` | text | Visitor's email |
| `name` | text | Optional |
| `source` | text | Which CTA: `cta_hero`, `cta_pricing`, `cta_banner` |
| `page` | text | URL path where the click happened |
| `created_at` | timestamptz | Auto-set on insert |

RLS is enabled: anonymous visitors can insert, only you (authenticated) can read.

---

## What to add to your repo

### 1. Install Supabase client

```bash
cd nocturnal-web
npm install @supabase/supabase-js
```

### 2. Add environment variables

Copy `.env.local` into the root of `nocturnal-web/`:

```
NEXT_PUBLIC_SUPABASE_URL=https://fhzhdmkjuxniyekycjeu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

For Vercel: add both vars in **Project Settings → Environment Variables**.

### 3. Copy files into the repo

```
lib/supabase.ts              → nocturnal-web/lib/supabase.ts
components/CTAModal.tsx      → nocturnal-web/components/CTAModal.tsx
components/CTAModal.module.css → nocturnal-web/components/CTAModal.module.css
components/PricingSection.tsx  → replace nocturnal-web/components/PricingSection.tsx
app/page.tsx                 → replace nocturnal-web/app/page.tsx
```

### 4. Deploy

```bash
vercel --prod
```

The `.env.local` file is gitignored — Vercel env vars are set separately in the dashboard.

---

## Viewing your leads

Go to your Supabase dashboard:
**https://supabase.com/dashboard/project/fhzhdmkjuxniyekycjeu/editor**

Or run this query in the SQL editor:

```sql
select name, email, source, created_at
from leads
order by created_at desc;
```

---

## How the tracking works

Every "Book a Call" button across the site (hero, pricing cards, CTA banner, nav) opens a modal. The modal collects name (optional) + email (required), then inserts a row into `leads` with the source identifier so you know which section converted.

Sources logged:
- `cta_hero` — hero section button
- `cta_pricing` — any pricing card
- `cta_banner` — bottom CTA banner

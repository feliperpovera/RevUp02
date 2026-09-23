# RevUp Agency Group — Website

Marketing site for RevUp Agency Group (Vite + React + TypeScript + Tailwind).

## Develop

```bash
npm install
npm run dev          # frontend only, http://localhost:8080
npm run dev:full     # frontend + /api functions via Cloudflare (needs .dev.vars)
```

## Forms backend

`functions/api/submit.ts` is a Cloudflare Pages Function that emails every form
submission to `NOTIFY_TO` through Resend. Config lives in `wrangler.toml`; the
API key is a secret: `npx wrangler pages secret put RESEND_API_KEY`.

## Deploy

```bash
npm run deploy       # builds and publishes to Cloudflare Pages
```

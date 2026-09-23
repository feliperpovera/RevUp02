# RevUp Agency Group — Website

Marketing site for RevUp Agency Group (Vite + React + TypeScript + Tailwind).
Hosted on Hostinger (static files + `.htaccess` SPA fallback).

## Develop

```bash
npm install
npm run dev          # http://localhost:8080
```

## Forms

`worker/submit.js` is a Cloudflare Worker (`revup-forms`) that emails every form
to `MAIL_TO` through Resend, from the verified `revupagencygroup.com` domain.

```bash
npm run deploy:forms                                   # deploy the Worker
cd worker && npx wrangler secret put RESEND_API_KEY    # set the Resend key once
```

## Deploy the site

`npm run build`, then publish `dist/` to the `hostinger` branch — Hostinger's
Git deployment pulls that branch into `public_html`.

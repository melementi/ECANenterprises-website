# ECAN Enterprises Website

Marketing site for ECAN Enterprises in London, Ontario: computer hardware sales, custom PC builds, repairs and upgrades, and custom software/web development.

## Stack

Static HTML with Tailwind CSS via CDN. There is no build step or backend.

## Structure

- `index.html` — single-page site
- `assets/images/` — `.webp` images with `.jpg` fallbacks
- `favicon.svg` — optimized browser icon
- `robots.txt`, `sitemap.xml` — SEO files

## Deploying

Point Cloudflare Pages or another static host at the repository root. Use no build command and `/` as the output directory.

## Notes

- The quote form opens a pre-filled `mailto:` draft to `contact@ecanenterprises.ca`; replace it with a form endpoint if server-side submission is needed.
- Replace placeholder photography in `assets/images/` with production images when available.
- The favicon’s embedded provenance metadata was removed to reduce payload size; its visible artwork is unchanged.

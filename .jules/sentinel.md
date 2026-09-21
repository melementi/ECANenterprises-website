## 2024-05-28 - Cloudflare Pages Security Headers Architecture
**Vulnerability:** Missing HTTP security headers (X-Frame-Options, CSP, etc.) on static deployments.
**Learning:** Cloudflare Pages doesn't use standard server configs (like Nginx/Apache) and requires a specific `_headers` file at the build output root to set HTTP headers.
**Prevention:** Always include a `_headers` file for static site deployments on Cloudflare Pages to ensure defense in depth for static assets.

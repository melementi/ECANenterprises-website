## 2024-05-24 - Add CSP and Security Headers
**Vulnerability:** Missing Content Security Policy and security headers in static site
**Learning:** X-Frame-Options and X-Content-Type-Options cannot be configured via HTML meta tags, they must be set via HTTP response headers (e.g. `_headers` for Cloudflare Pages/Netlify). Only CSP works properly in a meta tag for a static HTML file without proper hosting configuration.
**Prevention:** Configure standard security headers at the hosting/CDN level rather than just dropping meta tags in HTML.

## 2024-05-28 - Cloudflare Pages Security Headers Architecture
**Vulnerability:** Missing HTTP security headers (X-Frame-Options, CSP, etc.) on static deployments.
**Learning:** Cloudflare Pages doesn't use standard server configs (like Nginx/Apache) and requires a specific `_headers` file at the build output root to set HTTP headers.
**Prevention:** Always include a `_headers` file for static site deployments on Cloudflare Pages to ensure defense in depth for static assets.

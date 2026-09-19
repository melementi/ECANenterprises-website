## 2024-05-24 - Add CSP and Security Headers
**Vulnerability:** Missing Content Security Policy and security headers in static site
**Learning:** X-Frame-Options and X-Content-Type-Options cannot be configured via HTML meta tags, they must be set via HTTP response headers (e.g. `_headers` for Cloudflare Pages/Netlify). Only CSP works properly in a meta tag for a static HTML file without proper hosting configuration.
**Prevention:** Configure standard security headers at the hosting/CDN level rather than just dropping meta tags in HTML.

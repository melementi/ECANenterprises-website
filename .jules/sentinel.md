## 2024-05-18 - Cloudflare Pages Security Headers
**Vulnerability:** Missing security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
**Learning:** Cloudflare Pages uses a `_headers` file at the root to set headers. In Vite-based projects, this file must be placed in `public/_headers` to be included in the build output. But this repo has no build step and output directory is `/`, so placing it at the root is correct for this specific repo structure.
**Prevention:** Always verify the framework's build process to ensure static configuration files like `_headers` are properly output to the deployment root directory.

# Kgothatso Nkadimeng — Portfolio

Personal portfolio: Computer Science at Wits · Software Engineering · AI & ML.

A static site with no build step and no runtime dependencies.

```
index.html            page content (semantic HTML, JSON-LD, Open Graph)
assets/css/styles.css design tokens + all styles (light/dark, responsive, reduced-motion)
assets/js/main.js     mobile nav, active-section highlight, scroll reveal, contact form
assets/img/           optimised portrait (WebP + JPEG, 480/800w), social card, icons
favicon.svg
cv.pdf
```

Run locally: `python3 -m http.server` and open http://localhost:8000.
Deploy: any static host (GitHub Pages, Vercel, Netlify), serving the repo root.

## Updating the CV

`cv.pdf` is generated from `resume/cv.html`. After editing the HTML, regenerate it with:

```bash
google-chrome --headless=new --no-pdf-header-footer --virtual-time-budget=6000 \
  --print-to-pdf=cv.pdf "file://$PWD/resume/cv.html"
```

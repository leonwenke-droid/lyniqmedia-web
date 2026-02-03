# LYNIQ Media – AI Agency Website

A single-page site for LYNIQ Media with hero, services, about, work, and contact sections. Uses your LYNIQ logo and brand (cyan–blue gradient, white text, dark background).

## Run locally

Open `index.html` in a browser, or use a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Structure

- `index.html` – Main page
- `styles.css` – Layout and LYNIQ brand styles
- `main.js` – Mobile nav toggle and contact form placeholder
- `assets/logo.png` – LYNIQ Media logo

## Contact form

The contact form currently shows a “Message sent” state on submit. To send real emails, wire it to your backend or a service (e.g. Formspree, Netlify Forms, or your own API).

## Deploy

You can deploy this folder to any static host (Netlify, Vercel, GitHub Pages, Replit, etc.) by uploading the project or connecting your repo.

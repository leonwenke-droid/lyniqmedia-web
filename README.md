# LYNIQ Media – AI Agency Website

Website für LYNIQ Media mit Hero, Services, Ablauf, Ergebnisse, Über uns und Kontakt. KI-Infrastrukturen und Automatisierungssysteme für den Mittelstand.

## Lokal ausführen

```bash
# Python 3
python3 -m http.server 8000

# Node (npx)
npx serve .
```

Dann `http://localhost:8000` im Browser öffnen.

## Struktur

- `index.html` – Startseite
- `services.html`, `ablauf.html`, `kontakt.html`, etc. – Unterseiten
- `styles.css` – Layout und LYNIQ-Brand-Styles
- `main.js` – Navigation, Formulare, Chatbot, Cookie-Banner
- `api/webhook/` – Vercel Serverless Functions (Webhook-Proxys)
- `assets/` – Logo, Favicon, Bilder

## Kontaktformular & Webhooks

Die Formulare senden an API-Endpunkte, die Daten an n8n weiterleiten. **Vercel-Umgebungsvariablen** setzen:

- `N8N_CONTACT_WEBHOOK` – Kontaktformular
- `N8N_DEMO_WEBHOOK` – Demo-Voice-Agent
- `N8N_CHATBOT_WEBHOOK` – KI-Chatbot

Ohne diese Variablen liefern die Endpunkte 503.

## Build

```bash
npm run build
```

Erzeugt `dist/` mit minifiziertem CSS/JS und allen statischen Dateien. Vercel führt den Build automatisch aus und deployed aus `dist/`.

## Deploy

Statischer Host (Vercel, Netlify, GitHub Pages, etc.). Bei Vercel:
- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- Umgebungsvariablen in den Project Settings konfigurieren

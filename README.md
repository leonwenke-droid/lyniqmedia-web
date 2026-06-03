# LYNIQ Media – Website

**Aktuell: Wartungsmodus** – Es wird nur eine Beratungs-Landingpage ausgeliefert. Die bisherige Website liegt in `_legacy/` und wird für den Neubau als Referenz genutzt.

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

## Build (Wartungsmodus)

```bash
npm run build
```

Erzeugt `dist/` nur mit `wartung.html` (als `index.html`), Logo/Assets und API-Routen. Alle URLs zeigen die Wartungsseite.

## Deploy

Statischer Host (Vercel, Netlify, GitHub Pages, etc.). Bei Vercel:
- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- Umgebungsvariablen in den Project Settings konfigurieren

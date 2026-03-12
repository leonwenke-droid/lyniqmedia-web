# Beitragen zu LYNIQ Media Website

Vielen Dank für Ihr Interesse an diesem Projekt.

## Entwicklung

1. Repository forken
2. Branch erstellen: `git checkout -b feature/mein-feature`
3. Änderungen committen: `git commit -m 'Feature: Beschreibung'`
4. Branch pushen: `git push origin feature/mein-feature`
5. Pull Request erstellen

## Lokal ausführen

```bash
# Python 3
python3 -m http.server 8000

# oder mit Node
npx serve .
```

Dann `http://localhost:8000` im Browser öffnen.

## Projektstruktur

- `index.html` – Startseite
- `*.html` – Unterseiten (services, ablauf, kontakt, etc.)
- `styles.css` – Globale Styles
- `main.js` – Interaktionen (Navigation, Formulare, Chatbot)
- `api/` – Vercel Serverless Functions (Webhook-Proxys)

## Kontaktformular & Webhooks

Die Formulare senden an API-Endpunkte (`/api/webhook/contact`, `/api/webhook/demo-voice`, `/api/webhook/chatbot`), die die Daten an n8n weiterleiten. Die n8n-Webhook-URLs werden als Umgebungsvariablen in Vercel konfiguriert:

- `N8N_CONTACT_WEBHOOK`
- `N8N_DEMO_WEBHOOK`
- `N8N_CHATBOT_WEBHOOK`

## Code-Stil

- HTML: semantisch, barrierefrei (ARIA, Labels)
- CSS: BEM-ähnliche Klassen, CSS-Variablen
- JS: Vanilla JavaScript, ES5-kompatibel

## Redundanz reduzieren (geplant)

Header und Footer sind derzeit in jeder HTML-Datei dupliziert. Eine zukünftige Verbesserung wäre ein Static-Site-Generator (z. B. Eleventy, Hugo) oder eine Template-Engine, um `partials/header.html` und `partials/footer.html` zentral zu pflegen.

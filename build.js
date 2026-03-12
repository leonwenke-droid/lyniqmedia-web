/**
 * Build: CSS/JS minifizieren, Ausgabe nach dist/
 */
const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify: minifyJS } = require('terser');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

async function build() {
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
  ensureDir(DIST);

  // CSS minifizieren
  const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
  const cssMin = new CleanCSS({ level: 1 }).minify(css).styles;
  fs.writeFileSync(path.join(DIST, 'styles.css'), cssMin);

  // JS minifizieren
  const js = fs.readFileSync(path.join(ROOT, 'main.js'), 'utf8');
  const jsMin = (await minifyJS(js, { compress: true, mangle: true })).code;
  fs.writeFileSync(path.join(DIST, 'main.js'), jsMin);

  // HTML kopieren (unverändert – Referenzen bleiben styles.css, main.js)
  const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  for (const f of htmlFiles) {
    fs.copyFileSync(path.join(ROOT, f), path.join(DIST, f));
  }

  // Statische Dateien kopieren
  copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));
  copyDir(path.join(ROOT, 'api'), path.join(DIST, 'api'));

  // robots.txt, sitemap.xml (werden via API ausgeliefert, aber als Fallback)
  if (fs.existsSync(path.join(ROOT, 'robots.txt'))) {
    fs.copyFileSync(path.join(ROOT, 'robots.txt'), path.join(DIST, 'robots.txt'));
  }
  if (fs.existsSync(path.join(ROOT, 'sitemap.xml'))) {
    fs.copyFileSync(path.join(ROOT, 'sitemap.xml'), path.join(DIST, 'sitemap.xml'));
  }

  // vercel.json, .htaccess
  for (const f of ['vercel.json', '.htaccess']) {
    if (fs.existsSync(path.join(ROOT, f))) {
      fs.copyFileSync(path.join(ROOT, f), path.join(DIST, f));
    }
  }

  console.log('Build abgeschlossen → dist/');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});

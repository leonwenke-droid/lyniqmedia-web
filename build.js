/**
 * Build: Wartungsmodus – nur Wartungsseite deployen
 * Alte Website liegt in _legacy/ (nicht deployed)
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function build() {
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
  ensureDir(DIST);

  const wartung = fs.readFileSync(path.join(ROOT, 'wartung.html'), 'utf8');
  fs.writeFileSync(path.join(DIST, 'index.html'), wartung);
  fs.writeFileSync(path.join(DIST, 'wartung.html'), wartung);

  copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));
  copyDir(path.join(ROOT, 'api'), path.join(DIST, 'api'));

  for (const f of ['vercel.json', '.htaccess']) {
    if (fs.existsSync(path.join(ROOT, f))) {
      fs.copyFileSync(path.join(ROOT, f), path.join(DIST, f));
    }
  }

  console.log('Wartungsmodus-Build abgeschlossen → dist/');
}

build();

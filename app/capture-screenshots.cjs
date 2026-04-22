// Captura screenshots del prototipo live en GitHub Pages
// Uso: node capture-screenshots.cjs
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE = 'https://yonrasgg.github.io/RAICES_VIVAS';
const OUT = path.resolve(__dirname, '../08-Recursos/Imágenes/prototipo');

const views = [
  { slug: '01-home',             path: '/' },
  { slug: '02-edu-dashboard',    path: '/edu' },
  { slug: '03-edu-materiales',   path: '/edu/materiales' },
  { slug: '04-edu-docentes',     path: '/edu/docentes' },
  { slug: '05-edu-estudiantes',  path: '/edu/estudiantes' },
  { slug: '06-edu-ejercicios',   path: '/edu/ejercicios' },
  { slug: '07-sab-dashboard',    path: '/sab' },
  { slug: '08-sab-catalogo',     path: '/sab/catalogo' },
  { slug: '09-sab-portadores',   path: '/sab/portadores' },
  { slug: '10-sal-dashboard',    path: '/sal' },
  { slug: '11-sal-pacientes',    path: '/sal/pacientes' },
  { slug: '12-sal-citas',        path: '/sal/citas' },
  { slug: '13-sal-brigadas',     path: '/sal/brigadas' },
  { slug: '14-trans-dashboard',  path: '/trans' },
  { slug: '15-trans-usuarios',   path: '/trans/usuarios' },
  { slug: '16-trans-roles',      path: '/trans/roles' },
  { slug: '17-trans-sync',       path: '/trans/sync' },
  { slug: '18-trans-auditoria',  path: '/trans/auditoria' },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
  });
  const page = await browser.newPage();

  for (const v of views) {
    const url = BASE + v.path;
    process.stdout.write(`→ ${v.slug.padEnd(22)} `);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Permite que las animaciones/transiciones terminen
      await new Promise(r => setTimeout(r, 800));
      const file = path.join(OUT, `${v.slug}.png`);
      await page.screenshot({ path: file, fullPage: true });
      const { size } = fs.statSync(file);
      console.log(`OK (${(size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.log('FAIL:', e.message);
    }
  }
  await browser.close();
  console.log(`\n✔ Screenshots en: ${OUT}`);
})();

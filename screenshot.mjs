import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = `file:///${__dirname.replace(/\\/g, '/')}/scegli-il-tuo-percorso.html`;
const OUT  = join(__dirname, 'screenshots');

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();

// ── Desktop (1440px) ───────────────────────────────────
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(FILE, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1200)); // attendi animazioni GSAP

await page.screenshot({ path: join(OUT, '1-desktop-above-fold.png'), fullPage: false });
await page.screenshot({ path: join(OUT, '2-desktop-full.png'),       fullPage: true  });

// ── Mobile (390px iPhone 14) ──────────────────────────
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.reload({ waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1200));

await page.screenshot({ path: join(OUT, '3-mobile-above-fold.png'), fullPage: false });
await page.screenshot({ path: join(OUT, '4-mobile-full.png'),       fullPage: true  });

// ── Card selezionata (stato interattivo) ──────────────
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.reload({ waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1200));

// Click card "Poche conversioni"
await page.click('[data-percorso="poche-conversioni"]');
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: join(OUT, '5-desktop-card-selected.png'), fullPage: true });

await browser.close();
console.log('Screenshot salvati in:', OUT);

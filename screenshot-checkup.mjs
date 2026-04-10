import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = `file:///${__dirname.replace(/\\/g, '/')}`;
const OUT  = join(__dirname, 'screenshots');
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();

// Desktop full
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(`${BASE}/wedding-checkup.html`, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 700));
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: join(OUT, 'checkup-desktop.png'), fullPage: true });
console.log('✓ Desktop');

// Mobile
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.reload({ waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 700));
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: join(OUT, 'checkup-mobile.png'), fullPage: true });
console.log('✓ Mobile');

await browser.close();
console.log('Screenshots in:', OUT);

import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'assets', 'ui');

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1200);
try {
  const gotIt = await page.getByText('Got it', { exact: true });
  await gotIt.click({ timeout: 2000 });
  await page.waitForTimeout(500);
} catch (e) { console.log('no cookie banner:', e.message); }

// Full hero
await page.screenshot({ path: path.join(outDir, 'hero.png') });

// Try to capture specific sections by scrolling
const sections = [
  { selector: 'main.routeEnter > :nth-child(1)', name: 'hero' },
  { selector: 'main.routeEnter > :nth-child(3)', name: 'testimonials' },
  { selector: 'main.routeEnter > :nth-child(4)', name: 'services' },
  { selector: 'main.routeEnter > :nth-child(5)', name: 'faq' },
  { selector: 'footer', name: 'footer' },
];

for (const s of sections) {
  try {
    const el = await page.$(s.selector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await el.screenshot({ path: path.join(outDir, s.name + '.png') });
      console.log('captured', s.name);
    } else {
      console.log('NOT FOUND', s.name);
    }
  } catch (e) {
    console.log('ERROR', s.name, e.message);
  }
}

// full page scroll shot for reference
await page.screenshot({ path: path.join(outDir, 'fullpage.png'), fullPage: true });

// /work page — ProjectsGrid
await page.goto('http://localhost:5173/work', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(outDir, 'work-page.png') });
try {
  const grid = await page.$('main');
  if (grid) await grid.screenshot({ path: path.join(outDir, 'work-grid.png') });
} catch (e) { console.log('work-grid error', e.message); }

await browser.close();
console.log('done');

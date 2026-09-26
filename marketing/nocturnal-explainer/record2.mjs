import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'explainer2.html');
const videoDir = path.join(__dirname, 'video-out2');

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: videoDir, size: { width: 1920, height: 1080 } },
});
const page = await context.newPage();
page.on('pageerror', err => console.log('PAGEERROR:', err.message));
await page.goto('file://' + htmlPath);

await page.waitForFunction(() => window.__sequenceDone === true, undefined, { timeout: 70000 });
await page.waitForTimeout(300);

const videoPath = await page.video().path().catch(() => null);
await context.close();
await browser.close();

console.log('VIDEO_PATH:' + videoPath);

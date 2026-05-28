// scripts/verify.js — pre-push checks
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

let passed = 0;
let failed = 0;
let warned = 0;

function pass(msg)  { console.log('  PASS:', msg); passed++; }
function fail(msg)  { console.error('  FAIL:', msg); failed++; }
function warn(msg)  { console.warn('  WARN:', msg); warned++; }
function section(title) { console.log(`\n── ${title}`); }

// ─── 1. JS SYNTAX ────────────────────────────────────────────────────────────
section('JavaScript syntax');
try {
  execSync(`node --check "${path.join(PUBLIC, 'app.js')}"`, { stdio: 'pipe' });
  pass('app.js syntax valid');
} catch (e) {
  fail('app.js syntax error: ' + e.stderr.toString().trim());
}
try {
  execSync(`node --check "${path.join(ROOT, 'src', 'worker.js')}"`, { stdio: 'pipe' });
  pass('src/worker.js syntax valid');
} catch (e) {
  fail('src/worker.js syntax error: ' + e.stderr.toString().trim());
}

// ─── 2. JSON VALIDITY ────────────────────────────────────────────────────────
section('JSON validity');
const jsonFiles = [
  'manifest.json',
  'locales/en.json', 'locales/ar.json', 'locales/de.json', 'locales/es.json',
  'locales/fr.json', 'locales/hi.json', 'locales/id.json', 'locales/pt.json',
  'locales/tr.json', 'locales/zh.json',
];
const locales = {};
for (const rel of jsonFiles) {
  const fp = path.join(PUBLIC, rel);
  try {
    const parsed = JSON.parse(fs.readFileSync(fp, 'utf8'));
    pass(rel);
    if (rel.startsWith('locales/')) locales[rel] = parsed;
  } catch (e) {
    fail(`${rel}: ${e.message}`);
  }
}

// ─── 3. LOCALE KEY CONSISTENCY ───────────────────────────────────────────────
section('Locale key consistency');
const enKeys = new Set(Object.keys(locales['locales/en.json'] || {}));
for (const [rel, data] of Object.entries(locales)) {
  if (rel === 'locales/en.json') continue;
  const keys = new Set(Object.keys(data));
  const missing = [...enKeys].filter(k => !keys.has(k));
  const extra   = [...keys].filter(k => !enKeys.has(k));
  if (missing.length === 0 && extra.length === 0) {
    pass(`${rel}: keys match en.json (${keys.size})`);
  } else {
    if (missing.length) warn(`${rel}: missing ${missing.length} key(s): ${missing.slice(0,3).join(', ')}${missing.length > 3 ? '…' : ''}`);
    if (extra.length)   warn(`${rel}: ${extra.length} extra key(s) not in en.json: ${extra.slice(0,3).join(', ')}${extra.length > 3 ? '…' : ''}`);
  }
}

// ─── 4. ASSET REFERENCES IN HTML ─────────────────────────────────────────────
section('HTML asset references');
const HTML_PAGES = [
  'index.html',
  'loan-calculator/index.html',
  'savings-calculator/index.html',
  'refinance-calculator/index.html',
  'live-rates/index.html',
  'faq/index.html',
  'privacy/index.html',
  'currency-converter/index.html',
  'mortgage-calculator/index.html',
];

// Extract /absolute paths from href/src/content attributes and url() in inline styles
const ASSET_REF = /(?:href|src|content)="(\/[^"?#]+)"|url\('(\/[^']+)'\)/g;

for (const rel of HTML_PAGES) {
  const htmlPath = path.join(PUBLIC, rel);
  if (!fs.existsSync(htmlPath)) { fail(`${rel}: file missing`); continue; }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const broken = [];
  let m;
  while ((m = ASSET_REF.exec(html)) !== null) {
    const ref = m[1] || m[2];
    // Skip external URLs, data URIs, and og:image (absolute URL)
    if (!ref || ref.startsWith('http') || ref.startsWith('data:')) continue;
    // Skip manifest og:image absolute URL already handled above
    const target = path.join(PUBLIC, ref);
    if (!fs.existsSync(target)) broken.push(ref);
  }
  if (broken.length === 0) {
    pass(`${rel}: all asset refs resolve`);
  } else {
    for (const b of broken) fail(`${rel}: broken ref → ${b}`);
  }
}

// ─── 5. FONT FILES ───────────────────────────────────────────────────────────
section('Font files');
const FONTS = [
  'fraunces-variable.woff2',
  'fraunces-variable-italic.woff2',
  'ibm-plex-sans-400.woff2',
  'ibm-plex-sans-500.woff2',
  'ibm-plex-sans-600.woff2',
  'ibm-plex-mono-400.woff2',
  'ibm-plex-mono-500.woff2',
];
for (const f of FONTS) {
  const fp = path.join(PUBLIC, 'fonts', f);
  if (!fs.existsSync(fp)) { fail('missing: fonts/' + f); continue; }
  const kb = (fs.statSync(fp).size / 1024).toFixed(0);
  if (kb > 250) warn(`fonts/${f}: ${kb} KB (over 250 KB)`);
  else pass(`fonts/${f}: ${kb} KB`);
}

// ─── 6. NO GOOGLE FONTS IN HTML ──────────────────────────────────────────────
section('No external font CDN');
for (const rel of HTML_PAGES) {
  const htmlPath = path.join(PUBLIC, rel);
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (html.includes('fonts.googleapis.com') || html.includes('fonts.gstatic.com')) {
    fail(`${rel}: still references Google Fonts`);
  } else {
    pass(`${rel}: no Google Fonts`);
  }
}

// ─── 7. DATA-I18N KEYS EXIST IN EN.JSON ──────────────────────────────────────
section('i18n key coverage');
const DATA_I18N = /data-i18n="([^"]+)"/g;
const missingI18n = {};
for (const rel of HTML_PAGES) {
  const htmlPath = path.join(PUBLIC, rel);
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, 'utf8');
  let m;
  while ((m = DATA_I18N.exec(html)) !== null) {
    const key = m[1];
    if (!enKeys.has(key)) {
      missingI18n[key] = (missingI18n[key] || []);
      missingI18n[key].push(rel);
    }
  }
}
if (Object.keys(missingI18n).length === 0) {
  pass('all data-i18n keys found in en.json');
} else {
  for (const [key, pages] of Object.entries(missingI18n)) {
    fail(`data-i18n key "${key}" missing from en.json (used in: ${pages[0]})`);
  }
}

// ─── 8. PROGRAMMATIC I18N KEYS ───────────────────────────────────────────────
section('Programmatic i18n keys (app.js)');
const PROGRAMMATIC_KEYS = [
  'hero-h1','hero-sub','res-monthly','res-principal','res-interest','res-total','res-year',
  'lbl-principal-pct','lbl-interest-pct','section-breakdown','section-amort',
  'btn-show-all','btn-show-less','amort-gran-yearly','amort-gran-monthly',
  'freq-monthly','freq-biweekly','section-how','ci-h2','ci-result-label','ci-sub',
  'ci-deposited','ci-earned','ci-mult','ci-year','ci-chart-h','ci-helper-title',
  'ci-helper-text','rf-h2','rf-desc','rf-current','rf-new','rf-monthly','rf-old',
  'rf-new-pay','rf-breakeven','rf-total','cur-h2','cur-section-sub','cur-amount-label',
  'cur-to-label','cur-quick','gold-title','gold-sub','oil-title','oil-sub',
  'silver-title','silver-sub','gold-local-lbl','oil-local-lbl','silver-local-lbl',
  'faq-heading','footer-desc','footer-disclaimer','rf-verdict-higher','rf-verdict-long',
  'rf-verdict-good','rf-verdict-summary','rf-never','rf-over-term','rf-months',
  'rf-years-mo','unit-yr','unit-yrs',
];
const missingProg = PROGRAMMATIC_KEYS.filter(k => !enKeys.has(k));
if (missingProg.length === 0) {
  pass(`all ${PROGRAMMATIC_KEYS.length} programmatic keys present in en.json`);
} else {
  for (const k of missingProg) fail(`programmatic key "${k}" missing from en.json`);
}

// ─── 10. CORE FILES EXIST ────────────────────────────────────────────────────
section('Core files');
const REQUIRED = ['app.js', 'chart.js', 'style.css', 'favicon.svg', 'favicon.png', 'og.png', 'manifest.json', 'robots.txt', 'sitemap.xml'];
for (const f of REQUIRED) {
  const fp = path.join(PUBLIC, f);
  if (!fs.existsSync(fp)) fail(`missing: public/${f}`);
  else pass(`public/${f} exists`);
}

// ─── 11. PAGE COMPLETENESS ───────────────────────────────────────────────────
section('Page completeness');
const ALL_PAGES = [...HTML_PAGES, 'mortgage-calculator/index.html'].filter((v, i, a) => a.indexOf(v) === i);
for (const rel of ALL_PAGES) {
  if (!fs.existsSync(path.join(PUBLIC, rel))) fail(`missing page: ${rel}`);
  else pass(`page exists: ${rel}`);
}

// ─── SUMMARY ─────────────────────────────────────────────────────────────────
console.log(`\n${passed} passed, ${failed} failed, ${warned} warnings`);
if (failed > 0) process.exit(1);

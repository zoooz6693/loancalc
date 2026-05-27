const esbuild = require('esbuild');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, 'public');

function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 8);
}

const assetMap = {};

// Minify style.css
const styleResult = esbuild.buildSync({
  entryPoints: [path.join(PUBLIC, 'style.css')],
  bundle: false,
  minify: true,
  write: false,
  loader: { '.css': 'css' },
});
const styleContent = styleResult.outputFiles[0].contents;
const styleHash = hashContent(styleContent);
const styleHashed = `style.${styleHash}.css`;
fs.writeFileSync(path.join(PUBLIC, styleHashed), styleContent);
assetMap['style.css'] = styleHashed;
console.log(`style.css → ${styleHashed} (${(styleContent.length / 1024).toFixed(1)} KB)`);

// Minify tokens.css and inline it — eliminates one render-blocking request
const tokensResult = esbuild.buildSync({
  entryPoints: [path.join(PUBLIC, 'tokens.css')],
  bundle: false,
  minify: true,
  write: false,
  loader: { '.css': 'css' },
});
const tokensMinified = Buffer.from(tokensResult.outputFiles[0].contents).toString('utf8');
console.log(`tokens.css → inlined (${(tokensMinified.length / 1024).toFixed(1)} KB)`);

// Hash app.js (already minified, just copy with hash)
const appContent = fs.readFileSync(path.join(PUBLIC, 'app.js'));
const appHash = hashContent(appContent);
const appHashed = `app.${appHash}.js`;
fs.writeFileSync(path.join(PUBLIC, appHashed), appContent);
assetMap['app.js'] = appHashed;
console.log(`app.js → ${appHashed} (${(appContent.length / 1024).toFixed(1)} KB)`);

// Write asset manifest
fs.writeFileSync(
  path.join(PUBLIC, 'asset-manifest.json'),
  JSON.stringify(assetMap, null, 2)
);
console.log('asset-manifest.json written');

// Patch HTML files
const HTML_FILES = [
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

for (const rel of HTML_FILES) {
  const htmlPath = path.join(PUBLIC, rel);
  if (!fs.existsSync(htmlPath)) continue;
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Replace asset references with hashed filenames (handles both original names and
  // previously-hashed names from earlier builds, e.g. app.abc12345.js → app.xyz98765.js)
  const ext = { 'style.css': 'css', 'tokens.css': 'css', 'app.js': 'js' };
  for (const [original, hashed] of Object.entries(assetMap)) {
    const fileExt = ext[original];
    const baseName = original.replace('.' + fileExt, '');
    // Match any prior hash: basename.XXXXXXXX.ext or original basename.ext
    const pattern = new RegExp(`(["'/])(?:${baseName}(?:\\.[0-9a-f]{8})?\\.${fileExt})`, 'g');
    html = html.replace(pattern, (_, quote) => quote + hashed);
  }

  // Inline tokens.css: replace the <link> tag with an inline <style> block
  html = html.replace(
    /<link[^>]+href="[^"]*tokens[^"]*\.css"[^>]*\/?>/g,
    `<style>${tokensMinified}</style>`
  );

  fs.writeFileSync(htmlPath, html);
  console.log(`Patched ${rel}`);
}

console.log('\nBuild complete.');
console.log('Asset map:', assetMap);

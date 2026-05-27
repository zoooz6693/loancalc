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

// Minify tokens.css
const tokensResult = esbuild.buildSync({
  entryPoints: [path.join(PUBLIC, 'tokens.css')],
  bundle: false,
  minify: true,
  write: false,
  loader: { '.css': 'css' },
});
const tokensContent = tokensResult.outputFiles[0].contents;
const tokensHash = hashContent(tokensContent);
const tokensHashed = `tokens.${tokensHash}.css`;
fs.writeFileSync(path.join(PUBLIC, tokensHashed), tokensContent);
assetMap['tokens.css'] = tokensHashed;
console.log(`tokens.css → ${tokensHashed} (${(tokensContent.length / 1024).toFixed(1)} KB)`);

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
  for (const [original, hashed] of Object.entries(assetMap)) {
    // Replace bare references (href="style.css", src="app.js", href="/style.css" etc.)
    // Use word-boundary-like replacement to avoid double-hashing
    html = html.split('"' + original + '"').join('"' + hashed + '"');
    html = html.split('"/' + original + '"').join('"/' + hashed + '"');
  }
  fs.writeFileSync(htmlPath, html);
  console.log(`Patched ${rel}`);
}

console.log('\nBuild complete.');
console.log('Asset map:', assetMap);

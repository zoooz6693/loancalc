const ALLOWED_TICKERS = ['GC=F', 'CL=F', 'SI=F'];
const STOCK_TICKERS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA', 'JPM', 'BRK-B', 'SPY'];

// Yahoo Finance, NASDAQ, and Stooq require browser impersonation for server-side access.
// This is a known ToS risk; the multi-source fallback chain mitigates operational impact.
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function fetchGoldPrice() {
	// Source 1: @fawazahmed0 currency-api — XAU is gold, xau.usd = spot price per troy oz
	try {
		const r = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json');
		if (r.ok) {
			const d = await r.json();
			const p = d.xau && d.xau.usd;
			if (typeof p === 'number' && p > 100) return p;
		}
	} catch (_) {}

	// Source 2: metals.live — returns array [{gold:price}, ...]
	try {
		const r = await fetch('https://api.metals.live/v1/spot', {headers: {'User-Agent': UA}});
		if (r.ok) {
			const d = await r.json();
			let p;
			if (Array.isArray(d)) {
				const item = d.find(x => x.gold !== undefined);
				p = item && item.gold;
			} else {
				p = d.gold;
			}
			if (typeof p === 'number' && p > 100) return p;
		}
	} catch (_) {}

	// Source 3: Stooq — gc.f is gold futures, independent of Yahoo Finance
	try {
		const r = await fetch('https://stooq.com/q/l/?s=gc.f&f=sd2t2ohlcvn&e=json', {headers: {'User-Agent': UA}});
		if (r.ok) {
			const d = await r.json();
			const sym = d?.symbols?.[0];
			const price = sym && parseFloat(sym.close || sym.Close || 0);
			if (typeof price === 'number' && price > 100) return price;
		}
	} catch (_) {}

	// Source 4: Yahoo Finance v7 quote for GC=F
	for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
		try {
			const r = await fetch(`https://${host}/v7/finance/quote?formatted=false&symbols=GC%3DF`, {headers: {'User-Agent': UA, 'Accept': 'application/json'}});
			if (!r.ok) continue;
			const d = await r.json();
			const p = d?.quoteResponse?.result?.[0]?.regularMarketPrice;
			if (typeof p === 'number' && p > 100) return p;
		} catch (_) {}
	}

	throw new Error('gold price unavailable');
}

async function fetchOilPrice() {
	// Source 1: Stooq — cl.f is WTI crude futures, independent of Yahoo Finance
	try {
		const r = await fetch('https://stooq.com/q/l/?s=cl.f&f=sd2t2ohlcvn&e=json', {headers: {'User-Agent': UA}});
		if (r.ok) {
			const d = await r.json();
			const sym = d?.symbols?.[0];
			const price = sym && parseFloat(sym.close || sym.Close || 0);
			if (typeof price === 'number' && price > 0) return price;
		}
	} catch (_) {}

	// Source 2: Yahoo Finance v7 quote for CL=F
	for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
		try {
			const r = await fetch(`https://${host}/v7/finance/quote?formatted=false&symbols=CL%3DF`, {headers: {'User-Agent': UA, 'Accept': 'application/json'}});
			if (!r.ok) continue;
			const d = await r.json();
			const p = d?.quoteResponse?.result?.[0]?.regularMarketPrice;
			if (typeof p === 'number' && p > 0) return p;
		} catch (_) {}
	}

	// Source 3: Yahoo Finance v8 chart for CL=F
	for (const host of ['query2.finance.yahoo.com', 'query1.finance.yahoo.com']) {
		try {
			const r = await fetch(`https://${host}/v8/finance/chart/CL%3DF?interval=1d&range=1d`, {headers: {'User-Agent': UA}});
			if (!r.ok) continue;
			const d = await r.json();
			const p = d?.chart?.result?.[0]?.meta?.regularMarketPrice;
			if (typeof p === 'number' && p > 0) return p;
		} catch (_) {}
	}

	throw new Error('oil price unavailable');
}

async function fetchSilverPrice() {
	// Source 1: @fawazahmed0 currency-api — XAG is silver, xag.usd = spot price per troy oz
	try {
		const r = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xag.json');
		if (r.ok) {
			const d = await r.json();
			const p = d.xag && d.xag.usd;
			if (typeof p === 'number' && p > 1) return p;
		}
	} catch (_) {}

	// Source 2: metals.live — returns array [{silver:price}, ...]
	try {
		const r = await fetch('https://api.metals.live/v1/spot', {headers: {'User-Agent': UA}});
		if (r.ok) {
			const d = await r.json();
			let p;
			if (Array.isArray(d)) {
				const item = d.find(x => x.silver !== undefined);
				p = item && item.silver;
			} else {
				p = d.silver;
			}
			if (typeof p === 'number' && p > 1) return p;
		}
	} catch (_) {}

	// Source 3: Stooq — si.f is silver futures, independent of Yahoo Finance
	try {
		const r = await fetch('https://stooq.com/q/l/?s=si.f&f=sd2t2ohlcvn&e=json', {headers: {'User-Agent': UA}});
		if (r.ok) {
			const d = await r.json();
			const sym = d?.symbols?.[0];
			const price = sym && parseFloat(sym.close || sym.Close || 0);
			if (typeof price === 'number' && price > 1) return price;
		}
	} catch (_) {}

	// Source 4: Yahoo Finance v7 for SI=F
	for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
		try {
			const r = await fetch(`https://${host}/v7/finance/quote?formatted=false&symbols=SI%3DF`, {headers: {'User-Agent': UA, 'Accept': 'application/json'}});
			if (!r.ok) continue;
			const d = await r.json();
			const p = d?.quoteResponse?.result?.[0]?.regularMarketPrice;
			if (typeof p === 'number' && p > 1) return p;
		} catch (_) {}
	}

	throw new Error('silver price unavailable');
}

const STOCK_NAMES = {
	'AAPL': 'Apple',
	'MSFT': 'Microsoft',
	'GOOGL': 'Alphabet',
	'AMZN': 'Amazon',
	'META': 'Meta',
	'NVDA': 'NVIDIA',
	'TSLA': 'Tesla',
	'JPM': 'JPMorgan',
	'BRK-B': 'Berkshire B',
	'SPY': 'S&P 500 ETF'
};

async function getYahooFinanceCrumb() {
	try {
		const homeR = await fetch('https://finance.yahoo.com/', {
			headers: {
				'User-Agent': UA,
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.9'
			}
		});
		const rawCookies = homeR.headers.getAll ? homeR.headers.getAll('set-cookie') : [];
		const cookieStr = rawCookies.map(c => c.split(';')[0]).join('; ');

		const crumbR = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
			headers: {
				'User-Agent': UA,
				'Accept': 'text/plain, */*',
				'Referer': 'https://finance.yahoo.com/',
				'Cookie': cookieStr
			}
		});
		if (!crumbR.ok) return null;
		const crumb = await crumbR.text();
		if (!crumb || crumb.length < 3 || crumb.includes('<')) return null;
		return {crumb: crumb.trim(), cookieStr};
	} catch (_) {
		return null;
	}
}

async function fetchStockQuotes() {
	const log = [];

	// Source 0: Stooq — independent provider, per-ticker parallel
	const stooqResults = await Promise.all(
		STOCK_TICKERS.map(async ticker => {
			const s = (ticker === 'BRK-B' ? 'brk-b' : ticker.toLowerCase()) + '.us';
			try {
				const r = await fetch(`https://stooq.com/q/l/?s=${s}&f=sd2t2ohlcvn&e=json`, {headers: {'User-Agent': UA}});
				if (!r.ok) return null;
				const d = await r.json();
				const sym = d?.symbols?.[0];
				if (!sym) return null;
				const price = parseFloat(sym.close || sym.Close || 0);
				if (!price) return null;
				// Stooq's compact format (f=sd2t2ohlcvn) has no prev-close field.
				// Open-to-close is used here; this will differ from other sources intraday.
				const open = parseFloat(sym.open || sym.Open || price);
				const change = open ? ((price - open) / open) * 100 : 0;
				return {
					ticker: ticker === 'BRK-B' ? 'BRK.B' : ticker,
					name: STOCK_NAMES[ticker] || sym.name || sym.Name || ticker,
					price,
					change
				};
			} catch (_) {
				return null;
			}
		})
	);
	const stooqValid = stooqResults.filter(Boolean);
	if (stooqValid.length > 0) return stooqValid;
	log.push(`stooq: ${stooqValid.length}/${STOCK_TICKERS.length}`);

	// Source 1: NASDAQ public API — independent of Yahoo Finance
	const nasdaqResults = await Promise.all(
		STOCK_TICKERS.map(async ticker => {
			const symbol = ticker === 'BRK-B' ? 'BRK/B' : ticker;
			const assetclass = ticker === 'SPY' ? 'etf' : 'stocks';
			try {
				const r = await fetch(`https://api.nasdaq.com/api/quote/${encodeURIComponent(symbol)}/info?assetclass=${assetclass}`, {
					headers: {
						'User-Agent': UA,
						'Accept': 'application/json, text/plain, */*',
						'Accept-Language': 'en-US,en;q=0.9',
						'Referer': 'https://www.nasdaq.com/'
					}
				});
				if (!r.ok) return null;
				const d = await r.json();
				const primary = d?.data?.primaryData;
				if (!primary) return null;
				const price = parseFloat((primary.lastSalePrice || '').replace(/[$,]/g, ''));
				const changeStr = primary.percentageChange || '+0%';
				const change = parseFloat(changeStr.replace(/[+%]/g, ''));
				if (!price || isNaN(price)) return null;
				return {
					ticker: ticker === 'BRK-B' ? 'BRK.B' : ticker,
					name: STOCK_NAMES[ticker] || (d?.data?.companyName || ticker).replace(/,?\s*(Inc\.?|Corp\.?|plc\.?)$/i, ''),
					price,
					change: isNaN(change) ? 0 : change
				};
			} catch (_) {
				return null;
			}
		})
	);
	const nasdaqValid = nasdaqResults.filter(Boolean);
	if (nasdaqValid.length > 0) return nasdaqValid;
	log.push(`nasdaq: ${nasdaqValid.length}/${STOCK_TICKERS.length}`);

	// Source 2: Yahoo Finance v7 with crumb — last resort
	const session = await getYahooFinanceCrumb();
	if (session) {
		const {crumb, cookieStr} = session;
		for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
			try {
				const r = await fetch(`https://${host}/v7/finance/quote?formatted=false&symbols=${STOCK_TICKERS.join(',')}&crumb=${encodeURIComponent(crumb)}`, {
					headers: {
						'User-Agent': UA,
						'Accept': 'application/json',
						'Referer': 'https://finance.yahoo.com/',
						'Cookie': cookieStr
					}
				});
				if (!r.ok) { log.push(`yf/${host}: ${r.status}`); continue; }
				const d = await r.json();
				const results = d?.quoteResponse?.result;
				if (Array.isArray(results) && results.length > 0) {
					return results.map(q => ({
						ticker: q.symbol === 'BRK-B' ? 'BRK.B' : q.symbol,
						name: STOCK_NAMES[q.symbol] || (q.shortName || q.symbol).replace(/,?\s*(Inc\.?|Corp\.?|plc\.?)$/i, ''),
						price: q.regularMarketPrice,
						change: q.regularMarketChangePercent
					}));
				}
				log.push(`yf/${host}: empty`);
			} catch (e) { log.push(`yf/${host}: ${e.message}`); }
		}
	} else {
		log.push('yf crumb: failed');
	}

	throw new Error(log.join(' | '));
}

const CURRENCY_COUNTRY = {
	'USD': 'US',
	'EGP': 'EG',
	'EUR': 'DE',
	'GBP': 'GB',
	'AED': 'AE',
	'SAR': 'SA',
	'KWD': 'KW',
	'QAR': 'QA',
	'CAD': 'CA',
	'AUD': 'AU',
	'CHF': 'CH',
	'JPY': 'JP',
	'CNY': 'CN',
	'INR': 'IN',
	'SGD': 'SG',
	'HKD': 'HK',
	'MYR': 'MY',
	'KRW': 'KR',
	'THB': 'TH',
	'IDR': 'ID',
	'TRY': 'TR',
	'BRL': 'BR',
	'ZAR': 'ZA',
	'NGN': 'NG',
	'PKR': 'PK',
	'MXN': 'MX',
	'PLN': 'PL',
	'SEK': 'SE',
	'NOK': 'NO',
	'DKK': 'DK',
	'NZD': 'NZ',
	'MAD': 'MA'
};

// Approximate commercial bank lending rates (May 2026) — last-resort fallback
// when the live World Bank API is unreachable and no cached response exists.
const FALLBACK_LENDING_RATES = {
	USD: 7.75,
	EGP: 22.5,
	EUR: 3.8,
	GBP: 5.0,
	AED: 8.75,
	SAR: 8.75,
	KWD: 5.25,
	QAR: 6.0,
	CAD: 5.8,
	AUD: 5.75,
	CHF: 1.5,
	JPY: 2.0,
	CNY: 4.1,
	INR: 10.0,
	SGD: 5.0,
	HKD: 6.0,
	MYR: 5.5,
	KRW: 4.5,
	THB: 6.0,
	IDR: 9.75,
	TRY: 42.0,
	BRL: 28.5,
	ZAR: 10.5,
	NGN: 30.5,
	PKR: 15.5,
	MXN: 12.5,
	PLN: 5.75,
	SEK: 3.75,
	NOK: 5.0,
	DKK: 3.5,
	NZD: 6.5,
	MAD: 5.2
};

async function fetchAllLendingRates() {
	const codes = Object.values(CURRENCY_COUNTRY).join(';');
	const url = `https://api.worldbank.org/v2/country/${codes}/indicator/FR.INR.LNDP?format=json&mrv=1&per_page=50`;
	const r = await fetch(url, {headers: {'User-Agent': UA}});
	if (!r.ok) throw new Error('World Bank fetch failed');
	const d = await r.json();
	const rows = d && d[1];
	if (!Array.isArray(rows)) throw new Error('unexpected response format');
	const countryToCur = {};
	for (const [cur, country] of Object.entries(CURRENCY_COUNTRY)) countryToCur[country] = cur;
	const rates = {};
	for (const row of rows) {
		const cid = row.country && row.country.id;
		const cur = countryToCur[cid];
		const val = row.value;
		if (cur && typeof val === 'number' && val > 0 && val < 100) {
			rates[cur] = Math.round(val * 100) / 100;
		}
	}
	return rates;
}

const CSP ="default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://fundingchoicesmessages.google.com https://cdnjs.cloudflare.com https://ep2.adtrafficquality.google https://ep1.adtrafficquality.google https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://open.er-api.com https://cdn.jsdelivr.net https://stooq.com https://api.metals.live https://query1.finance.yahoo.com https://query2.finance.yahoo.com https://finance.yahoo.com https://www.googleapis.com https://api.worldbank.org https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://analytics.google.com https://stats.g.doubleclick.net https://ep1.adtrafficquality.google https://www.google.com https://fundingchoicesmessages.google.com https://cdnjs.cloudflare.com; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ep2.adtrafficquality.google https://www.google.com; object-src 'none'; base-uri 'self'";

async function serveWithCaching(request, env) {
	const url = new URL(request.url);
	const response = await env.ASSETS.fetch(request);
	if (!response.ok) return response;

	const p = url.pathname;
	const isLocale = p.startsWith('/locales/') && p.endsWith('.json');
	const isFont = p.startsWith('/fonts/') && p.endsWith('.woff2');
	const isAsset = /\.(js|css)$/.test(p) && !p.startsWith('/fonts/');
	const isHTML = p.endsWith('.html') || p.endsWith('/') || !/\.[^/]+$/.test(p);

	const headers = new Headers(response.headers);
	if (isFont) {
		headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	} else if (isAsset) {
		headers.set('Cache-Control', 'public, max-age=3600');
	} else if (isLocale) {
		headers.set('Cache-Control', 'public, max-age=86400');
	} else if (isHTML) {
		headers.set('Cache-Control', 'no-cache');
		headers.set('Content-Security-Policy', CSP);
		headers.set('Content-Type', 'text/html; charset=UTF-8');
	}
	return new Response(response.body, { status: response.status, headers });
}

export default {
	async scheduled(event, env, ctx) {
		ctx.waitUntil(
			fetchAllLendingRates()
				.then(rates => {
					const body = JSON.stringify({rates, fetchedAt: new Date().toISOString()});
					const res = new Response(body, {
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'Cache-Control': 'public, max-age=86400'
						}
					});
					return caches.default.put(
						new Request('https://cache.local/api/central-bank-rates'),
						res
					);
				})
				.catch(() => {})
		);
	},

	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.hostname === 'www.loancalc.app') {
			url.hostname = 'loancalc.app';
			return Response.redirect(url.toString(), 301);
		}

		if (url.pathname === '/api/central-bank-rates') {
			const cacheKey = new Request('https://cache.local/api/central-bank-rates');
			try {
				const rates = await fetchAllLendingRates();
				const body = JSON.stringify({rates, fetchedAt: new Date().toISOString()});
				const res = new Response(body, {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Cache-Control': 'public, max-age=43200'
					}
				});
				caches.default.put(cacheKey, res.clone()).catch(() => {});
				return res;
			} catch (_) {
				const cached = await caches.default.match(cacheKey).catch(() => null);
				if (cached) {
					return new Response(cached.body, {
						status: 200,
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'X-Cache': 'STALE'
						}
					});
				}
				return new Response(JSON.stringify({rates: FALLBACK_LENDING_RATES, fetchedAt: null, stale: true}), {
					status: 200,
					headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'X-Cache': 'FALLBACK'}
				});
			}
		}

		if (url.pathname === '/api/commodity') {
			const ticker = url.searchParams.get('ticker');
			if (!ticker || !ALLOWED_TICKERS.includes(ticker)) {
				return new Response('Invalid ticker', {status: 400});
			}

			const type = ticker === 'GC=F' ? 'gold' : ticker === 'SI=F' ? 'silver' : 'oil';
			const cacheKey = new Request(`https://cache.local/api/commodity?type=${type}`);
			const fallbackKey = new Request(`https://cache.local/api/commodity-fallback?type=${type}`);

			try {
				const price = type === 'gold' ? await fetchGoldPrice() : type === 'silver' ? await fetchSilverPrice() : await fetchOilPrice();
				const date = new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
				const body = JSON.stringify({price, date, type});
				// Store 24h fallback so stale data survives across hourly cache expiry
				caches.default.put(fallbackKey, new Response(body, {
					headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400'}
				})).catch(() => {});
				return new Response(body, {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Cache-Control': 'public, max-age=3600'
					}
				});
			} catch (_) {
				const cached = await (caches.default.match(cacheKey).catch(() => null))
					|| await (caches.default.match(fallbackKey).catch(() => null));
				if (cached) {
					return new Response(cached.body, {
						status: 200,
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'X-Cache': 'STALE'
						}
					});
				}
				return new Response(JSON.stringify({error: 'upstream unavailable'}), {
					status: 502,
					headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
				});
			}
		}

		if (url.pathname === '/api/stocks') {
			const cacheKey = new Request('https://cache.local/api/stocks');
			const fallbackKey = new Request('https://cache.local/api/stocks-fallback');
			try {
				const stocks = await fetchStockQuotes();
				const date = new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
				const body = JSON.stringify({stocks, date});
				// Store 24h fallback so stale data survives across hourly cache expiry
				caches.default.put(fallbackKey, new Response(body, {
					headers: {'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400'}
				})).catch(() => {});
				return new Response(body, {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Cache-Control': 'public, max-age=3600'
					}
				});
			} catch (e) {
				const cached = await (caches.default.match(cacheKey).catch(() => null))
					|| await (caches.default.match(fallbackKey).catch(() => null));
				if (cached) {
					return new Response(cached.body, {
						status: 200,
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'X-Cache': 'STALE'
						}
					});
				}
				return new Response(JSON.stringify({error: 'upstream unavailable'}), {
					status: 502,
					headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
				});
			}
		}

		if (url.pathname === '/api/fx-prev') {
			const SNAPSHOT_KEY = new Request('https://cache.local/api/fx-snapshot-v1');
			let snapshot = null;
			try {
				const cached = await caches.default.match(SNAPSHOT_KEY);
				if (cached) snapshot = await cached.json();
			} catch (_) {}

			const ageHours = snapshot ? (Date.now() - snapshot.ts) / 3600000 : Infinity;

			if (ageHours < 24) {
				// Snapshot is recent enough — serve it as prev
				return new Response(JSON.stringify({ prev: snapshot.rates }), {
					headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' }
				});
			}

			// Snapshot is stale or missing — fetch fresh rates and rotate
			let freshRates = null;
			try {
				const r = await fetch('https://open.er-api.com/v6/latest/USD');
				const d = await r.json();
				if (d.result === 'success') freshRates = d.rates;
			} catch (_) {}

			if (!freshRates) {
				try {
					const r = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
					const d = await r.json();
					if (d.usd) {
						freshRates = {};
						Object.keys(d.usd).forEach(k => { freshRates[k.toUpperCase()] = d.usd[k]; });
					}
				} catch (_) {}
			}

			const prev = snapshot ? snapshot.rates : null;

			if (freshRates) {
				freshRates.USD = 1;
				caches.default.put(SNAPSHOT_KEY, new Response(JSON.stringify({ rates: freshRates, ts: Date.now() }), {
					headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=172800' }
				})).catch(() => {});
			}

			return new Response(JSON.stringify({ prev }), {
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' }
			});
		}

		const pathname = new URL(request.url).pathname.replace(/\/$/, '');
		if (pathname === '/currency-converter') {
			return Response.redirect('https://loancalc.app/live-rates/', 301);
		}
		if (pathname === '/mortgage-calculator') {
			return Response.redirect('https://loancalc.app/loan-calculator/', 301);
		}

		return serveWithCaching(request, env);
	}
};

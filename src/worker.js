const ALLOWED_TICKERS = ['GC=F', 'CL=F'];

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function fetchGoldPrice() {
  // Source 1: @fawazahmed0 currency-api — XAU is gold, xau.usd = spot price per troy oz
  try {
    const r = await fetch(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json'
    );
    if (r.ok) {
      const d = await r.json();
      const p = d.xau && d.xau.usd;
      if (typeof p === 'number' && p > 100) return p;
    }
  } catch (_) {}

  // Source 2: metals.live — returns array [{gold:price}, ...]
  try {
    const r = await fetch('https://api.metals.live/v1/spot', { headers: { 'User-Agent': UA } });
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

  // Source 3: Yahoo Finance v7 quote for GC=F
  for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
    try {
      const r = await fetch(
        `https://${host}/v7/finance/quote?formatted=false&symbols=GC%3DF`,
        { headers: { 'User-Agent': UA, 'Accept': 'application/json' } }
      );
      if (!r.ok) continue;
      const d = await r.json();
      const p = d?.quoteResponse?.result?.[0]?.regularMarketPrice;
      if (typeof p === 'number' && p > 100) return p;
    } catch (_) {}
  }

  throw new Error('gold price unavailable');
}

async function fetchOilPrice() {
  // Source 1: Yahoo Finance v7 quote for CL=F
  for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
    try {
      const r = await fetch(
        `https://${host}/v7/finance/quote?formatted=false&symbols=CL%3DF`,
        { headers: { 'User-Agent': UA, 'Accept': 'application/json' } }
      );
      if (!r.ok) continue;
      const d = await r.json();
      const p = d?.quoteResponse?.result?.[0]?.regularMarketPrice;
      if (typeof p === 'number' && p > 0) return p;
    } catch (_) {}
  }

  // Source 2: Yahoo Finance v8 chart for CL=F
  for (const host of ['query2.finance.yahoo.com', 'query1.finance.yahoo.com']) {
    try {
      const r = await fetch(
        `https://${host}/v8/finance/chart/CL%3DF?interval=1d&range=1d`,
        { headers: { 'User-Agent': UA } }
      );
      if (!r.ok) continue;
      const d = await r.json();
      const p = d?.chart?.result?.[0]?.meta?.regularMarketPrice;
      if (typeof p === 'number' && p > 0) return p;
    } catch (_) {}
  }

  throw new Error('oil price unavailable');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/commodity') {
      const ticker = url.searchParams.get('ticker');
      if (!ticker || !ALLOWED_TICKERS.includes(ticker)) {
        return new Response('Invalid ticker', { status: 400 });
      }

      const type = ticker === 'GC=F' ? 'gold' : 'oil';
      const cacheKey = new Request(`https://cache.local/api/commodity?type=${type}`);

      try {
        const price = type === 'gold' ? await fetchGoldPrice() : await fetchOilPrice();
        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const body = JSON.stringify({ price, date, type });
        const res = new Response(body, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
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
              'X-Cache': 'STALE',
            },
          });
        }
        return new Response(JSON.stringify({ error: 'upstream unavailable' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};

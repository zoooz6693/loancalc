const ALLOWED_TICKERS = ['GC=F', 'CL=F'];
const YF_HOSTS = ['query2.finance.yahoo.com', 'query1.finance.yahoo.com'];
const YF_HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; LoanCalc/1.0)' };

function validYFPrice(data) {
  try {
    const price = data.chart.result[0].meta.regularMarketPrice;
    return typeof price === 'number' && price > 0;
  } catch {
    return false;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/commodity') {
      const ticker = url.searchParams.get('ticker');
      if (!ticker || !ALLOWED_TICKERS.includes(ticker)) {
        return new Response('Invalid ticker', { status: 400 });
      }

      const cacheKey = new Request(`https://cache.local/api/commodity?ticker=${encodeURIComponent(ticker)}`);

      for (const host of YF_HOSTS) {
        try {
          const upstream = await fetch(
            `https://${host}/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`,
            { headers: YF_HEADERS }
          );
          if (!upstream.ok) continue;

          const data = await upstream.json();
          if (!validYFPrice(data)) continue;

          const res = new Response(JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'public, max-age=3600',
            },
          });
          caches.default.put(cacheKey, res.clone()).catch(() => {});
          return res;
        } catch (_) {}
      }

      // All hosts failed — serve stale edge cache if available
      const cached = await caches.default.match(cacheKey);
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

    return env.ASSETS.fetch(request);
  },
};

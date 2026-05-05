const ALLOWED_TICKERS = ['GC=F', 'CL=F'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/commodity') {
      const ticker = url.searchParams.get('ticker');
      const cacheKey = new Request(`https://cache.local/api/commodity?ticker=${encodeURIComponent(ticker || '')}`);
      if (!ticker || !ALLOWED_TICKERS.includes(ticker)) {
        return new Response('Invalid ticker', { status: 400 });
      }
      try {
        const upstream = await fetch(
          `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`
        );
        if (!upstream.ok) {
          const cached = await caches.default.match(cacheKey);
          if (cached) {
            return new Response(cached.body, {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=60',
              },
            });
          }

          return new Response(
            JSON.stringify({ error: 'upstream non-ok', upstreamStatus: upstream.status }),
            { status: 502, headers: { 'Content-Type': 'application/json' } }
          );
        }

        const data = await upstream.json();
        const res = new Response(JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
        });
        // best-effort cache put for later 429s
        caches.default.put(cacheKey, res.clone()).catch(() => {});
        return res;
      } catch (err) {
        return new Response(JSON.stringify({ error: 'upstream fetch failed' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};

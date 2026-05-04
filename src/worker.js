const ALLOWED_TICKERS = ['GC=F', 'CL=F'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/commodity') {
      const ticker = url.searchParams.get('ticker');
      if (!ticker || !ALLOWED_TICKERS.includes(ticker)) {
        return new Response('Invalid ticker', { status: 400 });
      }
      try {
        const upstream = await fetch(
          `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`
        );
        const data = await upstream.json();
        return new Response(JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch {
        return new Response(JSON.stringify({ error: 'upstream fetch failed' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};

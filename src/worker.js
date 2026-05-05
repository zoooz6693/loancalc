const ALLOWED_TICKERS = ['GC=F', 'CL=F'];

// #region agent log
function __agentLog(hypothesisId, location, message, data) {
  fetch('http://127.0.0.1:7754/ingest/c2a9498e-65b7-488f-ac15-ead43e84dc40', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '22e765' },
    body: JSON.stringify({
      sessionId: '22e765',
      runId: 'pre-fix',
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion agent log

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/commodity') {
      const ticker = url.searchParams.get('ticker');
      // #region agent log
      __agentLog('A', 'src/worker.js:30', 'api/commodity request', {
        method: request.method,
        ticker,
      });
      // #endregion agent log
      if (!ticker || !ALLOWED_TICKERS.includes(ticker)) {
        return new Response('Invalid ticker', { status: 400 });
      }
      try {
        // #region agent log
        __agentLog('A', 'src/worker.js:40', 'upstream fetch start', { ticker });
        // #endregion agent log
        const upstream = await fetch(
          `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`
        );
        // #region agent log
        __agentLog('A', 'src/worker.js:46', 'upstream fetch done', {
          ok: upstream.ok,
          status: upstream.status,
        });
        // #endregion agent log
        const data = await upstream.json();
        return new Response(JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch (err) {
        // #region agent log
        __agentLog('A', 'src/worker.js:62', 'upstream fetch failed', {
          name: err?.name,
          message: err?.message,
        });
        // #endregion agent log
        return new Response(JSON.stringify({ error: 'upstream fetch failed' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};

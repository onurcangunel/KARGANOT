/*
  Simple dev-time healthcheck: waits for Next.js dev server and verifies /api/health
*/
import http from 'http';

const HOST = process.env.NEXT_DEV_HOST || 'localhost';
const PORT = Number(process.env.PORT || 3000);
const PATH = '/api/health';

function get(url: string) {
  return new Promise<{ status: number; body: string }>((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode || 0, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(3000, () => {
      req.destroy(new Error('timeout'));
    });
  });
}

async function waitForServer() {
  const url = `http://${HOST}:${PORT}${PATH}`;
  const max = 50; // ~50 * 300ms = 15s
  for (let i = 0; i < max; i++) {
    try {
      const res = await get(url);
      if (res.status === 200) {
        console.log(`[healthcheck] OK ${url}`);
        return 0;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  console.error(`[healthcheck] FAILED to reach ${url}`);
  return 1;
}

waitForServer().then((code) => process.exit(code));

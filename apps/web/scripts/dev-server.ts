/* Custom Next.js dev bootstrap to avoid CLI/env quirks */
import http from 'http';
import next from 'next';

const port = Number(process.env.PORT) || 3024;
const hostname = process.env.HOST || '0.0.0.0';

async function main() {
  const app = next({ dev: true, hostname, port, dir: '.' });
  const handler = app.getRequestHandler();
  await app.prepare();
  const server = http.createServer((req, res) => handler(req as any, res as any));
  server.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Next dev ready on http://${hostname}:${port}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Dev server failed:', err);
  process.exit(1);
});

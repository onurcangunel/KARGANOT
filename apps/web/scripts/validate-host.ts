/* Validate external host connectivity using /api/health */
import axios from 'axios';

const host = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function main() {
  try {
    const { data, status } = await axios.get(`${host}/api/health`, { timeout: 5000 });
    if (status === 200 && data?.ok) {
      // eslint-disable-next-line no-console
      console.log(`✅ Health OK — ${data.ok}, Host: ${host}`);
      // eslint-disable-next-line no-console
      console.log('KARGANOT API online 🟢 — host verified successfully.');
      return;
    }
    // eslint-disable-next-line no-console
    console.error(`❌ Health check unexpected response: ${status}`);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(`❌ Host bağlantı hatası: ${err?.message || String(err)}`);
  }
}

// Small delay to allow dev server to boot when run with `next dev & tsx ...`
setTimeout(() => void main(), 1500);

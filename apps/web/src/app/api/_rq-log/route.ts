import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Only log in development to avoid noise in production
    if (process.env.NODE_ENV !== 'development') {
      return new NextResponse(null, { status: 204 });
    }
    const body = await req.json().catch(() => ({}));
    const type = body?.type || 'log';
    const args = Array.isArray(body?.args) ? body.args : [body?.message ?? ''];
    // Basic size guard
    const safeArgs = args.slice(0, 20);
    // eslint-disable-next-line no-console
    console[type === 'error' ? 'error' : type === 'warn' ? 'warn' : 'log']('[RQ]', ...safeArgs);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

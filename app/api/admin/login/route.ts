import { NextRequest, NextResponse } from 'next/server';
import { createSession, verifyPassword, adminConfigured } from '@/lib/auth';

/** Small in-memory throttle. Not a distributed limiter, but it turns an
 *  unlimited online guessing attack into a slow one per instance. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  try {
    if (!adminConfigured()) {
      return NextResponse.json(
        { error: 'Beheer is niet geconfigureerd op deze omgeving.' },
        { status: 503 }
      );
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Te veel pogingen. Probeer het over 15 minuten opnieuw.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!password) {
      return NextResponse.json({ error: 'Wachtwoord is verplicht' }, { status: 400 });
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Onjuist wachtwoord' }, { status: 401 });
    }

    const created = await createSession();
    if (!created) {
      return NextResponse.json(
        { error: 'Beheer is niet geconfigureerd op deze omgeving.' },
        { status: 503 }
      );
    }

    attempts.delete(ip);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 });
  }
}

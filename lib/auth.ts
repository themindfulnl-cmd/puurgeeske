import { cookies } from 'next/headers';

/**
 * Session handling for the admin dashboard.
 *
 * The previous version accepted ANY cookie value as proof of login — setting
 * `puurgeeske_admin_session=x` in a console was enough to open the dashboard.
 * Sessions are now HMAC-signed with an expiry and verified on every request.
 *
 * Uses Web Crypto so the same verification runs in middleware (Edge) and in
 * route handlers (Node).
 */

export const SESSION_COOKIE = 'puurgeeske_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  // Fail closed: no secret configured means no admin access at all, rather
  // than falling back to a value that is committed in the source.
  if (!secret || secret.length < 32) return null;
  return secret;
}

function b64url(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return b64url(sig);
}

/** Length-independent, value-independent comparison. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Pure verification — safe to call from Edge middleware. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;

  const dot = token.lastIndexOf('.');
  if (dot <= 0) return false;

  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expected = await hmac(payload, secret);
  return timingSafeEqual(signature, expected);
}

export async function createSession(): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;

  const payload = String(Date.now() + SESSION_TTL_MS);
  const token = `${payload}.${await hmac(payload, secret)}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL_MS / 1000,
    path: '/',
  });
  return true;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

/** Constant-time password check. No default — an unset ADMIN_PASSWORD
 *  disables login rather than falling back to a password in the repo. */
export function verifyCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const editorUser = process.env.EDITOR_USERNAME;
  const editorPassword = process.env.EDITOR_PASSWORD;

  const adminMatch = Boolean(adminUser && adminPassword &&
    timingSafeEqual(username, adminUser) && timingSafeEqual(password, adminPassword));
  const editorMatch = Boolean(editorUser && editorPassword &&
    timingSafeEqual(username, editorUser) && timingSafeEqual(password, editorPassword));
  return adminMatch || editorMatch;
}

/** True when the admin surface is usable at all. */
export function adminConfigured(): boolean {
  return getSecret() !== null && Boolean(
    (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) ||
    (process.env.EDITOR_USERNAME && process.env.EDITOR_PASSWORD)
  );
}

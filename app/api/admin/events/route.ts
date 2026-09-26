import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/lib/auth';
import { loadEvents, saveEventsToStore } from '@/lib/events-store';
import type { Event } from '@/lib/content';

function validEvent(value: unknown): value is Event {
  if (!value || typeof value !== 'object') return false;
  const event = value as Record<string, unknown>;
  const text = (key: string, max = 500) =>
    typeof event[key] === 'string' && (event[key] as string).trim().length > 0 &&
    (event[key] as string).length <= max;
  const count = (key: string) =>
    typeof event[key] === 'number' && Number.isInteger(event[key]) && (event[key] as number) >= 0;

  if (!text('title', 120) || !text('description', 2000) || !text('location', 200) ||
      !text('time', 80) || !text('date', 10) || !text('bookingUrl', 500)) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date as string)) return false;
  if (Number.isNaN(Date.parse(`${event.date}T12:00:00`))) return false;
  if (typeof event.price !== 'number' || !Number.isFinite(event.price) || event.price < 0) return false;
  if (!count('spotsTotal') || !count('spotsRemaining') ||
      (event.spotsRemaining as number) > (event.spotsTotal as number)) return false;
  if (typeof event.active !== 'boolean') return false;
  try {
    const url = new URL(event.bookingUrl as string);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
  } catch { return false; }
  return true;
}

export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) {
        return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 403 });
    }
  }

  const body = await request.json().catch(() => null);
  if (!body || !['create', 'update', 'delete'].includes(body.action)) {
    return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 });
  }

  try {
    const events = await loadEvents();
    let updated: Event[];
    if (body.action === 'delete') {
      if (typeof body.id !== 'string' || !events.some((event) => event.id === body.id)) {
        return NextResponse.json({ error: 'Les niet gevonden' }, { status: 404 });
      }
      updated = events.filter((event) => event.id !== body.id);
    } else {
      if (!validEvent(body.event)) {
        return NextResponse.json({ error: 'Controleer alle velden van de les.' }, { status: 400 });
      }
      const event: Event = {
        ...body.event,
        id: body.action === 'create' ? crypto.randomUUID() : body.event.id,
      };
      if (body.action === 'update') {
        if (typeof event.id !== 'string' || !events.some((item) => item.id === event.id)) {
          return NextResponse.json({ error: 'Les niet gevonden' }, { status: 404 });
        }
        updated = events.map((item) => item.id === event.id ? event : item);
      } else {
        updated = [...events, event];
      }
    }

    await saveEventsToStore(updated);
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/events');
    return NextResponse.json({ events: updated });
  } catch (error) {
    console.error('Unable to save events', error);
    return NextResponse.json({ error: 'Opslaan is mislukt. Probeer het opnieuw.' }, { status: 500 });
  }
}

import { get, put } from '@vercel/blob';
import { getAllEvents as getBundledEvents, type Event } from '@/lib/content';

const EVENTS_PATH = 'content/events.json';

function hasStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** The bundled JSON is the initial content until an editor makes the first change. */
export async function loadEvents(): Promise<Event[]> {
  if (!hasStore()) return getBundledEvents();

  const result = await get(EVENTS_PATH, { access: 'private', useCache: false });
  if (!result) return getBundledEvents();
  if (!result.stream) throw new Error('De agenda kon niet worden gelezen.');
  return (await new Response(result.stream).json()) as Event[];
}

export async function loadUpcomingEvents(): Promise<Event[]> {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
  return (await loadEvents())
    .filter((event) => event.active && event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function saveEventsToStore(events: Event[]): Promise<void> {
  if (!hasStore()) {
    throw new Error('Opslag is niet ingesteld. Neem contact op met de beheerder.');
  }

  await put(EVENTS_PATH, JSON.stringify(events), {
    access: 'private',
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

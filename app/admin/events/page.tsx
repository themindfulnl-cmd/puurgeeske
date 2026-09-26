import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { loadEvents } from '@/lib/events-store';
import { EventsEditor } from '@/components/admin/EventsEditor';

export const dynamic = 'force-dynamic';

export default async function AdminEvents() {
  if (!await isAuthenticated()) redirect('/admin/login');
  const events = await loadEvents();
  return <EventsEditor initialEvents={events} />;
}

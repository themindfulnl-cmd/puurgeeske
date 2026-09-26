import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Calendar, ArrowRight } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';
import { loadUpcomingEvents } from '@/lib/events-store';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  if (!await isAuthenticated()) redirect('/admin/login');
  const events = await loadUpcomingEvents();

  return <div className="max-w-5xl mx-auto p-6 md:p-10">
    <p className="text-sm font-medium text-[#a33b70] uppercase tracking-widest">PuurGeeske beheer</p>
    <h1 className="text-3xl font-serif text-[#31212b] mt-2">Welkom terug</h1>
    <p className="text-stone-600 mt-2">Beheer de lessen en workshops die op je website verschijnen.</p>
    <Link href="/admin/events" className="mt-8 flex items-center justify-between gap-5 rounded-3xl border border-[#ead8df] bg-white p-6 shadow-sm hover:shadow-md">
      <span className="flex items-center gap-4"><span className="rounded-2xl bg-[#f8eaf0] p-4 text-[#793057]"><Calendar size={26} /></span><span><strong className="block text-xl font-serif text-[#31212b]">Lessen & workshops</strong><small className="text-stone-600">{events.length} aankomende momenten · toevoegen en bewerken</small></span></span><ArrowRight className="text-[#793057]" />
    </Link>
    <div className="mt-8 rounded-3xl bg-white p-6"><h2 className="text-xl font-serif text-[#31212b]">Aankomend</h2>{events.length ? <ul className="mt-4 divide-y divide-stone-100">{events.slice(0, 5).map((event) => <li key={event.id} className="flex flex-wrap justify-between gap-2 py-4"><span className="text-stone-800">{event.title}</span><span className="text-stone-500">{event.date} · {event.time}</span></li>)}</ul> : <p className="mt-4 text-stone-600">Er staat nog niets op de agenda. Voeg je eerste les toe.</p>}</div>
  </div>;
}

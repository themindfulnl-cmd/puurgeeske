'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import type { Event } from '@/lib/content';

const emptyEvent: Event = {
  id: '', date: '', time: '', title: '', description: '', price: 0,
  location: '', spotsTotal: 0, spotsRemaining: 0, bookingUrl: '', active: true,
};

export function EventsEditor({ initialEvents }: { initialEvents: Event[] }) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [editing, setEditing] = useState<Event | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function send(action: 'create' | 'update' | 'delete', event?: Event, id?: string) {
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, event, id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Opslaan is mislukt.');
      setEvents(result.events);
      setEditing(null);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Opslaan is mislukt.');
    } finally { setBusy(false); }
  }

  const field = (key: keyof Event, value: string | number | boolean) =>
    setEditing((current) => current ? { ...current, [key]: value } : current);

  const input = 'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none focus:border-[#a33b70] focus:ring-2 focus:ring-[#a33b70]/20';

  return <div className="p-6 md:p-10 max-w-6xl mx-auto">
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div><p className="text-sm font-medium text-[#a33b70] uppercase tracking-widest">PuurGeeske beheer</p><h1 className="text-3xl font-serif text-[#31212b] mt-2">Lessen & workshops</h1><p className="text-stone-600 mt-2">Voeg een moment toe, pas details aan of haal het van de website.</p></div>
      <button onClick={() => { setEditing({ ...emptyEvent }); setError(''); }} className="inline-flex items-center gap-2 rounded-full bg-[#793057] px-5 py-3 text-white hover:bg-[#5d2544]"><Plus size={18} /> Nieuwe les</button>
    </div>
    {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
    {editing && <form className="mb-8 rounded-3xl border border-[#ead7dd] bg-white p-6 shadow-sm" onSubmit={(event) => { event.preventDefault(); void send(editing.id ? 'update' : 'create', editing); }}>
      <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-serif text-[#31212b]">{editing.id ? 'Les bewerken' : 'Nieuwe les'}</h2><button type="button" aria-label="Sluiten" onClick={() => setEditing(null)}><X size={20} /></button></div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-stone-700">Titel<input required maxLength={120} value={editing.title} onChange={(event) => field('title', event.target.value)} className={input} /></label>
        <label className="grid gap-2 text-sm text-stone-700">Datum<input required type="date" value={editing.date} onChange={(event) => field('date', event.target.value)} className={input} /></label>
        <label className="grid gap-2 text-sm text-stone-700">Tijd<input required maxLength={80} placeholder="Bijv. 10:00 – 11:30" value={editing.time} onChange={(event) => field('time', event.target.value)} className={input} /></label>
        <label className="grid gap-2 text-sm text-stone-700">Locatie<input required maxLength={200} value={editing.location} onChange={(event) => field('location', event.target.value)} className={input} /></label>
        <label className="grid gap-2 text-sm text-stone-700">Prijs (€)<input required type="number" min="0" step="0.01" value={editing.price} onChange={(event) => field('price', Number(event.target.value))} className={input} /></label>
        <label className="grid gap-2 text-sm text-stone-700">Totaal aantal plekken<input required type="number" min="0" step="1" value={editing.spotsTotal} onChange={(event) => field('spotsTotal', Number(event.target.value))} className={input} /></label>
        <label className="grid gap-2 text-sm text-stone-700">Beschikbare plekken<input required type="number" min="0" max={editing.spotsTotal} step="1" value={editing.spotsRemaining} onChange={(event) => field('spotsRemaining', Number(event.target.value))} className={input} /></label>
        <label className="grid gap-2 text-sm text-stone-700">Boekingslink<input required type="url" placeholder="https://..." value={editing.bookingUrl} onChange={(event) => field('bookingUrl', event.target.value)} className={input} /></label>
        <label className="grid gap-2 text-sm text-stone-700 md:col-span-2">Beschrijving<textarea required maxLength={2000} rows={4} value={editing.description} onChange={(event) => field('description', event.target.value)} className={input} /></label>
        <label className="flex items-center gap-3 text-sm text-stone-700 md:col-span-2"><input type="checkbox" checked={editing.active} onChange={(event) => field('active', event.target.checked)} /> Toon op website</label>
      </div>
      <div className="flex flex-wrap gap-3 mt-7"><button disabled={busy} type="submit" className="rounded-full bg-[#793057] px-6 py-3 text-white disabled:opacity-50">{busy ? 'Opslaan...' : 'Les opslaan'}</button><button type="button" onClick={() => setEditing(null)} className="rounded-full border border-stone-300 px-6 py-3">Annuleren</button></div>
    </form>}
    <div className="grid gap-4">
      {events.length === 0 && <p className="rounded-2xl bg-white p-8 text-stone-600">Er zijn nog geen lessen of workshops toegevoegd.</p>}
      {[...events].sort((a, b) => b.date.localeCompare(a.date)).map((event) => <article key={event.id} className="flex flex-wrap justify-between gap-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="min-w-0"><p className="text-sm text-[#a33b70]">{event.date} · {event.time} · {event.location}</p><h2 className="text-xl font-serif text-[#31212b] mt-1">{event.title}</h2><p className="text-stone-600 mt-2 max-w-2xl">{event.description}</p><p className="text-sm text-stone-500 mt-3">€{event.price} · {event.spotsRemaining}/{event.spotsTotal} plekken · {event.active ? 'Zichtbaar' : 'Verborgen'}</p></div>
        <div className="flex items-start gap-2"><button aria-label={`${event.title} bewerken`} onClick={() => { setEditing({ ...event }); setError(''); }} className="rounded-full border border-stone-200 p-3 hover:bg-stone-50"><Pencil size={18} /></button><button aria-label={`${event.title} verwijderen`} disabled={busy} onClick={() => { if (window.confirm(`Verwijder ${event.title}?`)) void send('delete', undefined, event.id); }} className="rounded-full border border-stone-200 p-3 text-red-700 hover:bg-red-50"><Trash2 size={18} /></button></div>
      </article>)}
    </div>
    <p className="mt-6 text-sm text-stone-500">Verlopen lessen verdwijnen automatisch van de openbare agenda. Je kunt ze hier nog wel bewerken of verwijderen.</p>
  </div>;
}

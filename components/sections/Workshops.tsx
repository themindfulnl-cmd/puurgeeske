import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Picture } from "@/components/ui/Picture";
import type { Event } from "@/lib/content";
export function Workshops({events}:{events:Event[]}) {
 return <section id="workshops" className="py-24 bg-secondary"><div className="container mx-auto px-6 md:px-12">
   <div className="section-heading"><div><p className="eyebrow">In de agenda</p><h2>Maak ruimte voor <em>jezelf.</em></h2></div></div>
   {events.length ? events.map(event=><article className="event-feature" key={event.id}>
    <div className="event-photo"><Picture name="group-beach" widths={[480,768,1024]} sizes="(max-width: 767px) 90vw, 45vw" alt="Samen buiten yoga beleven" width={1024} height={678} imgClassName="w-full h-full object-cover" className="h-full"/><span>Samen vertragen</span></div>
    <div className="event-details"><p className="eyebrow">{new Intl.DateTimeFormat('nl-NL',{day:'numeric',month:'long',year:'numeric'}).format(new Date(event.date+'T12:00:00'))}</p><h3>{event.title}</h3><p>{event.description}</p><div className="event-facts"><span><Clock size={16}/>{event.time}</span><span><MapPin size={16}/>{event.location}</span></div><div className="flex items-center justify-between gap-4 mt-8"><strong className="text-3xl font-serif">€{event.price}<small className="font-sans text-xs text-muted-foreground ml-2">per persoon</small></strong><a className="action-link" href={event.bookingUrl} target="_blank" rel="noopener noreferrer">Bekijk & boek <ArrowUpRight size={16}/></a></div></div>
   </article>):<p className="text-muted-foreground">Een nieuw moment volgt binnenkort. <a href="/contact" className="text-primary underline">Vraag naar de mogelijkheden.</a></p>}
 </div></section>;
}

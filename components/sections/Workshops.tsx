import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import type { Event } from "@/lib/content";

export function Workshops({events}:{events:Event[]}) {
  return <section id="workshops" className="gather-section">
    <div className="gather-image"><Image src="/images/geeske-group-beach.jpg" alt="Geeske begeleidt samen bewegen op het strand" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
    <div className="gather-content">
      <p className="eyebrow">Samen beleven</p>
      <h2 className="section-title">Even uit de drukte.<br/><em>Samen in het moment.</em></h2>
      <p>Een workshop, een buitenles of een moment met je eigen groep. Samen bewegen en tijd maken voor jezelf.</p>
      {events.length ? <div className="agenda-list">{events.map(event => <article className="agenda-event" key={event.id}><p className="eyebrow">{new Intl.DateTimeFormat('nl-NL',{day:'numeric',month:'long',year:'numeric'}).format(new Date(event.date+'T12:00:00'))}</p><h3>{event.title}</h3><p>{event.description}</p><div className="event-facts"><span><Clock size={14}/>{event.time}</span><span><MapPin size={14}/>{event.location}</span><span>€{event.price} p.p.</span></div><a href={event.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-link">Bekijk & boek <ArrowUpRight size={16}/></a></article>)}</div> : <div className="agenda-empty"><p className="eyebrow">De agenda</p><p>Nieuwe workshops worden hier aangekondigd. Neem contact op voor de actuele lessen of een workshop op maat.</p><Link href="/contact?aanbod=Samen%20beleven" className="text-link">Vraag naar de mogelijkheden <ArrowUpRight size={16}/></Link></div>}
    </div>
  </section>;
}

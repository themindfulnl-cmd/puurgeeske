import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import type { Event } from "@/lib/content";

export function Workshops({events}:{events:Event[]}) {
  return <section id="workshops" className="gather-section">
    <div className="site-shell">
      <div className="gather-heading"><p className="eyebrow">Samen beleven</p><h2 className="section-title">De mooiste momenten<br/><em>deel je samen.</em></h2><p>Uit je hoofd, de natuur in. Een buitenles, workshop of een bijzonder moment met je eigen groep.</p></div>
      <div className="gather-layout">
        <div className="gather-image"><Image src="/images/geeske-group-beach.jpg" alt="Geeske en een groep bewegen samen op het strand" fill sizes="(max-width: 800px) 90vw, 700px"/><span>Een moment met Puur Geeske</span></div>
        <div className="gather-content">
          <p className="eyebrow">Ruimte voor verbinding</p>
          <h3>Samen bewegen.<br/><em>Samen genieten.</em></h3>
          <p>Met vrienden, familie of collega’s: ik maak graag een yoga- of ademworkshop die bij jullie past.</p>
          <div className="gather-tags"><span>Privégroep</span><span>Op maat</span><span>Binnen of buiten</span></div>
          <Link href="/contact?aanbod=Samen%20beleven" className="button-primary">Plan een groepsmoment <ArrowUpRight size={17}/></Link>
        </div>
      </div>
      {events.length ? <div className="agenda-list">{events.map(event => <article className="agenda-event" key={event.id}><p className="eyebrow">{new Intl.DateTimeFormat('nl-NL',{day:'numeric',month:'long',year:'numeric'}).format(new Date(event.date+'T12:00:00'))}</p><h3>{event.title}</h3><p>{event.description}</p><div className="event-facts"><span><Clock size={14}/>{event.time}</span><span><MapPin size={14}/>{event.location}</span><span>€{event.price} p.p.</span></div><a href={event.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-link">Bekijk & boek <ArrowUpRight size={16}/></a></article>)}</div> : <div className="agenda-empty"><p><span>Op de agenda</span> Benieuwd naar de volgende les of workshop?</p><Link href="/contact" className="text-link">Vraag naar de planning <ArrowUpRight size={16}/></Link></div>}
    </div>
  </section>;
}

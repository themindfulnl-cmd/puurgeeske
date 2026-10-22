import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices } from "@/lib/content";

export function Services() {
  const services = getServices();
  return <section className="services-section" id="services">
    <div className="site-shell">
      <div className="section-heading"><div><p className="eyebrow">Het aanbod</p><h2 className="section-title">Wat past <em>bij jou?</em></h2></div><p>Een les, een wandeling of persoonlijke begeleiding. Ontdek wat je aanspreekt. Samen kijken we naar de mogelijkheden.</p></div>
      <div className="service-list">{services.map((service, index) => <Link href={`/contact?aanbod=${encodeURIComponent(service.title)}`} className="service-row" key={service.id}>
        <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
        <h3>{service.title}</h3><p>{service.description}</p>
        <div className="service-details"><span>{service.duration}</span><strong>{service.price || 'Neem contact op'}</strong></div>
        <span className="service-arrow"><ArrowUpRight size={21} strokeWidth={1.3}/></span>
      </Link>)}</div>
      <div className="service-note"><span>Je hoeft nog niet te weten wat je zoekt.</span><Link href="/contact" className="text-link">Ik denk graag met je mee <ArrowUpRight size={14}/></Link></div>
    </div>
  </section>;
}

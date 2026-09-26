import Link from "next/link";
import { ArrowUpRight, Flower2, Heart, Activity, Wind, User } from "lucide-react";
import { getServices } from "@/lib/content";
const icons = { Flower2, Heart, Activity, Wind, User };
export function Services() {
  return <section className="offering-section py-24" id="services">
    <div className="container mx-auto px-6 md:px-12">
      <div className="section-heading"><div><p className="eyebrow">Ruimte voor wat jij nodig hebt</p><h2>Jouw moment.<br /><em>Jouw manier.</em></h2></div><p>Van een rustige les tot persoonlijke begeleiding. Ontdek waar jij vandaag behoefte aan hebt.</p></div>
      <div className="offering-grid">{getServices().map((service, i) => {
        const Icon = icons[service.icon as keyof typeof icons] || Flower2;
        return <Link href={`/contact?aanbod=${encodeURIComponent(service.title)}`} className="offering-card" key={service.id}>
          <div className="flex items-center justify-between"><Icon size={26} strokeWidth={1.2} className="text-primary"/><span className="text-xs text-muted-foreground">0{i+1}</span></div>
          <h3>{service.title}</h3><p>{service.description}</p>
          <div className="offering-meta"><span>{service.duration}<strong>{service.price || 'Neem contact op'}</strong></span><ArrowUpRight size={20}/></div>
        </Link>;
      })}</div>
      <p className="mt-6 text-sm text-muted-foreground">Lestijden en beschikbaarheid? <Link href="/contact" className="text-primary underline underline-offset-4">Stem ze af met Geeske.</Link></p>
    </div>
  </section>;
}

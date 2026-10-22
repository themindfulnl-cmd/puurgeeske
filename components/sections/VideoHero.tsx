import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function VideoHero() {
  return <section className="editorial-hero" aria-labelledby="hero-title">
    <div className="hero-landscape"><Image src="/images/coastal-dunes.webp" alt="" fill priority sizes="100vw" /></div>
    <div className="hero-shade" />
    <div className="site-shell hero-content">
      <p className="eyebrow anim-in">Puur Geeske · Hoofddorp</p>
      <h1 id="hero-title" className="anim-in anim-d1">Meer ruimte.<br/>Meer rust.<br/><em>Meer jezelf.</em></h1>
      <p className="hero-description anim-in anim-d2">Yoga, ademwerk en persoonlijke aandacht.<br/>Een moment om te bewegen, te vertragen<br className="desktop-break"/> en te voelen wat jij nodig hebt.</p>
      <div className="hero-actions anim-in anim-d2"><Link href="#services" className="button-light">Ontdek het aanbod <ArrowUpRight size={17}/></Link><Link href="/over" className="hero-text-link">Ontmoet Geeske</Link></div>
    </div>
    <div className="site-shell hero-bottom"><p>Yoga & Pilates <span>·</span> Ademwerk <span>·</span> Lichaamswerk</p><Link href="#geeske" aria-label="Lees verder over Geeske"><ArrowDown size={18} strokeWidth={1.3}/></Link></div>
  </section>;
}

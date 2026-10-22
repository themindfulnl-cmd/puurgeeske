import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSea } from "@/components/ui/HeroSea";

export function VideoHero() {
  return <section className="editorial-hero" aria-labelledby="hero-title">
    <HeroSea />
    <div className="hero-shade" />
    <div className="site-shell hero-content">
      <p className="eyebrow anim-in">Puur Geeske · Hoofddorp</p>
      <h1 id="hero-title" className="anim-in anim-d1">Meer ruimte.<br/>Meer rust.<br/><em>Meer jezelf.</em></h1>
      <p className="hero-description anim-in anim-d2">Yoga, ademwerk en persoonlijke aandacht.<br/>Een moment om te bewegen, te vertragen<br className="desktop-break"/> en te voelen wat jij nodig hebt.</p>
      <div className="hero-actions anim-in anim-d2"><Link href="#services" className="button-light">Ontdek het aanbod <ArrowUpRight size={17}/></Link><Link href="/over" className="hero-text-link">Ontmoet Geeske</Link></div>
    </div>
  </section>;
}

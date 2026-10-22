import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSea } from "@/components/ui/HeroSea";

export function VideoHero() {
  return <div className="hero-stage">
    <section className="editorial-hero" aria-labelledby="hero-title">
      <HeroSea />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow anim-in">Yoga, adem & aandacht</p>
        <h1 id="hero-title" className="anim-in anim-d1">Even helemaal<br/><em>bij jezelf.</em></h1>
        <p className="hero-description anim-in anim-d2">Laat de dag even los. Beweeg, adem en vind<br className="desktop-break"/> jouw moment van rust bij Geeske.</p>
        <div className="hero-actions anim-in anim-d2"><Link href="#services" className="button-light">Vind jouw moment <ArrowUpRight size={18}/></Link></div>
      </div>
      <span className="hero-location">Hoofddorp & omgeving</span>
      <span className="hero-side-note">In jouw tempo. Op jouw manier.</span>
    </section>
    <nav className="hero-paths" aria-label="Vind jouw moment">
      <Link href="#yoga"><span className="path-number">01</span><span><small>Bewegen & ontspannen</small><strong>Yoga & Pilates</strong></span><ArrowUpRight size={21} strokeWidth={1.4}/></Link>
      <Link href="#personal"><span className="path-number">02</span><span><small>Ademwerk, coaching & massage</small><strong>Persoonlijke sessies</strong></span><ArrowUpRight size={21} strokeWidth={1.4}/></Link>
      <Link href="#workshops"><span className="path-number">03</span><span><small>Een moment om te delen</small><strong>Workshops & groepen</strong></span><ArrowUpRight size={21} strokeWidth={1.4}/></Link>
    </nav>
  </div>;
}

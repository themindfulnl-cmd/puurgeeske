import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FilmPlayer } from "@/components/ui/FilmPlayer";
import { Button } from "@/components/ui/Button";
import { getSiteConfig } from "@/lib/content";

export function VideoHero() {
  const config = getSiteConfig();
  return (
    <section className="sunset-hero">
      <div className="container mx-auto px-6 md:px-12">
        <div className="hero-grid">
          <div className="anim-in">
            <p className="eyebrow">PuurGeeske · Hoofddorp</p>
            <h1 className="hero-title">Even vertragen.<br />Helemaal <em>jezelf.</em></h1>
            <p className="hero-description">Vind rust in je hoofd, ruimte in je lichaam en verbinding met jezelf. Met persoonlijke aandacht en de zachte kracht van beweging.</p>
            <div className="hero-actions">
              <Button asChild size="lg"><a href={config.bookingUrl} target="_blank" rel="noopener noreferrer">Plan jouw moment <ArrowUpRight className="ml-3 h-4 w-4" /></a></Button>
              <Link href="#services" className="text-link">Ontdek het aanbod <ArrowDown size={14} /></Link>
            </div>
            <p className="hero-footnote"><i aria-hidden="true" /> Alle ruimte voor jou. Precies zoals je bent.</p>
          </div>
          <div className="logo-scene anim-in anim-d1">
            <Image src="/brand/puurgeeske-sunset.png" alt="PuurGeeske — boom en woordmerk in een warme zonsondergang" width={500} height={500} priority sizes="(max-width: 767px) 90vw, 45vw" />
          </div>
        </div>
        <div className="intro-panel anim-in anim-d2">
          <div>
            <span className="eyebrow">Een eerste kennismaking</span>
            <h2>Welkom, ik ben Geeske.</h2>
            <p>Een plek waar je even niets hoeft. Voel de sfeer en ontdek hoe ik je begeleid naar meer balans in lichaam en geest.</p>
            <Link href="/over" className="text-link mt-5">Meer over mij <ArrowUpRight size={14} /></Link>
          </div>
          <div>
            <FilmPlayer base="intro" posterName="intro-poster" posterWidths={[480, 768, 1024, 1440, 1920]} posterSizes="(max-width: 767px) 90vw, 360px" alt="Geeske stelt zich voor" buttonLabel="Speel de introductievideo af" />
            <p className="mt-3 text-xs tracking-wider">ONTMOET GEESKE · 1 MIN 30</p>
          </div>
        </div>
      </div>
    </section>
  );
}

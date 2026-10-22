import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return <section id="geeske" className="about-section">
    <div className="site-shell about-layout">
      <div className="about-portrait">
        <div className="portrait-image"><Image src="/images/geeske-yoga-beach.jpg" alt="Geeske doet yoga op het strand" width={475} height={1024} sizes="(max-width: 700px) 80vw, 380px" /></div>
        <p className="portrait-caption">Met beide voeten op de grond.<span>Geeske</span></p>
      </div>
      <div className="about-copy">
        <p className="eyebrow">Aangenaam, ik ben Geeske</p>
        <h2 className="section-title">Aandacht begint<br/>bij <em>luisteren.</em></h2>
        <p className="intro-copy">Er is geen vaste manier om tot rust te komen. Wel een manier die bij jou past.</p>
        <p>In mijn werk komen yoga, pilates, ademwerk en lichaamswerk samen. Soms begint het met bewegen, soms met vertragen. Ik luister naar wat je nodig hebt en begeleid je in jouw tempo.</p>
        <Link href="/over" className="text-link">Maak kennis met mij <ArrowUpRight size={16}/></Link>
        <div className="approach-note"><span>01 — Mijn uitgangspunt</span><p>Je hoeft niets te bewijzen.<br/>We beginnen waar je bent.</p></div>
      </div>
    </div>
  </section>;
}

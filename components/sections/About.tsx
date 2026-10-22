import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return <section id="geeske" className="about-section">
    <div className="site-shell about-layout">
      <div className="about-collage">
        <div className="portrait-image"><Image src="/images/geeske-yoga-beach.jpg" alt="Geeske doet yoga op het strand" fill sizes="(max-width: 700px) 75vw, 390px" /></div>
        <div className="portrait-detail"><Image src="/images/coastal-ritual.webp" alt="Zachte materialen en een meditatiekussen in het zonlicht" fill sizes="(max-width: 700px) 35vw, 210px"/></div>
        <div className="portrait-stamp"><span>Met aandacht</span><span className="stamp-flower" aria-hidden="true">✳</span><span>voor jou</span></div>
        <p className="portrait-caption">Buiten zijn. Diep ademhalen. Gewoon jezelf.</p>
      </div>
      <div className="about-copy">
        <p className="eyebrow">Aangenaam, ik ben Geeske</p>
        <h2 className="section-title">Je hoeft niets<br/>te worden.<br/><em>Je mag er zijn.</em></h2>
        <p className="intro-copy">Er is geen vaste manier om tot rust te komen. Wel een manier die bij jou past.</p>
        <p>Met yoga, pilates, ademwerk en lichaamswerk help ik je ruimte te maken voor jezelf. Soms door te bewegen, soms door juist even stil te staan. Altijd met persoonlijke aandacht.</p>
        <Link href="/over" className="text-link">Meer over Geeske <ArrowUpRight size={17}/></Link>
        <div className="personal-signature">Liefs, Geeske</div>
      </div>
    </div>
  </section>;
}

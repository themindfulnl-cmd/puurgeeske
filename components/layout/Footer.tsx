import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { getSiteConfig } from "@/lib/content";

export function Footer({ showInvitation = true }: { showInvitation?: boolean }) {
  const config = getSiteConfig();
  return <footer className="site-footer">
    {showInvitation && <div className="footer-invitation">
      <div className="invitation-orbit" aria-hidden="true"/>
      <p className="eyebrow">Een klein begin kan veel betekenen</p>
      <h2>Jouw moment<br/><em>begint hier.</em></h2>
      <p>Je hoeft alleen de eerste stap te zetten.<br/>Ik denk graag met je mee.</p>
      <Link href="/contact" className="button-primary">Laten we kennismaken <ArrowUpRight size={18}/></Link>
    </div>}
    <div className="footer-base"><div className="site-shell">
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand-lockup" aria-label="Puur Geeske — home"><Image src="/brand/puurgeeske-logo.png" alt="" width={60} height={60} className="brand-mark"/><span className="brand-name">puur Geeske<small>Yoga · Adem · Aandacht</small></span></Link>
          <p className="footer-description">Even helemaal bij jezelf.<br/>In Hoofddorp en omgeving.</p>
        </div>
        <nav aria-label="Footernavigatie"><p className="eyebrow">Ontdek</p><Link href="/#services">Lessen & sessies</Link><Link href="/over">Over Geeske</Link><Link href="/#workshops">Workshops & groepen</Link><Link href="/contact">Contact</Link></nav>
        <div className="footer-contact"><p className="eyebrow">Zeg gerust hallo</p><a href={`mailto:${config.email}`}>{config.email} <ArrowUpRight size={14}/></a><p>{config.address}</p><div className="social-links"><a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Puur Geeske op Instagram"><Instagram size={18}/></a><a href={config.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Puur Geeske op Facebook"><Facebook size={18}/></a></div></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Puur Geeske</p><p>Met aandacht, van Geeske.</p><a href="#main-content">Terug naar boven ↑</a></div>
    </div></div>
  </footer>;
}

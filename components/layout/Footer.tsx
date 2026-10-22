import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { getSiteConfig } from "@/lib/content";

export function Footer({ showInvitation = true }: { showInvitation?: boolean }) {
  const config = getSiteConfig();
  return <footer className="site-footer">
    <div className="site-shell">
      {showInvitation && <div className="footer-invitation">
        <div><p className="eyebrow">Je bent welkom</p><h2>Zullen we <em>kennismaken?</em></h2></div>
        <Link href="/contact" className="button-primary">Stuur me een bericht <ArrowUpRight size={17}/></Link>
      </div>}
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand-lockup" aria-label="Puur Geeske — home"><Image src="/brand/puurgeeske-logo.png" alt="" width={60} height={60} className="brand-mark"/><span className="brand-name">puur Geeske<small>Yoga & persoonlijke aandacht</small></span></Link>
          <p className="footer-description">Beweging, adem en aandacht.<br/>Op jouw manier, in jouw tempo.</p>
        </div>
        <nav aria-label="Footernavigatie"><p className="eyebrow">Ontdek</p><Link href="/#services">Het aanbod</Link><Link href="/over">Over Geeske</Link><Link href="/#workshops">De agenda</Link><Link href="/contact">Contact</Link></nav>
        <div className="footer-contact"><p className="eyebrow">Laten we contact houden</p><a href={`mailto:${config.email}`}>{config.email} <ArrowUpRight size={14}/></a><p>{config.address}</p><div className="social-links"><a href={config.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Puur Geeske op Instagram"><Instagram size={18}/></a><a href={config.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Puur Geeske op Facebook"><Facebook size={18}/></a></div></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Puur Geeske</p><p>Met aandacht, van Geeske.</p><a href="#main-content">Terug naar boven ↑</a></div>
    </div>
  </footer>;
}

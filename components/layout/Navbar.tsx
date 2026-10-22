"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { name: "Lessen & sessies", href: "/#services" },
  { name: "Over Geeske", href: "/over" },
  { name: "Workshops", href: "/#workshops" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return <header className="site-header">
    <a href="#main-content" className="skip-link">Direct naar inhoud</a>
    <div className="site-shell header-inner">
      <nav className="desktop-nav nav-left" aria-label="Hoofdnavigatie">
        {links.slice(0,2).map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.name}</Link>)}
      </nav>
      <Link href="/" className="brand-lockup" aria-label="Puur Geeske — home" onClick={() => setOpen(false)}>
        <Image src="/brand/puurgeeske-logo.png" alt="" width={54} height={54} className="brand-mark" priority />
        <span className="brand-name">puur Geeske<small>Yoga · Adem · Aandacht</small></span>
      </Link>
      <div className="header-right">
        <nav className="desktop-nav" aria-label="Workshops en contact">{links.slice(2).map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.name}</Link>)}</nav>
        <Link href="/contact" className="header-cta">Kennismaken <ArrowUpRight size={15} /></Link>
      </div>
      <button id="menu-toggle" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Sluit menu" : "Open menu"}>{open ? <X size={23} /> : <Menu size={23} />}</button>
    </div>
    <nav id="mobile-menu" className="mobile-navigation" aria-label="Mobiele navigatie" hidden={!open}>
      {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>{link.name}<ArrowUpRight size={18}/></Link>)}
      <Link href="/contact" className="button-primary" onClick={() => setOpen(false)}>Laten we kennismaken <ArrowUpRight size={18}/></Link>
      <p>Hoofddorp & omgeving</p>
    </nav>
  </header>;
}

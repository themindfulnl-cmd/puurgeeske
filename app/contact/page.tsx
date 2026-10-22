import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/content";
import styles from "../secondary-pages.module.css";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description: "Een vraag over yoga, pilates of een persoonlijke sessie? Neem rechtstreeks contact op met Geeske via WhatsApp, e-mail of telefoon.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ aanbod?: string | string[] }>;
}) {
  const config = getSiteConfig();
  const params = await searchParams;
  const aanbod = Array.isArray(params.aanbod) ? params.aanbod[0] : params.aanbod;
  const subject = aanbod ? `Vraag over ${aanbod}` : "Kennismaken met Puur Geeske";
  const whatsapp = new URL(config.bookingUrl);
  whatsapp.searchParams.set("text", `Hi Geeske, ik wil graag meer weten${aanbod ? ` over ${aanbod}` : " over je aanbod"}.`);

  return (
    <div className={styles.page}>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={`site-shell ${styles.contactSection}`} aria-labelledby="contact-title">
          <div className={styles.contactHeading}>
            <p className="eyebrow">Contact</p>
            <h1 id="contact-title" className={styles.title}>Een eerste stap<br />begint met <em>contact.</em></h1>
            <p className={styles.contactLead}>Een vraag, een kennismaking of een afspraak.<br className={styles.desktopBreak} /> Je bent van harte welkom.</p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.invitation}>
              <p className="eyebrow">Rechtstreeks met Geeske</p>
              <h2 className={styles.invitationTitle}>Vertel me wat<br />je zoekt.</h2>
              <p>{aanbod ? `Je hebt interesse in ${aanbod}. Stuur me gerust je vraag, dan kijken we samen naar de mogelijkheden.` : "Je hoeft nog niet precies te weten wat bij je past. Stuur me gerust een bericht; samen kijken we naar de mogelijkheden."}</p>
              <a href={whatsapp.toString()} target="_blank" rel="noopener noreferrer" className="button-primary">Stuur een WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>

            <div className={styles.contactDetails}>
              <p className="eyebrow">Liever mailen of bellen?</p>
              <a href={`mailto:${config.email}?subject=${encodeURIComponent(subject)}`} className={styles.contactMethod}>
                <span><span className={styles.methodLabel}>E-mail</span><span className={styles.methodValue}>{config.email}</span></span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <a href={`tel:${config.phone.replace(/\s/g, "")}`} className={styles.contactMethod}>
                <span><span className={styles.methodLabel}>Telefoon</span><span className={styles.methodValue}>{config.phone}</span></span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <div className={styles.location}>
                <span className={styles.methodLabel}>Omgeving</span>
                <p className={styles.methodValue}>{config.address}</p>
                <p className={styles.locationNote}>De exacte locatie spreken we samen af.</p>
              </div>
            </div>
          </div>
          <div className={styles.contactFooter}>
            <p>Eerst rustig rondkijken?</p>
            <Link href="/#services" className="text-link">Ontdek het aanbod <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <Footer showInvitation={false} />
    </div>
  );
}

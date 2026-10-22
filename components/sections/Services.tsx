import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServices, type Service } from "@/lib/content";
import styles from "./services.module.css";

const presentation: Record<string, { image: string; label: string; position?: string }> = {
  yoga: { image: "/images/geeske-group-beach.jpg", label: "Samen bewegen", position: "50% 45%" },
  yin: { image: "/images/yoga-still-life.webp", label: "Vertragen & voelen" },
  breathwork: { image: "/images/coastal-ritual.webp", label: "Ruimte in je adem" },
  coaching: { image: "/images/coastal-dunes.webp", label: "Buiten, met aandacht" },
  massage: { image: "/images/coastal-ritual.webp", label: "Ontspanning voor je lichaam", position: "70% 70%" },
  groepen: { image: "/images/geeske-group-beach.jpg", label: "Met je eigen groep", position: "65% 45%" },
};

function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  const visual = presentation[service.id] ?? { image: "/images/yoga-still-life.webp", label: "Aandacht voor jezelf" };
  const href = `/contact?aanbod=${encodeURIComponent(service.title)}`;

  return (
    <article id={service.id === "yoga" ? "yoga" : service.id === "breathwork" ? "personal" : undefined} className={`${styles.card} ${compact ? styles.compactCard : styles.featuredCard}`}>
      <Link href={href} className={styles.cardLink} aria-labelledby={`service-${service.id}-title`} aria-describedby={`service-${service.id}-details`}>
        <div className={styles.imageWrap}>
          <Image
            src={visual.image}
            alt=""
            fill
            sizes={compact ? "(max-width: 700px) 112px, 96px" : "(max-width: 700px) 90vw, 31vw"}
            style={visual.position ? { objectPosition: visual.position } : undefined}
          />
          {!compact && <span className={styles.imageLabel}>{visual.label}</span>}
        </div>
        <div className={styles.cardBody}>
          {compact && <span className={styles.smallLabel}>{visual.label}</span>}
          <div className={styles.cardHeading}>
            <h3 id={`service-${service.id}-title`}>{service.title}</h3>
            <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.4} /></span>
          </div>
          <p className={styles.description}>{service.description}</p>
          <div id={`service-${service.id}-details`} className={styles.practical}>
            <span>{service.duration}</span>
            {service.price && <strong>{service.price}</strong>}
          </div>
          {!compact && <span className={styles.cardAction}>Ontdek de mogelijkheden <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></span>}
        </div>
      </Link>
    </article>
  );
}

export function Services() {
  const services = getServices();
  const featuredIds = ["yoga", "yin", "breathwork"];
  const featured = featuredIds.flatMap(id => services.filter(service => service.id === id));
  const personal = services.filter(service => !featuredIds.includes(service.id));

  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <div className="site-shell">
        <div className={styles.intro}>
          <p className="eyebrow">Lessen & persoonlijke sessies</p>
          <h2 id="services-title">Wat past <em>bij jou?</em></h2>
          <p>Bewegen, vertragen of even helemaal tot jezelf komen.<br className={styles.desktopBreak} /> Ontdek welke vorm van aandacht bij jou past.</p>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map(service => <ServiceCard key={service.id} service={service} />)}
        </div>
        {personal.length > 0 && (
          <div className={styles.personalArea}>
            <div className={styles.personalHeading}>
              <span>Ook bij Puur Geeske</span>
              <span>Een andere vorm, dezelfde aandacht</span>
            </div>
            <div className={styles.personalGrid}>
              {personal.map(service => <ServiceCard key={service.id} service={service} compact />)}
            </div>
          </div>
        )}
        <div className={styles.guidance}>
          <p><span>Nog niet zeker wat bij je past?</span> Geeske denkt graag met je mee.</p>
          <Link href="/contact">Stel je vraag <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

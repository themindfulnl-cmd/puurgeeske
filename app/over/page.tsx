import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilmPlayer } from "@/components/ui/FilmPlayer";
import styles from "../secondary-pages.module.css";

export const metadata: Metadata = {
  title: "Over Geeske",
  alternates: { canonical: "/over" },
  description: "Maak kennis met Geeske. Persoonlijke begeleiding in yoga, pilates, ademhaling en lichaamswerk in de omgeving van Hoofddorp.",
};

export default function OverPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <section className={`site-shell ${styles.aboutIntro}`} aria-labelledby="about-title">
          <div className={styles.portraitWrap}>
            <Image
              src="/images/geeske-yoga-beach.jpg"
              sizes="(max-width: 760px) calc(100vw - 44px), 400px"
              alt="Geeske beoefent yoga op het strand"
              width={475}
              height={1024}
              loading="eager"
              fetchPriority="high"
              className={styles.portrait}
            />
            <p className={styles.imageCaption}>Bewegen. Ademhalen. Buiten zijn.</p>
          </div>
          <div className={styles.aboutCopy}>
            <p className="eyebrow">Het gezicht achter Puur Geeske</p>
            <h1 id="about-title" className={styles.title}>Ik ben Geeske.<br /><em>Fijn dat je er bent.</em></h1>
            <p className={styles.lead}>In mijn begeleiding komen beweging, ademhaling en persoonlijke aandacht samen.</p>
            <div className={styles.bodyCopy}>
              <p>Mijn achtergrond ligt in yoga, pilates, breathwork, massage en holistisch lichaamswerk. Vanuit die verschillende vormen kijken we samen wat bij jou past.</p>
              <p>Je hoeft nog niet precies te weten wat je zoekt. We beginnen bij hoe jij je voelt, met ruimte om te bewegen, te vertragen en te luisteren naar je lichaam.</p>
            </div>
            <Link href="/contact" className="text-link">Laten we kennismaken <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className={styles.philosophy} aria-labelledby="approach-title">
          <div className={`site-shell ${styles.philosophyGrid}`}>
            <div>
              <p className="eyebrow">Mijn manier van werken</p>
              <h2 id="approach-title" className={styles.sectionTitle}>Alle aandacht.<br /><em>Op jouw tempo.</em></h2>
            </div>
            <div className={styles.principles}>
              <div>
                <h3>Persoonlijk</h3>
                <p>We stemmen de begeleiding af op jouw vragen en behoeften. Er is ruimte om te vertellen wat voor jou belangrijk is.</p>
              </div>
              <div>
                <h3>Met aandacht</h3>
                <p>Beweging en ademhaling helpen je om even stil te staan bij jezelf. Zonder haast, met aandacht voor wat je ervaart.</p>
              </div>
              <div>
                <h3>Op een manier die past</h3>
                <p>Van een les tot een individuele sessie: samen zoeken we een vorm waarin jij je prettig voelt.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`site-shell ${styles.filmSection}`} aria-labelledby="film-title">
          <div className={styles.filmHeading}>
            <div>
              <p className="eyebrow">Even kennismaken</p>
              <h2 id="film-title" className={styles.sectionTitle}>Een eerste indruk.</h2>
            </div>
            <p>In deze korte film vertel ik je meer over Puur Geeske.</p>
          </div>
          <div className={styles.film}>
            <FilmPlayer
              base="intro"
              posterName="intro-poster"
              posterWidths={[480, 768, 1024, 1440, 1920]}
              posterSizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1180px) calc(100vw - 72px), 1108px"
              alt="Geeske stelt zichzelf en Puur Geeske voor"
              buttonLabel="Bekijk de introductiefilm van Geeske"
            />
          </div>
          <div className={styles.filmFooter}>
            <p>Benieuwd wat bij jou past?</p>
            <Link href="/contact" className="text-link">Neem contact op <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
